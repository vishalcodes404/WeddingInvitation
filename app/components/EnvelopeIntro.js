'use client'
import { useRef, useState } from 'react'

export default function EnvelopeIntro({ onComplete, onSkip }) {
  const videoRef = useRef(null)
  const [playing, setPlaying] = useState(false)
  const [fading, setFading] = useState(false)
  const doneRef = useRef(false)

  const finish = (cb) => {
    if (doneRef.current) return
    doneRef.current = true
    setFading(true)
    setTimeout(() => cb?.(), 550)
  }

  const handleTapToPlay = async () => {
    const v = videoRef.current
    if (!v || playing) return
    try {
      v.muted = false
      await v.play()
      setPlaying(true)
    } catch {
      // Fallback if browser blocks unmuted play
      try {
        v.muted = true
        await v.play()
        setPlaying(true)
      } catch {
        finish(onComplete)
      }
    }
  }

  const handleSkip = (e) => {
    e.stopPropagation()
    const v = videoRef.current
    if (v) v.pause()
    finish(onSkip)
  }

  return (
    <div
      className={`intro-root${fading ? ' fadeout' : ''}`}
      role="dialog"
      aria-label="Wedding Invitation Video Intro"
      onClick={handleTapToPlay}
    >
      <video
        ref={videoRef}
        src="/intro.mp4"
        poster="/intro-poster.jpg"
        playsInline
        preload="auto"
        className="intro-video"
        onEnded={() => finish(onComplete)}
      />

      {!playing && !fading && (
        <div className="tap-overlay">
          <button type="button" className="tap-open-pill" onClick={handleTapToPlay}>
            Tap to Open Invitation
          </button>
        </div>
      )}

      <button type="button" className="skip-intro-btn" onClick={handleSkip}>
        Skip Intro
      </button>
    </div>
  )
}
