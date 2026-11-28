'use client'
import { useEffect, useRef } from 'react'

/**
 * Traditional hanging brass chain lamp (deepam)
 * Sways gently and ambiently in the temple breeze.
 * Non-interactive: visitor cannot touch or drag it.
 */
export default function SwayingLamp({ side = 'left', className = '', style }) {
  const lampRef = useRef(null)
  const physRef = useRef({
    angle: 0,
    velAngle: 0,
    offsetX: 0,
    velX: 0,
    phase: side === 'left' ? 0 : Math.PI * 0.75,
  })

  useEffect(() => {
    let raf = 0
    let lastTime = performance.now()

    const tick = (now) => {
      const dt = Math.min(0.036, (now - lastTime) / 1000)
      lastTime = now
      const p = physRef.current

      // Natural gentle ambient swaying in the temple breeze
      const breezeAngle =
        Math.sin(now * 0.0016 + p.phase) * 1.5 +
        Math.sin(now * 0.0009 + p.phase * 0.5) * 0.5
      const breezeX = Math.sin(now * 0.0014 + p.phase) * 1.8

      p.velAngle += ((breezeAngle - p.angle) * 16 - p.velAngle * 2.2) * dt
      p.velX += ((breezeX - p.offsetX) * 18 - p.velX * 2.6) * dt

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

  return (
    <div
      className={`swaying-lamp-anchor non-touchable ${side} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div ref={lampRef} className="swaying-lamp-pendulum">
        <img
          src="/art/hanging-lamp.webp"
          alt=""
          className="swaying-lamp-img"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
        {/* Warm flickering oil flame halo */}
        <span className="lamp-flame-glow" aria-hidden="true" />
      </div>
    </div>
  )
}
