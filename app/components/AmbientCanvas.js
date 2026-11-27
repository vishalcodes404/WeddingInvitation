'use client'
import { useEffect, useRef } from 'react'

export default function AmbientCanvas({
  flowerShower = false,
  fullScreen = false,
  showBirdsAndMotes = true,
}) {
  const canvasRef = useRef(null)
  const showerRef = useRef(flowerShower)
  const skyRef = useRef(showBirdsAndMotes)
  showerRef.current = flowerShower
  skyRef.current = showBirdsAndMotes

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let raf = 0

    // Load real botanical flower PNG sprites for lifelike Flower Flow
    const spriteUrls = {
      rose: '/art/flow-rose.png',
      jasmine: '/art/flow-jasmine.png',
      marigold: '/art/flow-marigold.png',
      petal: '/art/flow-petal.png',
    }
    const sprites = {}
    Object.entries(spriteUrls).forEach(([k, url]) => {
      const img = new Image()
      img.src = url
      sprites[k] = img
    })

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.max(1, Math.floor(rect.width * dpr))
      canvas.height = Math.max(1, Math.floor(rect.height * dpr))
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
    }
    resize()
    window.addEventListener('resize', resize)

    const motes = Array.from({ length: 16 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + (i % 3) * 0.55,
      vy: -(0.00016 + Math.random() * 0.00022),
      vx: (Math.random() - 0.5) * 0.00014,
      phase: Math.random() * Math.PI * 2,
    }))

    const KINDS = ['petal', 'rose', 'jasmine', 'marigold', 'petal', 'jasmine']
    const blossoms = Array.from({ length: fullScreen ? 22 : 18 }, (_, i) => {
      const kind = KINDS[i % KINDS.length]
      return {
        kind,
        x: 0.06 + Math.random() * 0.88,
        y: -0.05 - Math.random() * 0.85,
        size: kind === 'petal' ? 14 + (i % 4) * 2.5 : kind === 'jasmine' ? 18 + (i % 3) * 2 : 19 + (i % 3) * 2.5,
        vy: 0.00042 + Math.random() * 0.00044,
        swayFreq: 0.65 + Math.random() * 0.75,
        swayAmp: 0.00028 + Math.random() * 0.00024,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.022,
        flip: Math.random() * Math.PI * 2,
        vflip: 0.018 + Math.random() * 0.022,
        phase: Math.random() * Math.PI * 2,
      }
    })

    const birds = Array.from({ length: 4 }, (_, i) => ({
      x: 0.2 + i * 0.16,
      y: 0.28 + (i % 3) * 0.035,
      vx: (i % 2 === 0 ? 1 : -1) * (0.0002 + i * 0.00003),
      flapPhase: i * 1.3,
      scale: 0.75 + (i % 2) * 0.22,
    }))

    const drawSpriteFlower = (p, timeNow) => {
      const img = sprites[p.kind]
      // Smooth 3D flutter scaling as flower tumbles
      const tilt = 0.62 + 0.38 * Math.cos(p.flip + timeNow * 0.0012)
      ctx.save()
      ctx.translate(p.x * canvas.clientWidth, p.y * canvas.clientHeight)
      ctx.rotate(p.rot)
      ctx.scale(1, tilt)
      ctx.globalAlpha = 0.88

      if (img && img.complete && img.naturalWidth > 0) {
        const aspect = img.naturalHeight / img.naturalWidth
        const drawW = p.size
        const drawH = drawW * aspect
        ctx.drawImage(img, -drawW / 2, -drawH / 2, drawW, drawH)
      } else {
        // Fallback organic rose petal while sprite loads on initial millisecond
        ctx.fillStyle = p.kind === 'jasmine' ? 'rgba(255,252,245,0.88)' : p.kind === 'marigold' ? 'rgba(235,142,28,0.82)' : 'rgba(226,110,148,0.78)'
        ctx.beginPath()
        ctx.ellipse(0, 0, p.size * 0.42, p.size * 0.28, 0, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.restore()
    }

    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(40, now - last)
      last = now
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      // 1. Soft gold shimmer motes & distant birds (hero layer only)
      if (skyRef.current) {
        for (const m of motes) {
          m.y += m.vy * dt * 0.06
          m.x += m.vx * dt * 0.06
          if (m.y < 0.08) m.y = 0.92
          if (m.x < 0.05) m.x = 0.95
          if (m.x > 0.95) m.x = 0.05
          const alpha = 0.2 + 0.32 * (0.5 + 0.5 * Math.sin(now * 0.002 + m.phase))
          ctx.fillStyle = `rgba(212, 168, 86, ${alpha.toFixed(3)})`
          ctx.beginPath()
          ctx.arc(m.x * w, m.y * h, m.r, 0, Math.PI * 2)
          ctx.fill()
        }

        ctx.strokeStyle = 'rgba(102, 72, 58, 0.42)'
        ctx.lineWidth = 1.1
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
      }

      // 2. Real falling flowers & rose petals (active when Flower Flow is ON)
      if (showerRef.current) {
        for (const p of blossoms) {
          p.y += p.vy * dt * 0.06
          p.x += Math.sin(now * 0.0011 * p.swayFreq + p.phase) * p.swayAmp
          p.rot += p.vrot
          p.flip += p.vflip
          if (p.y > 1.06) {
            p.y = -0.06 - Math.random() * 0.1
            p.x = 0.06 + Math.random() * 0.88
          }
          if (p.y > -0.08) {
            drawSpriteFlower(p, now)
          }
        }
      }

      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [fullScreen])

  return (
    <canvas
      ref={canvasRef}
      className={fullScreen ? 'ambient-canvas-global' : 'ambient-canvas'}
      aria-hidden="true"
    />
  )
}
