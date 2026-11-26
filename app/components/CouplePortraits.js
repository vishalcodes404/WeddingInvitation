'use client'

/* Front-facing South Indian Groom in Kerala Kasavu Kurta, Mundu & Angavastram */
export function FrontGroomArt() {
  return (
    <svg className="solo-fig" viewBox="0 0 180 370" fill="none" aria-label="Vysakh portrait">
      <defs>
        <linearGradient id="gShirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fffef8" />
          <stop offset="65%" stopColor="#f5eedc" />
          <stop offset="100%" stopColor="#e5d7bb" />
        </linearGradient>
        <linearGradient id="gSkin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e2ae88" />
          <stop offset="55%" stopColor="#d49a73" />
          <stop offset="100%" stopColor="#be825c" />
        </linearGradient>
        <linearGradient id="kasavu" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b88934" />
          <stop offset="50%" stopColor="#edd180" />
          <stop offset="100%" stopColor="#a37626" />
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="90" cy="356" rx="44" ry="7" fill="#b49d78" opacity="0.28" />

      {/* Traditional Leather Sandals */}
      <ellipse cx="70" cy="349" rx="14" ry="5.5" fill="#5e3820" />
      <ellipse cx="110" cy="349" rx="14" ry="5.5" fill="#5e3820" />
      <path d="M62 346 Q70 340 78 346 M102 346 Q110 340 118 346" stroke="#c89a4b" strokeWidth="2" />

      {/* Feet */}
      <path d="M64 335 H77 L78 348 H63 Z" fill="url(#gSkin)" />
      <path d="M103 335 H116 L117 348 H102 Z" fill="url(#gSkin)" />

      {/* Kerala Kasavu Mundu (Front Pleated Dhoti) */}
      <path d="M54 196 H126 L130 338 H50 Z" fill="url(#gShirt)" stroke="#cbb994" strokeWidth="1" />
      {/* Center pleats */}
      <path d="M84 198 V338 M96 198 V338" stroke="#d4c4a2" strokeWidth="1" />
      {/* Gold Kasavu border & bottom trim */}
      <rect x="50" y="324" width="80" height="8" fill="url(#kasavu)" />
      <rect x="50" y="321" width="80" height="2" fill="#8b2238" />
      <rect x="87" y="200" width="6" height="124" fill="url(#kasavu)" opacity="0.7" />

      {/* Front-facing Hands */}
      <rect x="38" y="160" width="14" height="44" rx="6" fill="url(#gSkin)" />
      <rect x="128" y="160" width="14" height="44" rx="6" fill="url(#gSkin)" />
      <circle cx="45" cy="204" r="6" fill="url(#gSkin)" />
      <circle cx="135" cy="204" r="6" fill="url(#gSkin)" />

      {/* Ivory Silk Shirt / Kurta (Front View) */}
      <path d="M50 88 Q90 80 130 88 L142 165 H126 L124 202 H56 L54 165 H38 Z" fill="url(#gShirt)" stroke="#cbb892" strokeWidth="1" />
      {/* Mandarin collar & gold placket */}
      <rect x="78" y="78" width="24" height="12" rx="4" fill="#f7efe0" stroke="#c89e4c" strokeWidth="1.1" />
      <line x1="90" y1="90" x2="90" y2="140" stroke="#d5bc8a" strokeWidth="1.2" />
      {[98, 110, 122, 134].map((by) => (
        <circle key={by} cx="90" cy={by} r="1.6" fill="#b48535" />
      ))}

      {/* Angavastram (Gold & Maroon Kasavu Shawl over Right/Left Shoulder) */}
      <path d="M104 84 L126 88 L124 196 L104 194 Z" fill="#fffdf6" stroke="#d2bc8e" strokeWidth="0.9" />
      <rect x="106" y="85" width="4" height="110" fill="url(#kasavu)" />
      <rect x="120" y="88" width="4" height="108" fill="url(#kasavu)" />
      <rect x="104" y="184" width="20" height="5" fill="#8b2238" />
      <rect x="104" y="190" width="20" height="4" fill="url(#kasavu)" />

      {/* Neck & Straight Front-Facing Head */}
      <rect x="81" y="64" width="18" height="20" rx="6" fill="url(#gSkin)" />
      {/* Ears */}
      <ellipse cx="67" cy="48" rx="4" ry="7" fill="#c98e68" />
      <ellipse cx="113" cy="48" rx="4" ry="7" fill="#c98e68" />
      {/* Face */}
      <path d="M68 38 C68 20, 112 20, 112 38 C112 58, 102 70, 90 70 C78 70, 68 58, 68 38 Z" fill="url(#gSkin)" />
      {/* Neat Front Hair */}
      <path d="M67 42 C64 20, 78 12, 92 12 C108 12, 116 22, 113 42 C110 28, 100 24, 90 25 C78 24, 70 30, 67 42 Z" fill="#231a16" />
      {/* Subtle Chandanam Tilak & Front Facial Features */}
      <rect x="89" y="29" width="2" height="6" rx="1" fill="#8b2238" />
      <path d="M75 39 Q80 37 84 39 M96 39 Q100 37 105 39" stroke="#2c201b" strokeWidth="1.6" strokeLinecap="round" />
      <ellipse cx="80" cy="44" rx="2.3" ry="1.8" fill="#231a16" />
      <ellipse cx="100" cy="44" rx="2.3" ry="1.8" fill="#231a16" />
      <path d="M88 51 L90 54 L92 51" stroke="#b57a55" strokeWidth="1.2" strokeLinecap="round" fill="none" />
      <path d="M84 59 Q90 63 96 59" stroke="#964b42" strokeWidth="1.6" strokeLinecap="round" fill="none" />
    </svg>
  )
}

/* Front-facing South Indian Bride in Crimson-Maroon Kanjeevaram Saree & Gold Jewellery */
export function FrontBrideArt() {
  return (
    <svg className="solo-fig" viewBox="0 0 180 370" fill="none" aria-label="Sandra portrait">
      <defs>
        <linearGradient id="bSaree" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b92344" />
          <stop offset="55%" stopColor="#941733" />
          <stop offset="100%" stopColor="#690e22" />
        </linearGradient>
        <linearGradient id="bSkin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#ebba98" />
          <stop offset="55%" stopColor="#dfa680" />
          <stop offset="100%" stopColor="#ca8f69" />
        </linearGradient>
        <linearGradient id="bGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff0ad" />
          <stop offset="50%" stopColor="#d4a242" />
          <stop offset="100%" stopColor="#936518" />
        </linearGradient>
      </defs>

      <ellipse cx="90" cy="356" rx="44" ry="7" fill="#b49d78" opacity="0.28" />

      {/* Jasmine Garland Behind Shoulders */}
      <path d="M62 42 C56 64, 58 84, 65 96 M118 42 C124 64, 122 84, 115 96" stroke="#fffdf7" strokeWidth="8" strokeLinecap="round" strokeDasharray="2 7" />

      {/* Feet */}
      <ellipse cx="78" cy="346" rx="8" ry="6" fill="url(#bSkin)" />
      <ellipse cx="102" cy="346" rx="8" ry="6" fill="url(#bSkin)" />
      <path d="M72 344 H84 M96 344 H108" stroke="url(#bGold)" strokeWidth="1.5" />

      {/* Crimson Kanjeevaram Saree Skirt (Front Pleated) */}
      <path d="M58 176 H122 L134 342 H46 Z" fill="url(#bSaree)" stroke="#751128" strokeWidth="1" />
      {/* Center pleats */}
      <path d="M84 180 L80 342 M90 180 V342 M96 180 L100 342" stroke="#610c1f" strokeWidth="1.1" opacity="0.55" />
      {/* Wide Antique Gold Zari Hem */}
      <path d="M48 318 H132 L134 342 H46 Z" fill="url(#bGold)" />
      <path d="M47 324 H133 M46 336 H134" stroke="#751128" strokeWidth="1.2" opacity="0.65" />

      {/* Front Blouse & Arms */}
      <path d="M45 142 L56 196 H66 L62 142 Z" fill="url(#bSkin)" />
      <path d="M135 142 L124 196 H114 L118 142 Z" fill="url(#bSkin)" />
      {/* Gold Bangles */}
      <rect x="52" y="182" width="12" height="7" rx="2" fill="url(#bGold)" />
      <rect x="116" y="182" width="12" height="7" rx="2" fill="url(#bGold)" />
      <circle cx="60" cy="200" r="5.5" fill="url(#bSkin)" />
      <circle cx="120" cy="200" r="5.5" fill="url(#bSkin)" />

      {/* Saree Blouse */}
      <path d="M56 90 Q90 84 124 90 L136 144 H118 L118 176 H62 L62 144 H44 Z" fill="#9a1936" stroke="#720f24" strokeWidth="1" />
      <rect x="44" y="138" width="18" height="6" fill="url(#bGold)" />
      <rect x="118" y="138" width="18" height="6" fill="url(#bGold)" />

      {/* Diagonal Gold Pallu Drape */}
      <path d="M58 90 L76 90 L124 222 L110 232 Z" fill="url(#bGold)" opacity="0.92" />
      <path d="M62 90 L120 225" stroke="#85132b" strokeWidth="1.4" />

      {/* Gold Oddiyanam Waist Belt */}
      <rect x="60" y="172" width="60" height="7" rx="3" fill="url(#bGold)" stroke="#8c5f14" strokeWidth="0.8" />

      {/* Layered Gold Temple Necklaces */}
      <path d="M74 88 Q90 104 106 88" stroke="url(#bGold)" strokeWidth="4" fill="none" />
      <path d="M68 92 Q90 132 112 92" stroke="url(#bGold)" strokeWidth="3.5" fill="none" />
      <circle cx="90" cy="116" r="4.5" fill="url(#bGold)" stroke="#8c1830" strokeWidth="1" />

      {/* Neck & Straight Front-Facing Head */}
      <rect x="82" y="66" width="16" height="22" rx="6" fill="url(#bSkin)" />
      {/* Gold Jhumkas */}
      <path d="M66 50 L62 64 H70 Z M114 50 L110 64 H118 Z" fill="url(#bGold)" />
      {/* Face */}
      <path d="M69 40 C69 22, 111 22, 111 40 C111 58, 101 70, 90 70 C79 70, 69 58, 69 40 Z" fill="url(#bSkin)" />
      {/* Center-parted Dark Hair & Maang Tikka */}
      <path d="M67 46 C65 20, 77 13, 90 13 C103 13, 115 20, 113 46 C108 30, 98 25, 90 24 C82 25, 72 30, 67 46 Z" fill="#1e1613" />
      <line x1="90" y1="15" x2="90" y2="27" stroke="url(#bGold)" strokeWidth="2" />
      <circle cx="90" cy="29" r="3" fill="url(#bGold)" />
      {/* Bindi & Front Smile */}
      <circle cx="90" cy="36" r="1.8" fill="#a81834" />
      <path d="M76 40 Q81 38 85 40 M95 40 Q99 38 104 40" stroke="#261c18" strokeWidth="1.5" strokeLinecap="round" />
      <ellipse cx="80.5" cy="45" rx="2.2" ry="1.8" fill="#1e1613" />
      <ellipse cx="99.5" cy="45" rx="2.2" ry="1.8" fill="#1e1613" />
      <path d="M88 52 L90 55 L92 52" stroke="#bd825f" strokeWidth="1.1" strokeLinecap="round" fill="none" />
      <path d="M84 60 Q90 64 96 60" stroke="#a63646" strokeWidth="1.7" strokeLinecap="round" fill="none" />
    </svg>
  )
}
