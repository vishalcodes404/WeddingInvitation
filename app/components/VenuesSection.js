'use client'

function KoburamVenueCard({
  dateScript,
  title,
  rows,
  blessing,
  mapHref,
  locationLabel,
}) {
  return (
    <article className="koburam-card reveal">
      <div className="koburam-stage">
        <img
          src="/art/koburam-frame.png"
          alt=""
          className="koburam-frame-img"
          aria-hidden="true"
          draggable={false}
        />

        {/* Typography aligned cleanly inside the sculpted gold Koburam maroon interior */}
        <div className="koburam-inner">
          <p className="koburam-date">{dateScript}</p>
          <h3 className="koburam-title">{title}</h3>

          <div className="koburam-diamond-sep" aria-hidden="true">
            <span />
            <i>&#9670;</i>
            <span />
          </div>

          <div className="koburam-rows">
            {rows.map((r) => (
              <div key={r.k} className="koburam-row">
                <span className="kr-key">{r.k}</span>
                <div className="kr-val-col">
                  <strong className="kr-val">{r.v}</strong>
                  {r.sub && <span className="kr-sub">{r.sub}</span>}
                </div>
              </div>
            ))}
          </div>

          <p className="koburam-blessing">{blessing}</p>

          <a
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="koburam-location-link"
          >
            {locationLabel} &rarr;
          </a>
        </div>
      </div>

      {/* Explicit Google Location bar right below each venue Koburam */}
      <a
        href={mapHref}
        target="_blank"
        rel="noopener noreferrer"
        className="koburam-google-pill"
      >
        <span className="pin-dot" aria-hidden="true">&#128205;</span>
        Google Maps Location &mdash; {title}
      </a>
    </article>
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
        {/* VENUE 1: WEDDING CEREMONY — Sculpted Gold Koburam */}
        <KoburamVenueCard
          dateScript="Sunday, 13 December 2026"
          title="Wedding"
          rows={[
            {
              k: 'TIME',
              v: data.muhurtham,
              sub: `${data.malayalam} • Leaves ${data.partyLeaves}`,
            },
            {
              k: 'VENUE',
              v: data.venue,
              sub: data.place,
            },
            {
              k: 'FEAST',
              v: 'Traditional Sadya Lunch',
              sub: 'Following the Muhurtham',
            },
          ]}
          blessing="A sacred union blessed with garlands, chants & timeless joy."
          mapHref={data.templeMap}
          locationLabel="VIEW LOCATION"
        />

        {/* VENUE 2: WEDDING RECEPTION — Sculpted Gold Koburam */}
        <KoburamVenueCard
          dateScript="Sunday Evening, 13 Dec 2026"
          title="Reception"
          rows={[
            {
              k: 'TIME',
              v: data.reception,
              sub: 'Same day evening',
            },
            {
              k: 'VENUE',
              v: "Groom's Residence",
              sub: data.groomHome,
            },
            {
              k: 'ATTIRE',
              v: 'Traditional & Festive',
            },
          ]}
          blessing="An evening of dinner, blessings & celebration."
          mapHref={data.residenceMap}
          locationLabel="VIEW LOCATION"
        />

        {/* RSVP & Family Phone Strip */}
        <div className="contact-strip reveal">
          <button type="button" className="btn-rsvp-gold" onClick={onOpenRsvp}>
            Confirm RSVP
          </button>
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
