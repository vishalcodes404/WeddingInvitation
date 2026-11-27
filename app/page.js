'use client'
import { useEffect, useRef, useState } from 'react'
import EnvelopeIntro from './components/EnvelopeIntro'
import HeroScrollSection from './components/HeroScrollSection'
import MeetCoupleSection from './components/MeetCoupleSection'
import CountdownScratchSection from './components/CountdownScratchSection'
import VenuesSection from './components/VenuesSection'
import ThankYouSection from './components/ThankYouSection'

const D = {
  groom: 'Vysakh',
  bride: 'Sandra',
  groomParents: 'S/O MR. BAIJU S. & MRS. RADHA BAIJU',
  groomHome: 'Kandathusserry House, Narakathara P.O., Kavalam, Alappuzha',
  brideParents: 'D/O MR. PRAMOD T.M. & MRS. SUDHA PRAMOD',
  brideHome: 'Therattukunnumpuram House, Parampuzha P.O., Kottayam',
  weekday: 'Sunday',
  month: 'DEC',
  day: '13',
  year: '2026',
  malayalam: '1202 Vrischikam 27',
  muhurtham: '11:51 AM – 12:15 PM',
  venue: 'Subramanya Swamy Temple',
  place: 'Thiruvanchoor',
  templeMap:
    'https://www.google.com/maps/search/?api=1&query=Subramanya+Swamy+Temple+Thiruvanchoor+Kottayam',
  residenceMap:
    'https://www.google.com/maps/search/?api=1&query=Narakathara+Kavalam+Alappuzha+Kerala',
  reception: '6:00 PM – 10:00 PM',
  partyLeaves: '10:00 AM',
  sharing: ['Reshma & Rajesh', 'Arun & Amrutha', 'Adarsh & Soumya', 'Abhiya & Arabhi'],
  phones: ['9020903355', '9847570940'],
}

export default function Page() {
  const [introKey, setIntroKey] = useState(0)
  const [showIntro, setShowIntro] = useState(true)
  const [started, setStarted] = useState(false)

  const audioRef = useRef({ ctx: null, interval: null, master: null, droneOscs: [] })

  // Start gentle ambient music once scroll opens
  useEffect(() => {
    if (!started || showIntro) return
    const unlockAudio = () => {
      startMusic()
    }
    window.addEventListener('pointerdown', unlockAudio, { once: true })
    return () => window.removeEventListener('pointerdown', unlockAudio)
  }, [started, showIntro])

  // Scroll-reveal observer for sections below the hero scroll
  useEffect(() => {
    if (!started) return
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.1 }
    )
    els.forEach((el) => obs.observe(el))
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    return () => stopMusic()
  }, [])

  const stopMusic = () => {
    const a = audioRef.current
    if (a.interval) clearInterval(a.interval)
    a.droneOscs.forEach((o) => {
      try { o.stop() } catch {}
    })
    a.interval = null
    a.droneOscs = []
    if (a.master && a.ctx) {
      a.master.gain.setTargetAtTime(0, a.ctx.currentTime, 0.15)
    }
  }

  const startMusic = () => {
    try {
      const AudioCtx = window.AudioContext || window.webkitAudioContext
      const a = audioRef.current
      if (!a.ctx) a.ctx = new AudioCtx()
      if (a.ctx.state === 'suspended') a.ctx.resume()
      stopMusic()

      const ctx = a.ctx
      const master = ctx.createGain()
      master.gain.setValueAtTime(0.001, ctx.currentTime)
      master.gain.exponentialRampToValueAtTime(0.14, ctx.currentTime + 1.2)
      master.connect(ctx.destination)
      a.master = master

      const droneGain = ctx.createGain()
      droneGain.gain.value = 0.08
      droneGain.connect(master)
      a.droneOscs = [130.81, 196.0].map((freq) => {
        const osc = ctx.createOscillator()
        osc.type = 'sine'
        osc.frequency.value = freq
        osc.connect(droneGain)
        osc.start()
        return osc
      })

      const scale = [261.63, 293.66, 329.63, 369.99, 392.0, 440.0, 493.88, 523.25]
      const pattern = [0, 2, 4, 7, 5, 4, 2, 3, 4, 6, 7, 4, 2, 1, 0, 4]
      let idx = 0

      const playPluck = (freq) => {
        const now = ctx.currentTime
        const osc = ctx.createOscillator()
        const g = ctx.createGain()
        osc.type = 'triangle'
        osc.frequency.setValueAtTime(freq, now)
        g.gain.setValueAtTime(0.001, now)
        g.gain.linearRampToValueAtTime(0.14, now + 0.03)
        g.gain.exponentialRampToValueAtTime(0.0008, now + 1.65)
        osc.connect(g)
        g.connect(master)
        osc.start(now)
        osc.stop(now + 1.7)
      }

      playPluck(scale[pattern[0]])
      a.interval = setInterval(() => {
        idx = (idx + 1) % pattern.length
        playPluck(scale[pattern[idx]])
      }, 680)
    } catch {}
  }

  const finishIntro = () => {
    setShowIntro(false)
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
    startMusic()
  }

  return (
    <div className="shell">
      {/* 1. UNROLLED TEMPLE SCROLL HERO */}
      <HeroScrollSection data={D} started={started} key={`hero-${introKey}`} />

      {/* 2–5. SCROLLABLE SECTIONS */}
      {started && (
        <>
          <MeetCoupleSection data={D} />
          <CountdownScratchSection />
          <VenuesSection data={D} />
          <ThankYouSection data={D} />
        </>
      )}

      {/* Closed Royal Scroll Gate (tap anywhere to unroll) */}
      {showIntro && (
        <EnvelopeIntro
          key={introKey}
          data={D}
          onComplete={finishIntro}
          onSkip={finishIntro}
        />
      )}
    </div>
  )
}
