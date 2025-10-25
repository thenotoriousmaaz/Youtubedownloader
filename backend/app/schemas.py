from typing import Literal, Optional
from pydantic import BaseModel


class CreateJobRequest(BaseModel):
	url: str
	mode: Literal["video", "audio"]
	quality: Optional[str] = None
	audio_format: Optional[Literal["mp3", "m4a"]] = None


class CreateJobResponse(BaseModel):
	job_id: str


class JobStatus(BaseModel):
	job_id: str
	state: Literal["queued", "running", "completed", "failed"]
	progress: float
	filename: Optional[str] = None
	download_url: Optional[str] = None
	message: Optional[str] = None
