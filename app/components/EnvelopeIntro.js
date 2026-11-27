'use client'
import { useRef, useState } from 'react'

export default function EnvelopeIntro({ onComplete, onSkip, data }) {
  const [opening, setOpening] = useState(false)
  const doneRef = useRef(false)

  const handleOpen = (e) => {
    e?.stopPropagation?.()
    if (doneRef.current || opening) return
    doneRef.current = true
    setOpening(true)
    // Allow golden ring pulse + scroll unroll start before smoothly revealing unrolled hero
    setTimeout(() => {
      onComplete?.()
    }, 950)
  }

  return (
    <div
      className={`scroll-gate${opening ? ' unrolling' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-label="Wedding Scroll Invitation"
      onClick={handleOpen}
    >
      {/* Subtle radial glow & expanding golden rings */}
      <div className="gate-ambient-rings" aria-hidden="true">
        <span className="gate-ring r1" />
        <span className="gate-ring r2" />
      </div>

      {/* Inner centered lockup matching the reference intro video */}
      <div className="gate-inner">
        <p className="gate-eyebrow">WEDDING INVITATION</p>

        <h1 className="gate-names">
          <span>{data.groom}</span>
          <span className="gate-amp">&amp;</span>
          <span>{data.bride}</span>
        </h1>

        <div className="gate-scroll-wrap">
          <span className="gate-ring-seal" aria-hidden="true" />
          <img
            src="/art/scroll-closed.png"
            alt="Royal wedding invitation scroll sealed with Lord Ganesha emblem"
            className="gate-scroll-img"
            draggable={false}
          />
        </div>

        <button
          type="button"
          className="gate-open-pill"
          onClick={handleOpen}
        >
          <span aria-hidden="true">^</span> Tap here to open
        </button>

        <p className="gate-date-line">13/12/2026 &bull; {data.place}</p>

        <p className="gate-hint">TAP ANYWHERE TO UNROLL</p>
      </div>

      {onSkip && (
        <button
          type="button"
          className="gate-skip-btn"
          onClick={(e) => {
            e.stopPropagation()
            if (!doneRef.current) {
              doneRef.current = true
              onSkip()
            }
          }}
        >
          Skip
        </button>
      )}
    </div>
  )
}
