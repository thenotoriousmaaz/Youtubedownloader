from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from starlette.staticfiles import StaticFiles

from .jobs import JobManager
from .schemas import CreateJobRequest, CreateJobResponse, JobStatus

app = FastAPI(title="YT Downloader API")

app.add_middleware(
	CORSMiddleware,
	allow_origins=["*"],
	allow_credentials=False,
	allow_methods=["*"],
	allow_headers=["*"],
)

BASE_DIR = Path(__file__).resolve().parent.parent
DOWNLOADS_DIR = BASE_DIR / "downloads"
DOWNLOADS_DIR.mkdir(parents=True, exist_ok=True)
app.mount("/downloads", StaticFiles(directory=str(DOWNLOADS_DIR)), name="downloads")

job_manager = JobManager(DOWNLOADS_DIR)


@app.post("/api/jobs", response_model=CreateJobResponse)
async def create_job(req: CreateJobRequest) -> CreateJobResponse:
	if req.mode == "audio" and not req.audio_format:
		req.audio_format = "mp3"
	job_id = job_manager.submit_job(req.url, req.mode, req.quality, req.audio_format)
	return CreateJobResponse(job_id=job_id)


@app.get("/api/jobs/{job_id}", response_model=JobStatus)
async def get_job(job_id: str) -> JobStatus:
	status = job_manager.get_status(job_id)
	if not status:
		raise HTTPException(status_code=404, detail="Job not found")
	return JobStatus(**status)
