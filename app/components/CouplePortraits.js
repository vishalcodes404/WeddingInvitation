'use client'

/* Front-facing editorial South Indian Groom portrait matching sunil-santhiya style */
export function FrontGroomArt() {
  return (
    <svg className="solo-fig" viewBox="0 0 180 390" fill="none" aria-label="Vysakh portrait">
      <defs>
        <linearGradient id="gShirt" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="65%" stopColor="#f7f2e6" />
          <stop offset="100%" stopColor="#e8dec9" />
        </linearGradient>
        <linearGradient id="gSkin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#d9a17c" />
          <stop offset="55%" stopColor="#cb906a" />
          <stop offset="100%" stopColor="#b57a55" />
        </linearGradient>
        <linearGradient id="kasavu" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#b6862e" />
          <stop offset="50%" stopColor="#ebd07e" />
          <stop offset="100%" stopColor="#9d7022" />
        </linearGradient>
      </defs>

      {/* Soft ground shadow */}
      <ellipse cx="90" cy="378" rx="34" ry="5.5" fill="#9c8663" opacity="0.28" />

      {/* Traditional Sandals */}
      <ellipse cx="77" cy="370" rx="10" ry="5" fill="#3a2315" />
      <ellipse cx="103" cy="370" rx="10" ry="5" fill="#3a2315" />
      <path d="M71 365 L77 372 L83 365 M97 365 L103 372 L109 365" stroke="#c89a48" strokeWidth="1.8" />

      {/* Ankles */}
      <path d="M73 354 H81 L82 368 H72 Z" fill="url(#gSkin)" />
      <path d="M99 354 H107 L108 368 H98 Z" fill="url(#gSkin)" />

      {/* Tailored White/Cream Kasavu Mundu (Dhoti) */}
      <path d="M62 194 H118 L120 356 H60 Z" fill="url(#gShirt)" stroke="#d0c2a4" strokeWidth="1" />
      {/* Center seam & fold shadow */}
      <line x1="90" y1="196" x2="90" y2="356" stroke="#d5c6a8" strokeWidth="1" />
      <rect x="74" y="194" width="3" height="162" fill="url(#kasavu)" opacity="0.78" />
      <rect x="60" y="344" width="60" height="7" fill="url(#kasavu)" />
      <rect x="60" y="341" width="60" height="2" fill="#8b2238" />

      {/* Tapered Arms & Hands */}
      <path d="M56 102 L48 164 L49 204 L57 204 L61 164 L64 114 Z" fill="url(#gShirt)" stroke="#d0c2a4" strokeWidth="0.9" />
      <path d="M124 102 L132 164 L131 204 L123 204 L119 164 L116 114 Z" fill="url(#gShirt)" stroke="#d0c2a4" strokeWidth="0.9" />
      <path d="M49 204 C48 214, 52 220, 56 218 C58 215, 57 207, 57 204 Z" fill="url(#gSkin)" />
      <path d="M131 204 C132 214, 128 220, 124 218 C122 215, 123 207, 123 204 Z" fill="url(#gSkin)" />

      {/* Tailored Ivory Silk Shirt */}
      <path d="M62 94 Q90 88 118 94 L126 112 L119 196 H61 L54 112 Z" fill="url(#gShirt)" stroke="#d0c2a4" strokeWidth="1" />
      <path d="M77 88 L90 98 L103 88" fill="#ffffff" stroke="#d0c2a4" strokeWidth="0.9" />
      <line x1="90" y1="98" x2="90" y2="196" stroke="#ddd0b6" strokeWidth="1" />

      {/* Gold & Maroon Angavastram draped gracefully over left shoulder */}
      <path d="M101 90 L118 95 L120 184 L104 180 Z" fill="#fcfaf2" stroke="#d5c6a8" strokeWidth="0.8" />
      <rect x="103" y="91" width="3" height="88" fill="url(#kasavu)" />
      <rect x="115" y="95" width="3" height="88" fill="url(#kasavu)" />
      <rect x="104" y="172" width="16" height="6" fill="#8f2035" />
      <rect x="104" y="178" width="16" height="4" fill="url(#kasavu)" />

      {/* Neck & Clean Editorial Faceless Head */}
      <path d="M82 74 H98 L100 92 Q90 98 80 92 Z" fill="url(#gSkin)" />
      <ellipse cx="75" cy="56" rx="2.8" ry="5.5" fill="#bc825d" />
      <ellipse cx="105" cy="56" rx="2.8" ry="5.5" fill="#bc825d" />
      <path d="M75 46 C75 30, 105 30, 105 46 C105 64, 98 76, 90 76 C82 76, 75 64, 75 46 Z" fill="url(#gSkin)" />
      {/* Neat Front Hair */}
      <path d="M74 49 C72 30, 82 24, 91 24 C102 24, 108 32, 106 49 C103 38, 96 34, 89 35 C81 34, 76 39, 74 49 Z" fill="#1d1614" />
    </svg>
  )
}

/* Front-facing editorial South Indian Bride portrait matching sunil-santhiya style */
export function FrontBrideArt() {
  return (
    <svg className="solo-fig" viewBox="0 0 180 390" fill="none" aria-label="Sandra portrait">
      <defs>
        <linearGradient id="bSaree" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#b41e3e" />
          <stop offset="55%" stopColor="#8e132d" />
          <stop offset="100%" stopColor="#630b1e" />
        </linearGradient>
        <linearGradient id="bSkin" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%" stopColor="#e4ae88" />
          <stop offset="55%" stopColor="#d79b73" />
          <stop offset="100%" stopColor="#c0845d" />
        </linearGradient>
        <linearGradient id="bGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff0ad" />
          <stop offset="50%" stopColor="#d4a242" />
          <stop offset="100%" stopColor="#936518" />
        </linearGradient>
      </defs>

      <ellipse cx="90" cy="378" rx="34" ry="5.5" fill="#9c8663" opacity="0.28" />

      {/* Lush White Jasmine Garland (Malli Poo) behind shoulders & hair */}
      <path d="M72 44 C66 64, 66 86, 72 98 M108 44 C114 64, 114 86, 108 98" stroke="#fffef8" strokeWidth="8.5" strokeLinecap="round" strokeDasharray="2 6" />
      <path d="M72 44 C66 64, 66 86, 72 98 M108 44 C114 64, 114 86, 108 98" stroke="#d4dec6" strokeWidth="2" strokeLinecap="round" strokeDasharray="1 7" />

      {/* Feet */}
      <ellipse cx="81" cy="370" rx="7" ry="4.5" fill="url(#bSkin)" />
      <ellipse cx="99" cy="370" rx="7" ry="4.5" fill="url(#bSkin)" />
      <path d="M76 368 H86 M94 368 H104" stroke="url(#bGold)" strokeWidth="1.4" />

      {/* Crimson Kanjeevaram Saree Skirt (Slim Draped Front Silhouette) */}
      <path d="M68 176 H112 L124 365 H56 Z" fill="url(#bSaree)" stroke="#680c20" strokeWidth="1" />
      {/* Center pleats */}
      <path d="M84 180 L81 364 M90 180 V364 M96 180 L99 364" stroke="#530818" strokeWidth="1" opacity="0.55" />
      {/* Wide Antique Gold Zari Border */}
      <path d="M57 344 H123 L124 365 H56 Z" fill="url(#bGold)" />
      <path d="M57 349 H123 M56 360 H124" stroke="#680c20" strokeWidth="1.1" opacity="0.65" />

      {/* Slender Arms & Gold Bangles */}
      <path d="M62 110 L54 166 L55 202 L62 202 L66 164 L70 120 Z" fill="url(#bSkin)" />
      <path d="M118 110 L126 166 L125 202 L118 202 L114 164 L110 120 Z" fill="url(#bSkin)" />
      <rect x="54" y="186" width="9" height="8" rx="2" fill="url(#bGold)" />
      <rect x="117" y="186" width="9" height="8" rx="2" fill="url(#bGold)" />
      <path d="M55 202 C54 210, 58 215, 61 213 C63 210, 62 204, 62 202 Z" fill="url(#bSkin)" />
      <path d="M125 202 C126 210, 122 215, 119 213 C117 210, 118 204, 118 202 Z" fill="url(#bSkin)" />

      {/* Saree Blouse */}
      <path d="M66 96 Q90 90 114 96 L120 138 H108 L108 176 H72 L72 138 H60 Z" fill="#941630" stroke="#6b0d20" strokeWidth="1" />
      <rect x="59" y="132" width="13" height="5" fill="url(#bGold)" />
      <rect x="108" y="132" width="13" height="5" fill="url(#bGold)" />

      {/* Draped Diagonal Gold Zari Pallu */}
      <path d="M68 96 L83 96 L116 218 L104 226 Z" fill="url(#bGold)" opacity="0.92" />
      <path d="M72 96 L113 221" stroke="#7d1026" strokeWidth="1.2" />

      {/* Gold Oddiyanam Waist Belt */}
      <rect x="70" y="172" width="40" height="6" rx="2.5" fill="url(#bGold)" stroke="#8c5f14" strokeWidth="0.7" />

      {/* Layered Gold Temple Necklaces */}
      <path d="M78 96 Q90 110 102 96" stroke="url(#bGold)" strokeWidth="3.5" fill="none" />
      <path d="M73 100 Q90 132 107 100" stroke="url(#bGold)" strokeWidth="3" fill="none" />
      <circle cx="90" cy="118" r="3.8" fill="url(#bGold)" stroke="#8c1830" strokeWidth="0.9" />

      {/* Neck & Clean Editorial Faceless Head */}
      <path d="M83 76 H97 L99 94 Q90 98 81 94 Z" fill="url(#bSkin)" />
      {/* Gold Jhumkas */}
      <path d="M74 58 L71 69 H77 Z M106 58 L103 69 H109 Z" fill="url(#bGold)" />
      {/* Face */}
      <path d="M76 48 C76 32, 104 32, 104 48 C104 65, 97 77, 90 77 C83 77, 76 65, 76 48 Z" fill="url(#bSkin)" />
      {/* Center-parted Dark Hair & Gold Maang Tikka */}
      <path d="M74 54 C72 32, 81 25, 90 25 C99 25, 108 32, 106 54 C102 40, 96 36, 90 36 C84 36, 78 40, 74 54 Z" fill="#1a1311" />
      <line x1="90" y1="26" x2="90" y2="37" stroke="url(#bGold)" strokeWidth="1.6" />
      <circle cx="90" cy="39" r="2.4" fill="url(#bGold)" />
    </svg>
  )
}
