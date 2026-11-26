'use client'

function Nilavilakku({ x }) {
  return (
    <g transform={`translate(${x} 24)`}>
      <ellipse cx="0" cy="-14" rx="3" ry="5.5" fill="#ffd966" />
      <ellipse cx="0" cy="-13" rx="1.4" ry="3" fill="#fffbe6" />
      <path d="M-8 -6 H8 L4 0 H-4 Z" fill="#d9a848" />
      <rect x="-1.5" y="0" width="3" height="20" fill="#b48534" />
      <path d="M-9 20 H9 L12 24 H-12 Z" fill="#9a6c22" />
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
        {/* CARD 1: TEMPLE MUHURTHAM — Maroon & Gold Kerala Temple Gopuram Design */}
        <article className="venue-temple-card reveal">
          <div className="temple-banner">
            <svg className="temple-arch-svg" viewBox="0 0 360 72" fill="none" aria-hidden="true">
              <path d="M0 72 V34 Q60 32 98 18 Q148 4 180 2 Q212 4 262 18 Q300 32 360 34 V72 Z" fill="#7c1d34" />
              <path d="M12 68 V38 Q65 36 104 22 Q150 9 180 7 Q210 9 256 22 Q295 36 348 38 V68" stroke="#e4c173" strokeWidth="1.2" opacity="0.7" />
              <Nilavilakku x={42} />
              <Nilavilakku x={318} />
              <text x="180" y="34" textAnchor="middle" fill="#fce8b2" fontSize="10" fontFamily="'Cinzel', serif" letterSpacing="3">
                SHUBHA MUHURTHAM
              </text>
              <text x="180" y="54" textAnchor="middle" fill="#ffffff" fontSize="15" fontFamily="'Cormorant Garamond', serif" fontStyle="italic">
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

        {/* CARD 2: EVENING RECEPTION — Deep Twilight Slate & Lantern Pavilion Design */}
        <article className="venue-reception-card reveal">
          <div className="reception-banner">
            <svg className="temple-arch-svg" viewBox="0 0 360 72" fill="none" aria-hidden="true">
              <rect width="360" height="72" fill="#2c4452" />
              {/* Hanging twilight lanterns */}
              {[36, 72, 288, 324].map((lx, i) => (
                <g key={i}>
                  <line x1={lx} y1="0" x2={lx} y2={i % 2 ? 26 : 18} stroke="#e3c076" strokeWidth="1" />
                  <circle cx={lx} cy={i % 2 ? 32 : 24} r="9" fill="#ffd977" opacity="0.22" />
                  <circle cx={lx} cy={i % 2 ? 32 : 24} r="4.5" fill="#fff6d1" stroke="#d4a74e" strokeWidth="1" />
                </g>
              ))}
              <text x="180" y="31" textAnchor="middle" fill="#edd08b" fontSize="10" fontFamily="'Cinzel', serif" letterSpacing="3">
                EVENING CELEBRATION
              </text>
              <text x="180" y="53" textAnchor="middle" fill="#ffffff" fontSize="15" fontFamily="'Cormorant Garamond', serif" fontStyle="italic">
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
