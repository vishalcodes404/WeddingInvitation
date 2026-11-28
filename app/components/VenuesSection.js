'use client'
import SwayingBell from './SwayingBell'

function KoburamVenueCard({
  dateScript,
  title,
  rows,
  blessing,
  mapHref,
  embedQuery,
  mapCaption,
}) {
  const embedSrc = `https://maps.google.com/maps?q=${encodeURIComponent(embedQuery)}&t=m&z=15&ie=UTF8&iwloc=&output=embed`

  return (
    <article className="koburam-card reveal">
      <div className="koburam-stage">
        <img
          src="/art/koburam-frame.webp"
          alt=""
          className="koburam-frame-img"
          aria-hidden="true"
          draggable={false}
          loading="lazy"
          decoding="async"
        />

        {/* Interactive Hanging Brass Bells (Movable on tap/drag/hover for both venues) */}
        <SwayingBell side="left" className="koburam-hanging-bell left" />
        <SwayingBell side="right" className="koburam-hanging-bell right" />

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
            VIEW LOCATION &rarr;
          </a>
        </div>
      </div>

      {/* Live Google Map Snapshot Card right below each Koburam venue */}
      <div className="gmap-card">
        <div className="gmap-frame-wrap">
          <iframe
            title={`${title} Google Map Location`}
            src={embedSrc}
            className="gmap-iframe"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
          <a
            href={mapHref}
            target="_blank"
            rel="noopener noreferrer"
            className="gmap-tap-overlay"
            aria-label={`Open ${mapCaption} in Google Maps`}
          />
        </div>
        <a
          href={mapHref}
          target="_blank"
          rel="noopener noreferrer"
          className="gmap-footer-bar"
        >
          <span className="gmap-pin-label">
            <span aria-hidden="true">&#128205;</span> {mapCaption}
          </span>
          <span className="gmap-open-cta">Open Google Maps &rarr;</span>
        </a>
      </div>
    </article>
  )
}

export default function VenuesSection({ data }) {
  return (
    <section id="venues" className="scroll-sec cream-sec">
      <div className="sec-head reveal">
        <p className="eyebrow">SACRED CELEBRATIONS</p>
        <h2 className="sec-title-italic">Venues &amp; Events</h2>
        <div className="short-gold-line" />
      </div>

      <div className="venues-stack">
        {/* VENUE 1: WEDDING CEREMONY — Sculpted Gold Koburam + Google Map */}
        <KoburamVenueCard
          dateScript="Sunday, 13 December 2026"
          title="Wedding"
          rows={[
            {
              k: 'TIME',
              v: data.muhurtham,
              sub: 'Party starts at 10.00 am',
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
          embedQuery="Subramanya Swamy Temple, Thiruvanchoor, Kottayam, Kerala"
          mapCaption="Subramanya Swamy Temple, Thiruvanchoor"
        />

        {/* VENUE 2: WEDDING RECEPTION — Sculpted Gold Koburam + Google Map */}
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
          embedQuery="9.468097,76.489807"
          mapCaption="Kandathusserry House, Narakathara, Kavalam"
        />
      </div>
    </section>
  )
}
