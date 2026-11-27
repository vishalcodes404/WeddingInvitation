'use client'
import AmbientCanvas from './AmbientCanvas'

export default function HeroScrollSection({ data, started }) {
  return (
    <section
      className={`hero-scroll-stage${started ? ' unrolled' : ''}`}
      aria-label="Wedding Invitation Scroll"
    >
      {/* Outer dark espresso backdrop & top horizontal scroll roller */}
      <div className="scroll-rod-wrap top" aria-hidden="true">
        <img src="/art/scroll-rod.png" alt="" className="scroll-rod-img" />
      </div>

      {/* Unrolled torn-edge antique parchment canvas */}
      <div className="parchment-sheet">
        {/* Background golden temple courtyard + bride & groom varmala scene */}
        <img
          src="/art/temple-scroll-hero.jpg"
          alt="Sunlit temple courtyard with Vysakh and Sandra exchanging garlands"
          className="temple-scroll-bg"
        />

        {/* Animated gently floating rose petals & birds */}
        <AmbientCanvas showFountainSparkle={false} flowerShower={started} />

        {/* Lush marigold swags, leaf side garlands & brass temple bells toran */}
        <img
          src="/art/scroll-toran.png"
          alt=""
          className="scroll-toran-overlay"
          aria-hidden="true"
        />

        {/* Upper typography cleanly framed between the two hanging floral brass bells */}
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
        </div>

        {/* Gentle Scroll cue anchored cleanly along the ivory path at bottom */}
        <a href="#meet-couple" className="scroll-hero-cue">
          <span>SCROLL HERE</span>
          <span className="scroll-arrow">↓</span>
        </a>
      </div>

      {/* Bottom horizontal scroll roller */}
      <div className="scroll-rod-wrap bottom" aria-hidden="true">
        <img src="/art/scroll-rod.png" alt="" className="scroll-rod-img" />
      </div>
    </section>
  )
}
