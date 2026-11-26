'use client'
import { useEffect, useRef, useState } from 'react'

const TARGET = new Date('2026-12-13T11:51:00+05:30').getTime()

function getTimeLeft() {
  const diff = Math.max(0, TARGET - Date.now())
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

export default function CountdownScratchSection() {
  const [time, setTime] = useState(getTimeLeft)
  const [revealed, setRevealed] = useState(false)
  const canvasRef = useRef(null)
  const drawingRef = useRef(false)
  const checkTickRef = useRef(0)

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  // Paint metallic champagne-gold scratch foil onto canvas
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    const w = (canvas.width = 480)
    const h = (canvas.height = 560)

    const grad = ctx.createLinearGradient(0, 0, w, h)
    grad.addColorStop(0, '#e5cc8e')
    grad.addColorStop(0.35, '#c29947')
    grad.addColorStop(0.65, '#f1dca3')
    grad.addColorStop(1, '#ab8132')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, w, h)

    // Subtle brushed foil sheen
    ctx.fillStyle = 'rgba(255, 255, 255, 0.14)'
    for (let i = -h; i < w + h; i += 22) {
      ctx.fillRect(i, 0, 6, h)
    }

    // Center prompt on foil
    ctx.fillStyle = '#4a2a1f'
    ctx.textAlign = 'center'
    ctx.font = '600 22px "Cinzel", serif'
    ctx.fillText('SCRATCH TO REVEAL', w / 2, h / 2 - 14)
    ctx.font = 'italic 20px "Cormorant Garamond", serif'
    ctx.fillText('Our Special Moment & Date', w / 2, h / 2 + 18)
  }, [])

  const scratchAt = (clientX, clientY) => {
    if (revealed) return
    const canvas = canvasRef.current
    if (!canvas) return
    const rect = canvas.getBoundingClientRect()
    const x = ((clientX - rect.left) / rect.width) * canvas.width
    const y = ((clientY - rect.top) / rect.height) * canvas.height
    const ctx = canvas.getContext('2d', { willReadFrequently: true })

    ctx.globalCompositeOperation = 'destination-out'
    ctx.beginPath()
    ctx.arc(x, y, 36, 0, Math.PI * 2)
    ctx.fill()

    checkTickRef.current += 1
    if (checkTickRef.current % 8 === 0) {
      const data = ctx.getImageData(0, 0, canvas.width, canvas.height).data
      let cleared = 0
      const step = 16
      for (let i = 3; i < data.length; i += 4 * step) {
        if (data[i] < 40) cleared += 1
      }
      const total = data.length / (4 * step)
      if (cleared / total > 0.36) {
        setRevealed(true)
      }
    }
  }

  const cards = [
    { label: 'Days', val: String(time.days) },
    { label: 'Hours', val: String(time.hours).padStart(2, '0') },
    { label: 'Minutes', val: String(time.minutes).padStart(2, '0') },
    { label: 'Seconds', val: String(time.seconds).padStart(2, '0') },
  ]

  return (
    <section id="countdown-scratch" className="scroll-sec warm-alt-sec">
      <div className="sec-head reveal">
        <p className="eyebrow">SAVE THE DATE</p>
        <h2 className="sec-title-italic">Counting Down</h2>
        <div className="short-gold-line" />
      </div>

      {/* Live 4-Box Countdown */}
      <div className="countdown-grid reveal">
        {cards.map((c) => (
          <div key={c.label} className="cd-box">
            <span className="cd-num">{c.val}</span>
            <span className="cd-lbl">{c.label}</span>
          </div>
        ))}
      </div>

      {/* Interactive Scratch Card revealing Couple Photo (IMG_8945.JPG.jpeg) */}
      <div className="scratch-wrap reveal">
        <div className="scratch-frame">
          <img src="/art/couple-photo.jpg" alt="Vysakh and Sandra" className="couple-photo-img" />
          <div className="photo-caption-bar">
            <p className="cap-date">13 • DECEMBER • 2026</p>
            <p className="cap-sub">Sunday • 1202 Vrischikam 27</p>
          </div>

          <canvas
            ref={canvasRef}
            className={`scratch-canvas${revealed ? ' cleared' : ''}`}
            onPointerDown={(e) => {
              drawingRef.current = true
              e.currentTarget.setPointerCapture(e.pointerId)
              scratchAt(e.clientX, e.clientY)
            }}
            onPointerMove={(e) => {
              if (drawingRef.current) scratchAt(e.clientX, e.clientY)
            }}
            onPointerUp={() => {
              drawingRef.current = false
            }}
            onPointerCancel={() => {
              drawingRef.current = false
            }}
          />
        </div>

        {!revealed && (
          <button type="button" className="tap-reveal-link" onClick={() => setRevealed(true)}>
            Tap to reveal photo &amp; date
          </button>
        )}
      </div>
    </section>
  )
}
