'use client'
import { useEffect, useRef } from 'react'

/**
 * Interactive real-flower garland toran that sways gently in the breeze
 * and responds with a soft, clearly visible pendulum swing when touched, swiped, or hovered.
 */
export default function SwayingToran({ src, className = '', style }) {
  const imgRef = useRef(null)
  const physRef = useRef({
    angle: 0,
    velAngle: 0,
    offsetX: 0,
    velX: 0,
    pointerActive: false,
    moved: false,
    startX: 0,
    lastX: 0,
    targetDragX: null,
    phase: Math.random() * Math.PI * 2,
  })

  useEffect(() => {
    let raf = 0
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = Math.min(0.036, (now - lastTime) / 1000)
      lastTime = now
      const p = physRef.current

      if (p.targetDragX !== null) {
        // Softly follow gentle horizontal finger/mouse drag without freezing
        const targetAngle = Math.max(-3.2, Math.min(3.2, -p.targetDragX * 0.48))
        p.velAngle += ((targetAngle - p.angle) * 42 - p.velAngle * 6.5) * dt
        p.velX += ((p.targetDragX - p.offsetX) * 42 - p.velX * 6.5) * dt
      } else {
        // Gentle temple breeze + smooth damped pendulum return
        const breezeAngle = Math.sin(now * 0.0013 + p.phase) * 0.65 + Math.sin(now * 0.0007) * 0.22
        const breezeX = Math.sin(now * 0.001 + p.phase) * 1.1
        p.velAngle += ((breezeAngle - p.angle) * 20 - p.velAngle * 2.4) * dt
        p.velX += ((breezeX - p.offsetX) * 22 - p.velX * 3.0) * dt
      }

      p.angle += p.velAngle * dt
      p.offsetX += p.velX * dt

      const el = imgRef.current
      if (el) {
        el.style.transform = `translate3d(${p.offsetX.toFixed(2)}px, 0, 0) rotate(${p.angle.toFixed(2)}deg) scale(1.018)`
      }
      raf = requestAnimationFrame(tick)
    }

    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [])

  const applySoftImpulse = (clientX, rect, strength = 1) => {
    const p = physRef.current
    const rel = rect.width ? (clientX - rect.left) / rect.width - 0.5 : 0
    const dir = rel >= 0 ? -1 : 1
    p.velAngle = Math.max(-16, Math.min(16, p.velAngle + dir * 11.5 * strength))
    p.velX = Math.max(-16, Math.min(16, p.velX - dir * 9 * strength))
  }

  const handlePointerDown = (e) => {
    const p = physRef.current
    p.pointerActive = true
    p.moved = false
    p.startX = e.clientX
    p.lastX = e.clientX
    p.targetDragX = null

    if (e.pointerType === 'touch') {
      applySoftImpulse(e.clientX, e.currentTarget.getBoundingClientRect(), 0.75)
    }
  }

  const handlePointerMove = (e) => {
    const p = physRef.current
    if (!p.pointerActive) {
      if (e.pointerType === 'mouse' && typeof e.movementX === 'number') {
        p.velAngle = Math.max(-11, Math.min(11, p.velAngle - e.movementX * 0.24))
        p.velX = Math.max(-13, Math.min(13, p.velX + e.movementX * 0.22))
      }
      return
    }
    const totalDx = e.clientX - p.startX
    if (Math.abs(totalDx) > 5) {
      p.moved = true
      p.targetDragX = Math.max(-6, Math.min(6, totalDx * 0.16))
    }
    p.lastX = e.clientX
  }

  const handlePointerUp = (e) => {
    const p = physRef.current
    if (!p.pointerActive) return
    const wasTap = !p.moved
    p.pointerActive = false
    p.targetDragX = null
    if (wasTap) {
      applySoftImpulse(e.clientX, e.currentTarget.getBoundingClientRect(), 1.0)
    }
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
      onPointerCancel={() => {
        physRef.current.pointerActive = false
        physRef.current.targetDragX = null
      }}
    />
  )
}
