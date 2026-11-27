'use client'
import { useEffect, useRef } from 'react'

/**
 * Interactive real-flower garland toran that sways gently in the temple breeze
 * and swings/moves smoothly with spring pendulum physics when tapped, hovered, or dragged.
 */
export default function SwayingToran({ src, className = '', style }) {
  const imgRef = useRef(null)
  const physRef = useRef({
    angle: 0,
    velAngle: 0,
    offsetX: 0,
    velX: 0,
    dragging: false,
    lastX: 0,
    dragX: 0,
    phase: Math.random() * Math.PI * 2,
  })

  useEffect(() => {
    let raf = 0
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = Math.min(0.04, (now - lastTime) / 1000)
      lastTime = now
      const p = physRef.current

      if (!p.dragging) {
        // Very gentle ambient breeze sway and soft spring return
        const breezeAngle = Math.sin(now * 0.0012 + p.phase) * 0.35 + Math.sin(now * 0.0006) * 0.12
        const breezeX = Math.sin(now * 0.001 + p.phase) * 0.8
        p.velAngle += ((breezeAngle - p.angle) * 32 - p.velAngle * 5.2) * dt
        p.velX += ((breezeX - p.offsetX) * 30 - p.velX * 5.4) * dt
        p.angle += p.velAngle * dt
        p.offsetX += p.velX * dt
      }

      const el = imgRef.current
      if (el) {
        el.style.transform = `translate3d(${p.offsetX.toFixed(2)}px, 0, 0) rotate(${p.angle.toFixed(2)}deg)`
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const handlePointerDown = (e) => {
    const p = physRef.current
    p.dragging = true
    p.lastX = e.clientX
    p.dragX = p.offsetX
    p.velAngle = 0
    p.velX = 0
    e.currentTarget.setPointerCapture?.(e.pointerId)
  }

  const handlePointerMove = (e) => {
    const p = physRef.current
    if (!p.dragging) {
      // Subtle hover nudge when cursor brushes across the flowers
      if (e.pointerType === 'mouse' && typeof e.movementX === 'number') {
        p.velAngle = Math.max(-6, Math.min(6, p.velAngle - e.movementX * 0.15))
        p.velX = Math.max(-10, Math.min(10, p.velX + e.movementX * 0.22))
      }
      return
    }
    const dx = e.clientX - p.lastX
    p.lastX = e.clientX
    p.dragX = Math.max(-7, Math.min(7, p.dragX + dx * 0.22))
    p.offsetX = p.dragX
    p.angle = Math.max(-1.8, Math.min(1.8, -p.dragX * 0.22))
    p.velX = Math.max(-14, Math.min(14, dx * 2.5))
    p.velAngle = Math.max(-7, Math.min(7, -dx * 0.45))
  }

  const handlePointerUp = () => {
    const p = physRef.current
    p.dragging = false
  }

  const handleClick = (e) => {
    // Gentle, small swing impulse on tap
    const p = physRef.current
    const rect = e.currentTarget.getBoundingClientRect()
    const rel = rect.width ? (e.clientX - rect.left) / rect.width - 0.5 : 0
    const dir = rel >= 0 ? -1 : 1
    p.velAngle += dir * 5.2
    p.velX += -dir * 8
  }

  return (
    <img
      ref={imgRef}
      src={src}
      alt=""
      className={`swaying-toran ${className}`.trim()}
      style={style}
      draggable={false}
      aria-hidden="true"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      onClick={handleClick}
    />
  )
}
