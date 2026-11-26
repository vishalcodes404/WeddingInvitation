'use client'
import { useEffect, useRef } from 'react'

export default function AmbientCanvas({ showFountainSparkle, flowerShower }) {
  const canvasRef = useRef(null)
  const fountainRef = useRef(showFountainSparkle)
  const showerRef = useRef(flowerShower)
  fountainRef.current = showFountainSparkle
  showerRef.current = flowerShower

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

    const motes = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + (i % 3) * 0.55,
      vy: -(0.00016 + Math.random() * 0.00022),
      vx: (Math.random() - 0.5) * 0.00014,
      phase: Math.random() * Math.PI * 2,
    }))

    // Natural multi-petal flowers & rose petals drifting from the floral arch
    const FLOWERS = [
      { kind: 'rosePetal', color: 'rgba(218, 66, 118, 0.72)' },
      { kind: 'rosePetal', color: 'rgba(238, 126, 162, 0.74)' },
      { kind: 'blossom', color: 'rgba(244, 152, 182, 0.82)', center: '#f2c96b' },
      { kind: 'blossom', color: 'rgba(255, 250, 238, 0.88)', center: '#e6b85c' },
      { kind: 'rosePetal', color: 'rgba(246, 186, 198, 0.72)' },
      { kind: 'leaf', color: 'rgba(96, 146, 70, 0.65)' },
    ]

    const petals = Array.from({ length: 24 }, (_, i) => {
      const f = FLOWERS[i % FLOWERS.length]
      return {
        ...f,
        x: 0.1 + Math.random() * 0.8,
        y: -0.08 - Math.random() * 0.55, // start above arch so they flow in naturally
        size: f.kind === 'blossom' ? 5.2 + (i % 3) * 1.1 : 4.2 + (i % 3) * 1.2,
        vy: 0.00045 + Math.random() * 0.00042,
        swayFreq: 0.7 + Math.random() * 0.8,
        swayAmp: 0.00032 + Math.random() * 0.00028,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.022,
        phase: Math.random() * Math.PI * 2,
      }
    })

    const birds = Array.from({ length: 5 }, (_, i) => ({
      x: 0.2 + i * 0.14,
      y: 0.21 + (i % 3) * 0.04,
      vx: (i % 2 === 0 ? 1 : -1) * (0.00022 + i * 0.00003),
      flapPhase: i * 1.3,
      scale: 0.75 + (i % 2) * 0.25,
    }))

    const drawFlower = (p) => {
      if (p.kind === 'blossom') {
        ctx.fillStyle = p.color
        for (let k = 0; k < 5; k++) {
          const a = (k * Math.PI * 2) / 5
          ctx.beginPath()
          ctx.ellipse(
            Math.cos(a) * p.size * 0.55,
            Math.sin(a) * p.size * 0.55,
            p.size * 0.45,
            p.size * 0.3,
            a,
            0,
            Math.PI * 2
          )
          ctx.fill()
        }
        ctx.fillStyle = p.center
        ctx.beginPath()
        ctx.arc(0, 0, p.size * 0.24, 0, Math.PI * 2)
        ctx.fill()
      } else if (p.kind === 'leaf') {
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size * 1.1, p.size * 0.42, 0, 0, Math.PI * 2)
        ctx.fill()
      } else {
        // Curved organic rose petal
        ctx.fillStyle = p.color
        ctx.beginPath()
        ctx.moveTo(0, -p.size * 0.65)
        ctx.bezierCurveTo(p.size * 0.85, -p.size * 0.4, p.size * 0.75, p.size * 0.65, 0, p.size * 0.65)
        ctx.bezierCurveTo(-p.size * 0.75, p.size * 0.65, -p.size * 0.85, -p.size * 0.4, 0, -p.size * 0.65)
        ctx.fill()
      }
    }

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
        const alpha = 0.22 + 0.35 * (0.5 + 0.5 * Math.sin(now * 0.002 + m.phase))
        ctx.fillStyle = `rgba(212, 168, 86, ${alpha.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(m.x * w, m.y * h, m.r, 0, Math.PI * 2)
        ctx.fill()
      }

      // 2. Natural flowing flowers & petals (active once home invitation opens)
      if (showerRef.current) {
        for (const p of petals) {
          p.y += p.vy * dt * 0.06
          p.x += Math.sin(now * 0.0012 * p.swayFreq + p.phase) * p.swayAmp
          p.rot += p.vrot
          if (p.y > 0.96) {
            p.y = 0.06 + Math.random() * 0.08
            p.x = 0.12 + Math.random() * 0.76
          }
          if (p.y > 0.04) {
            ctx.save()
            ctx.translate(p.x * w, p.y * h)
            ctx.rotate(p.rot)
            drawFlower(p)
            ctx.restore()
          }
        }
      }

      // 3. Tiny graceful arch birds
      ctx.strokeStyle = 'rgba(102, 72, 58, 0.46)'
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
