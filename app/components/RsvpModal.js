'use client'
import { useState } from 'react'

export default function RsvpModal({ open, onClose, data }) {
  const [name, setName] = useState('')
  const [guests, setGuests] = useState('2')
  const [eventChoice, setEventChoice] = useState('Temple Muhurtham & Reception')
  const [sent, setSent] = useState(false)

  if (!open) return null

  const downloadIcs = () => {
    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Vysakh & Sandra Wedding//EN',
      'BEGIN:VEVENT',
      'DTSTART:20261213T062100Z',
      'DTEND:20261213T080000Z',
      'SUMMARY:Wedding of Vysakh & Sandra',
      'LOCATION:Subramanya Swamy Temple, Thiruvanchoor, Kottayam, Kerala',
      'DESCRIPTION:Muhurtham 11:51 AM - 12:15 PM, followed by lunch. Reception 6:00 PM - 10:00 PM at Kandathusserry House, Narakathara P.O., Kavalam, Alappuzha.',
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n')
    const blob = new Blob([ics], { type: 'text/calendar;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'Vysakh-Sandra-Wedding.ics'
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setSent(true)
    const msg = encodeURIComponent(
      `Namaskaram! Warmest wishes to Vysakh & Sandra. ${name || 'We'} (${guests} guests) will be attending: ${eventChoice}.`
    )
    window.open(`https://wa.me/91${data.phones[0]}?text=${msg}`, '_blank', 'noopener,noreferrer')
  }

  return (
    <div className="modal-backdrop" role="dialog" aria-modal="true" aria-label="Full Wedding Details and RSVP">
      <div className="modal-card">
        <button type="button" className="modal-close" onClick={onClose} aria-label="Close">
          ✕
        </button>

        <p className="cin-sm" style={{ color: 'var(--rose)', letterSpacing: '0.18em' }}>
          FULL INVITATION &amp; RSVP
        </p>
        <h3 className="script-title" style={{ fontSize: 38, marginTop: 2 }}>
          {data.groom} &amp; {data.bride}
        </h3>

        <div className="modal-block">
          <p>
            <strong>Muhurtham:</strong> {data.weekday}, {data.day} December {data.year} ({data.malayalam}) •{' '}
            {data.muhurtham}
          </p>
          <p>
            <strong>Temple Venue:</strong> {data.venue}, {data.place} (followed by lunch)
          </p>
          <p>
            <strong>Party Leaves:</strong> {data.partyLeaves}
          </p>
          <p>
            <strong>Reception:</strong> Same day {data.reception} at {data.groomHome}
          </p>
          <p>
            <strong>Sharing the Happiness:</strong> {data.sharing.join(', ')}
          </p>
        </div>

        <div className="modal-actions">
          <a className="btn-pill-sm" href={data.templeMap} target="_blank" rel="noopener noreferrer">
            Temple Map
          </a>
          <a className="btn-pill-sm" href={data.residenceMap} target="_blank" rel="noopener noreferrer">
            Residence Map
          </a>
          <button type="button" className="btn-pill-sm" onClick={downloadIcs}>
            Save to Calendar
          </button>
        </div>

        <form onSubmit={handleSubmit} className="modal-form">
          <input
            type="text"
            required
            placeholder="Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 8 }}>
            <select value={guests} onChange={(e) => setGuests(e.target.value)}>
              {['1 Guest', '2 Guests', '3 Guests', '4 Guests', '5+ Guests'].map((g) => (
                <option key={g} value={g[0]}>
                  {g}
                </option>
              ))}
            </select>
            <select value={eventChoice} onChange={(e) => setEventChoice(e.target.value)}>
              <option>Temple Muhurtham &amp; Reception</option>
              <option>Temple Muhurtham</option>
              <option>Evening Reception</option>
            </select>
          </div>
          <button type="submit" className="btn-pill-sm primary">
            Confirm via WhatsApp
          </button>
          {sent && <p className="sent-note">Opening WhatsApp — thank you for your blessings!</p>}
        </form>

        <div className="modal-actions" style={{ marginTop: 10 }}>
          {data.phones.map((p) => (
            <a key={p} className="btn-pill-sm" href={`tel:+91${p}`}>
              Call {p.slice(0, 5)} {p.slice(5)}
            </a>
          ))}
        </div>
      </div>
    </div>
  )
}
