'use client'

/* Premium front-facing editorial South Indian Groom portrait – detailed, realistic style */
export function FrontGroomArt() {
  return (
    <svg className="solo-fig" viewBox="0 0 200 420" fill="none" aria-label="Vysakh portrait">
      <defs>
        {/* Cream silk shirt fabric gradient */}
        <linearGradient id="gShirt" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#fffef5" />
          <stop offset="30%" stopColor="#f7f0dc" />
          <stop offset="70%" stopColor="#ede2c8" />
          <stop offset="100%" stopColor="#e0d4b6" />
        </linearGradient>
        {/* Realistic skin tone with warmth */}
        <radialGradient id="gSkin" cx="0.5" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#e4b08a" />
          <stop offset="50%" stopColor="#d49b74" />
          <stop offset="100%" stopColor="#b87e58" />
        </radialGradient>
        {/* Rich gold kasavu weave */}
        <linearGradient id="kasavu" x1="0" y1="0" x2="1" y2="0.5">
          <stop offset="0%" stopColor="#c99b30" />
          <stop offset="25%" stopColor="#f0d56c" />
          <stop offset="50%" stopColor="#ffe48a" />
          <stop offset="75%" stopColor="#d4a63e" />
          <stop offset="100%" stopColor="#a07820" />
        </linearGradient>
        {/* Kasavu border pattern fill */}
        <pattern id="kasavuPat" x="0" y="0" width="8" height="6" patternUnits="userSpaceOnUse">
          <rect width="8" height="6" fill="#d4a63e" />
          <path d="M0 3 L4 0 L8 3 L4 6 Z" fill="#ffe48a" opacity="0.6" />
        </pattern>
        {/* Mundu fabric subtle texture */}
        <linearGradient id="gMundu" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fffef8" />
          <stop offset="50%" stopColor="#f8f2e2" />
          <stop offset="100%" stopColor="#ede5d0" />
        </linearGradient>
        {/* Soft shadow filter */}
        <filter id="gShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
          <feOffset dx="0" dy="3" />
          <feComponentTransfer><feFuncA type="linear" slope="0.2" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Hair sheen */}
        <linearGradient id="gHair" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#2a1f1a" />
          <stop offset="40%" stopColor="#1a110e" />
          <stop offset="60%" stopColor="#2d2420" />
          <stop offset="100%" stopColor="#1a110e" />
        </linearGradient>
        {/* Maroon accent */}
        <linearGradient id="gMaroon" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#a82440" />
          <stop offset="100%" stopColor="#6b1428" />
        </linearGradient>
      </defs>

      <g filter="url(#gShadow)">
        {/* Soft ground shadow */}
        <ellipse cx="100" cy="406" rx="38" ry="6" fill="#8c764e" opacity="0.22" />

        {/* Traditional Sandals with detail */}
        <ellipse cx="84" cy="396" rx="12" ry="5.5" fill="#3d2518" />
        <ellipse cx="84" cy="395" rx="10" ry="4" fill="#4e3020" />
        <ellipse cx="116" cy="396" rx="12" ry="5.5" fill="#3d2518" />
        <ellipse cx="116" cy="395" rx="10" ry="4" fill="#4e3020" />
        <path d="M78 390 L84 398 L90 390 M110 390 L116 398 L122 390" stroke="#d4a63e" strokeWidth="1.6" fill="none" />

        {/* Ankles with detail */}
        <path d="M80 376 Q82 376 84 377 L86 376 L88 394 H80 Z" fill="url(#gSkin)" />
        <path d="M112 376 Q114 376 116 377 L118 376 L120 394 H112 Z" fill="url(#gSkin)" />

        {/* ===== KASAVU MUNDU (Dhoti) with realistic draping ===== */}
        <path d="M66 212 Q72 210 100 210 Q128 210 134 212 L136 380 Q118 384 100 384 Q82 384 64 380 Z" fill="url(#gMundu)" stroke="#ddd2b8" strokeWidth="0.8" />
        {/* Vertical fold lines for realism */}
        <line x1="88" y1="214" x2="85" y2="380" stroke="#dcd0b4" strokeWidth="0.7" opacity="0.5" />
        <line x1="100" y1="214" x2="100" y2="380" stroke="#d8ccb0" strokeWidth="0.8" opacity="0.4" />
        <line x1="112" y1="214" x2="115" y2="380" stroke="#dcd0b4" strokeWidth="0.7" opacity="0.5" />
        {/* Horizontal fabric crease highlights */}
        <path d="M70 260 Q100 256 130 260" stroke="#fff" strokeWidth="0.5" opacity="0.3" />
        <path d="M68 310 Q100 306 132 310" stroke="#fff" strokeWidth="0.5" opacity="0.25" />
        {/* Front pleat cascade */}
        <path d="M80 212 L78 290 Q78 300 82 300 L84 212" fill="none" stroke="#cec4a8" strokeWidth="0.6" />
        {/* Wide gold kasavu border at bottom */}
        <rect x="64" y="366" width="72" height="10" fill="url(#kasavuPat)" />
        <rect x="64" y="364" width="72" height="2.5" fill="url(#gMaroon)" />
        <rect x="64" y="376" width="72" height="4" fill="url(#kasavu)" />
        {/* Narrow inner kasavu line */}
        <rect x="78" y="212" width="3.5" height="154" fill="url(#kasavu)" opacity="0.7" />

        {/* ===== ARMS with natural taper ===== */}
        {/* Left arm */}
        <path d="M62 118 Q56 150 52 180 Q50 200 52 220 L60 222 Q64 200 66 180 Q68 150 72 128 Z" fill="url(#gShirt)" stroke="#d8ccac" strokeWidth="0.6" />
        {/* Left hand */}
        <path d="M52 220 Q50 230 54 234 Q58 236 60 232 Q62 228 60 222 Z" fill="url(#gSkin)" />
        {/* Right arm */}
        <path d="M138 118 Q144 150 148 180 Q150 200 148 220 L140 222 Q136 200 134 180 Q132 150 128 128 Z" fill="url(#gShirt)" stroke="#d8ccac" strokeWidth="0.6" />
        {/* Right hand */}
        <path d="M148 220 Q150 230 146 234 Q142 236 140 232 Q138 228 140 222 Z" fill="url(#gSkin)" />

        {/* ===== CREAM SILK SHIRT with tailoring ===== */}
        <path d="M68 108 Q100 100 132 108 L140 128 L134 214 H66 L60 128 Z" fill="url(#gShirt)" stroke="#d8ccac" strokeWidth="0.8" />
        {/* Collar V-neck detail */}
        <path d="M83 102 L100 116 L117 102" fill="#ffffff" stroke="#ddd2b4" strokeWidth="0.8" />
        {/* Center button line */}
        <line x1="100" y1="116" x2="100" y2="214" stroke="#ddd0b6" strokeWidth="0.8" />
        {/* Subtle fabric sheen highlight */}
        <path d="M78 110 Q90 108 100 112 Q110 108 122 110" stroke="#fff" strokeWidth="0.6" opacity="0.35" fill="none" />
        {/* Pocket suggestion */}
        <rect x="110" y="140" width="14" height="12" rx="2" fill="none" stroke="#ddd0b6" strokeWidth="0.6" opacity="0.5" />

        {/* ===== ANGAVASTRAM (shawl) with kasavu weave ===== */}
        <path d="M112 104 L132 110 L134 200 L116 196 Z" fill="#fcfaf2" stroke="#d8ccac" strokeWidth="0.6" />
        {/* Inner kasavu stripes on angavastram */}
        <rect x="114" y="105" width="3" height="90" fill="url(#kasavu)" />
        <rect x="128" y="110" width="3" height="88" fill="url(#kasavu)" />
        {/* Angavastram end detail */}
        <rect x="115" y="188" width="18" height="4" fill="url(#gMaroon)" />
        <rect x="115" y="192" width="18" height="4" fill="url(#kasavu)" />
        {/* Tiny paisley motifs on angavastram */}
        <path d="M120 130 Q122 126 124 130 Q122 132 120 130 Z" fill="#d4a63e" opacity="0.5" />
        <path d="M120 155 Q122 151 124 155 Q122 157 120 155 Z" fill="#d4a63e" opacity="0.5" />

        {/* ===== NECK ===== */}
        <path d="M88 86 H112 L114 106 Q100 112 86 106 Z" fill="url(#gSkin)" />

        {/* ===== HEAD with realistic structure ===== */}
        {/* Ears */}
        <ellipse cx="80" cy="62" rx="3.5" ry="6" fill="#c68e66" />
        <ellipse cx="80" cy="62" rx="2" ry="4" fill="#b4805a" />
        <ellipse cx="120" cy="62" rx="3.5" ry="6" fill="#c68e66" />
        <ellipse cx="120" cy="62" rx="2" ry="4" fill="#b4805a" />
        {/* Face */}
        <path d="M80 52 C80 34 120 34 120 52 C120 72 112 86 100 86 C88 86 80 72 80 52 Z" fill="url(#gSkin)" />
        {/* Jawline shadow */}
        <path d="M84 76 Q100 82 116 76" stroke="#b07a52" strokeWidth="0.7" opacity="0.3" fill="none" />
        {/* Neat front-combed hair with sheen */}
        <path d="M78 56 C76 34 86 26 100 26 C114 26 124 34 122 56 C118 42 110 36 100 37 C90 36 82 42 78 56 Z" fill="url(#gHair)" />
        {/* Hair sheen highlights */}
        <path d="M88 30 Q96 28 104 30" stroke="#3a2e28" strokeWidth="0.8" opacity="0.5" fill="none" />
        <path d="M84 36 Q92 33 100 34" stroke="#3a2e28" strokeWidth="0.5" opacity="0.4" fill="none" />
        {/* Bindi/tilak mark */}
        <circle cx="100" cy="44" r="1.6" fill="#c73e1d" opacity="0.75" />
      </g>
    </svg>
  )
}

/* Premium front-facing editorial South Indian Bride portrait – detailed, realistic style */
export function FrontBrideArt() {
  return (
    <svg className="solo-fig" viewBox="0 0 200 420" fill="none" aria-label="Sandra portrait">
      <defs>
        {/* Rich crimson Kanjeevaram silk saree */}
        <linearGradient id="bSaree" x1="0" y1="0" x2="0.5" y2="1">
          <stop offset="0%" stopColor="#c42040" />
          <stop offset="30%" stopColor="#a81832" />
          <stop offset="60%" stopColor="#8e1228" />
          <stop offset="100%" stopColor="#6b0c1e" />
        </linearGradient>
        {/* Realistic warm skin tone */}
        <radialGradient id="bSkin" cx="0.45" cy="0.4" r="0.6">
          <stop offset="0%" stopColor="#f0be96" />
          <stop offset="45%" stopColor="#dca478" />
          <stop offset="100%" stopColor="#c48a60" />
        </radialGradient>
        {/* Lustrous temple jewelry gold */}
        <linearGradient id="bGold" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#fff4b8" />
          <stop offset="30%" stopColor="#e8c050" />
          <stop offset="60%" stopColor="#d4a638" />
          <stop offset="100%" stopColor="#9a7018" />
        </linearGradient>
        {/* Green pallu accent */}
        <linearGradient id="bGreen" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2d6e3f" />
          <stop offset="100%" stopColor="#1a4a2a" />
        </linearGradient>
        {/* Hair gradient with sheen */}
        <linearGradient id="bHair" x1="0.3" y1="0" x2="0.7" y2="1">
          <stop offset="0%" stopColor="#1e1510" />
          <stop offset="40%" stopColor="#120d0a" />
          <stop offset="65%" stopColor="#221a16" />
          <stop offset="100%" stopColor="#120d0a" />
        </linearGradient>
        {/* Saree zari border pattern */}
        <pattern id="zariPat" x="0" y="0" width="10" height="8" patternUnits="userSpaceOnUse">
          <rect width="10" height="8" fill="#d4a638" />
          <path d="M0 4 L5 0 L10 4 L5 8 Z" fill="#ffe88a" opacity="0.5" />
          <circle cx="5" cy="4" r="1" fill="#c89028" />
        </pattern>
        {/* Soft shadow */}
        <filter id="bShadow" x="-10%" y="-10%" width="120%" height="130%">
          <feGaussianBlur in="SourceAlpha" stdDeviation="2.5" />
          <feOffset dx="0" dy="3" />
          <feComponentTransfer><feFuncA type="linear" slope="0.18" /></feComponentTransfer>
          <feMerge><feMergeNode /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
        {/* Jewelry sparkle */}
        <radialGradient id="jewel" cx="0.5" cy="0.3" r="0.5">
          <stop offset="0%" stopColor="#fff8d0" />
          <stop offset="50%" stopColor="#e8c050" />
          <stop offset="100%" stopColor="#b48828" />
        </radialGradient>
      </defs>

      <g filter="url(#bShadow)">
        {/* Ground shadow */}
        <ellipse cx="100" cy="406" rx="38" ry="6" fill="#8c764e" opacity="0.22" />

        {/* ===== JASMINE GARLAND (Malli Poo) draped from hair ===== */}
        <path d="M78 48 Q72 70 72 90 Q72 108 78 118" stroke="#fffef5" strokeWidth="9" strokeLinecap="round" strokeDasharray="2.5 5.5" />
        <path d="M78 48 Q72 70 72 90 Q72 108 78 118" stroke="#e8e6d8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1.5 6.5" />
        <path d="M122 48 Q128 70 128 90 Q128 108 122 118" stroke="#fffef5" strokeWidth="9" strokeLinecap="round" strokeDasharray="2.5 5.5" />
        <path d="M122 48 Q128 70 128 90 Q128 108 122 118" stroke="#e8e6d8" strokeWidth="1.5" strokeLinecap="round" strokeDasharray="1.5 6.5" />
        {/* Jasmine bud dots */}
        {[52, 64, 76, 90, 104].map((y, i) => (
          <g key={`jl${i}`}>
            <circle cx={72 + (i % 2 ? 1 : -1)} cy={y} r="2" fill="#fdfcf4" opacity="0.9" />
            <circle cx={128 + (i % 2 ? -1 : 1)} cy={y} r="2" fill="#fdfcf4" opacity="0.9" />
          </g>
        ))}

        {/* ===== FEET with anklets ===== */}
        <ellipse cx="88" cy="396" rx="8" ry="5" fill="url(#bSkin)" />
        <ellipse cx="112" cy="396" rx="8" ry="5" fill="url(#bSkin)" />
        {/* Anklets (gold payal) */}
        <path d="M82 392 Q88 390 94 392" stroke="url(#bGold)" strokeWidth="1.8" fill="none" />
        <path d="M106 392 Q112 390 118 392" stroke="url(#bGold)" strokeWidth="1.8" fill="none" />
        {/* Toe rings */}
        <circle cx="85" cy="396" r="1.2" fill="#d4a638" />
        <circle cx="115" cy="396" r="1.2" fill="#d4a638" />

        {/* ===== KANJEEVARAM SAREE SKIRT with realistic draping ===== */}
        <path d="M72 194 H128 L140 390 H60 Z" fill="url(#bSaree)" stroke="#5a0a16" strokeWidth="0.8" />
        {/* Center pleat folds */}
        <path d="M90 198 L87 388" stroke="#480812" strokeWidth="0.9" opacity="0.45" />
        <path d="M96 198 L93 388" stroke="#480812" strokeWidth="0.7" opacity="0.35" />
        <path d="M100 198 V388" stroke="#500a14" strokeWidth="0.8" opacity="0.4" />
        <path d="M104 198 L107 388" stroke="#480812" strokeWidth="0.7" opacity="0.35" />
        <path d="M110 198 L113 388" stroke="#480812" strokeWidth="0.9" opacity="0.45" />
        {/* Fabric sheen highlights */}
        <path d="M78 230 Q96 226 114 230" stroke="#d44060" strokeWidth="0.6" opacity="0.3" fill="none" />
        <path d="M74 290 Q96 286 118 290" stroke="#d44060" strokeWidth="0.5" opacity="0.25" fill="none" />
        {/* Wide antique gold zari border at bottom */}
        <path d="M62 366 H138 L140 390 H60 Z" fill="url(#zariPat)" />
        <path d="M62 370 H138" stroke="#6b0c1e" strokeWidth="1" opacity="0.5" />
        <path d="M61 384 H139" stroke="#6b0c1e" strokeWidth="0.8" opacity="0.4" />
        {/* Maroon accent above zari */}
        <path d="M63 362 H137 L138 366 H62 Z" fill="#6b0c1e" />

        {/* ===== SLENDER ARMS with bangles ===== */}
        {/* Left arm */}
        <path d="M68 126 Q62 158 58 184 Q56 200 58 218 L66 220 Q68 200 70 182 Q74 156 78 134 Z" fill="url(#bSkin)" />
        {/* Right arm */}
        <path d="M132 126 Q138 158 142 184 Q144 200 142 218 L134 220 Q132 200 130 182 Q126 156 122 134 Z" fill="url(#bSkin)" />
        {/* Gold bangles stack - left */}
        <rect x="56" y="200" width="12" height="3" rx="1" fill="url(#bGold)" />
        <rect x="56" y="204" width="12" height="2" rx="1" fill="#c89028" />
        <rect x="56" y="207" width="12" height="3" rx="1" fill="url(#bGold)" />
        <rect x="56" y="211" width="12" height="2" rx="1" fill="#48a060" />
        {/* Gold bangles stack - right */}
        <rect x="132" y="200" width="12" height="3" rx="1" fill="url(#bGold)" />
        <rect x="132" y="204" width="12" height="2" rx="1" fill="#c89028" />
        <rect x="132" y="207" width="12" height="3" rx="1" fill="url(#bGold)" />
        <rect x="132" y="211" width="12" height="2" rx="1" fill="#48a060" />
        {/* Hands */}
        <path d="M58 218 Q56 228 60 232 Q64 234 66 230 Q68 226 66 220 Z" fill="url(#bSkin)" />
        <path d="M142 218 Q144 228 140 232 Q136 234 134 230 Q132 226 134 220 Z" fill="url(#bSkin)" />

        {/* ===== SAREE BLOUSE with embroidery details ===== */}
        <path d="M72 108 Q100 100 128 108 L134 150 H122 L122 196 H78 L78 150 H66 Z" fill="#a41830" stroke="#6b0d1e" strokeWidth="0.8" />
        {/* Blouse embroidery/zari edge */}
        <rect x="65" y="144" width="14" height="4" rx="1" fill="url(#bGold)" />
        <rect x="121" y="144" width="14" height="4" rx="1" fill="url(#bGold)" />
        {/* Neckline detail */}
        <path d="M78 108 Q100 118 122 108" stroke="#6b0d1e" strokeWidth="0.6" fill="none" />

        {/* ===== DIAGONAL GOLD ZARI PALLU draped across ===== */}
        <path d="M74 108 L90 108 L128 240 L114 248 Z" fill="url(#bGold)" opacity="0.88" />
        {/* Pallu decorative lines */}
        <path d="M78 108 L122 244" stroke="#7d1024" strokeWidth="1" opacity="0.6" />
        <path d="M82 108 L126 244" stroke="#8e1228" strokeWidth="0.6" opacity="0.4" />
        {/* Paisley motifs on pallu */}
        <path d="M94 140 Q96 134 98 140 Q96 144 94 140 Z" fill="#fff8c8" opacity="0.5" />
        <path d="M100 170 Q102 164 104 170 Q102 174 100 170 Z" fill="#fff8c8" opacity="0.5" />
        <path d="M108 200 Q110 194 112 200 Q110 204 108 200 Z" fill="#fff8c8" opacity="0.5" />

        {/* ===== GOLD ODDIYANAM WAIST BELT with detail ===== */}
        <rect x="76" y="190" width="48" height="7" rx="3" fill="url(#bGold)" stroke="#8c5f14" strokeWidth="0.6" />
        {/* Belt center gem */}
        <circle cx="100" cy="193.5" r="2.5" fill="url(#jewel)" stroke="#8c5f14" strokeWidth="0.5" />
        {/* Belt side gems */}
        <circle cx="86" cy="193.5" r="1.5" fill="#c73030" stroke="#8c5f14" strokeWidth="0.4" />
        <circle cx="114" cy="193.5" r="1.5" fill="#c73030" stroke="#8c5f14" strokeWidth="0.4" />

        {/* ===== LAYERED TEMPLE NECKLACES ===== */}
        {/* Short choker */}
        <path d="M84 108 Q100 118 116 108" stroke="url(#bGold)" strokeWidth="4" fill="none" />
        {/* Medium necklace */}
        <path d="M78 112 Q100 138 122 112" stroke="url(#bGold)" strokeWidth="3" fill="none" />
        {/* Temple pendant */}
        <path d="M96 128 L100 136 L104 128 Z" fill="url(#jewel)" stroke="#8c5f14" strokeWidth="0.5" />
        <circle cx="100" cy="134" r="2" fill="#c73030" />
        {/* Long necklace */}
        <path d="M82 114 Q100 150 118 114" stroke="url(#bGold)" strokeWidth="2" fill="none" strokeDasharray="2 1.5" />
        {/* Pendant at bottom of long chain */}
        <circle cx="100" cy="142" r="3.5" fill="url(#jewel)" stroke="#8c5f14" strokeWidth="0.6" />

        {/* ===== NECK ===== */}
        <path d="M90 88 H110 L112 106 Q100 112 88 106 Z" fill="url(#bSkin)" />
        {/* Neck shadow */}
        <path d="M92 100 Q100 104 108 100" stroke="#b07a52" strokeWidth="0.5" opacity="0.3" fill="none" />

        {/* ===== GOLD JHUMKA EARRINGS with detail ===== */}
        {/* Left jhumka */}
        <circle cx="80" cy="66" r="2" fill="url(#bGold)" />
        <path d="M77 68 L80 78 L83 68 Z" fill="url(#jewel)" />
        <circle cx="80" cy="76" r="1.5" fill="#c73030" />
        {[70, 73, 76].map((y, i) => <circle key={`jl${i}`} cx={80} cy={y} r="0.8" fill="#fff4b8" opacity="0.7" />)}
        {/* Right jhumka */}
        <circle cx="120" cy="66" r="2" fill="url(#bGold)" />
        <path d="M117 68 L120 78 L123 68 Z" fill="url(#jewel)" />
        <circle cx="120" cy="76" r="1.5" fill="#c73030" />
        {[70, 73, 76].map((y, i) => <circle key={`jr${i}`} cx={120} cy={y} r="0.8" fill="#fff4b8" opacity="0.7" />)}

        {/* ===== HEAD with realistic face shape ===== */}
        <path d="M82 52 C82 34 118 34 118 52 C118 72 110 88 100 88 C90 88 82 72 82 52 Z" fill="url(#bSkin)" />
        {/* Jawline shadow */}
        <path d="M88 80 Q100 86 112 80" stroke="#b07a52" strokeWidth="0.6" opacity="0.25" fill="none" />
        {/* Cheek highlight */}
        <circle cx="90" cy="62" r="4" fill="#f0be96" opacity="0.3" />
        <circle cx="110" cy="62" r="4" fill="#f0be96" opacity="0.3" />

        {/* ===== CENTER-PARTED DARK HAIR with volume ===== */}
        <path d="M80 58 C78 36 86 26 100 26 C114 26 122 36 120 58 C116 44 108 38 100 39 C92 38 84 44 80 58 Z" fill="url(#bHair)" />
        {/* Hair parting line */}
        <line x1="100" y1="27" x2="100" y2="40" stroke="#2a1f18" strokeWidth="1" />
        {/* Hair sheen highlights */}
        <path d="M88 30 Q96 28 104 30" stroke="#3a2e24" strokeWidth="0.8" opacity="0.5" fill="none" />

        {/* ===== MAANG TIKKA (forehead jewelry) ===== */}
        <line x1="100" y1="28" x2="100" y2="42" stroke="url(#bGold)" strokeWidth="1.8" />
        <circle cx="100" cy="43" r="3" fill="url(#jewel)" stroke="#8c5f14" strokeWidth="0.5" />
        <circle cx="100" cy="43" r="1.2" fill="#c73030" />

        {/* ===== BINDI (Kumkum) ===== */}
        <circle cx="100" cy="48" r="1.8" fill="#c42040" />

        {/* ===== NOSE RING ===== */}
        <circle cx="96" cy="64" r="1.5" fill="url(#bGold)" stroke="#8c5f14" strokeWidth="0.3" />
        <circle cx="96" cy="64" r="0.6" fill="#c73030" />
      </g>
    </svg>
  )
}
