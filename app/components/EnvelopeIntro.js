'use client'
import { useEffect, useRef, useState } from 'react'

export default function EnvelopeIntro({ onStartMain, onComplete }) {
  const videoRef = useRef(null)
  const closingRef = useRef(false)
  const [fading, setFading] = useState(false)
  const [showTapWords, setShowTapWords] = useState(false)

  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const p = v.play()
    if (p && typeof p.catch === 'function') {
      // Fallback if strict autoplay blocks muted video: surface tap words immediately
      p.catch(() => setShowTapWords(true))
    }
  }, [])

  const beginFadeOut = () => {
    if (closingRef.current) return
    closingRef.current = true
    setFading(true)
    onStartMain?.()
    setTimeout(() => {
      onComplete?.()
    }, 750)
  }

  const handleTimeUpdate = () => {
    const v = videoRef.current
    if (!v || showTapWords) return
    // Reveal "TAP TO OPEN" in the lower arch once curtains open & 13/12/2026 settles
    if (v.currentTime >= 4.4) {
      setShowTapWords(true)
    }
  }

  return (
    <div
      className={`intro-video-stage${fading ? ' fadeout' : ''}`}
      role="button"
      tabIndex={0}
      aria-label="Wedding Invitation — Tap to open"
      onClick={beginFadeOut}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !closingRef.current) {
          e.preventDefault()
          beginFadeOut()
        }
      }}
    >
      <div className="intro-video-frame">
        <video
          ref={videoRef}
          src="/curtain-intro.mp4"
          poster="/curtain-poster.jpg"
          autoPlay
          muted
          playsInline
          preload="auto"
          className="intro-video-exact"
          onTimeUpdate={handleTimeUpdate}
          onEnded={() => setShowTapWords(true)}
        />

        {/* Mention tap in words only (no real hand) below 13/12/2026 */}
        {!fading && (
          <div className={`curtain-tap-zone${showTapWords ? ' visible' : ''}`} aria-hidden="true">
            <span className="curtain-tap-halo" />
            <span className="curtain-tap-halo inner" />
            <span className="curtain-tap-words">Tap to Open</span>
          </div>
        )}
      </div>
    </div>
  )
}
