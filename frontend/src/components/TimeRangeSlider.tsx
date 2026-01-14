import React from 'react'

interface TimeRangeSliderProps {
    duration: number // in seconds
    startTime: number // in seconds
    endTime: number // in seconds
    onStartChange: (value: number) => void
    onEndChange: (value: number) => void
}

function formatTime(seconds: number): string {
    const h = Math.floor(seconds / 3600)
    const m = Math.floor((seconds % 3600) / 60)
    const s = Math.floor(seconds % 60)
    if (h > 0) {
        return `${h}:${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`
    }
    return `${m}:${s.toString().padStart(2, '0')}`
}

export default function TimeRangeSlider({
    duration,
    startTime,
    endTime,
    onStartChange,
    onEndChange
}: TimeRangeSliderProps) {
    const sliderRef = React.useRef<HTMLDivElement>(null)

    // Calculate percentages for the visual track
    const startPercent = (startTime / duration) * 100
    const endPercent = (endTime / duration) * 100

    const handleMouseDown = (isStart: boolean) => (e: React.MouseEvent) => {
        e.preventDefault()
        const slider = sliderRef.current
        if (!slider) return

        const handleMove = (moveEvent: MouseEvent) => {
            const rect = slider.getBoundingClientRect()
            const percent = Math.max(0, Math.min(100, ((moveEvent.clientX - rect.left) / rect.width) * 100))
            const seconds = Math.round((percent / 100) * duration)

            if (isStart) {
                // Don't let start go past end
                if (seconds < endTime) {
                    onStartChange(seconds)
                }
            } else {
                // Don't let end go before start
                if (seconds > startTime) {
                    onEndChange(seconds)
                }
            }
        }

        const handleUp = () => {
            document.removeEventListener('mousemove', handleMove)
            document.removeEventListener('mouseup', handleUp)
        }

        document.addEventListener('mousemove', handleMove)
        document.addEventListener('mouseup', handleUp)
    }

    return (
        <div className="space-y-4">
            {/* Time Labels */}
            <div className="flex justify-between text-sm text-gray-500">
                <span>0:00</span>
                <span>{formatTime(duration)}</span>
            </div>

            {/* Slider Track */}
            <div
                ref={sliderRef}
                className="relative h-3 bg-gray-200 rounded-full cursor-pointer"
                style={{ touchAction: 'none' }}
            >
                {/* Selected Range */}
                <div
                    className="absolute h-full bg-black rounded-full"
                    style={{
                        left: `${startPercent}%`,
                        width: `${endPercent - startPercent}%`,
                    }}
                />

                {/* Start Handle */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-white border-2 border-black rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:scale-110 transition-transform z-10"
                    style={{ left: `${startPercent}%`, marginLeft: '-12px' }}
                    onMouseDown={handleMouseDown(true)}
                >
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap bg-white px-2 py-1 rounded shadow">
                        {formatTime(startTime)}
                    </div>
                </div>

                {/* End Handle */}
                <div
                    className="absolute top-1/2 -translate-y-1/2 w-6 h-6 bg-black border-2 border-black rounded-full cursor-grab active:cursor-grabbing shadow-lg hover:scale-110 transition-transform z-10"
                    style={{ left: `${endPercent}%`, marginLeft: '-12px' }}
                    onMouseDown={handleMouseDown(false)}
                >
                    <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-xs font-medium text-gray-700 whitespace-nowrap bg-white px-2 py-1 rounded shadow">
                        {formatTime(endTime)}
                    </div>
                </div>
            </div>

            {/* Extra spacing for the time labels on handles */}
            <div className="h-6" />

            {/* Selected Duration */}
            <div className="text-center text-sm text-gray-600">
                Selected: <span className="font-semibold text-gray-900">{formatTime(endTime - startTime)}</span>
            </div>
        </div>
    )
}

export { formatTime }
