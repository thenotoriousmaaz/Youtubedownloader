import threading
import uuid
from concurrent.futures import ThreadPoolExecutor
from pathlib import Path
from typing import Dict, Optional

import yt_dlp


class JobState:
	QUEUED = "queued"
	RUNNING = "running"
	COMPLETED = "completed"
	FAILED = "failed"


class Job:
	def __init__(self, job_id: str):
		self.job_id = job_id
		self.state = JobState.QUEUED
		self.progress = 0.0
		self.filename: Optional[str] = None
		self.download_url: Optional[str] = None
		self.message: Optional[str] = None
		self._lock = threading.Lock()

	def to_dict(self) -> Dict:
		with self._lock:
			return {
				"job_id": self.job_id,
				"state": self.state,
				"progress": self.progress,
				"filename": self.filename,
				"download_url": self.download_url,
				"message": self.message,
			}


class JobManager:
	def __init__(self, downloads_dir: Path, max_workers: int = 3):
		self.downloads_dir = downloads_dir
		self.downloads_dir.mkdir(parents=True, exist_ok=True)
		self.cookies_file = self.downloads_dir.parent / "cookies.txt"
		self._jobs: Dict[str, Job] = {}
		self._executor = ThreadPoolExecutor(max_workers=max_workers)
		self._jobs_lock = threading.Lock()

	def submit_job(self, url: str, mode: str, quality: Optional[str], audio_format: Optional[str]) -> str:
		job_id = str(uuid.uuid4())
		job = Job(job_id)
		with self._jobs_lock:
			self._jobs[job_id] = job
		self._executor.submit(self._run_download, job, url, mode, quality, audio_format)
		return job_id

	def get_status(self, job_id: str) -> Optional[Dict]:
		with self._jobs_lock:
			job = self._jobs.get(job_id)
		if not job:
			return None
		return job.to_dict()

	def _run_download(self, job: Job, url: str, mode: str, quality: Optional[str], audio_format: Optional[str]) -> None:
		def progress_hook(d):
			with job._lock:
				status = d.get("status")
				if status == "downloading":
					dl = d.get("downloaded_bytes") or 0
					total = d.get("total_bytes") or d.get("total_bytes_estimate") or 0
					if total:
						job.progress = max(0.0, min(100.0, (dl / total) * 100.0))
					job.state = JobState.RUNNING
				elif status == "finished":
					job.progress = 100.0
					job.state = JobState.RUNNING

		try:
			with job._lock:
				job.state = JobState.RUNNING

			opts = self._build_ydl_opts(mode, quality, audio_format, progress_hook)
			with yt_dlp.YoutubeDL(opts) as ydl:
				info = ydl.extract_info(url, download=True)

				final_path = None
				requested = info.get("requested_downloads") or []
				if requested and isinstance(requested, list):
					final_path = requested[0].get("filepath") or requested[0].get("_filename")
				if not final_path:
					final_path = info.get("filepath") or info.get("_filename")
				if not final_path:
					final_path = ydl.prepare_filename(info)

				final_path = Path(final_path)
				with job._lock:
					job.filename = final_path.name
					job.download_url = f"/downloads/{final_path.name}"
					job.state = JobState.COMPLETED
					job.progress = 100.0
		except Exception as exc:
			with job._lock:
				job.state = JobState.FAILED
				job.message = str(exc)

	def _build_ydl_opts(self, mode: str, quality: Optional[str], audio_format: Optional[str], hook):
		outtmpl = str(self.downloads_dir / "%(title)s.%(ext)s")
		postprocessors = []
		format_selector = None

		if mode == "video":
			max_height = {
				"1080p": 1080,
				"720p": 720,
				"480p": 480,
				"360p": 360,
			}.get(quality or "720p", 720)
			format_selector = (
				f"bestvideo[height<=?{max_height}][ext=mp4]+bestaudio[ext=m4a]/"
				f"best[height<=?{max_height}][ext=mp4]/best[height<=?{max_height}]"
			)
			merge_output_format = "mp4"
		else:
			format_selector = "bestaudio/best"
			codec = (audio_format or "mp3").lower()
			postprocessors.append(
				{
					"key": "FFmpegExtractAudio",
					"preferredcodec": codec,
					"preferredquality": "192",
				}
			)
			merge_output_format = None

		opts = {
			"outtmpl": outtmpl,
			"progress_hooks": [hook],
			"format": format_selector,
			"concurrent_fragment_downloads": 5,
			"noprogress": True,
			"noplaylist": True,
			"retries": 5,
			"fragment_retries": 5,
			"http_headers": {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/126.0.0.0 Safari/537.36",
				"Accept-Language": "en-US,en;q=0.9",
				"Referer": "https://www.youtube.com/",
			},
			"extractor_args": {
				"youtube": {"player_client": ["android"]}
			},
		}
		if postprocessors:
			opts["postprocessors"] = postprocessors
		if merge_output_format:
			opts["merge_output_format"] = merge_output_format
		if self.cookies_file.exists():
			opts["cookiefile"] = str(self.cookies_file)
		return opts
