'use client'
import AmbientCanvas from './AmbientCanvas'

export default function HeroScrollSection({ data, started }) {
  return (
    <section
      className={`hero-scroll-stage${started ? ' unrolled' : ''}`}
      aria-label="Wedding Invitation Scroll"
    >
      {/* Top horizontal scroll roller */}
      <div className="scroll-rod-wrap top" aria-hidden="true">
        <img src="/art/scroll-rod.png" alt="" className="scroll-rod-img" />
      </div>

      {/* Unrolled antique parchment canvas with Thiruvanchoor Subramanya Temple */}
      <div className="parchment-sheet">
        <img
          src="/art/temple-scroll-hero.jpg"
          alt="Sunlit Thiruvanchoor Subramanya Swamy Temple with Vysakh and Sandra exchanging garlands"
          className="temple-scroll-bg"
        />

        {/* Sun motes & distant sky birds behind typography */}
        <AmbientCanvas flowerShower={false} showBirdsAndMotes={true} />

        {/* Lush marigold swags, leaf side garlands & brass temple bells toran */}
        <img
          src="/art/scroll-toran.png"
          alt=""
          className="scroll-toran-overlay"
          aria-hidden="true"
        />

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
        </div>

        {/* Gentle Scroll cue anchored cleanly along ivory walkway */}
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
