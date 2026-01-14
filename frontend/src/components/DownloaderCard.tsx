import React, { useMemo, useState, useEffect, useCallback } from 'react'
import { createJob, getJob, getVideoInfo, JobStatus, VideoInfo, toAbsoluteDownloadUrl } from '@/lib/api'
import { Loader2, Download, Video, Music, ArrowRight, CheckCircle2, XCircle, Scissors } from 'lucide-react'
import TimeRangeSlider, { formatTime } from './TimeRangeSlider'

const videoQualities = ['1080p', '720p', '480p', '360p'] as const
const audioFormats = ['wav', 'mp3', 'm4a'] as const

type Tab = 'video' | 'audio'

export default function DownloaderCard() {
  const [url, setUrl] = useState('')
  const [tab, setTab] = useState<Tab>('video')
  const [quality, setQuality] = useState<typeof videoQualities[number]>('720p')
  const [audioFormat, setAudioFormat] = useState<typeof audioFormats[number]>('wav')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [jobId, setJobId] = useState<string | null>(null)
  const [result, setResult] = useState<JobStatus | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [thumbnail, setThumbnail] = useState<string | null>(null)

  // Time clipping state
  const [videoInfo, setVideoInfo] = useState<VideoInfo | null>(null)
  const [loadingInfo, setLoadingInfo] = useState(false)
  const [startSeconds, setStartSeconds] = useState(0)
  const [endSeconds, setEndSeconds] = useState(0)
  const [clipEnabled, setClipEnabled] = useState(false)

  const canDownload = useMemo(() => {
    return url.trim().length > 0 && !loading
  }, [url, loading])

  // Extract YouTube video ID from various URL formats
  function extractVideoId(url: string): string | null {
    if (!url) return null

    // Remove whitespace
    url = url.trim()

    // Regular YouTube URLs: youtube.com/watch?v=VIDEO_ID
    const standardMatch = url.match(/(?:youtube\.com\/watch\?v=)([a-zA-Z0-9_-]{11})/)
    if (standardMatch) return standardMatch[1]

    // Short YouTube URLs: youtu.be/VIDEO_ID
    const shortMatch = url.match(/(?:youtu\.be\/)([a-zA-Z0-9_-]{11})/)
    if (shortMatch) return shortMatch[1]

    // Embed URLs: youtube.com/embed/VIDEO_ID
    const embedMatch = url.match(/(?:youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/)
    if (embedMatch) return embedMatch[1]

    // YouTube shorts: youtube.com/shorts/VIDEO_ID
    const shortsMatch = url.match(/(?:youtube\.com\/shorts\/)([a-zA-Z0-9_-]{11})/)
    if (shortsMatch) return shortsMatch[1]

    return null
  }

  // Update thumbnail when URL changes
  React.useEffect(() => {
    const videoId = extractVideoId(url)
    if (videoId) {
      // Use maxresdefault for best quality, fallback to hqdefault if not available
      setThumbnail(`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`)
    } else {
      setThumbnail(null)
    }
  }, [url])

  async function handleDownload() {
    try {
      setLoading(true)
      setError(null)
      setResult(null)
      setProgress(0)

      // Convert seconds to time string format for API
      const startTimeStr = clipEnabled && startSeconds > 0 ? formatTime(startSeconds) : undefined
      const endTimeStr = clipEnabled && endSeconds > 0 && endSeconds < (videoInfo?.duration || Infinity) ? formatTime(endSeconds) : undefined

      const basePayload = {
        url,
        start_time: startTimeStr,
        end_time: endTimeStr,
      }
      const payload = tab === 'video'
        ? { ...basePayload, mode: 'video' as const, quality }
        : { ...basePayload, mode: 'audio' as const, audio_format: audioFormat }
      const { job_id } = await createJob(payload)
      setJobId(job_id)
      await poll(job_id)
    } catch (e: any) {
      setError(e.message ?? 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  async function poll(id: string) {
    let done = false
    while (!done) {
      const status = await getJob(id)
      setProgress(status.progress)
      if (status.state === 'completed' || status.state === 'failed') {
        setResult(status)
        done = true
        break
      }
      await new Promise(r => setTimeout(r, 1000))
    }
  }

  return (
    <div className="glass-card p-12 w-full rounded-[2rem]">
      <div className="space-y-8">
        {/* URL Input - Large and centered */}
        <div className="relative">
          <input
            className="input-field text-lg"
            placeholder="Paste YouTube URL"
            value={url}
            onChange={e => setUrl(e.target.value)}
            onKeyDown={e => {
              if (e.key === 'Enter') {
                if (canDownload) {
                  handleDownload()
                }
              }
            }}
          />
        </div>

        {/* Video Thumbnail Preview */}
        {thumbnail ? (
          <div className="thumbnail-container">
            <img
              src={thumbnail}
              alt="Video thumbnail"
              className="thumbnail-image"
              onError={(e) => {
                // Fallback to hqdefault if maxresdefault doesn't exist
                const target = e.target as HTMLImageElement
                if (target.src.includes('maxresdefault')) {
                  const videoId = extractVideoId(url)
                  if (videoId) {
                    target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
                  }
                }
              }}
            />
          </div>
        ) : null}

        {/* Tab Switcher - Bigger */}
        <div className="flex items-center gap-4">
          <button
            className={`tab-button flex-1 flex items-center justify-center gap-3 text-base ${tab === 'video' ? 'tab-active' : 'tab-inactive'}`}
            onClick={() => setTab('video')}
          >
            <Video className="w-5 h-5" />
            <span>Video</span>
          </button>
          <button
            className={`tab-button flex-1 flex items-center justify-center gap-3 text-base ${tab === 'audio' ? 'tab-active' : 'tab-inactive'}`}
            onClick={() => setTab('audio')}
          >
            <Music className="w-5 h-5" />
            <span>Audio</span>
          </button>
        </div>

        {/* Quality/Format Selector */}
        {tab === 'video' ? (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Quality</label>
            <select
              className="input-field text-base font-medium appearance-none cursor-pointer"
              value={quality}
              onChange={e => setQuality(e.target.value as any)}
            >
              {videoQualities.map(q => (
                <option key={q} value={q}>{q} - {q === '1080p' ? 'Full HD' : q === '720p' ? 'HD' : 'Standard'}</option>
              ))}
            </select>
          </div>
        ) : (
          <div className="space-y-3">
            <label className="text-sm font-medium text-gray-500 uppercase tracking-wide">Format</label>
            <select
              className="input-field text-base font-medium appearance-none cursor-pointer"
              value={audioFormat}
              onChange={e => setAudioFormat(e.target.value as any)}
            >
              {audioFormats.map(f => (
                <option key={f} value={f}>{f.toUpperCase()} - {f === 'wav' ? 'Lossless (Best)' : f === 'mp3' ? '320kbps' : '256kbps'}</option>
              ))}
            </select>
          </div>
        )}

        {/* Time Clip Section - Collapsible */}
        <div className="space-y-4">
          <button
            type="button"
            onClick={async () => {
              if (!clipEnabled && !videoInfo && url) {
                // Fetch video info when enabling clip mode
                setLoadingInfo(true)
                try {
                  const info = await getVideoInfo(url)
                  setVideoInfo(info)
                  setStartSeconds(0)
                  setEndSeconds(info.duration)
                } catch (e) {
                  console.error('Failed to fetch video info:', e)
                } finally {
                  setLoadingInfo(false)
                }
              }
              setClipEnabled(!clipEnabled)
            }}
            className={`w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl border-2 transition-all duration-300 ${clipEnabled
              ? 'border-black bg-gray-100 text-gray-900'
              : 'border-gray-200 bg-white text-gray-600 hover:border-gray-300 hover:bg-gray-50'
              }`}
          >
            <Scissors className="w-5 h-5" />
            <span className="font-medium">
              {clipEnabled ? 'Clip Enabled' : 'Clip Video/Audio'}
            </span>
            {loadingInfo && <Loader2 className="w-4 h-4 animate-spin" />}
          </button>

          {clipEnabled && videoInfo && (
            <div className="bg-gray-50 rounded-2xl p-6 space-y-6 border border-gray-200">
              <div className="text-center">
                <p className="text-sm text-gray-500 mb-1">Video Duration</p>
                <p className="font-semibold text-gray-900">{formatTime(videoInfo.duration)}</p>
              </div>

              {/* Slider */}
              <TimeRangeSlider
                duration={videoInfo.duration}
                startTime={startSeconds}
                endTime={endSeconds}
                onStartChange={setStartSeconds}
                onEndChange={setEndSeconds}
              />

              {/* Fine-tune inputs */}
              <div className="flex gap-4">
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">Start</label>
                  <input
                    type="number"
                    min={0}
                    max={endSeconds - 1}
                    className="input-field text-base text-center"
                    value={startSeconds}
                    onChange={e => setStartSeconds(Math.max(0, Math.min(endSeconds - 1, parseInt(e.target.value) || 0)))}
                  />
                  <p className="text-xs text-gray-400 text-center mt-1">seconds</p>
                </div>
                <div className="flex-1">
                  <label className="text-xs font-medium text-gray-500 uppercase tracking-wide mb-2 block">End</label>
                  <input
                    type="number"
                    min={startSeconds + 1}
                    max={videoInfo.duration}
                    className="input-field text-base text-center"
                    value={endSeconds}
                    onChange={e => setEndSeconds(Math.max(startSeconds + 1, Math.min(videoInfo.duration, parseInt(e.target.value) || 0)))}
                  />
                  <p className="text-xs text-gray-400 text-center mt-1">seconds</p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Download Button - Prominent */}
        <button
          className="btn-primary w-full flex items-center justify-center gap-3 text-xl"
          onClick={handleDownload}
          disabled={!canDownload}
        >
          {loading ? (
            <>
              <Loader2 className="w-6 h-6 animate-spin" />
              <span>Processing</span>
            </>
          ) : (
            <>
              <span>Download</span>
              <ArrowRight className="w-6 h-6" />
            </>
          )}
        </button>

        {/* Progress Bar */}
        {(loading || progress > 0) && result?.state !== 'completed' && result?.state !== 'failed' ? (
          <div className="w-full space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium text-gray-600">Downloading</span>
              <span className="text-sm font-semibold text-gray-900">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
              <div
                className="progress-bar"
                style={{ width: `${Math.round(progress)}%` }}
              />
            </div>
          </div>
        ) : null}

        {/* Error Message */}
        {error ? (
          <div className="error-badge flex items-start gap-4">
            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900 text-lg mb-1">Error</p>
              <p className="text-sm text-gray-600">{error}</p>
            </div>
          </div>
        ) : null}

        {/* Success Message */}
        {result && result.state === 'completed' ? (
          <div className="success-badge flex flex-col items-center justify-center text-center gap-4">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
            <p className="font-semibold text-gray-900 text-lg">Ready to download</p>
            <a
              className="inline-flex items-center justify-center gap-3 bg-black text-white px-8 py-4 rounded-full font-semibold hover:bg-gray-800 transition-all duration-300 hover:-translate-y-1"
              href={toAbsoluteDownloadUrl(result.download_url!)}
              target="_blank"
              rel="noreferrer"
              style={{ boxShadow: '0 4px 16px rgba(0, 0, 0, 0.12)' }}
            >
              <Download className="w-5 h-5" />
              <span>Download File</span>
            </a>
          </div>
        ) : null}

        {/* Failed Message */}
        {result && result.state === 'failed' ? (
          <div className="error-badge flex items-start gap-4">
            <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
            <div>
              <p className="font-semibold text-gray-900 text-lg mb-1">Download Failed</p>
              <p className="text-sm text-gray-600">{result.message}</p>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  )
}
