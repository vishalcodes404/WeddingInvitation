'use client'
import { useEffect, useRef } from 'react'

/**
 * Interactive traditional hanging brass chain lamp (kuthuvilakku/deepam)
 * that sways gently in the breeze and responds with a realistic pendulum swing
 * when touched, dragged, or hovered.
 */
export default function SwayingLamp({ side = 'left', className = '', style }) {
  const lampRef = useRef(null)
  const physRef = useRef({
    angle: 0,
    velAngle: 0,
    offsetX: 0,
    velX: 0,
    pointerActive: false,
    startX: 0,
    lastX: 0,
    targetDragX: null,
    phase: side === 'left' ? 0 : Math.PI * 0.75,
  })

  useEffect(() => {
    let raf = 0
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = Math.min(0.036, (now - lastTime) / 1000)
      lastTime = now
      const p = physRef.current

      if (p.targetDragX !== null) {
        // Follow finger/mouse drag
        const targetAngle = Math.max(-18, Math.min(18, p.targetDragX * 0.55))
        p.velAngle += ((targetAngle - p.angle) * 36 - p.velAngle * 6.0) * dt
        p.velX += ((p.targetDragX - p.offsetX) * 36 - p.velX * 6.0) * dt
      } else {
        // Natural gentle ambient swaying in the temple breeze
        const breezeAngle =
          Math.sin(now * 0.0016 + p.phase) * 1.6 +
          Math.sin(now * 0.0009 + p.phase * 0.5) * 0.6
        const breezeX = Math.sin(now * 0.0014 + p.phase) * 2.2
        p.velAngle += ((breezeAngle - p.angle) * 16 - p.velAngle * 2.2) * dt
        p.velX += ((breezeX - p.offsetX) * 18 - p.velX * 2.6) * dt
      }

      p.angle += p.velAngle * dt
      p.offsetX += p.velX * dt

      const el = lampRef.current
      if (el) {
        el.style.transform = `translate3d(${p.offsetX.toFixed(2)}px, 0, 0) rotate(${p.angle.toFixed(2)}deg)`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [side])

  // Nudge lamp into pendulum swing
  const nudge = (intensity = 14) => {
    const dir = side === 'left' ? 1 : -1
    physRef.current.velAngle += dir * intensity
    physRef.current.velX += dir * (intensity * 0.8)
  }

  const handlePointerDown = (e) => {
    const p = physRef.current
    p.pointerActive = true
    p.startX = e.clientX
    p.lastX = e.clientX
    p.targetDragX = 0
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}
  }

  const handlePointerMove = (e) => {
    const p = physRef.current
    if (!p.pointerActive) return
    const dx = e.clientX - p.startX
    p.targetDragX = Math.max(-28, Math.min(28, dx * 0.85))
    p.lastX = e.clientX
  }

  const handlePointerUp = () => {
    const p = physRef.current
    if (!p.pointerActive) return
    p.pointerActive = false
    p.targetDragX = null
    nudge(12)
  }

  return (
    <div
      className={`swaying-lamp-anchor ${side} ${className}`}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={`Interactive hanging brass lamp on ${side} side — tap or swipe to swing`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => nudge(10)}
      onClick={() => nudge(16)}
    >
      <div ref={lampRef} className="swaying-lamp-pendulum">
        <img
          src="/art/hanging-lamp.webp"
          alt="Traditional hanging brass oil lamp"
          className="swaying-lamp-img"
          draggable={false}
        />
        {/* Warm flickering oil flame halo */}
        <span className="lamp-flame-glow" aria-hidden="true" />
      </div>
    </div>
  )
}
