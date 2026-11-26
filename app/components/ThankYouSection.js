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
        <img src="/art/kalash-side.png" alt="" className="kalash-side-img" aria-hidden="true" />
        <div className="ty-names-stack">
          <span className="ty-name">{data.groom}</span>
          <span className="ty-amp">&amp;</span>
          <span className="ty-name">{data.bride}</span>
        </div>
        <img src="/art/kalash-side.png" alt="" className="kalash-side-img" aria-hidden="true" />
      </div>

      <div className="short-gold-line" style={{ margin: '18px auto 14px' }} />

      <p className="ty-wish reveal">Wishing you a lifetime of love and happiness.</p>

      <div className="ty-families reveal">
        <p>WITH LOVE • MR. BAIJU S. &amp; MRS. RADHA BAIJU</p>
        <p>MR. PRAMOD T.M. &amp; MRS. SUDHA PRAMOD</p>
        <p className="ty-date">13 • 12 • 2026</p>
      </div>

      {/* Painted Palace Colonnade Strip at Bottom */}
      <img src="/art/palace-footer.jpg" alt="" className="ty-palace-img" aria-hidden="true" />
    </footer>
  )
}
