'use client'
import { useRef, useState } from 'react'

export default function EnvelopeIntro({ onStartMain, onComplete }) {
  const closingRef = useRef(false)
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

  // Visitor taps the envelope card → smooth fade straight to hero page (no video, no sound)
  const handleTap = (e) => {
    e?.stopPropagation?.()
    if (closingRef.current) return
    beginFadeOut()
  }

  return (
    <div
      className={`intro-video-stage${fading ? ' fadeout' : ''}`}
      role="button"
      tabIndex={0}
      aria-label="Wedding Invitation — Tap to open"
      onClick={handleTap}
      onKeyDown={(e) => {
        if ((e.key === 'Enter' || e.key === ' ') && !closingRef.current) {
          e.preventDefault()
          handleTap(e)
        }
      }}
    >
      {/* Static envelope poster image (chocolate lace envelope with golden wax seal) */}
      <img
        src="/envelope-poster.jpg"
        alt="Wedding Invitation Envelope"
        className="intro-video-exact"
        draggable="false"
      />

      {/* Subtle golden pulse ring over the central wax seal */}
      {!fading && (
        <>
          <span className="intro-tap-halo" aria-hidden="true" />
          <div className="intro-tap-prompt" aria-hidden="true">
            <span>Tap to Open</span>
          </div>
        </>
      )}
    </div>
  )
}
