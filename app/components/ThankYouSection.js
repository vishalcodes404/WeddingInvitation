'use client'

export default function ThankYouSection({ data }) {
  return (
    <footer className="scroll-sec thankyou-sec">
      <img src="/art/toran-lanterns.png" alt="" className="toran-img" aria-hidden="true" />

      <div className="ty-badge reveal">
        <img src="/art/kalash.png" alt="Sacred Kalasam" className="kalash-badge-img" />
      </div>

      <div className="sec-head reveal" style={{ marginTop: 12 }}>
        <p className="eyebrow">WITH GRATITUDE</p>
        <h2 className="sec-title-italic" style={{ fontSize: 42 }}>Thank You</h2>
        <div className="short-gold-line" />
      </div>

      <p className="ty-message reveal">
        It is the greatest honor to have you as part of our story. We can&apos;t wait to celebrate with you!
      </p>

      <div className="ty-names-row reveal">
        <img src="/art/kalash.png" alt="" className="kalash-side-img" aria-hidden="true" />
        <div className="ty-names-stack">
          <span className="ty-name">{data.groom}</span>
          <span className="ty-amp">&amp;</span>
          <span className="ty-name">{data.bride}</span>
        </div>
        <img src="/art/kalash.png" alt="" className="kalash-side-img" aria-hidden="true" />
      </div>

      <div className="short-gold-line" style={{ margin: '18px auto 14px' }} />

      <p className="ty-wish reveal">Wishing you a lifetime of love and happiness.</p>

      <div className="ty-families reveal">
        <p>WITH LOVE • MR. BAIJU S. &amp; MRS. RADHA BAIJU</p>
        <p>MR. PRAMOD T.M. &amp; MRS. SUDHA PRAMOD</p>
        <p className="ty-date">13 • 12 • 2026</p>
      </div>

      {/* Warm Golden Palace Silhouette Strip at Bottom */}
      <svg className="ty-palace-strip" viewBox="0 0 420 62" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="palStrip" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#e8c383" />
            <stop offset="100%" stopColor="#c48c46" />
          </linearGradient>
        </defs>
        <rect width="420" height="62" fill="url(#palStrip)" />
        {[12, 82, 152, 222, 292, 362].map((x, idx) => (
          <g key={idx}>
            <path d={`M${x} 62 V24 Q${x + 23} 3 ${x + 46} 24 V62 Z`} fill="#8d501d" opacity="0.56" />
            <path d={`M${x + 5} 62 V27 Q${x + 23} 10 ${x + 41} 27 V62`} stroke="#f7dc9e" strokeWidth="1" fill="none" opacity="0.7" />
            <circle cx={x + 23} cy="32" r="4.5" fill="#fff0ad" opacity="0.82" />
          </g>
        ))}
      </svg>
    </footer>
  )
}
