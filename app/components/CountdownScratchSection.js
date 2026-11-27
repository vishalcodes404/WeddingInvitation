'use client'
import { useEffect, useRef, useState } from 'react'

const TARGET = new Date('2026-12-13T11:51:00+05:30').getTime()

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

/* 20 miniature alternating saffron & gold marigolds along the top hanging wire */
const GARLAND_MARIGOLDS = Array.from({ length: 19 }, (_, i) => {
  const t = (i + 0.5) / 19
  const x = 18 + t * 424
  // Subtle natural catenary sag across the span
  const y = 11 + Math.sin(t * Math.PI) * 14
  return {
    x,
    y,
    r: i % 2 === 0 ? 7.2 : 6.2,
    fill: i % 2 === 0 ? '#e87817' : '#f3ae24',
    core: i % 2 === 0 ? '#f8a52c' : '#fbd45b',
  }
})

export default function CountdownScratchSection() {
  const [time, setTime] = useState(getTimeLeft)
  const [revealed, setRevealed] = useState(false)
  const canvasRef = useRef(null)
  const drawingRef = useRef(false)
  const checkTickRef = useRef(0)

  // Real pendulum-spring physics state for the 4 movable hanging lamps
  const lampRefs = useRef([])
  const physRef = useRef([
    { angle: -1.8, vel: 0.4, dragAnchorX: null },
    { angle: 2.1, vel: -0.35, dragAnchorX: null },
    { angle: -1.4, vel: 0.5, dragAnchorX: null },
    { angle: 1.9, vel: -0.45, dragAnchorX: null },
  ])

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  // Real-time pendulum physics loop: continuous evening breeze + interactive drag/push swing
  useEffect(() => {
    let raf = 0
    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(0.032, (now - last) / 1000)
      last = now
      const tSec = now * 0.001

      for (let i = 0; i < 4; i++) {
        const p = physRef.current[i]
        const el = lampRefs.current[i]
        if (!el) continue

        if (p.dragAnchorX === null) {
          // Restoring pendulum force + gentle multi-harmonic breeze + natural damping
          const wind =
            Math.sin(tSec * (0.95 + i * 0.14) + i * 1.7) * 4.5 +
            Math.sin(tSec * 2.1 + i * 0.9) * 1.6
          const spring = -14.0 * p.angle
          const acc = spring + wind
          p.vel = (p.vel + acc * dt) * Math.exp(-1.15 * dt)
          p.angle += p.vel * dt
          // Clamp extreme excursions gently
          if (p.angle > 24) { p.angle = 24; p.vel *= -0.4 }
          if (p.angle < -24) { p.angle = -24; p.vel *= -0.4 }
        }

        el.style.transform = `rotate(${p.angle.toFixed(2)}deg)`
      }
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const nudgeLamp = (idx, impulse = 14) => {
    const p = physRef.current[idx]
    if (!p) return
    p.vel += (p.angle >= 0 ? -1 : 1) * impulse
  }

  const onLampPointerDown = (idx, e) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    physRef.current[idx].dragAnchorX = e.clientX
  }

  const onLampPointerMove = (idx, e) => {
    const p = physRef.current[idx]
    if (p.dragAnchorX !== null) {
      const dx = e.clientX - p.dragAnchorX
      // Pulling a hanging bottom-weighted lamp right tilts its bottom right (negative CSS rotate)
      const targetAngle = Math.max(-22, Math.min(22, -dx * 0.24))
      p.vel = (targetAngle - p.angle) * 14
      p.angle = targetAngle
    }
  }

  const onLampPointerUp = (idx) => {
    const p = physRef.current[idx]
    if (p.dragAnchorX !== null) {
      p.dragAnchorX = null
    }
  }

  // Paint metallic champagne-gold scratch foil onto canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    const w = (canvas.width = 480)
    const h = (canvas.height = 560)

    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, '#e5cc8e')
    grad.addColorStop(0.35, '#c29947')
    grad.addColorStop(0.65, '#f1dca3')
    grad.addColorStop(1, '#ab8132')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    ctx.fillStyle = 'rgba(255, 255, 255, 0.14)'
    for (let i = -h; i < w + h; i += 22) {
      ctx.fillRect(i, 0, 6, h)
    }

    ctx.fillStyle = '#4a2a1f'
    ctx.textAlign = 'center'
    ctx.font = '600 22px "Cinzel", serif'
    ctx.fillText('SCRATCH TO REVEAL', w / 2, h / 2 - 14)
    ctx.font = 'italic 20px "Cormorant Garamond", serif'
    ctx.fillText('Our Special Moment & Date', w / 2, h / 2 + 18)
  }, [])

  const scratchAt = (clientX, clientY) => {
    if (revealed) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * canvas.width
    const y = ((clientY - rect.top) / rect.height) * canvas.height
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 36, 0, Math.PI * 2)
    ctx.fill()

    checkTickRef.current += 1
    if (checkTickRef.current % 8 === 0) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      let cleared = 0
      const step = 16
      for (let i = 3; i < data.length; i += 4 * step) {
        if (data[i] < 40) cleared += 1
      }
      const total = data.length / (4 * step)
      if (cleared / total > 0.36) {
        setRevealed(true)
      }
    }
  }

  // Matches Reference Image 1 staggered vertical cord drop layout
  const lanterns = [
    { label: 'DAYS', val: String(time.days), drop: 20 },
    { label: 'HOURS', val: String(time.hours).padStart(2, '0'), drop: 48 },
    { label: 'MINS', val: String(time.minutes).padStart(2, '0'), drop: 26 },
    { label: 'SECS', val: String(time.seconds).padStart(2, '0'), drop: 54 },
  ]

  return (
    <section id="countdown-scratch" className="scroll-sec warm-alt-sec">
      <div className="sec-head reveal" style={{ marginBottom: 16 }}>
        <p className="eyebrow">SAVE THE DATE</p>
        <h2 className="sec-title-italic">Counting Down</h2>
        <div className="short-gold-line" />
      </div>

      {/* Interactive Twilight Temple Rooftop + 4 Movable Swinging Illuminated Lamps */}
      <div className="lantern-cd-stage reveal">
        <img
          src="/art/twilight-bg.jpg"
          alt="Twilight temple balcony with glowing oil lamps"
          className="lantern-cd-bg"
        />
        <div className="lantern-sky-vignette" aria-hidden="true" />

        {/* Subtle flickering oil-lamp glow points along the sandstone parapet */}
        <div className="parapet-flames" aria-hidden="true">
          {[14, 29, 44, 59, 74, 88].map((leftPct, i) => (
            <span
              key={leftPct}
              className="diya-glint"
              style={{ left: `${leftPct}%`, animationDelay: `${i * 0.35}s` }}
            />
          ))}
        </div>

        {/* Continuous Marigold-Beaded Top Wire */}
        <svg className="marigold-wire-svg" viewBox="0 0 460 40" preserveAspectRatio="none" aria-hidden="true">
          <path
            d="M 8 11 Q 230 35 452 11"
            stroke="#d9b25d"
            strokeWidth="1.6"
            fill="none"
            opacity="0.9"
          />
          {GARLAND_MARIGOLDS.map((m, i) => (
            <g key={i}>
              <circle cx={m.x} cy={m.y} r={m.r} fill={m.fill} />
              <circle cx={m.x} cy={m.y} r={m.r * 0.56} fill={m.core} />
              <circle cx={m.x - 1} cy={m.y - 1} r={m.r * 0.22} fill="#fff3be" opacity="0.7" />
            </g>
          ))}
        </svg>

        {/* Four Movable Swinging Hexagonal Festive Lamps */}
        <div className="lanterns-row">
          {lanterns.map((item, idx) => (
            <div
              key={item.label}
              className="lantern-slot"
            >
              <div
                ref={(el) => { lampRefs.current[idx] = el }}
                className="lantern-pendulum"
                role="slider"
                aria-label={`${item.val} ${item.label} — drag or tap to swing lamp`}
                aria-valuetext={`${item.val} ${item.label}`}
                tabIndex={0}
                onPointerDown={(e) => onLampPointerDown(idx, e)}
                onPointerMove={(e) => onLampPointerMove(idx, e)}
                onPointerUp={() => onLampPointerUp(idx)}
                onPointerCancel={() => onLampPointerUp(idx)}
                onMouseEnter={() => nudgeLamp(idx, 10)}
                onClick={() => nudgeLamp(idx, 18)}
              >
                <div className="lantern-cord" style={{ height: `${item.drop}px` }} />
                <div className="lantern-body-wrap">
                  <img
                    src="/art/lantern-sprite.png"
                    alt=""
                    className="lantern-sprite-img"
                    draggable={false}
                  />
                  {/* Soft breathing inner candle aura behind number */}
                  <span
                    className="lantern-candle-aura"
                    style={{ animationDelay: `${idx * 0.4}s` }}
                    aria-hidden="true"
                  />
                  {/* Live countdown figure inside glowing parchment panel */}
                  <div className="lantern-readout">
                    <span className="lantern-num">{item.val}</span>
                    <span className="lantern-unit">{item.label}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Tiny subtle fluttering butterfly accent */}
        <span className="twilight-butterfly" aria-hidden="true">🦋</span>

        <p className="lantern-interact-hint">SWAYING LIVE &bull; TAP OR DRAG LAMPS</p>
      </div>

      {/* Interactive Scratch Card revealing Couple Photo (IMG_8945.JPG.jpeg) */}
      <div className="scratch-wrap reveal" style={{ marginTop: 26 }}>
        <div className="scratch-frame">
          <img src="/art/couple-photo.jpg" alt="Vysakh and Sandra" className="couple-photo-img" />
          <div className="photo-caption-bar">
            <p className="cap-date">13 &bull; DECEMBER &bull; 2026</p>
            <p className="cap-sub">Sunday &bull; 1202 Vrischikam 27</p>
          </div>

          <canvas
            ref={canvasRef}
            className={`scratch-canvas${revealed ? ' cleared' : ''}`}
            onPointerDown={(e) => {
              drawingRef.current = true
              e.currentTarget.setPointerCapture(e.pointerId)
              scratchAt(e.clientX, e.clientY)
            }}
            onPointerMove={(e) => {
              if (drawingRef.current) scratchAt(e.clientX, e.clientY)
            }}
            onPointerUp={() => {
              drawingRef.current = false
            }}
            onPointerCancel={() => {
              drawingRef.current = false
            }}
          />
        </div>

        {!revealed && (
          <button type="button" className="tap-reveal-link" onClick={() => setRevealed(true)}>
            Tap to reveal photo &amp; date
          </button>
        )}
      </div>
    </section>
  )
}
