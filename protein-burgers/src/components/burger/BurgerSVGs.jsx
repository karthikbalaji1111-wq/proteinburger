export function BottomBunSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bottomBunGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#ffd89c" />
          <stop offset="45%" stopColor="#d48a42" />
          <stop offset="100%" stopColor="#6b3208" />
        </linearGradient>
        <linearGradient id="bottomBunHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#fff6e8" stopOpacity="0" />
          <stop offset="50%" stopColor="#fff6e8" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#fff6e8" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 26,52 C 22,72 48,92 150,94 C 252,92 278,72 274,52 C 272,30 248,18 150,16 C 52,18 28,30 26,52 Z"
        fill="url(#bottomBunGrad)"
      />
      <ellipse cx="150" cy="26" rx="105" ry="12" fill="url(#bottomBunHighlight)" />
      <path
        d="M 38,58 C 55,78 95,86 150,87 C 205,86 245,78 262,58"
        stroke="#5a2806"
        strokeWidth="2"
        strokeLinecap="round"
        opacity="0.35"
      />
    </svg>
  );
}

export function PattySVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 300 90" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="pattyGrad" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#5d3923" />
          <stop offset="35%" stopColor="#3d1d0e" />
          <stop offset="100%" stopColor="#220e06" />
        </linearGradient>
        <linearGradient id="pattyHighlight" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#a87153" stopOpacity="0" />
          <stop offset="50%" stopColor="#a87153" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#a87153" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 22,40 C 20,25 35,15 75,12 C 115,10 185,10 225,12 C 265,15 280,25 278,40 C 275,58 260,70 220,73 C 180,75 120,75 80,73 C 40,70 24,58 22,40 Z"
        fill="url(#pattyGrad)"
      />
      <path
        d="M 25,38 Q 28,42 32,37 Q 36,33 40,39 Q 44,43 48,36 Q 52,30 57,38 Q 62,45 68,39 T 100,38 T 140,39 T 180,37 T 220,39 T 255,36 Q 260,32 264,39 Q 268,44 272,37 Q 275,41 277,46"
        stroke="#231005"
        strokeWidth="4"
        strokeLinecap="round"
      />
      <ellipse cx="150" cy="22" rx="100" ry="6" fill="url(#pattyHighlight)" />
      <path d="M 55,20 L 75,60" stroke="#1c0901" strokeWidth="5.5" strokeLinecap="round" opacity="0.85" />
      <path d="M 95,17 L 118,58" stroke="#1c0901" strokeWidth="5.5" strokeLinecap="round" opacity="0.85" />
      <path d="M 135,16 L 160,57" stroke="#1c0901" strokeWidth="5.5" strokeLinecap="round" opacity="0.85" />
      <path d="M 175,17 L 202,58" stroke="#1c0901" strokeWidth="5.5" strokeLinecap="round" opacity="0.85" />
      <path d="M 215,20 L 240,61" stroke="#1c0901" strokeWidth="5.5" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
}

export function CheeseSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 300 100" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="cheeseGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffd83b" />
          <stop offset="60%" stopColor="#f5a623" />
          <stop offset="100%" stopColor="#c56000" />
        </linearGradient>
      </defs>
      <path
        d="M 32,35 C 45,34 60,33 80,38 C 90,40 92,48 94,54 C 96,62 98,72 102,74 C 105,75 108,72 109,64 C 112,48 115,36 140,35 C 165,34 185,35 198,39 C 202,40 204,44 206,58 C 208,68 210,82 215,84 C 219,85 221,80 223,70 C 226,52 230,36 248,34 C 258,33 268,34 270,35 C 272,36 270,42 268,45 C 255,56 245,65 244,72 C 243,76 245,79 248,77 C 252,75 258,68 264,58 C 267,52 270,42 272,36 C 274,30 265,22 250,20 C 215,16 90,16 52,20 C 38,22 30,30 32,35 Z"
        fill="url(#cheeseGrad)"
      />
      <path
        d="M 55,24 C 85,20 185,20 245,24 C 248,24 246,26 240,26 C 185,25 85,25 55,26 C 52,26 50,24 55,24 Z"
        fill="#fff5cc"
        opacity="0.35"
      />
    </svg>
  );
}

export function LettuceSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 300 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="lettuceGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#43a047" />
          <stop offset="50%" stopColor="#7cb342" />
          <stop offset="100%" stopColor="#2e7d32" />
        </linearGradient>
      </defs>
      <path
        d="M 20,40 Q 28,30 35,38 Q 45,48 55,34 Q 62,20 75,28 Q 88,38 100,28 Q 112,18 130,26 Q 145,34 160,24 Q 175,14 190,26 Q 205,38 220,26 Q 235,14 250,30 Q 262,42 272,32 Q 280,24 282,38 C 284,50 270,55 240,58 C 200,62 100,62 60,58 C 30,55 18,50 20,40 Z"
        fill="url(#lettuceGrad)"
      />
      <path d="M 135,50 Q 142,34 150,32" stroke="#aed581" strokeWidth="2.5" strokeLinecap="round" opacity="0.55" />
    </svg>
  );
}

export function SauceSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="sauceGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff853f" />
          <stop offset="60%" stopColor="#e35f2d" />
          <stop offset="100%" stopColor="#b52215" />
        </linearGradient>
      </defs>
      <path
        d="M 52,18 Q 65,22 75,18 C 77,24 80,36 82,38 C 84,40 86,40 87,36 C 89,28 92,20 105,18 Q 120,20 135,16 C 137,22 140,42 143,45 C 146,47 148,46 150,40 C 153,28 156,20 170,18 Q 192,22 210,18 C 212,24 214,34 216,36 C 218,38 220,37 222,32 C 225,26 228,20 242,18 C 255,16 262,22 265,18 C 268,14 255,10 240,8 C 200,5 100,5 60,8 C 45,10 40,14 52,18 Z"
        fill="url(#sauceGrad)"
      />
      <path d="M 60,12 C 100,9 200,9 240,12" stroke="#ffebc2" strokeWidth="1.5" strokeLinecap="round" opacity="0.35" />
    </svg>
  );
}

export function TomatoesSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 300 70" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="tomatoOuterGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff3f35" />
          <stop offset="100%" stopColor="#9e0d06" />
        </linearGradient>
        <linearGradient id="tomatoInnerGrad" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ff554c" />
          <stop offset="100%" stopColor="#c2130a" />
        </linearGradient>
      </defs>
      <g transform="translate(10, 0)">
        <ellipse cx="95" cy="38" rx="65" ry="24" fill="url(#tomatoOuterGrad)" />
        <ellipse cx="95" cy="38" rx="55" ry="18" fill="url(#tomatoInnerGrad)" />
        <path d="M 45,30 C 50,22 75,20 95,21 C 80,21 55,23 48,32 Z" fill="#ffffff" opacity="0.6" />
      </g>
      <g transform="translate(10, 0)">
        <ellipse cx="190" cy="30" rx="65" ry="24" fill="url(#tomatoOuterGrad)" />
        <ellipse cx="190" cy="30" rx="55" ry="18" fill="url(#tomatoInnerGrad)" />
        <path d="M 140,22 C 145,14 170,12 190,13 C 175,13 150,15 143,24 Z" fill="#ffffff" opacity="0.6" />
      </g>
    </svg>
  );
}

export function OnionsSVG({ className }) {
  return (
    <svg className={className} viewBox="0 0 300 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="onionRim" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ab3c78" />
          <stop offset="100%" stopColor="#62103f" />
        </linearGradient>
        <linearGradient id="onionBody" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#fff4f9" />
          <stop offset="100%" stopColor="#e3c2d4" />
        </linearGradient>
      </defs>
      <g transform="translate(45, 12) rotate(-6 70 20)">
        <mask id="onionMask1">
          <rect width="300" height="60" fill="#fff" />
          <ellipse cx="60" cy="20" rx="30" ry="8" fill="#000" />
        </mask>
        <ellipse cx="60" cy="20" rx="42" ry="15" fill="url(#onionRim)" mask="url(#onionMask1)" />
        <ellipse cx="60" cy="20" rx="38" ry="12" fill="url(#onionBody)" mask="url(#onionMask1)" />
      </g>
      <g transform="translate(10, 5) rotate(4 140 22)">
        <mask id="onionHole2">
          <rect width="300" height="60" fill="#fff" />
          <ellipse cx="140" cy="22" rx="36" ry="10" fill="#000" />
        </mask>
        <ellipse cx="140" cy="22" rx="48" ry="17" fill="url(#onionRim)" mask="url(#onionHole2)" />
        <ellipse cx="140" cy="22" rx="44" ry="14" fill="url(#onionBody)" mask="url(#onionHole2)" />
      </g>
    </svg>
  );
}

export function TopBunSVG({ className }) {
  const sesames = [
    { x: 70, y: 35, r: 12 },
    { x: 110, y: 18, r: 30 },
    { x: 150, y: 14, r: 8 },
    { x: 195, y: 22, r: -60 },
    { x: 125, y: 28, r: -35 },
    { x: 165, y: 29, r: -8 },
    { x: 145, y: 64, r: -45 },
  ];

  return (
    <svg className={className} viewBox="0 0 300 130" fill="none" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <radialGradient id="topBunGrad" cx="45%" cy="30%" r="60%">
          <stop offset="0%" stopColor="#ffd89c" />
          <stop offset="35%" stopColor="#e5a460" />
          <stop offset="75%" stopColor="#b46321" />
          <stop offset="100%" stopColor="#682b04" />
        </radialGradient>
        <linearGradient id="specularGlow" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
        </linearGradient>
      </defs>
      <path
        d="M 28,88 C 22,60 52,15 150,15 C 248,15 278,60 272,88 C 272,88 266,104 150,104 C 34,104 28,88 28,88 Z"
        fill="url(#topBunGrad)"
      />
      <path
        d="M 38,70 C 34,50 60,22 135,20 C 85,24 50,48 48,74 C 48,75 42,75 38,70 Z"
        fill="url(#specularGlow)"
      />
      {sesames.map((seed, idx) => (
        <g key={idx} transform={`translate(${seed.x}, ${seed.y}) rotate(${seed.r})`}>
          <path
            d="M 0,-3.5 C 1.5,-3.5 2.5,-1 2.5,1.5 C 2.5,3.5 1.5,4 0,4 C -1.5,4 -2.5,3.5 -2.5,1.5 C -2.5,-1 -1.5,-3.5 0,-3.5 Z"
            fill="#fff6e8"
          />
        </g>
      ))}
    </svg>
  );
}
