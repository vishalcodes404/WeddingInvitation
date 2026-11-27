'use client'
import AmbientCanvas from './AmbientCanvas'
import SwayingToran from './SwayingToran'

export default function HeroScrollSection({ data, started }) {
  return (
    <section
      className={`hero-scroll-stage${started ? ' unrolled' : ''}`}
      aria-label="Wedding Invitation Scroll"
    >
      {/* Top horizontal scroll roller */}
      <div className="scroll-rod-wrap top" aria-hidden="true">
        <img src="/art/scroll-rod.webp" alt="" className="scroll-rod-img" decoding="async" />
      </div>

      {/* Unrolled antique parchment canvas with Thiruvanchoor Subramanya Temple */}
      <div className="parchment-sheet">
        <img
          src="/art/temple-scroll-hero.webp"
          alt="Sunlit Thiruvanchoor Subramanya Swamy Temple with Vysakh and Sandra exchanging garlands"
          className="temple-scroll-bg"
          priority="true"
          decoding="async"
        />

        {/* Sun motes & distant sky birds behind typography */}
        <AmbientCanvas flowerShower={false} showBirdsAndMotes={true} />

        {/* Lush movable marigold swags, leaf side garlands & brass temple bells toran */}
        <SwayingToran src="/art/scroll-toran.webp" className="scroll-toran-overlay" />

        {/* Upper typography cleanly framed between hanging bells */}
        <div className="scroll-hero-text">
          <h1 className="scroll-couple-name">{data.groom}</h1>
          <p className="scroll-weds-word">weds</p>
          <h1 className="scroll-couple-name">{data.bride}</h1>

          <div className="scroll-date-badge">
            <span>{data.month}</span>
            <i />
            <strong>{data.day}</strong>
            <i />
            <span>{data.year}</span>
          </div>
          <p className="scroll-sub-blessings">
            {data.weekday} &bull; {data.muhurtham}
          </p>
          <p className="scroll-venue-location">
            {data.venue}, {data.place}
          </p>
        </div>

        {/* Gentle Scroll cue anchored cleanly along ivory walkway */}
        <a href="#meet-couple" className="scroll-hero-cue">
          <span>SCROLL HERE</span>
          <span className="scroll-arrow">↓</span>
        </a>
      </div>

      {/* Bottom horizontal scroll roller */}
      <div className="scroll-rod-wrap bottom" aria-hidden="true">
        <img src="/art/scroll-rod.webp" alt="" className="scroll-rod-img" decoding="async" />
      </div>
    </section>
  )
}
