'use client'
import { FrontBrideArt, FrontGroomArt } from './CouplePortraits'
import SwayingToran from './SwayingToran'

/* Groom backdrop: Circular Lotus Mandala */
function GroomLotusHalo() {
  return (
    <svg className="lotus-watermark" viewBox="0 0 180 180" fill="none" aria-hidden="true">
      {Array.from({ length: 12 }, (_, i) => (
        <ellipse
          key={i}
          cx="90"
          cy="44"
          rx="16"
          ry="42"
          stroke="#d4bc88"
          strokeWidth="1.2"
          transform={`rotate(${i * 30} 90 90)`}
        />
      ))}
      <circle cx="90" cy="90" r="26" stroke="#d4bc88" strokeWidth="1.1" />
    </svg>
  )
}

/* Bride backdrop: Distinct Scalloped Rose-Gold Paisley Halo */
function BrideFloralHalo() {
  return (
    <svg className="lotus-watermark" viewBox="0 0 180 180" fill="none" aria-hidden="true">
      <circle cx="90" cy="90" r="68" stroke="#c89b8a" strokeWidth="1.1" strokeDasharray="3 4" />
      <circle cx="90" cy="90" r="56" stroke="#d4b07e" strokeWidth="1" />
      {Array.from({ length: 16 }, (_, i) => (
        <path
          key={i}
          d="M90 16 Q98 28 90 38 Q82 28 90 16 Z"
          stroke="#c89b8a"
          strokeWidth="1.1"
          transform={`rotate(${i * 22.5} 90 90)`}
        />
      ))}
    </svg>
  )
}

export default function MeetCoupleSection({ data }) {
  return (
    <section id="meet-couple" className="scroll-sec cream-sec">
      <SwayingToran src="/art/toran-bells.webp" className="toran-img" />

      <div className="sec-head reveal">
        <p className="eyebrow">BEGINNING OF FOREVER</p>
        <h2 className="sec-title-italic">Meet the Couple</h2>
        <div className="short-gold-line" />
      </div>

      {/* GROOM CARD (Front-facing Groom + Lotus Mandala Design) */}
      <article className="couple-card groom-card reveal">
        <div className="card-info">
          <p className="role-label">THE GROOM</p>
          <h3 className="couple-card-name">{data.groom}</h3>
          <p className="card-tagline">With Divine Blessings...</p>
          <div className="parent-box right-accent">
            <p className="parent-line">S/o Mr. Baiju S. &amp; Mrs. Radha Baiju</p>
            <p className="home-line">{data.groomHome}</p>
          </div>
        </div>
        <div className="card-art">
          <GroomLotusHalo />
          <FrontGroomArt />
        </div>
      </article>

      <div className="heart-sep" aria-hidden="true">♥</div>

      {/* BRIDE CARD (Front-facing Bride + Distinct Floral Arch Halo Design) */}
      <article className="couple-card bride-card reveal">
        <div className="card-art">
          <BrideFloralHalo />
          <FrontBrideArt />
        </div>
        <div className="card-info">
          <p className="role-label">THE BRIDE</p>
          <h3 className="couple-card-name">{data.bride}</h3>
          <p className="card-tagline">In the presence of love...</p>
          <div className="parent-box left-accent">
            <p className="parent-line">D/o Mr. Pramod T.M. &amp; Mrs. Sudha Pramod</p>
            <p className="home-line">{data.brideHome}</p>
          </div>
        </div>
      </article>

      {/* QUOTE & SHARING THE HAPPINESS CARD */}
      <div className="quote-card reveal">
        <p className="quote-text">
          “Under the divine canopy of eternal grace, two souls unite in sacred matrimony.”
        </p>
        <p className="quote-credit">— WITH BEST COMPLIMENTS FROM FAMILIES —</p>
        <div className="sharing-strip">
          <p className="sharing-head">SHARING THE HAPPINESS</p>
          <p className="sharing-names">{data.sharing.join('  •  ')}</p>
        </div>
      </div>
    </section>
  )
}
