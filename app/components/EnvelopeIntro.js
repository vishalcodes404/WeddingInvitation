'use client'
import { useEffect, useRef, useState } from 'react'

export default function EnvelopeIntro({ onStartOpen, onComplete }) {
  const videoRef = useRef(null)
  const closingRef = useRef(false)
  const [fading, setFading] = useState(false)

  // Attempt muted autoplay gracefully on initial load; plays once and holds final frame
  useEffect(() => {
    const v = videoRef.current
    if (!v) return
    v.muted = true
    const playPromise = v.play()
    if (playPromise && typeof playPromise.catch === 'function') {
      playPromise.catch(() => {
        // Gracefully ignore browser autoplay block without altering layout or showing buttons
      })
    }
  }, [])

  const handleOpen = (e) => {
    e?.stopPropagation?.()
    if (closingRef.current) return
    closingRef.current = true
    setFading(true)
    onStartOpen?.()
    setTimeout(() => {
      onComplete?.()
    }, 700)
  }

  return (
    <div
      className={`intro-video-stage${fading ? ' fadeout' : ''}`}
      role="button"
      tabIndex={0}
      aria-label="Wedding Invitation — Tap anywhere to open"
      onClick={handleOpen}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleOpen(e)
        }
      }}
    >
      <video
        ref={videoRef}
        src="/scroll-intro.mp4"
        autoPlay
        muted
        playsInline
        preload="auto"
        className="intro-video-exact"
      />

      {/* Functional invisible hit zone directly matching 'Tap here to open' area in the video */}
      <span
        className="intro-tap-hotspot"
        aria-label="Tap here to open"
        onClick={handleOpen}
      />
    </div>
  )
}
