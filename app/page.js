'use client'
import { useEffect, useRef, useState } from 'react'
import AmbientCanvas from './components/AmbientCanvas'
import EnvelopeIntro from './components/EnvelopeIntro'
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

const SLIDE_DURATIONS = [3800, 3800]

export default function Page() {
  const [introKey, setIntroKey] = useState(0)
  const [showIntro, setShowIntro] = useState(false)
  const [started, setStarted] = useState(false)
  const [step, setStep] = useState(0)
  const [out, setOut] = useState(false)
  const [paused, setPaused] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [modalOpen, setModalOpen] = useState(false)

  const timerRef = useRef(null)
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

  const goTo = (next) => {
    clearTimeout(timerRef.current)
    setOut(true)
    setTimeout(() => {
      setStep((next + 2) % 2)
      setOut(false)
    }, 450)
  }

  useEffect(() => {
    if (!started || paused || modalOpen) return
    timerRef.current = setTimeout(() => {
      goTo((step + 1) % 2)
    }, SLIDE_DURATIONS[step])
    return () => clearTimeout(timerRef.current)
  }, [started, paused, modalOpen, step])

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
    setStep(0)
    setStarted(true)
    if (!userMutedRef.current) startMusic()
  }

  const replayIntro = () => {
    clearTimeout(timerRef.current)
    stopMusic()
    setStarted(false)
    setStep(0)
    setPaused(false)
    setShowIntro(true)
    setIntroKey((k) => k + 1)
  }

  return (
    <main className="stage">
      {/* 1. Painted Mughal Floral Arch & Palace Garden Backdrop */}
      <img src="/art/palace.png" alt="" className="palace-bg" />

      {/* 2. Live Birds, Rose Petals & Gold Dust */}
      <AmbientCanvas showFountainSparkle={false} />

      {/* 3. Lord Ganesha Medallion under Arch Apex */}
      <img src="/art/ganesha.png" alt="Lord Ganesha emblem" className="ganesha-emblem" />

      {/* 4. Dynamic Courtyard Illustrations (Elephants on Slide 0, Couple on Slide 1) */}
      <div className="courtyard-layer" aria-hidden="true">
        <img
          src="/art/elephant-left.png"
          alt=""
          className={`prop-elephant left${step === 0 ? ' on' : ''}`}
        />
        <img
          src="/art/elephant-right.png"
          alt=""
          className={`prop-elephant right${step === 0 ? ' on' : ''}`}
        />
        <img
          src="/art/couple.png"
          alt=""
          className={`prop-couple${step === 1 ? ' on' : ''}`}
        />
      </div>

      {/* 5. Two Invitation Scenes */}
      {started && (
        <section className={`content-zone${out ? ' out' : ''}`} key={`${introKey}-${step}`}>
          {step === 0 && (
            <>
              <p className="cin" style={{ fontSize: '2.25cqw', fontWeight: 600 }}>
                WITH THE BLESSINGS OF LORD GANESHA, WE CORDIALLY INVITE YOU TO THE MARRIAGE OF OUR SON
              </p>

              <h1 className="script-name" style={{ marginTop: '0.8cqw' }}>
                {D.groom}
              </h1>

              <LeafDivider label="&" />

              <h1 className="script-name">{D.bride}</h1>
            </>
          )}

          {step === 1 && (
            <>
              <div style={{ position: 'relative', width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <FloatingRings className="rings-left" />
                <h2 className="script-title write-reveal">Wedding</h2>
                <p className="cin" style={{ fontSize: '2.8cqw', letterSpacing: '0.28em', marginTop: '-0.6cqw' }}>
                  CEREMONY
                </p>
              </div>

              <div className="date-lockup">
                <span className="side">{D.month}</span>
                <i />
                <span className="day">{D.day}</span>
                <i />
                <span className="side">{D.year}</span>
              </div>
            </>
          )}
        </section>
      )}

      {/* 6. Video-Style Progress & Playback Bar */}
      {started && (
        <nav className="player-bar" aria-label="Invitation playback controls">
          <div className="progress-track">
            {SLIDE_DURATIONS.map((dur, i) => (
              <button
                key={`${i}-${step}`}
                type="button"
                aria-label={`Section ${i + 1}`}
                className={`prog-seg${i < step ? ' done' : ''}${i === step ? ' active' : ''}${
                  paused || modalOpen ? ' paused' : ''
                }`}
                style={{ '--dur': `${dur}ms` }}
                onClick={() => goTo(i)}
              >
                <span className="prog-fill" />
              </button>
            ))}
          </div>

          <div className="ctrl-row">
            <div className="ctrl-group">
              <button type="button" className="ctrl-chip" onClick={() => goTo(step - 1)} aria-label="Previous">
                ‹
              </button>
              <button type="button" className="ctrl-chip" onClick={() => setPaused((p) => !p)}>
                {paused ? 'PLAY' : 'PAUSE'}
              </button>
              <button type="button" className="ctrl-chip" onClick={() => goTo(step + 1)} aria-label="Next">
                ›
              </button>
            </div>

            <div className="ctrl-group">
              <button type="button" className="ctrl-chip" onClick={replayIntro}>
                INTRO
              </button>
              <button type="button" className="ctrl-chip" onClick={() => setModalOpen(true)}>
                RSVP
              </button>
              <button type="button" className="ctrl-chip" onClick={toggleMusic}>
                {musicOn ? '♪ ON' : '♪ OFF'}
              </button>
            </div>
          </div>
        </nav>
      )}

      {/* 7. Video Intro (IMG_8946.MP4 -> /intro.mp4) */}
      {showIntro && (
        <EnvelopeIntro
          key={introKey}
          onComplete={finishIntro}
          onSkip={finishIntro}
        />
      )}

      {/* 8. Full Invitation Details, Maps, Calendar & WhatsApp RSVP Modal */}
      <RsvpModal open={modalOpen} onClose={() => setModalOpen(false)} data={D} />
    </main>
  )
}
