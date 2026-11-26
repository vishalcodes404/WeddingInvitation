'use client'

/* Premium Nilavilakku (traditional oil lamp) with realistic glow */
function Nilavilakku({ x }) {
  return (
    <g transform={`translate(${x} 18)`}>
      {/* Warm glow aura */}
      <ellipse cx="0" cy="-14" rx="10" ry="10" fill="#ffd966" opacity="0.15" />
      <ellipse cx="0" cy="-14" rx="6" ry="7" fill="#ffd966" opacity="0.25" />
      {/* Flame outer */}
      <path d="M-2.5 -18 Q0 -26 2.5 -18 Q1.5 -14 -1.5 -14 Z" fill="#ff9922" opacity="0.9" />
      {/* Flame inner */}
      <path d="M-1.2 -17 Q0 -22 1.2 -17 Q0.6 -14 -0.6 -14 Z" fill="#ffe87a" opacity="0.95" />
      {/* Oil bowl with metallic sheen */}
      <path d="M-9 -10 H9 Q7 -4 4 -2 H-4 Q-7 -4 -9 -10 Z" fill="url(#lampBowl)" />
      <path d="M-7 -9 H7" stroke="#ffe8a0" strokeWidth="0.6" opacity="0.5" />
      {/* Stem */}
      <rect x="-2" y="-2" width="4" height="22" fill="url(#lampStem)" rx="1" />
      {/* Decorative node */}
      <ellipse cx="0" cy="8" rx="3" ry="2" fill="#c89028" />
      {/* Base with layered detail */}
      <path d="M-10 20 H10 L13 26 H-13 Z" fill="url(#lampBase)" />
      <path d="M-11 23 H11" stroke="#ffe8a0" strokeWidth="0.4" opacity="0.4" />
      <path d="M-12 25 H12" stroke="#b48028" strokeWidth="0.3" opacity="0.3" />
    </g>
  )
}

export default function VenuesSection({ data, onOpenRsvp }) {
  return (
    <section id="venues" className="scroll-sec cream-sec">
      <div className="sec-head reveal">
        <p className="eyebrow">SACRED CELEBRATIONS</p>
        <h2 className="sec-title-italic">Venues &amp; Events</h2>
        <div className="short-gold-line" />
      </div>

      <div className="venues-stack">
        {/* CARD 1: TEMPLE MUHURTHAM — Premium Maroon & Gold Kerala Temple Arch */}
        <article className="venue-temple-card reveal">
          <div className="temple-banner">
            <svg className="temple-arch-svg" viewBox="0 0 360 80" fill="none" aria-hidden="true">
              <defs>
                {/* Rich maroon gradient with depth */}
                <linearGradient id="templeBg" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#8c2238" />
                  <stop offset="40%" stopColor="#7c1d34" />
                  <stop offset="100%" stopColor="#5a1024" />
                </linearGradient>
                {/* Gold border gradient */}
                <linearGradient id="templeBorder" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c89830" />
                  <stop offset="50%" stopColor="#ffe480" />
                  <stop offset="100%" stopColor="#c89830" />
                </linearGradient>
                {/* Lamp metal gradients */}
                <linearGradient id="lampBowl" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#e8c060" />
                  <stop offset="50%" stopColor="#d4a848" />
                  <stop offset="100%" stopColor="#9a7820" />
                </linearGradient>
                <linearGradient id="lampStem" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#c89830" />
                  <stop offset="50%" stopColor="#b48534" />
                  <stop offset="100%" stopColor="#9a7020" />
                </linearGradient>
                <linearGradient id="lampBase" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#d4a848" />
                  <stop offset="100%" stopColor="#8c6818" />
                </linearGradient>
              </defs>

              {/* Main arch shape with layered gradients */}
              <path d="M0 80 V36 Q60 34 98 20 Q148 6 180 4 Q212 6 262 20 Q300 34 360 36 V80 Z" fill="url(#templeBg)" />
              {/* Inner shadow for depth */}
              <path d="M6 76 V40 Q62 38 102 24 Q150 10 180 8 Q210 10 258 24 Q298 38 354 40 V76" fill="none" stroke="#4a0c1a" strokeWidth="0.6" opacity="0.3" />
              {/* Outer gold border */}
              <path d="M4 78 V38 Q62 36 100 22 Q150 8 180 6 Q210 8 260 22 Q298 36 356 38 V78" fill="none" stroke="url(#templeBorder)" strokeWidth="1.4" opacity="0.8" />
              {/* Inner gold border */}
              <path d="M14 74 V42 Q68 40 106 26 Q152 12 180 10 Q208 12 254 26 Q292 40 346 42 V74" fill="none" stroke="#e4c173" strokeWidth="0.8" opacity="0.5" />
              {/* Embossed corner ornament suggestion */}
              <circle cx="20" cy="66" r="3" fill="#e4c173" opacity="0.2" />
              <circle cx="340" cy="66" r="3" fill="#e4c173" opacity="0.2" />

              {/* Oil Lamps */}
              <Nilavilakku x={42} />
              <Nilavilakku x={318} />

              {/* Text with subtle glow */}
              <text x="180" y="37" textAnchor="middle" fill="#fce8b2" fontSize="10" fontFamily="'Cinzel', serif" letterSpacing="3">
                SHUBHA MUHURTHAM
              </text>
              <text x="180" y="58" textAnchor="middle" fill="#ffffff" fontSize="15" fontFamily="'Cormorant Garamond', serif" fontStyle="italic">
                Sacred Temple Ceremony
              </text>
            </svg>
          </div>

          <div className="venue-body">
            <span className="venue-badge maroon">SUNDAY • 13 DEC 2026 • 1202 VRISCHIKAM 27</span>
            <h3 className="venue-title-lg">{data.venue}</h3>
            <p className="venue-subplace">{data.place}</p>

            <div className="time-pill-box">
              <p className="tp-label">MUHURTHAM</p>
              <p className="tp-val">{data.muhurtham}</p>
              <p className="tp-note">Followed by traditional lunch • Party leaves at {data.partyLeaves}</p>
            </div>

            <a className="btn-temple" href={data.templeMap} target="_blank" rel="noopener noreferrer">
              View Temple on Map
            </a>
          </div>
        </article>

        {/* CARD 2: EVENING RECEPTION — Premium Deep Twilight & Lantern Design */}
        <article className="venue-reception-card reveal">
          <div className="reception-banner">
            <svg className="temple-arch-svg" viewBox="0 0 360 80" fill="none" aria-hidden="true">
              <defs>
                {/* Deep twilight gradient */}
                <linearGradient id="recBg" x1="0.5" y1="0" x2="0.5" y2="1">
                  <stop offset="0%" stopColor="#1e3644" />
                  <stop offset="50%" stopColor="#2c4452" />
                  <stop offset="100%" stopColor="#1a3040" />
                </linearGradient>
                {/* Warm lantern glow */}
                <radialGradient id="lanternGlow" cx="0.5" cy="0.5" r="0.5">
                  <stop offset="0%" stopColor="#ffd977" stopOpacity="0.5" />
                  <stop offset="60%" stopColor="#ffd977" stopOpacity="0.1" />
                  <stop offset="100%" stopColor="#ffd977" stopOpacity="0" />
                </radialGradient>
                {/* Lantern body gradient */}
                <linearGradient id="lanternBody" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ffe8a8" />
                  <stop offset="50%" stopColor="#fff6d1" />
                  <stop offset="100%" stopColor="#e8c868" />
                </linearGradient>
              </defs>

              {/* Background with subtle vignette */}
              <rect width="360" height="80" fill="url(#recBg)" />
              {/* Top/bottom border lines */}
              <line x1="0" y1="2" x2="360" y2="2" stroke="#e3c076" strokeWidth="0.8" opacity="0.3" />
              <line x1="0" y1="78" x2="360" y2="78" stroke="#e3c076" strokeWidth="0.8" opacity="0.3" />
              {/* Inner frame */}
              <rect x="12" y="6" width="336" height="68" rx="2" fill="none" stroke="#e3c076" strokeWidth="0.5" opacity="0.2" />

              {/* Hanging lanterns with realistic glow */}
              {[36, 72, 288, 324].map((lx, i) => (
                <g key={i}>
                  {/* Chain */}
                  <line x1={lx} y1="0" x2={lx} y2={i % 2 ? 22 : 16} stroke="#c8a860" strokeWidth="0.8" strokeDasharray="2 1.5" />
                  {/* Glow halo */}
                  <circle cx={lx} cy={i % 2 ? 32 : 24} r="14" fill="url(#lanternGlow)" />
                  {/* Outer lantern shell */}
                  <circle cx={lx} cy={i % 2 ? 32 : 24} r="6" fill="none" stroke="#d4a74e" strokeWidth="1.2" />
                  {/* Inner warm light */}
                  <circle cx={lx} cy={i % 2 ? 32 : 24} r="4" fill="url(#lanternBody)" opacity="0.9" />
                  {/* Candle flame */}
                  <ellipse cx={lx} cy={i % 2 ? 30 : 22} rx="1.2" ry="2" fill="#fff8e0" />
                  {/* Top cap */}
                  <path d={`M${lx - 3} ${i % 2 ? 26 : 18} L${lx} ${i % 2 ? 24 : 16} L${lx + 3} ${i % 2 ? 26 : 18}`} fill="#c8a860" />
                  {/* Bottom finial */}
                  <circle cx={lx} cy={i % 2 ? 38 : 30} r="1" fill="#c8a860" />
                </g>
              ))}

              {/* Text */}
              <text x="180" y="34" textAnchor="middle" fill="#edd08b" fontSize="10" fontFamily="'Cinzel', serif" letterSpacing="3">
                EVENING CELEBRATION
              </text>
              <text x="180" y="58" textAnchor="middle" fill="#ffffff" fontSize="15" fontFamily="'Cormorant Garamond', serif" fontStyle="italic">
                Wedding Reception
              </text>
            </svg>
          </div>

          <div className="venue-body">
            <span className="venue-badge slate">SAME DAY EVENING • {data.reception}</span>
            <h3 className="venue-title-lg">Groom&apos;s Residence</h3>
            <p className="venue-subplace">{data.groomHome}</p>

            <div className="venue-actions" style={{ marginTop: 18 }}>
              <a className="btn-slate-outline" href={data.residenceMap} target="_blank" rel="noopener noreferrer">
                Residence Directions
              </a>
              <button type="button" className="btn-slate-solid" onClick={onOpenRsvp}>
                Confirm RSVP
              </button>
            </div>
          </div>
        </article>

        {/* Contact Numbers */}
        <div className="contact-strip reveal">
          {data.phones.map((p) => (
            <a key={p} className="btn-gold-outline" href={`tel:+91${p}`}>
              Call {p.slice(0, 5)} {p.slice(5)}
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}
