'use client'
import { useEffect, useRef } from 'react'

/**
 * Traditional brass temple bell (ghanti) with hanging brass chain.
 * Gently sways in the temple breeze.
 * Non-touchable: visitors cannot touch or move the bells.
 */
export default function SwayingBell({ side = 'left', className = '', style }) {
  const bellRef = useRef(null)
  const physRef = useRef({
    angle: 0,
    velAngle: 0,
    offsetX: 0,
    velX: 0,
    phase: side === 'left' ? 0 : Math.PI * 0.65,
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
        Math.sin(now * 0.0016 + p.phase) * 1.4 +
        Math.sin(now * 0.0009 + p.phase * 0.5) * 0.5
      const breezeX = Math.sin(now * 0.0014 + p.phase) * 1.2
      p.velAngle += ((breezeAngle - p.angle) * 18 - p.velAngle * 2.5) * dt
      p.velX += ((breezeX - p.offsetX) * 20 - p.velX * 3.0) * dt

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

  const bellSrc =
    side === 'left' ? '/art/venue-bell-left.webp' : '/art/venue-bell-right.webp'

  return (
    <div
      className={`swaying-bell-anchor non-touchable ${side} ${className}`}
      style={style}
      aria-hidden="true"
    >
      <div ref={bellRef} className="swaying-bell-pendulum">
        <img
          src={bellSrc}
          alt=""
          className="swaying-bell-img"
          draggable={false}
          loading="lazy"
          decoding="async"
        />
      </div>
    </div>
  )
}
