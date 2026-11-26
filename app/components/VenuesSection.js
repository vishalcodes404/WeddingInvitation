'use client'

export default function VenuesSection({ data, onOpenRsvp }) {
  return (
    <section id="venues" className="scroll-sec cream-sec">
      <div className="sec-head reveal">
        <p className="eyebrow">SACRED CELEBRATIONS</p>
        <h2 className="sec-title-italic">Venues &amp; Events</h2>
        <div className="short-gold-line" />
      </div>

      <div className="venues-stack">
        {/* Wedding Ceremony Venue */}
        <article className="venue-card reveal">
          <p className="role-label">WEDDING CEREMONY</p>
          <h3 className="venue-name">{data.venue}</h3>
          <p className="venue-place">{data.place}</p>

          <div className="short-gold-line" />

          <p className="venue-detail">
            <strong>Sunday, 13th December 2026</strong> ({data.malayalam})
          </p>
          <p className="venue-time">Muhurtham: {data.muhurtham}</p>
          <p className="venue-note">and thereafter for lunch • Party leaves at {data.partyLeaves}</p>

          <div className="venue-actions">
            <a className="btn-gold-outline" href={data.templeMap} target="_blank" rel="noopener noreferrer">
              View Temple on Map
            </a>
          </div>
        </article>

        {/* Evening Reception Venue */}
        <article className="venue-card reveal">
          <p className="role-label">EVENING RECEPTION</p>
          <h3 className="venue-name">Groom&apos;s Residence</h3>
          <p className="venue-place">{data.groomHome}</p>

          <div className="short-gold-line" />

          <p className="venue-detail">
            <strong>Same Day — Sunday, 13th December 2026</strong>
          </p>
          <p className="venue-time">{data.reception}</p>
          <p className="venue-note">You are warmly invited with family for the evening reception</p>

          <div className="venue-actions">
            <a className="btn-gold-outline" href={data.residenceMap} target="_blank" rel="noopener noreferrer">
              Residence Directions
            </a>
            <button type="button" className="btn-gold-outline primary" onClick={onOpenRsvp}>
              Confirm RSVP
            </button>
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
