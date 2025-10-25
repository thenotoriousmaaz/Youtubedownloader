export type Mode = 'video' | 'audio'
export type AudioFormat = 'mp3' | 'm4a'

export const API_BASE = import.meta.env.VITE_API_BASE || ''

export async function createJob(params: { url: string; mode: Mode; quality?: string; audio_format?: AudioFormat }) {
  const base = API_BASE
  const res = await fetch(`${base}/api/jobs`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(params)
  })
  if (!res.ok) throw new Error('Failed to create job')
  return (await res.json()) as { job_id: string }
}

export type JobStatus = {
  job_id: string
  state: 'queued' | 'running' | 'completed' | 'failed'
  progress: number
  filename?: string
  download_url?: string
  message?: string
}

export async function getJob(jobId: string) {
  const base = API_BASE
  const res = await fetch(`${base}/api/jobs/${jobId}`)
  if (!res.ok) throw new Error('Job not found')
  return (await res.json()) as JobStatus
}

export function toAbsoluteDownloadUrl(relative: string) {
  if (API_BASE) return `${API_BASE}${relative}`
  const origin = window.location.origin
  return `${origin}${relative}`
}
