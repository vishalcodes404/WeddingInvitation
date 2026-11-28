'use client'
import { useEffect, useRef } from 'react'

/**
 * Interactive traditional brass temple bell (ghanti)
 * for the sculpted Koburam Venues frames.
 * Sways naturally in the breeze and swings with realistic pendulum physics
 * when tapped, touched, dragged, or hovered by visitors.
 */
export default function SwayingBell({ side = 'left', className = '', style }) {
  const bellRef = useRef(null)
  const physRef = useRef({
    angle: 0,
    velAngle: 0,
    offsetX: 0,
    velX: 0,
    pointerActive: false,
    startX: 0,
    targetDragX: null,
    phase: side === 'left' ? 0 : Math.PI * 0.65,
  })

  useEffect(() => {
    let raf = 0
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = Math.min(0.036, (now - lastTime) / 1000)
      lastTime = now
      const p = physRef.current

      if (p.targetDragX !== null) {
        // Drag following finger / cursor
        const targetAngle = Math.max(-24, Math.min(24, p.targetDragX * 0.85))
        p.velAngle += ((targetAngle - p.angle) * 45 - p.velAngle * 7.0) * dt
        p.velX += ((p.targetDragX - p.offsetX) * 45 - p.velX * 7.0) * dt
      } else {
        // Ambient breeze sway + spring pendulum damping back to rest
        const breezeAngle = Math.sin(now * 0.002 + p.phase) * 1.8
        const breezeX = Math.sin(now * 0.0018 + p.phase) * 1.5
        p.velAngle += ((breezeAngle - p.angle) * 22 - p.velAngle * 2.8) * dt
        p.velX += ((breezeX - p.offsetX) * 24 - p.velX * 3.2) * dt
      }

      p.angle += p.velAngle * dt
      p.offsetX += p.velX * dt

      const el = bellRef.current
      if (el) {
        el.style.transform = `translate3d(${p.offsetX.toFixed(2)}px, 0, 0) rotate(${p.angle.toFixed(2)}deg)`
      }

      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [side])

  // Nudge the bell into a lively ringing swing
  const ring = (intensity = 18) => {
    const dir = side === 'left' ? 1 : -1
    physRef.current.velAngle += dir * intensity
    physRef.current.velX += dir * (intensity * 0.65)
  }

  const handlePointerDown = (e) => {
    e.stopPropagation()
    const p = physRef.current
    p.pointerActive = true
    p.startX = e.clientX
    p.targetDragX = 0
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {}
  }

  const handlePointerMove = (e) => {
    const p = physRef.current
    if (!p.pointerActive) return
    const dx = e.clientX - p.startX
    p.targetDragX = Math.max(-32, Math.min(32, dx * 0.9))
  }

  const handlePointerUp = (e) => {
    const p = physRef.current
    if (!p.pointerActive) return
    p.pointerActive = false
    p.targetDragX = null
    ring(16)
  }

  const bellSrc =
    side === 'left' ? '/art/venue-bell-left.webp' : '/art/venue-bell-right.webp'

  return (
    <div
      className={`swaying-bell-anchor ${side} ${className}`}
      style={style}
      role="button"
      tabIndex={0}
      aria-label={`Interactive hanging brass bell on ${side} side — tap or swipe to swing`}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onMouseEnter={() => ring(12)}
      onClick={() => ring(20)}
    >
      <div ref={bellRef} className="swaying-bell-pendulum">
        <img
          src={bellSrc}
          alt="Traditional brass temple bell"
          className="swaying-bell-img"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}
