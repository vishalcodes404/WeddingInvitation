'use client'
import { useEffect, useRef, useState } from 'react'
import AmbientCanvas from './components/AmbientCanvas'
import EnvelopeIntro from './components/EnvelopeIntro'
import HeroScrollSection from './components/HeroScrollSection'
import MeetCoupleSection from './components/MeetCoupleSection'
import CountdownScratchSection from './components/CountdownScratchSection'
import VenuesSection from './components/VenuesSection'
import ThankYouSection from './components/ThankYouSection'

const FLOWER_BURST_MS = 7500 // flower flow lasts 7.5 seconds per burst

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
  const [showIntro, setShowIntro] = useState(true)
  const [started, setStarted] = useState(false)
  const [musicOn, setMusicOn] = useState(false)
  const [flowerFlowOn, setFlowerFlowOn] = useState(true)

  const musicRef = useRef(null)
  const userPausedMusicRef = useRef(false)
  const flowerTimerRef = useRef(null)

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

  // Start a timed flower burst (7.5s)
  const startFlowerBurst = () => {
    if (flowerTimerRef.current) clearTimeout(flowerTimerRef.current)
    setFlowerFlowOn(true)
    flowerTimerRef.current = setTimeout(() => {
      setFlowerFlowOn(false)
      flowerTimerRef.current = null
    }, FLOWER_BURST_MS)
  }

  // Visitor taps the intro card → open hero page, start flower burst & music
  const handleStartMain = () => {
    setStarted(true)
    window.scrollTo({ top: 0, behavior: 'instant' })

    // Auto flower burst on hero entrance
    startFlowerBurst()

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
    if (flowerFlowOn) {
      // If currently flowing, stop immediately
      if (flowerTimerRef.current) clearTimeout(flowerTimerRef.current)
      flowerTimerRef.current = null
      setFlowerFlowOn(false)
    } else {
      // Start a new 7.5s burst
      startFlowerBurst()
    }
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
            aria-label={flowerFlowOn ? 'Turn off flower flow' : 'Turn on flower flow'}
            title={flowerFlowOn ? 'Flower Flow: ON' : 'Flower Flow: OFF'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path
                d="M12 3C13.5 6.2 13.5 8.5 12 10.5C10.5 8.5 10.5 6.2 12 3Z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M12 21C10.5 17.8 10.5 15.5 12 13.5C13.5 15.5 13.5 17.8 12 21Z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M3 12C6.2 10.5 8.5 10.5 10.5 12C8.5 13.5 6.2 13.5 3 12Z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M21 12C17.8 13.5 15.5 13.5 13.5 12C15.5 10.5 17.8 10.5 21 12Z"
                fill="currentColor"
                opacity="0.9"
              />
              <path
                d="M5.6 5.6C8.8 6.8 10.4 8.4 10.8 10.8C8.4 10.4 6.8 8.8 5.6 5.6Z"
                fill="currentColor"
                opacity="0.7"
              />
              <path
                d="M18.4 18.4C15.2 17.2 13.6 15.6 13.2 13.2C15.6 13.6 17.2 15.2 18.4 18.4Z"
                fill="currentColor"
                opacity="0.7"
              />
              <path
                d="M18.4 5.6C17.2 8.8 15.6 10.4 13.2 10.8C13.6 8.4 15.2 6.8 18.4 5.6Z"
                fill="currentColor"
                opacity="0.7"
              />
              <path
                d="M5.6 18.4C6.8 15.2 8.4 13.6 10.8 13.2C10.4 15.6 8.8 17.2 5.6 18.4Z"
                fill="currentColor"
                opacity="0.7"
              />
              <circle cx="12" cy="12" r="2.2" fill="#ebd07e" />
            </svg>
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
