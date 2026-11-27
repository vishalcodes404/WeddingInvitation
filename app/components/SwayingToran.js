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
        // Gentle harmonic spring back to rest with soft natural wind sway
        const breezeAngle = Math.sin(now * 0.0014 + p.phase) * 0.85 + Math.sin(now * 0.0007) * 0.35
        const breezeX = Math.sin(now * 0.0011 + p.phase) * 2.2
        p.velAngle += ((breezeAngle - p.angle) * 26 - p.velAngle * 3.8) * dt
        p.velX += ((breezeX - p.offsetX) * 24 - p.velX * 4.2) * dt
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
      // Gentle hover nudge when cursor sweeps across the flowers
      if (e.pointerType === 'mouse' && typeof e.movementX === 'number') {
        p.velAngle = Math.max(-22, Math.min(22, p.velAngle - e.movementX * 0.45))
        p.velX = Math.max(-45, Math.min(45, p.velX + e.movementX * 0.7))
      }
      return
    }
    const dx = e.clientX - p.lastX
    p.lastX = e.clientX
    p.dragX = Math.max(-28, Math.min(28, p.dragX + dx * 0.65))
    p.offsetX = p.dragX
    p.angle = Math.max(-6.5, Math.min(6.5, -p.dragX * 0.19))
    p.velX = dx * 8
    p.velAngle = -dx * 1.4
  }

  const handlePointerUp = () => {
    const p = physRef.current
    p.dragging = false
  }

  const handleClick = (e) => {
    // Tactile celebratory swing impulse on simple tap
    const p = physRef.current
    const rect = e.currentTarget.getBoundingClientRect()
    const rel = rect.width ? (e.clientX - rect.left) / rect.width - 0.5 : 0
    const dir = rel >= 0 ? -1 : 1
    p.velAngle += dir * 16
    p.velX += -dir * 28
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
