'use client'
import { useEffect, useRef, useState } from 'react'

export default function EnvelopeIntro({ onRevealStart, onComplete, onSkip }) {
  // sealed -> opening -> ribbon -> untying -> diamond -> fadeout -> done
  const [phase, setPhase] = useState('sealed')
  const timers = useRef([])
  const startedRef = useRef(false)

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  // ~11-second auto-playing physical invitation sequence matching the reference video
  useEffect(() => {
    startedRef.current = true
    timers.current.push(
      setTimeout(() => setPhase('opening'), 1600),   // 1.6s: flap lifts with wax seal
      setTimeout(() => setPhase('ribbon'), 3600),    // 3.6s: envelope glides away, floral lace + bow revealed
      setTimeout(() => setPhase('untying'), 6300),   // 6.3s: satin bow unties smoothly
      setTimeout(() => {
        setPhase('diamond')                          // 7.9s: ribbon & silk veil open in diamond split
        onRevealStart?.()
      }, 7900),
      setTimeout(() => setPhase('fadeout'), 9900),   // 9.9s: gentle cross-fade into final invitation
      setTimeout(() => {
        setPhase('done')
        onComplete?.()
      }, 11000)                                      // 11.0s: complete
    )
    return clearTimers
  }, [])

  const handleSkip = () => {
    clearTimers()
    setPhase('done')
    onSkip?.()
  }

  // Allow early tap on wax seal during closed state without breaking auto-sequence
  const handleTapSeal = () => {
    if (phase !== 'sealed') return
    clearTimers()
    setPhase('opening')
    timers.current.push(
      setTimeout(() => setPhase('ribbon'), 1900),
      setTimeout(() => setPhase('untying'), 4400),
      setTimeout(() => {
        setPhase('diamond')
        onRevealStart?.()
      }, 5900),
      setTimeout(() => setPhase('fadeout'), 7800),
      setTimeout(() => {
        setPhase('done')
        onComplete?.()
      }, 8800)
    )
  }

  if (phase === 'done') return null

  const envOpened = phase !== 'sealed'
  const envGone = ['ribbon', 'untying', 'diamond', 'fadeout'].includes(phase)
  const bowUntying = ['untying', 'diamond', 'fadeout'].includes(phase)
  const diamondOpen = ['diamond', 'fadeout'].includes(phase)
  const fadingOut = phase === 'fadeout'

  return (
    <div
      className={`intro-root${fadingOut ? ' fadeout' : ''}${diamondOpen ? ' revealing' : ''}`}
      role="dialog"
      aria-label="Wedding Invitation Opening Animation"
    >
      {/* Elegant Skip Intro Option */}
      <button type="button" className="skip-intro-btn" onClick={handleSkip}>
        Skip Intro
      </button>

      {/* LAYER 1: Pearlescent Floral Lace Frame + Diamond Silk Veil + Satin Bow */}
      <div className={`lace-stage${diamondOpen ? ' diamond-open' : ''}`}>
        <div className={`lace-frame-outer${diamondOpen ? ' opening' : ''}`}>
          <img src="/art/pearl-lace.png" alt="" className="lace-img" />
          <div className="lace-iridescent" />
        </div>

        <div className="veil-panel left">
          <div className="veil-fabric" />
          <div className="veil-pleat-ribbon" />
        </div>
        <div className="veil-panel right">
          <div className="veil-fabric" />
          <div className="veil-pleat-ribbon" />
        </div>

        {/* Champagne-Ivory Satin Ribbon & Bow */}
        <div className={`bow-overlay${bowUntying ? ' untying' : ''}${diamondOpen ? ' parted' : ''}`}>
          <svg
            className="bow-svg-full"
            viewBox="0 0 400 720"
            preserveAspectRatio="xMidYMid slice"
            fill="none"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="satinH" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#d8c3a5" stopOpacity="0.82" />
                <stop offset="18%" stopColor="#fffdf8" stopOpacity="0.95" />
                <stop offset="38%" stopColor="#e7d6be" stopOpacity="0.9" />
                <stop offset="56%" stopColor="#fffef9" stopOpacity="0.95" />
                <stop offset="78%" stopColor="#d5be9e" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#b89d79" stopOpacity="0.82" />
              </linearGradient>

              <linearGradient id="tailL" x1="0.8" y1="0" x2="0.1" y2="1">
                <stop offset="0%" stopColor="#fffdf9" stopOpacity="0.92" />
                <stop offset="35%" stopColor="#eadac3" stopOpacity="0.84" />
                <stop offset="72%" stopColor="#f9f2e6" stopOpacity="0.78" />
                <stop offset="100%" stopColor="#cdb695" stopOpacity="0.72" />
              </linearGradient>

              <linearGradient id="tailR" x1="0.2" y1="0" x2="0.9" y2="1">
                <stop offset="0%" stopColor="#fffdf9" stopOpacity="0.92" />
                <stop offset="35%" stopColor="#eadac3" stopOpacity="0.84" />
                <stop offset="72%" stopColor="#f9f2e6" stopOpacity="0.78" />
                <stop offset="100%" stopColor="#cdb695" stopOpacity="0.72" />
              </linearGradient>

              <linearGradient id="loopL" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#fffef9" stopOpacity="0.96" />
                <stop offset="45%" stopColor="#efe1cc" stopOpacity="0.94" />
                <stop offset="85%" stopColor="#d1ba99" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#b69a74" stopOpacity="0.9" />
              </linearGradient>

              <linearGradient id="loopR" x1="1" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#fffef9" stopOpacity="0.96" />
                <stop offset="45%" stopColor="#efe1cc" stopOpacity="0.94" />
                <stop offset="85%" stopColor="#d1ba99" stopOpacity="0.92" />
                <stop offset="100%" stopColor="#b69a74" stopOpacity="0.9" />
              </linearGradient>

              <radialGradient id="knotGrad" cx="42%" cy="32%" r="68%">
                <stop offset="0%" stopColor="#fffef9" />
                <stop offset="55%" stopColor="#ebdcc6" />
                <stop offset="100%" stopColor="#b89d78" />
              </radialGradient>

              <filter id="silkShadow" x="-12%" y="-12%" width="124%" height="124%">
                <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#5a4326" floodOpacity="0.24" />
              </filter>
            </defs>

            {/* Horizontal Pleated Silk Bands */}
            <g className="ribbon-bands" filter="url(#silkShadow)">
              <path d="M-10 318 Q95 326 184 344 L184 374 Q95 388 -10 398 Z" fill="url(#satinH)" />
              <path d="M410 318 Q305 326 216 344 L216 374 Q305 388 410 398 Z" fill="url(#satinH)" />
              <g stroke="#fffef9" strokeWidth="1.2" opacity="0.72">
                <path d="M-10 332 Q95 340 184 351" />
                <path d="M-10 356 Q95 358 184 360" />
                <path d="M-10 380 Q95 376 184 368" />
                <path d="M410 332 Q305 340 216 351" />
                <path d="M410 356 Q305 358 216 360" />
                <path d="M410 380 Q305 376 216 368" />
              </g>
              <g stroke="#a88c67" strokeWidth="0.9" opacity="0.52">
                <path d="M-10 344 Q95 348 184 356" />
                <path d="M-10 368 Q95 368 184 364" />
                <path d="M410 344 Q305 348 216 356" />
                <path d="M410 368 Q305 368 216 364" />
              </g>
            </g>

            {/* Long Flowing Diagonal Ribbon Tails */}
            <g className="bow-tails" filter="url(#silkShadow)">
              <path
                d="M188 370 C145 435, 76 530, -8 648 L36 692 C108 570, 158 465, 196 378 Z"
                fill="url(#tailL)"
              />
              <path
                d="M212 370 C255 435, 324 530, 408 648 L364 692 C292 570, 242 465, 204 378 Z"
                fill="url(#tailR)"
              />
              <path d="M185 382 C142 454, 84 548, 12 666" stroke="#fffef9" strokeWidth="1.8" opacity="0.65" />
              <path d="M215 382 C258 454, 316 548, 388 666" stroke="#fffef9" strokeWidth="1.8" opacity="0.65" />
              <path d="M192 382 C154 456, 102 552, 26 678" stroke="#b69b77" strokeWidth="1" opacity="0.45" />
              <path d="M208 382 C246 456, 298 552, 374 678" stroke="#b69b77" strokeWidth="1" opacity="0.45" />
            </g>

            {/* Softly Draped Champagne Satin Bow Loops */}
            <g className="bow-loops" filter="url(#silkShadow)">
              <path
                d="M186 346 C128 286, 56 298, 52 354 C48 408, 126 394, 186 364 Z"
                fill="url(#loopL)"
              />
              <path
                d="M178 352 C136 322, 84 330, 82 356 C80 380, 132 374, 178 360 Z"
                fill="#9e825e"
                opacity="0.34"
              />
              <path d="M174 342 C130 304, 76 310, 66 346" stroke="#fffef9" strokeWidth="2.2" opacity="0.82" />

              <path
                d="M214 346 C272 286, 344 298, 348 354 C352 408, 274 394, 214 364 Z"
                fill="url(#loopR)"
              />
              <path
                d="M222 352 C264 322, 316 330, 318 356 C320 380, 268 374, 222 360 Z"
                fill="#9e825e"
                opacity="0.34"
              />
              <path d="M226 342 C270 304, 324 310, 334 346" stroke="#fffef9" strokeWidth="2.2" opacity="0.82" />
            </g>

            {/* Ribbed Silk Center Knot */}
            <g className="bow-knot" filter="url(#silkShadow)">
              <rect x="180" y="336" width="40" height="44" rx="16" fill="url(#knotGrad)" />
              <path d="M188 340 V376 M196 338 V378 M204 338 V378 M212 340 V376" stroke="#b59a74" strokeWidth="1" opacity="0.45" />
              <path d="M190 342 Q200 338 210 342" stroke="#fffef9" strokeWidth="2" opacity="0.8" />
            </g>
          </svg>
        </div>
      </div>

      {/* LAYER 2: Sculpted Ivory-Champagne Envelope & Antique-Gold Wax Seal */}
      <div className={`envelope-shell${envOpened ? ' opening' : ''}${envGone ? ' gone' : ''}`}>
        <div className="env-inner-shadow" />

        <div className="env-flap-side left">
          <img src="/art/ginkgo-paper.png" alt="" className="ginkgo-img" />
        </div>
        <div className="env-flap-side right">
          <img src="/art/ginkgo-paper.png" alt="" className="ginkgo-img" />
        </div>
        <div className="env-flap-bottom">
          <img src="/art/ginkgo-paper.png" alt="" className="ginkgo-img" />
        </div>

        <svg className="env-creases" viewBox="0 0 100 180" preserveAspectRatio="none" aria-hidden="true">
          <line x1="0" y1="0" x2="50" y2="90" stroke="rgba(255,252,245,0.75)" strokeWidth="0.35" />
          <line x1="100" y1="0" x2="50" y2="90" stroke="rgba(255,252,245,0.75)" strokeWidth="0.35" />
          <line x1="0" y1="180" x2="50" y2="90" stroke="rgba(255,252,245,0.65)" strokeWidth="0.35" />
          <line x1="100" y1="180" x2="50" y2="90" stroke="rgba(255,252,245,0.65)" strokeWidth="0.35" />
        </svg>

        <div className="env-flap-top-lift">
          <div className="env-flap-top-shape">
            <img src="/art/ginkgo-paper.png" alt="" className="ginkgo-img" />
          </div>
          <button
            type="button"
            className="wax-seal-trigger"
            onClick={handleTapSeal}
            aria-label="Wedding Wax Seal V & S"
          >
            <img src="/art/wax-seal.png" alt="V & S Wax Seal" className="wax-seal-img" />
          </button>
        </div>
      </div>
    </div>
  )
}
