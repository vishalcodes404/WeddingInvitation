'use client'
import { useRef, useState } from 'react'

export default function EnvelopeIntro({ onPrimeMusic, onStartMain, onComplete }) {
  const videoRef = useRef(null)
  const playingRef = useRef(false)
  const closingRef = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [fading, setFading] = useState(false)

  const beginFadeOut = () => {
    if (closingRef.current) return
    closingRef.current = true
    setFading(true)
    onStartMain?.()
    setTimeout(() => {
      onComplete?.()
    }, 750)
  }

  // Ask visitor to tap first -> play IMG_8961.MP4 once cleanly -> smoothly fade to hero page
  const handleFirstTap = async (e) => {
    e?.stopPropagation?.()
    if (playingRef.current || closingRef.current) return
    playingRef.current = true
    setPlaying(true)

    // Unlock / prime music element within direct user gesture so MP3 auto-starts on hero transition
    onPrimeMusic?.()

    const v = videoRef.current
    if (!v) {
      beginFadeOut()
      return
    }
    try {
      v.muted = false
      await v.play()
    } catch {
      try {
        v.muted = true
        await v.play()
      } catch {
        beginFadeOut()
      }
    }
  }

  const handleTimeUpdate = () => {
    const v = videoRef.current
    if (!v || closingRef.current || !v.duration) return
    // Start smooth 750ms fade right as final frame settles (~0.45s before end)
    if (v.currentTime >= v.duration - 0.45) {
      beginFadeOut()
    }
  }

  return (
    <div
      className={`intro-video-stage${fading ? ' fadeout' : ''}`}
      role={!playing ? 'button' : 'dialog'}
      tabIndex={0}
      aria-label="Wedding Invitation — Tap to open"
      onClick={!playing ? handleFirstTap : undefined}
      onKeyDown={(e) => {
        if (!playing && (e.key === 'Enter' || e.key === ' ')) {
          e.preventDefault()
          handleFirstTap(e)
        }
      }}
    >
      <video
        ref={videoRef}
        src="/envelope-intro.mp4"
        poster="/envelope-poster.jpg"
        playsInline
        preload="auto"
        className="intro-video-exact"
        onTimeUpdate={handleTimeUpdate}
        onEnded={beginFadeOut}
      />

      {/* Ask visitor to tap first over the envelope's central wax seal */}
      {!playing && !fading && (
        <>
          <span className="intro-tap-halo" aria-hidden="true" />
          <div className="intro-tap-prompt" aria-hidden="true">
            <span>Tap to Open</span>
          </div>
        </>
      )}

      {playing && !fading && (
        <button
          type="button"
          className="intro-skip-pill"
          onClick={(e) => {
            e.stopPropagation()
            const v = videoRef.current
            if (v) v.pause()
            beginFadeOut()
          }}
        >
          Skip &rsaquo;
        </button>
      )}
    </div>
  )
}
