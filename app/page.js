'use client'
import { useEffect, useRef, useState } from 'react'
import AmbientCanvas from './components/AmbientCanvas'
import EnvelopeIntro from './components/EnvelopeIntro'
import HeroScrollSection from './components/HeroScrollSection'
import MeetCoupleSection from './components/MeetCoupleSection'
import CountdownScratchSection from './components/CountdownScratchSection'
import VenuesSection from './components/VenuesSection'
import ThankYouSection from './components/ThankYouSection'

const FLOWER_BURST_MS = 10000 // flower flow lasts 10 seconds per burst

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
  muhurtham: '11:51 AM – 12:15 PM',
  venue: 'Subramanya Swamy Temple',
  place: 'Thiruvanchoor',
  templeMap:
    'https://www.google.com/maps/search/?api=1&query=Subramanya+Swamy+Temple+Thiruvanchoor+Kottayam',
  residenceMap:
    'https://www.google.com/maps/search/?api=1&query=9.468097,76.489807',
  reception: '6:00 PM – 10:00 PM',
  partyLeaves: '10.00 am',
  sharing: ['Reshma & Rajesh', 'Arun & Amrutha', 'Adarsh & Soumya', 'Abhiya & Arabhi'],
  phones: ['9020903355', '9847570940'],
}

export default function Page() {
  const [showIntro, setShowIntro] = useState(true)
  const [started, setStarted] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  // Flower flow is active continuously once the invitation opens, and can be toggled by the user
  const [flowerFlowOn, setFlowerFlowOn] = useState(true)

  const musicRef = useRef(null)
  const userPausedMusicRef = useRef(false)

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

  // Visitor taps the intro card → open hero page, start flower shower & music
  const handleStartMain = () => {
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'instant' })

    // Keep flower flow active
    setFlowerFlowOn(true)

    // Unlock & start music
    const a = musicRef.current
    if (a && !userPausedMusicRef.current) {
      a.muted = false
      a.volume = 0.72
      a.play()
        .then(() => setMusicOn(true))
        .catch(() => setMusicOn(false))
    }
  }

  const handleIntroComplete = () => {
    setShowIntro(false)
  }

  const toggleMusic = () => {
    const a = musicRef.current
    if (!a) return
    if (musicOn) {
      userPausedMusicRef.current = true
      a.pause()
      setMusicOn(false)
    } else {
      userPausedMusicRef.current = false
      a.muted = false
      a.volume = 0.72
      a.play()
        .then(() => setMusicOn(true))
        .catch(() => setMusicOn(false))
    }
  }

  const toggleFlowerFlow = () => {
    // Toggle continuous flower flow on/off
    setFlowerFlowOn((prev) => !prev)
  }

  return (
    <div className="shell">
      {/* Persistent MP3 Wedding Song (Kangal-Edho) */}
      <audio ref={musicRef} src="/music.mp3" loop preload="auto" />

      {/* 1. TEMPLE SCROLL HERO */}
      <HeroScrollSection data={D} started={started} />

      {/* 2–5. SCROLLABLE SECTIONS */}
      {started && (
        <>
          <MeetCoupleSection data={D} />
          <CountdownScratchSection />
          <VenuesSection data={D} />
          <ThankYouSection data={D} />
        </>
      )}

      {/* Full-viewport Real Flower Flow Canvas (active on hero & scrolling when enabled) */}
      {started && (
        <AmbientCanvas
          fullScreen
          flowerShower={flowerFlowOn}
          showBirdsAndMotes={false}
        />
      )}

      {/* Two Floating Luxury Bottom Buttons: Flower Flow & Music */}
      {started && (
        <div className="bottom-media-dock" aria-label="Music and Flower Flow controls">
          <button
            type="button"
            className={`dock-orb-btn flower${flowerFlowOn ? ' active' : ''}`}
            onClick={toggleFlowerFlow}
            aria-label="Shower flowers for 10 seconds"
            title="Shower flowers (10s)"
          >
            <span className="dock-flower-emoji" aria-hidden="true">🌸</span>
          </button>

          <button
            type="button"
            className={`dock-orb-btn music${musicOn ? ' active' : ''}`}
            onClick={toggleMusic}
            aria-label={musicOn ? 'Pause music' : 'Play music'}
            title={musicOn ? 'Music: Playing' : 'Music: Paused'}
          >
            <svg width="19" height="19" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M9 17.5V6.5L19 4.5V15.5"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <circle cx="6.5" cy="17.5" r="2.5" fill="currentColor" />
              <circle cx="16.5" cy="15.5" r="2.5" fill="currentColor" />
            </svg>
          </button>
        </div>
      )}

      {/* Envelope MP4 Intro Overlay: asks to tap first, plays IMG_8961.MP4, fades out smoothly */}
      {showIntro && (
        <EnvelopeIntro
          onStartMain={handleStartMain}
          onComplete={handleIntroComplete}
        />
      )}
    </div>
  )
}
