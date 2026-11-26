'use client'

export function FloatingRings({ className = '' }) {
  return (
    <svg
      className={`floating-rings ${className}`}
      viewBox="0 0 64 52"
      fill="none"
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="ringGold1" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff0b8" />
          <stop offset="45%" stopColor="#cfa04c" />
          <stop offset="100%" stopColor="#8b6220" />
        </linearGradient>
        <linearGradient id="ringGold2" x1="1" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fce49c" />
          <stop offset="50%" stopColor="#b88435" />
          <stop offset="100%" stopColor="#775218" />
        </linearGradient>
      </defs>
      {/* Back ring */}
      <ellipse
        cx="38"
        cy="28"
        rx="14"
        ry="15"
        transform="rotate(18 38 28)"
        stroke="url(#ringGold2)"
        strokeWidth="4.2"
      />
      {/* Front ring with tiny diamond */}
      <ellipse
        cx="25"
        cy="24"
        rx="14"
        ry="15"
        transform="rotate(-14 25 24)"
        stroke="url(#ringGold1)"
        strokeWidth="4.4"
      />
      <polygon points="21,6 25,2 29,6 25,11" fill="#fffdf6" stroke="#cfa04c" strokeWidth="0.9" />
    </svg>
  )
}

export function MandalaCrest() {
  const petals = 16
  return (
    <div className="crest-wrap">
      <div className="crest-glow" />
      <svg className="crest-ring" viewBox="0 0 180 180" fill="none" aria-hidden="true">
        {/* Outer scalloped filigree petals */}
        {Array.from({ length: petals }, (_, i) => {
          const deg = (i * 360) / petals
          return (
            <g key={i} transform={`rotate(${deg} 90 90)`}>
              <path
                d="M90 12 Q96 22 90 29 Q84 22 90 12 Z"
                fill="none"
                stroke="#b77770"
                strokeWidth="1.2"
              />
              <circle cx="90" cy="8" r="1.7" fill="#c79557" />
              <path
                d="M82 28 Q90 21 98 28"
                fill="none"
                stroke="#b77770"
                strokeWidth="1"
              />
            </g>
          )
        })}
        <circle cx="90" cy="90" r="61" stroke="#b77770" strokeWidth="1.25" />
        <circle cx="90" cy="90" r="56" stroke="#cfa167" strokeWidth="0.8" strokeDasharray="2.5 3" />
        <circle cx="90" cy="90" r="49" stroke="#b77770" strokeWidth="0.7" opacity="0.55" />
      </svg>

      {/* Stylized Interlocking V & S Monogram */}
      <div className="crest-monogram">
        <span className="mono-v">V</span>
        <span className="mono-amp">&amp;</span>
        <span className="mono-s">S</span>
      </div>
    </div>
  )
}

export function LeafDivider({ label }) {
  const Branch = ({ flip = false }) => (
    <svg
      width="44"
      height="14"
      viewBox="0 0 44 14"
      fill="none"
      style={{ transform: flip ? 'scaleX(-1)' : undefined }}
      aria-hidden="true"
    >
      <path d="M2 7 H40" stroke="#9e8762" strokeWidth="0.9" />
      <ellipse cx="14" cy="4" rx="4" ry="1.8" transform="rotate(-25 14 4)" fill="#8c996b" />
      <ellipse cx="18" cy="10" rx="4" ry="1.8" transform="rotate(25 18 10)" fill="#8c996b" />
      <ellipse cx="26" cy="4" rx="3.8" ry="1.6" transform="rotate(-22 26 4)" fill="#8c996b" />
      <ellipse cx="30" cy="10" rx="3.8" ry="1.6" transform="rotate(22 30 10)" fill="#8c996b" />
    </svg>
  )
  return (
    <div className="leaf-divider">
      <Branch />
      <span className="leaf-label">{label}</span>
      <Branch flip />
    </div>
  )
}
