'use client'
import { useEffect, useRef } from 'react'

export default function AmbientCanvas({ showFountainSparkle }) {
  const canvasRef = useRef(null)
  const fountainRef = useRef(showFountainSparkle)
  fountainRef.current = showFountainSparkle

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    // Gold dust motes + rose petals + tiny gliding birds
    const motes = Array.from({ length: 22 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.9 + (i % 3) * 0.65,
      vy: -(0.00018 + Math.random() * 0.00025),
      vx: (Math.random() - 0.5) * 0.00015,
      phase: Math.random() * Math.PI * 2,
    }))

    const petals = Array.from({ length: 9 }, (_, i) => ({
      x: 0.15 + Math.random() * 0.7,
      y: Math.random() * 0.85,
      size: 3.5 + (i % 3) * 1.3,
      vy: 0.00035 + Math.random() * 0.00025,
      swayFreq: 0.8 + Math.random() * 0.7,
      rot: Math.random() * Math.PI * 2,
      vrot: (Math.random() - 0.5) * 0.025,
      phase: Math.random() * Math.PI * 2,
    }))

    const birds = Array.from({ length: 5 }, (_, i) => ({
      x: 0.2 + i * 0.14,
      y: 0.23 + (i % 3) * 0.045,
      vx: (i % 2 === 0 ? 1 : -1) * (0.00022 + i * 0.00003),
      flapPhase: i * 1.3,
      scale: 0.75 + (i % 2) * 0.25,
    }))

    const droplets = Array.from({ length: 14 }, () => ({
      x: 0.5 + (Math.random() - 0.5) * 0.08,
      y: 0.86,
      vy: -(0.0012 + Math.random() * 0.0014),
      vx: (Math.random() - 0.5) * 0.0006,
      life: Math.random(),
    }))

    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(40, now - last)
      last = now
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      // 1. Gold shimmer motes
      for (const m of motes) {
        m.y += m.vy * dt * 0.06
        m.x += m.vx * dt * 0.06
        if (m.y < 0.08) m.y = 0.92
        if (m.x < 0.05) m.x = 0.95
        if (m.x > 0.95) m.x = 0.05
        const alpha = 0.25 + 0.4 * (0.5 + 0.5 * Math.sin(now * 0.002 + m.phase))
        ctx.fillStyle = `rgba(212, 168, 86, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(m.x * w, m.y * h, m.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2. Drifting pink rose petals
      for (const p of petals) {
        p.y += p.vy * dt * 0.06
        p.x += Math.sin(now * 0.0012 * p.swayFreq + p.phase) * 0.00028
        p.rot += p.vrot
        if (p.y > 0.9) {
          p.y = 0.09
          p.x = 0.16 + Math.random() * 0.68
        }
        ctx.save()
        ctx.translate(p.x * w, p.y * h)
        ctx.rotate(p.rot)
        ctx.fillStyle = 'rgba(222, 88, 134, 0.45)'
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size, p.size * 0.58, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }

      // 3. Tiny graceful arch birds (matching video frames 3-6)
      ctx.strokeStyle = 'rgba(102, 72, 58, 0.48)'
      ctx.lineWidth = 1.15
      ctx.lineCap = 'round'
      for (const b of birds) {
        b.x += b.vx * dt * 0.06
        if (b.x > 0.86) b.x = 0.14
        if (b.x < 0.14) b.x = 0.86
        const bx = b.x * w
        const by = b.y * h + Math.sin(now * 0.0015 + b.flapPhase) * 3
        const wing = Math.sin(now * 0.008 + b.flapPhase) * 2.8 * b.scale
        const span = 4.2 * b.scale
        ctx.beginPath()
        ctx.moveTo(bx - span, by - wing)
        ctx.quadraticCurveTo(bx - span * 0.45, by - wing * 0.8 - 1.5, bx, by)
        ctx.quadraticCurveTo(bx + span * 0.45, by - wing * 0.8 - 1.5, bx + span, by - wing)
        ctx.stroke()
      }

      // 4. Fountain water sparkles when fountain is shown
      if (fountainRef.current) {
        for (const d of droplets) {
          d.life += 0.015
          d.x += d.vx
          d.y += d.vy
          d.vy += 0.000045
          if (d.life >= 1 || d.y > 0.91) {
            d.x = 0.5 + (Math.random() - 0.5) * 0.045
            d.y = 0.865
            d.vx = (Math.random() - 0.5) * 0.0008
            d.vy = -(0.001 + Math.random() * 0.0013)
            d.life = 0
          }
          const a = Math.sin(d.life * Math.PI) * 0.72
          ctx.fillStyle = `rgba(235, 250, 255, ${a.toFixed(3)})`
          ctx.beginPath()
          ctx.arc(d.x * w, d.y * h, 1.4, 0, Math.PI * 2)
          ctx.fill()
        }
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return <canvas ref={canvasRef} className="ambient-canvas" aria-hidden="true" />
}
