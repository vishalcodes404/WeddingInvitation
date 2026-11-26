'use client'

function GarlandLights() {
  const swags = [0, 1, 2, 3]
  return (
    <svg className="toran-svg" viewBox="0 0 420 112" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="glowLamp" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fffbe0" />
          <stop offset="55%" stopColor="#ffd86b" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#f49b1a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {swags.map((i) => {
        const x0 = 16 + i * 97
        const x1 = x0 + 97
        const xm = (x0 + x1) / 2
        return (
          <g key={i}>
            {/* Green leaves */}
            {[-28, -14, 0, 14, 28].map((dx, k) => (
              <ellipse
                key={k}
                cx={xm + dx}
                cy={26 + (2 - Math.abs(k - 2)) * 5}
                rx="5"
                ry="13"
                fill="#4a7d31"
              />
            ))}
            {/* Marigold + Jasmine double arc */}
            {Array.from({ length: 11 }, (_, m) => {
              const t = m / 10
              const cx = x0 + (x1 - x0) * t
              const cy1 = 6 + Math.sin(t * Math.PI) * 32
              const cy2 = 12 + Math.sin(t * Math.PI) * 18
              return (
                <g key={m}>
                  <circle cx={cx} cy={cy1} r="6.2" fill={m % 2 ? '#f7bd22' : '#ea7f13'} />
                  <circle cx={cx} cy={cy2} r="4.2" fill="#fffdf6" stroke="#ddd1b2" strokeWidth="0.6" />
                </g>
              )
            })}
            {/* Hanging Warm Bulb Lanterns */}
            {[x0 + 24, xm, x1 - 24].map((lx, idx) => {
              const ly = idx === 1 ? 82 : 66
              return (
                <g key={idx}>
                  <line x1={lx} y1="32" x2={lx} y2={ly - 6} stroke="#9c7a38" strokeWidth="1" />
                  <circle cx={lx} cy={ly} r="13" fill="url(#glowLamp)" />
                  <circle cx={lx} cy={ly} r="5.5" fill="#fffbe8" stroke="#d5a648" strokeWidth="0.9" />
                </g>
              )
            })}
          </g>
        )
      })}
    </svg>
  )
}

function KalashPot({ size = 56 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" aria-hidden="true">
      {/* Mango leaves */}
      <ellipse cx="32" cy="18" rx="4.5" ry="13" fill="#467a2e" />
      <ellipse cx="22" cy="21" rx="4" ry="11" transform="rotate(-32 22 21)" fill="#588f3d" />
      <ellipse cx="42" cy="21" rx="4" ry="11" transform="rotate(32 42 21)" fill="#588f3d" />
      <ellipse cx="15" cy="26" rx="3.5" ry="9" transform="rotate(-55 15 26)" fill="#3b6b25" />
      <ellipse cx="49" cy="26" rx="3.5" ry="9" transform="rotate(55 49 26)" fill="#3b6b25" />
      {/* Sacred Coconut */}
      <ellipse cx="32" cy="24" rx="8" ry="9" fill="#7c4724" stroke="#593116" strokeWidth="1" />
      {/* Copper Kalash Pot */}
      <path d="M23 30 H41 L38 35 H26 Z" fill="#c98042" stroke="#854b1d" strokeWidth="1" />
      <ellipse cx="32" cy="45" rx="14" ry="12" fill="#b86932" stroke="#7d4117" strokeWidth="1.2" />
      <path d="M22 44 Q32 48 42 44" stroke="#f2c478" strokeWidth="1.3" />
      <circle cx="32" cy="42" r="2" fill="#e63e3e" />
    </svg>
  )
}

export default function ThankYouSection({ data }) {
  return (
    <footer className="scroll-sec thankyou-sec">
      <GarlandLights />

      <div className="ty-badge reveal">
        <KalashPot size={50} />
      </div>

      <div className="sec-head reveal" style={{ marginTop: 10 }}>
        <p className="eyebrow">WITH GRATITUDE</p>
        <h2 className="sec-title-italic" style={{ fontSize: 42 }}>Thank You</h2>
        <div className="short-gold-line" />
      </div>

      <p className="ty-message reveal">
        It is the greatest honor to have you as part of our story. We can&apos;t wait to celebrate with you!
      </p>

      <div className="ty-names-row reveal">
        <KalashPot size={64} />
        <div className="ty-names-stack">
          <span className="ty-name">{data.groom}</span>
          <span className="ty-amp">&amp;</span>
          <span className="ty-name">{data.bride}</span>
        </div>
        <KalashPot size={64} />
      </div>

      <div className="short-gold-line" style={{ margin: '18px auto 14px' }} />

      <p className="ty-wish reveal">Wishing you a lifetime of love and happiness.</p>

      <div className="ty-families reveal">
        <p>WITH LOVE • MR. BAIJU S. &amp; MRS. RADHA BAIJU</p>
        <p>MR. PRAMOD T.M. &amp; MRS. SUDHA PRAMOD</p>
        <p className="ty-date">13 • 12 • 2026</p>
      </div>

      {/* Warm Golden Palace Silhouette Strip at Bottom */}
      <svg className="ty-palace-strip" viewBox="0 0 420 56" preserveAspectRatio="none" aria-hidden="true">
        <rect width="420" height="56" fill="#d8ab6a" />
        {[20, 90, 160, 230, 300, 370].map((x, idx) => (
          <g key={idx}>
            <path d={`M${x} 56 V22 Q${x + 18} 4 ${x + 36} 22 V56 Z`} fill="#9a5c22" opacity="0.52" />
            <circle cx={x + 18} cy="30" r="4" fill="#ffe89c" opacity="0.7" />
          </g>
        ))}
      </svg>
    </footer>
  )
}
