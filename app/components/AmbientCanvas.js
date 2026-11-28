'use client'
import { useEffect, useRef } from 'react'

/**
 * High-performance digital / vector wedding flower flow canvas.
 * Renders procedural digital rose petals, golden marigold petals,
 * star jasmine blossoms, and floating golden shimmer motes.
 */
export default function AmbientCanvas({
  flowerShower = false,
  fullScreen = false,
  showBirdsAndMotes = true,
}) {
  const canvasRef = useRef(null)
  const showerRef = useRef(flowerShower)
  const skyRef = useRef(showBirdsAndMotes)
  const resetPetalsRef = useRef(null)
  showerRef.current = flowerShower
  skyRef.current = showBirdsAndMotes

  useEffect(() => {
    showerRef.current = flowerShower
    if (flowerShower && resetPetalsRef.current) {
      resetPetalsRef.current()
    }
  }, [flowerShower])

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

    // Golden ambient shimmer motes
    const motes = Array.from({ length: 18 }, (_, i) => ({
      x: Math.random(),
      y: Math.random(),
      r: 0.8 + (i % 3) * 0.55,
      vy: -(0.00018 + Math.random() * 0.00022),
      vx: (Math.random() - 0.5) * 0.00015,
      phase: Math.random() * Math.PI * 2,
    }))

    // Distant soaring birds for sky
    const birds = Array.from({ length: 4 }, (_, i) => ({
      x: 0.2 + i * 0.16,
      y: 0.28 + (i % 3) * 0.035,
      vx: (i % 2 === 0 ? 1 : -1) * (0.0002 + i * 0.00003),
      flapPhase: i * 1.3,
      scale: 0.75 + (i % 2) * 0.22,
    }))

    // Digital Procedural Flower Shower Particles
    const KINDS = ['rose', 'marigold', 'rose', 'jasmine', 'rose', 'marigold', 'rose']
    const count = fullScreen ? 42 : 26
    const petals = Array.from({ length: count }, (_, i) => {
      const kind = KINDS[i % KINDS.length]
      return {
        kind,
        x: 0.03 + Math.random() * 0.94,
        // Evenly spread across viewport from frame 1 so petals are visible immediately
        y: (i / count) * 1.1 - 0.08 + (Math.random() - 0.5) * 0.1,
        size:
          kind === 'rose'
            ? 18 + (i % 4) * 4
            : kind === 'marigold'
            ? 15 + (i % 3) * 3.5
            : 16 + (i % 3) * 3,
        // Graceful temple shower descent velocity
        vy: 0.0016 + Math.random() * 0.0014,
        swayFreq: 0.8 + Math.random() * 0.8,
        swayAmp: 0.0006 + Math.random() * 0.0005,
        rot: Math.random() * Math.PI * 2,
        vrot: (Math.random() - 0.5) * 0.024,
        flip: Math.random() * Math.PI * 2,
        vflip: 0.022 + Math.random() * 0.026,
        phase: Math.random() * Math.PI * 2,
        opacity: 0.85 + Math.random() * 0.14,
      }
    })

    resetPetalsRef.current = () => {
      for (let i = 0; i < petals.length; i++) {
        const p = petals[i]
        p.x = 0.03 + Math.random() * 0.94
        p.y = (i / petals.length) * 1.05 - 0.08 + (Math.random() - 0.5) * 0.1
        p.rot = Math.random() * Math.PI * 2
        p.flip = Math.random() * Math.PI * 2
      }
    }

    // Draw digital procedural rose petal
    const drawDigitalRosePetal = (size, tilt) => {
      const w = size * 0.75
      const h = size * 1.15
      const grad = ctx.createRadialGradient(-w * 0.2, -h * 0.15, 2, 0, 0, h * 0.8)
      grad.addColorStop(0, '#ffa8be')
      grad.addColorStop(0.42, '#f24d77')
      grad.addColorStop(0.85, '#bf1842')
      grad.addColorStop(1, '#8c0d2e')

      ctx.fillStyle = grad
      ctx.beginPath()
      // Heart/organic curled petal silhouette
      ctx.moveTo(0, -h * 0.45)
      ctx.bezierCurveTo(w * 0.75, -h * 0.45, w * 0.85, h * 0.1, 0, h * 0.5)
      ctx.bezierCurveTo(-w * 0.85, h * 0.1, -w * 0.75, -h * 0.45, 0, -h * 0.45)
      ctx.fill()

      // Subtle translucent golden edge highlight
      ctx.strokeStyle = 'rgba(255, 235, 185, 0.45)'
      ctx.lineWidth = 0.8
      ctx.stroke()
    }

    // Draw digital procedural marigold petal
    const drawDigitalMarigoldPetal = (size, tilt) => {
      const w = size * 0.55
      const h = size * 1.05
      const grad = ctx.createLinearGradient(0, -h * 0.5, 0, h * 0.5)
      grad.addColorStop(0, '#ffe57f')
      grad.addColorStop(0.45, '#ff9800')
      grad.addColorStop(0.85, '#e65100')
      grad.addColorStop(1, '#bf360c')

      ctx.fillStyle = grad
      ctx.beginPath()
      ctx.moveTo(0, -h * 0.48)
      ctx.bezierCurveTo(w * 0.7, -h * 0.2, w * 0.7, h * 0.35, 0, h * 0.48)
      ctx.bezierCurveTo(-w * 0.7, h * 0.35, -w * 0.7, -h * 0.2, 0, -h * 0.48)
      ctx.fill()
    }

    // Draw digital procedural white star jasmine blossom
    const drawDigitalJasmine = (size, tilt) => {
      const r = size * 0.46
      // Draw 5 radiating star petals
      ctx.fillStyle = 'rgba(255, 252, 244, 0.96)'
      for (let i = 0; i < 5; i++) {
        const ang = (i * Math.PI * 2) / 5
        ctx.save()
        ctx.rotate(ang)
        ctx.beginPath()
        ctx.ellipse(0, -r * 0.65, r * 0.32, r * 0.65, 0, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
      // Golden central pistil
      ctx.fillStyle = '#f6b830'
      ctx.beginPath()
      ctx.arc(0, 0, r * 0.22, 0, Math.PI * 2)
      ctx.fill()
    }

    let last = performance.now()
    const tick = (now) => {
      const dt = Math.min(34, now - last)
      last = now
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)

      // 1. Shimmer motes and soaring birds (hero canvas layer)
      if (skyRef.current) {
        for (const m of motes) {
          m.y += m.vy * dt * 0.06
          m.x += m.vx * dt * 0.06
          if (m.y < 0.08) m.y = 0.92
          if (m.x < 0.05) m.x = 0.95
          if (m.x > 0.95) m.x = 0.05
          const alpha = 0.22 + 0.34 * (0.5 + 0.5 * Math.sin(now * 0.002 + m.phase))
          ctx.fillStyle = `rgba(218, 175, 92, ${alpha.toFixed(3)})`
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

      // 2. High-Fidelity Digital Flower Flow Shower
      if (showerRef.current) {
        for (const p of petals) {
          p.y += p.vy * (dt / 16.6)
          // Natural sinusoidal horizontal wind drift
          p.x += Math.sin(now * 0.0016 * p.swayFreq + p.phase) * p.swayAmp * (dt / 16.6)
          p.rot += p.vrot * (dt / 16.6)
          p.flip += p.vflip * (dt / 16.6)

          // Recycle when petal falls past bottom of screen
          if (p.y > 1.05) {
            p.y = -0.05 - Math.random() * 0.1
            p.x = 0.04 + Math.random() * 0.92
          }

          if (p.y > -0.06) {
            const tilt = 0.45 + 0.55 * Math.cos(p.flip)
            ctx.save()
            ctx.translate(p.x * w, p.y * h)
            ctx.rotate(p.rot)
            ctx.scale(1, tilt)
            ctx.globalAlpha = p.opacity

            if (p.kind === 'rose') {
              drawDigitalRosePetal(p.size, tilt)
            } else if (p.kind === 'marigold') {
              drawDigitalMarigoldPetal(p.size, tilt)
            } else {
              drawDigitalJasmine(p.size, tilt)
            }

            ctx.restore()
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
