'use client'
import { useEffect, useRef, useState } from 'react'

export default function EnvelopeIntro({ onStartAudio, onRevealStart, onComplete }) {
  // sealed -> opening -> ribbon -> untying -> diamond -> fadeout -> done
  const [phase, setPhase] = useState('sealed')
  const timers = useRef([])

  useEffect(() => {
    return () => timers.current.forEach(clearTimeout)
  }, [])

  const startSequence = () => {
    if (phase !== 'sealed') return
    onStartAudio?.()
    setPhase('opening')

    timers.current.push(
      setTimeout(() => setPhase('ribbon'), 1100),
      setTimeout(() => setPhase('untying'), 2100),
      setTimeout(() => {
        setPhase('diamond')
        onRevealStart?.()
      }, 2850),
      setTimeout(() => setPhase('fadeout'), 4050),
      setTimeout(() => {
        setPhase('done')
        onComplete?.()
      }, 4750)
    )
  }

  if (phase === 'done') return null

  const envOpened = phase === 'opening' || phase === 'ribbon' || phase === 'untying' || phase === 'diamond' || phase === 'fadeout'
  const envGone = phase === 'ribbon' || phase === 'untying' || phase === 'diamond' || phase === 'fadeout'
  const bowUntying = phase === 'untying' || phase === 'diamond' || phase === 'fadeout'
  const diamondOpen = phase === 'diamond' || phase === 'fadeout'
  const fadingOut = phase === 'fadeout'

  return (
    <div
      className={`intro-root${fadingOut ? ' fadeout' : ''}${diamondOpen ? ' revealing' : ''}`}
      role="dialog"
      aria-label="Wedding Invitation Envelope"
    >
      {/* LAYER 1: Pearlescent Floral Lace Frame + Silk Veil Diamond Split */}
      <div className={`lace-stage${diamondOpen ? ' diamond-open' : ''}`}>
        {/* Outer Pearlescent Lace Card (stays still while center veil parts, then fades) */}
        <div className={`lace-frame-outer${diamondOpen ? ' opening' : ''}`}>
          <img src="/art/pearl-lace.png" alt="" className="lace-img" />
          <div className="lace-iridescent" />
        </div>

        {/* Center Diamond-Parting Silk Veil Panels */}
        <div className="veil-panel left">
          <div className="veil-fabric" />
          <div className="veil-pleat-ribbon" />
        </div>
        <div className="veil-panel right">
          <div className="veil-fabric" />
          <div className="veil-pleat-ribbon" />
        </div>

        {/* Center Shimmering Champagne-Ivory Satin Ribbon & Bow */}
        <div className={`bow-overlay${bowUntying ? ' untying' : ''}`}>
          <div className="ribbon-band-full" />
          <svg className="bow-svg" viewBox="0 0 360 190" fill="none" aria-hidden="true">
            <defs>
              <linearGradient id="silkL" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fffef9" />
                <stop offset="35%" stopColor="#f4ead9" />
                <stop offset="75%" stopColor="#dcc7a7" />
                <stop offset="100%" stopColor="#bfa47e" />
              </linearGradient>
              <linearGradient id="silkR" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fffef9" />
                <stop offset="35%" stopColor="#f4ead9" />
                <stop offset="75%" stopColor="#dcc7a7" />
                <stop offset="100%" stopColor="#bfa47e" />
              </linearGradient>
              <radialGradient id="silkK" cx="40%" cy="35%" r="65%">
                <stop offset="0%" stopColor="#fffef9" />
                <stop offset="60%" stopColor="#ebdcc5" />
                <stop offset="100%" stopColor="#bfa47f" />
              </radialGradient>
            </defs>

            {/* Hanging Bow Tails */}
            <g className="bow-tails">
              <path
                d="M168 98 C136 130, 104 158, 72 182 L108 185 C134 156, 156 126, 174 102 Z"
                fill="url(#silkL)"
                stroke="#cbb38f"
                strokeWidth="0.8"
              />
              <path
                d="M192 98 C224 130, 256 158, 288 182 L252 185 C226 156, 204 126, 186 102 Z"
                fill="url(#silkR)"
                stroke="#cbb38f"
                strokeWidth="0.8"
              />
              <path d="M163 106 C138 134, 114 160, 92 182" stroke="#fffef9" strokeWidth="1.6" opacity="0.75" />
              <path d="M197 106 C222 134, 246 160, 268 182" stroke="#fffef9" strokeWidth="1.6" opacity="0.75" />
            </g>

            {/* Symmetric Satin Bow Loops */}
            <g className="bow-loops">
              <path
                d="M168 85 C118 28, 46 42, 54 92 C62 138, 132 122, 168 97 Z"
                fill="url(#silkL)"
                stroke="#cbb38f"
                strokeWidth="0.9"
              />
              <path
                d="M162 89 C124 58, 78 66, 80 92 C82 114, 126 106, 162 94 Z"
                fill="#b49770"
                opacity="0.34"
              />
              <path d="M156 82 C118 52, 72 58, 68 84" stroke="#fffef9" strokeWidth="2" opacity="0.85" />

              <path
                d="M192 85 C242 28, 314 42, 306 92 C298 138, 228 122, 192 97 Z"
                fill="url(#silkR)"
                stroke="#cbb38f"
                strokeWidth="0.9"
              />
              <path
                d="M198 89 C236 58, 282 66, 280 92 C278 114, 234 106, 198 94 Z"
                fill="#b49770"
                opacity="0.34"
              />
              <path d="M204 82 C242 52, 288 58, 292 84" stroke="#fffef9" strokeWidth="2" opacity="0.85" />
            </g>

            {/* Center Knot */}
            <rect
              x="164"
              y="76"
              width="32"
              height="34"
              rx="13"
              fill="url(#silkK)"
              stroke="#c8af8a"
              strokeWidth="1"
            />
            <path d="M172 82 Q180 79 188 82" stroke="#fffef9" strokeWidth="1.8" opacity="0.85" />
          </svg>
        </div>
      </div>

      {/* LAYER 2: Sculpted Ginkgo-Embossed Envelope & Bronze Wax Seal */}
      <div className={`envelope-shell${envOpened ? ' opening' : ''}${envGone ? ' gone' : ''}`}>
        {/* Dark champagne-bronze inner lining visible as top flap lifts */}
        <div className="env-inner-shadow" />

        {/* Left & Right Flaps */}
        <div className="env-flap-side left">
          <img src="/art/ginkgo-paper.png" alt="" className="ginkgo-img" />
        </div>
        <div className="env-flap-side right">
          <img src="/art/ginkgo-paper.png" alt="" className="ginkgo-img" />
        </div>

        {/* Bottom Pocket Flap */}
        <div className="env-flap-bottom">
          <img src="/art/ginkgo-paper.png" alt="" className="ginkgo-img" />
        </div>

        {/* Crisp diagonal envelope crease highlights */}
        <svg className="env-creases" viewBox="0 0 100 180" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="0" x2="50" y2="90" stroke="rgba(255,252,245,0.75)" strokeWidth="0.35" />
          <line x1="100" y1="0" x2="50" y2="90" stroke="rgba(255,252,245,0.75)" strokeWidth="0.35" />
          <line x1="0" y1="180" x2="50" y2="90" stroke="rgba(255,252,245,0.65)" strokeWidth="0.35" />
          <line x1="100" y1="180" x2="50" y2="90" stroke="rgba(255,252,245,0.65)" strokeWidth="0.35" />
        </svg>

        {/* Top Flap (lifts upward smoothly while keeping seal readable just like video!) */}
        <div className="env-flap-top-lift">
          <div className="env-flap-top-shape">
            <img src="/art/ginkgo-paper.png" alt="" className="ginkgo-img" />
          </div>
          <button
            type="button"
            className="wax-seal-trigger"
            onClick={startSequence}
            aria-label="Tap wax seal to open wedding invitation"
          >
            <img src="/art/wax-seal.png" alt="V & S Wax Seal" className="wax-seal-img" />
          </button>
        </div>

        {phase === 'sealed' && (
          <button type="button" className="tap-seal-label" onClick={startSequence}>
            Tap seal to open
          </button>
        )}
      </div>
    </div>
  )
}
