'use client'
import { FrontBrideArt, FrontGroomArt } from './CouplePortraits'
import SwayingLamp from './SwayingLamp'

/* Delicate golden temple gopuram watermark inside the niche backdrop */
function TempleNicheWatermark() {
  return (
    <svg
      className="niche-temple-watermark"
      viewBox="0 0 120 180"
      fill="none"
      aria-hidden="true"
    >
      {/* Temple Kalasam Spire */}
      <path
        d="M60 12 L60 4 M58 4 L62 4"
        stroke="#c9a25d"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Tier 1 (Apex dome) */}
      <path
        d="M60 12 Q52 24 50 28 L70 28 Q68 24 60 12 Z"
        fill="rgba(201, 162, 93, 0.08)"
        stroke="#c9a25d"
        strokeWidth="0.8"
      />
      <rect
        x="48"
        y="28"
        width="24"
        height="10"
        rx="1"
        fill="rgba(201, 162, 93, 0.05)"
        stroke="#c9a25d"
        strokeWidth="0.8"
      />
      {/* Tier 2 */}
      <polygon
        points="60,38 42,54 78,54"
        fill="rgba(201, 162, 93, 0.07)"
        stroke="#c9a25d"
        strokeWidth="0.8"
      />
      <rect
        x="40"
        y="54"
        width="40"
        height="14"
        rx="1"
        fill="rgba(201, 162, 93, 0.05)"
        stroke="#c9a25d"
        strokeWidth="0.8"
      />
      {/* Tier 3 */}
      <polygon
        points="60,68 32,88 88,88"
        fill="rgba(201, 162, 93, 0.07)"
        stroke="#c9a25d"
        strokeWidth="0.8"
      />
      <rect
        x="30"
        y="88"
        width="60"
        height="18"
        rx="1.5"
        fill="rgba(201, 162, 93, 0.05)"
        stroke="#c9a25d"
        strokeWidth="0.8"
      />
      {/* Tier 4 (Base Mandapam) */}
      <polygon
        points="60,106 20,132 100,132"
        fill="rgba(201, 162, 93, 0.07)"
        stroke="#c9a25d"
        strokeWidth="0.8"
      />
      <rect
        x="18"
        y="132"
        width="84"
        height="32"
        rx="2"
        fill="rgba(201, 162, 93, 0.04)"
        stroke="#c9a25d"
        strokeWidth="0.8"
      />
      {/* Mandapam Carved Pillars */}
      <line x1="26" y1="132" x2="26" y2="164" stroke="#c9a25d" strokeWidth="0.8" />
      <line x1="38" y1="132" x2="38" y2="164" stroke="#c9a25d" strokeWidth="0.7" />
      <line x1="50" y1="132" x2="50" y2="164" stroke="#c9a25d" strokeWidth="0.7" />
      <line x1="60" y1="132" x2="60" y2="164" stroke="#c9a25d" strokeWidth="0.8" />
      <line x1="70" y1="132" x2="70" y2="164" stroke="#c9a25d" strokeWidth="0.7" />
      <line x1="82" y1="132" x2="82" y2="164" stroke="#c9a25d" strokeWidth="0.7" />
      <line x1="94" y1="132" x2="94" y2="164" stroke="#c9a25d" strokeWidth="0.8" />
      {/* Arched Sanctum Doorway */}
      <path
        d="M48 164 V145 Q60 138 72 145 V164 Z"
        fill="rgba(201, 162, 93, 0.12)"
        stroke="#c9a25d"
        strokeWidth="0.8"
      />
    </svg>
  )
}

/* Scalloped Royal Jharokha Arch Framing Header */
function RoyalArchSvg() {
  return (
    <svg
      className="royal-arch-frame-svg"
      viewBox="0 0 420 110"
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M 12 110 
           L 12 55 
           Q 12 30 42 28 
           Q 75 25 105 38 
           Q 138 22 175 22 
           Q 210 6 245 22 
           Q 282 22 315 38 
           Q 345 25 378 28 
           Q 408 30 408 55 
           L 408 110"
        fill="none"
        stroke="#d5b36e"
        strokeWidth="1.4"
      />
      <path
        d="M 22 110 
           L 22 58 
           Q 22 38 48 36 
           Q 78 33 105 45 
           Q 138 30 174 30 
           Q 210 16 246 30 
           Q 282 30 315 45 
           Q 342 33 372 36 
           Q 398 38 398 58 
           L 398 110"
        fill="none"
        stroke="#d5b36e"
        strokeWidth="0.7"
        strokeDasharray="2 3"
        opacity="0.7"
      />
    </svg>
  )
}

export default function MeetCoupleSection({ data }) {
  return (
    <section id="meet-couple" className="meet-couple-stage cream-sec">
      {/* Interactive Hanging Brass Oil Lamps on chains (sway smoothly with touch/drag) */}
      <SwayingLamp side="left" className="meet-hanging-lamp left" />
      <SwayingLamp side="right" className="meet-hanging-lamp right" />

      {/* Royal Arch Header Framing */}
      <div className="meet-header-wrapper reveal">
        <RoyalArchSvg />
        <div className="meet-header-content">
          <div className="meet-om-sign" aria-hidden="true">
            <span className="om-danda">— ॥</span>
            <span className="om-symbol">ॐ</span>
            <span className="om-danda">॥ —</span>
          </div>
          <h2 className="meet-main-title">Meet the Couple</h2>
          <div className="meet-title-ornament" aria-hidden="true">
            <svg width="120" height="14" viewBox="0 0 120 14" fill="none">
              <path
                d="M4 7 Q35 12 60 7 Q85 2 116 7"
                stroke="#c99f52"
                strokeWidth="1.1"
                strokeLinecap="round"
              />
              <circle cx="60" cy="7" r="2.4" fill="#7a1f33" />
              <path d="M52 7 Q60 3 68 7 Q60 11 52 7 Z" fill="#c99f52" />
            </svg>
          </div>
        </div>
      </div>

      {/* GROOM CARD (Vysakh) */}
      <article className="couple-card-v2 groom reveal">
        {/* Left Arched Niche with Temple Watermark & Portrait */}
        <div className="niche-frame">
          <div className="niche-backdrop">
            <TempleNicheWatermark />
          </div>
          <div className="niche-portrait-wrap">
            <FrontGroomArt />
          </div>
        </div>

        {/* Right Info Column */}
        <div className="card-details-v2">
          <div className="role-pill-row">
            <span className="role-accent-line" />
            <span className="role-pill-badge">THE GROOM</span>
            <span className="role-accent-line" />
          </div>
          <h3 className="couple-name-v2">{data.groom}</h3>
          <p className="couple-blessing-v2">With Divine Blessings...</p>
          <div className="card-mini-diamond" aria-hidden="true">
            ✦
          </div>

          <div className="parent-box-v2">
            <div className="parent-icon-wrap" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <div className="parent-info-wrap">
              <p className="parent-title-v2">S/o Mr. Baiju S. &amp; Mrs. Radha Baiju</p>
              <p className="parent-address-v2">{data.groomHome}</p>
            </div>
          </div>
        </div>
      </article>

      {/* BRIDE CARD (Sandra) */}
      <article className="couple-card-v2 bride reveal">
        {/* Left Arched Niche with Temple Watermark & Portrait */}
        <div className="niche-frame">
          <div className="niche-backdrop">
            <TempleNicheWatermark />
          </div>
          <div className="niche-portrait-wrap">
            <FrontBrideArt />
          </div>
        </div>

        {/* Right Info Column */}
        <div className="card-details-v2">
          <div className="role-pill-row">
            <span className="role-accent-line" />
            <span className="role-pill-badge">THE BRIDE</span>
            <span className="role-accent-line" />
          </div>
          <h3 className="couple-name-v2">{data.bride}</h3>
          <p className="couple-blessing-v2">In the presence of love...</p>
          <div className="card-mini-diamond" aria-hidden="true">
            ✦
          </div>

          <div className="parent-box-v2">
            <div className="parent-icon-wrap" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z" />
              </svg>
            </div>
            <div className="parent-info-wrap">
              <p className="parent-title-v2">D/o Mr. Pramod T.M. &amp; Mrs. Sudha Pramod</p>
              <p className="parent-address-v2">{data.brideHome}</p>
            </div>
          </div>
        </div>
      </article>

      {/* DOUBLE-BORDER QUOTE CARD */}
      <div className="meet-quote-card-v2 reveal">
        <div className="quote-inner-frame">
          <p className="quote-text-v2">
            “Under the divine canopy of eternal grace, two souls unite in sacred matrimony.”
          </p>
          <div className="quote-lotus-divider" aria-hidden="true">
            <span className="quote-divider-line" />
            <span className="lotus-emblem">🪷</span>
            <span className="quote-divider-line" />
          </div>
          <p className="quote-compliments-v2">— With Best Compliments From Families —</p>
          <div className="sharing-box-v2">
            <p className="sharing-title-v2">SHARING THE HAPPINESS</p>
            <p className="sharing-names-v2">{data.sharing.join('  •  ')}</p>
          </div>
        </div>
      </div>
    </section>
  )
}
