'use client'
import { useEffect, useRef, useState } from 'react'
import AmbientCanvas from './components/AmbientCanvas'
import EnvelopeIntro from './components/EnvelopeIntro'
import MeetCoupleSection from './components/MeetCoupleSection'
import CountdownScratchSection from './components/CountdownScratchSection'
import VenuesSection from './components/VenuesSection'
import ThankYouSection from './components/ThankYouSection'
import { FloatingRings, LeafDivider } from './components/Ornaments'
import RsvpModal from './components/RsvpModal'

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
  const [showIntro, setShowIntro] = useState(false)
  const [started, setStarted] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const audioRef = useRef({ ctx: null, interval: null, master: null, droneOscs: [] })
  const userMutedRef = useRef(false)

  // Play intro automatically once per visitor session
  useEffect(() => {
    try {
      const seen = sessionStorage.getItem('vs_intro_seen') === '1'
      if (seen) {
        setShowIntro(false)
        setStarted(true)
      } else {
        setShowIntro(true)
      }
    } catch {
      setShowIntro(true)
    }
  }, [])

  // Start gentle ambient music once main invitation is active (after intro video)
  useEffect(() => {
    if (!started || showIntro) return
    const unlockAudio = () => {
      if (!userMutedRef.current && !musicOn) {
        startMusic()
      }
    }
    window.addEventListener('pointerdown', unlockAudio, { once: true })
    return () => window.removeEventListener('pointerdown', unlockAudio)
  }, [started, showIntro, musicOn])

  // Scroll-reveal observer for sections below the hero
  useEffect(() => {
    if (!started) return
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) e.target.classList.add('visible')
        })
      },
      { threshold: 0.12 }
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
    setMusicOn(false)
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
      master.gain.exponentialRampToValueAtTime(0.16, ctx.currentTime + 1.2)
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

      setMusicOn(true)
    } catch {
      setMusicOn(false)
    }
  }

  const toggleMusic = () => {
    if (musicOn) {
      userMutedRef.current = true
      stopMusic()
    } else {
      userMutedRef.current = false
      startMusic()
    }
  }

  const finishIntro = () => {
    try {
      sessionStorage.setItem('vs_intro_seen', '1')
    } catch {}
    setShowIntro(false)
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'instant' })
    if (!userMutedRef.current) startMusic()
  }

  const replayIntro = () => {
    stopMusic()
    window.scrollTo({ top: 0, behavior: 'instant' })
    setStarted(false)
    setShowIntro(true)
    setIntroKey((k) => k + 1)
  }

  return (
    <div className="shell">
      {/* 1. HERO PALACE ARCH INVITATION */}
      <section className="stage" aria-label="Wedding Invitation">
        <img src="/art/palace.png" alt="" className="palace-bg" />
        <AmbientCanvas showFountainSparkle={false} flowerShower={started} />
        <img src="/art/ganesha.png" alt="Lord Ganesha emblem" className="ganesha-emblem" />

        <div className="courtyard-layer" aria-hidden="true">
          <img src="/art/couple.png" alt="" className={`prop-couple${started ? ' on' : ''}`} />
        </div>

        {started && (
          <div className="content-zone" key={introKey}>
            <div
              style={{
                position: 'relative',
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                marginBottom: '2.4cqw',
              }}
            >
              <FloatingRings className="rings-left" />
              <h2 className="script-title write-reveal" style={{ fontSize: '8.2cqw' }}>
                Wedding
              </h2>
              <p className="cin" style={{ fontSize: '2.3cqw', letterSpacing: '0.28em', marginTop: '-0.4cqw' }}>
                CEREMONY
              </p>
            </div>

            <p className="cin" style={{ fontSize: '2cqw', fontWeight: 600, lineHeight: 1.4 }}>
              WITH THE BLESSINGS OF LORD GANESHA, WE CORDIALLY INVITE YOU TO THE MARRIAGE OF OUR SON
            </p>

            <h1 className="script-name" style={{ fontSize: '10.2cqw', marginTop: '0.2cqw' }}>
              {D.groom}
            </h1>

            <LeafDivider label="&" />

            <h1 className="script-name" style={{ fontSize: '10.2cqw' }}>
              {D.bride}
            </h1>

            <div className="date-lockup" style={{ marginTop: '0.2cqw' }}>
              <span className="side" style={{ fontSize: '2.8cqw' }}>{D.month}</span>
              <i style={{ height: '6.2cqw' }} />
              <span className="day" style={{ fontSize: '7.6cqw' }}>{D.day}</span>
              <i style={{ height: '6.2cqw' }} />
              <span className="side" style={{ fontSize: '2.8cqw' }}>{D.year}</span>
            </div>

            {/* Scroll Here prompt cleanly above the couple */}
            <a href="#meet-couple" className="scroll-cue">
              <span>SCROLL HERE</span>
              <span className="scroll-arrow">↓</span>
            </a>
          </div>
        )}
      </section>

      {/* 2–5. SCROLLABLE SECTIONS (visible once intro completes) */}
      {started && (
        <>
          <MeetCoupleSection data={D} />
          <CountdownScratchSection />
          <VenuesSection data={D} onOpenRsvp={() => setModalOpen(true)} />
          <ThankYouSection data={D} />
        </>
      )}

      {/* Fixed Floating Corner Controls */}
      {started && (
        <nav className="floating-controls" aria-label="Invitation controls">
          <button type="button" className="ctrl-chip" onClick={replayIntro}>
            INTRO
          </button>
          <button type="button" className="ctrl-chip" onClick={() => setModalOpen(true)}>
            RSVP
          </button>
          <button type="button" className="ctrl-chip" onClick={toggleMusic}>
            {musicOn ? '♪ ON' : '♪ OFF'}
          </button>
        </nav>
      )}

      {/* Full-Screen 4K Video Intro */}
      {showIntro && (
        <EnvelopeIntro
          key={introKey}
          onComplete={finishIntro}
          onSkip={finishIntro}
        />
      )}

      {/* Full Details & WhatsApp RSVP Modal */}
      <RsvpModal open={modalOpen} onClose={() => setModalOpen(false)} data={D} />
    </div>
  )
}
