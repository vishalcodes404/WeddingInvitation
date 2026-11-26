'use client'

function ToranGarland() {
  const swags = [0, 1, 2, 3, 4]
  return (
    <svg className="toran-svg" viewBox="0 0 420 118" fill="none" aria-hidden="true">
      <defs>
        <radialGradient id="marigoldO" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#ffd75e" />
          <stop offset="55%" stopColor="#f49b1a" />
          <stop offset="100%" stopColor="#c45f08" />
        </radialGradient>
        <radialGradient id="marigoldY" cx="35%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#fff08a" />
          <stop offset="60%" stopColor="#f7be25" />
          <stop offset="100%" stopColor="#cf8308" />
        </radialGradient>
        <linearGradient id="brassBell" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#f5de9a" />
          <stop offset="50%" stopColor="#b88836" />
          <stop offset="100%" stopColor="#6c4b18" />
        </linearGradient>
      </defs>

      {/* Side vertical marigold drops */}
      {[18, 402].map((sx, idx) => (
        <g key={idx}>
          <line x1={sx} y1="0" x2={sx} y2="96" stroke="#8a7439" strokeWidth="1.5" />
          {[10, 22, 34, 46, 58, 70].map((cy, j) => (
            <circle key={j} cx={sx} cy={cy} r="6.5" fill={j % 2 ? 'url(#marigoldY)' : 'url(#marigoldO)'} />
          ))}
          <circle cx={sx} cy="82" r="4.5" fill="#fffdf6" stroke="#d5c9a8" strokeWidth="0.6" />
          <circle cx={sx} cy="91" r="4" fill="#e9791e" />
        </g>
      ))}

      {/* 5 Swags of Mango Leaves, Marigolds & Brass Bells */}
      {swags.map((i) => {
        const x0 = 22 + i * 75
        const x1 = x0 + 75
        const xm = (x0 + x1) / 2
        const bellDrop = i % 2 === 1 ? 76 : 62
        return (
          <g key={i}>
            {/* Mango leaves behind swag */}
            {[-22, -11, 0, 11, 22].map((dx, k) => (
              <ellipse
                key={k}
                cx={xm + dx}
                cy={28 + (2 - Math.abs(k - 2)) * 4}
                rx="5"
                ry="14"
                fill={k % 2 ? '#4d7f32' : '#3a6823'}
                transform={`rotate(${dx * 1.1} ${xm + dx} 24)`}
              />
            ))}
            {/* Marigold bead arc */}
            {Array.from({ length: 9 }, (_, m) => {
              const t = m / 8
              const cx = x0 + (x1 - x0) * t
              const cy = 6 + Math.sin(t * Math.PI) * 24
              return (
                <circle
                  key={m}
                  cx={cx}
                  cy={cy}
                  r={m % 2 ? 6.5 : 7.5}
                  fill={m % 2 ? 'url(#marigoldY)' : 'url(#marigoldO)'}
                />
              )
            })}
            {/* Hanging Brass Temple Bell */}
            <line x1={xm} y1="28" x2={xm} y2={bellDrop - 10} stroke="#a68139" strokeWidth="1.3" />
            <path
              d={`M${xm - 9} ${bellDrop} Q${xm - 7} ${bellDrop - 12} ${xm} ${bellDrop - 13} Q${xm + 7} ${bellDrop - 12} ${xm + 9} ${bellDrop} Z`}
              fill="url(#brassBell)"
            />
            <ellipse cx={xm} cy={bellDrop + 1} rx="9" ry="2.2" fill="#7a561e" />
            <circle cx={xm} cy={bellDrop + 3} r="2.2" fill="#e8c26b" />
          </g>
        )
      })}
    </svg>
  )
}

function LotusWatermark() {
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

export default function MeetCoupleSection({ data }) {
  return (
    <section id="meet-couple" className="scroll-sec cream-sec">
      <ToranGarland />

      <div className="sec-head reveal">
        <p className="eyebrow">BEGINNING OF FOREVER</p>
        <h2 className="sec-title-italic">Meet the Couple</h2>
        <div className="short-gold-line" />
      </div>

      {/* GROOM CARD */}
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
          <LotusWatermark />
          <img src="/art/groom.png" alt={data.groom} className="solo-fig" />
        </div>
      </article>

      <div className="heart-sep" aria-hidden="true">♥</div>

      {/* BRIDE CARD */}
      <article className="couple-card bride-card reveal">
        <div className="card-art">
          <LotusWatermark />
          <img src="/art/bride.png" alt={data.bride} className="solo-fig" />
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
