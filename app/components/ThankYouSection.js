'use client'

function SunburstDivider() {
  const rays = [-75, -56, -38, -20, 0, 20, 38, 56, 75]
  return (
    <svg className="ty-sunburst" viewBox="0 0 280 42" fill="none" aria-hidden="true">
      <line x1="12" y1="36" x2="268" y2="36" stroke="#c59448" strokeWidth="1" opacity="0.85" />
      <polygon points="8,36 12,33 16,36 12,39" fill="#c59448" />
      <polygon points="264,36 268,33 272,36 268,39" fill="#c59448" />
      {rays.map((deg) => {
        const rad = ((deg - 90) * Math.PI) / 180
        const len = deg === 0 ? 30 : Math.abs(deg) > 45 ? 20 : 25
        return (
          <line
            key={deg}
            x1="140"
            y1="36"
            x2={140 + Math.cos(rad) * len}
            y2={36 + Math.sin(rad) * len}
            stroke="#c59448"
            strokeWidth="1"
            opacity="0.72"
          />
        )
      })}
    </svg>
  )
}

export default function ThankYouSection({ data }) {
  return (
    <footer className="scroll-sec thankyou-sec">
      <div className="ty-header-wrap reveal">
        <SunburstDivider />

        <p className="ty-cursive-eyebrow">with love and gratitude</p>
        <h2 className="ty-heading">Thank you</h2>
        <p className="ty-submessage">
          We can&apos;t wait to celebrate this day with you.
        </p>

        <div className="ty-couple-stack">
          <span className="ty-big-name">{data.groom}</span>
          <span className="ty-script-and">and</span>
          <span className="ty-big-name">{data.bride}</span>
        </div>

        <p className="ty-family-whisper">
          13 &bull; 12 &bull; 2026 &nbsp;&bull;&nbsp; MR. BAIJU S. &amp; MRS. RADHA BAIJU &nbsp;&bull;&nbsp; MR. PRAMOD T.M. &amp; MRS. SUDHA PRAMOD
        </p>
      </div>

      {/* Lush Pink Blossoming Garden, Palace Domes & Symmetrical Elephants Holding Lotus */}
      <img
        src="/art/thankyou-elephants.png"
        alt="Royal temple garden with twin adorned elephants holding a lotus"
        className="ty-elephants-img"
      />
    </footer>
  )
}
