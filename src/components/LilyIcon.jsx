export default function LilyIcon({ className = "", open = true }) {
  const petal = open ? "lily-petal lily-petal-open" : "lily-petal";

  return (
    <svg
      viewBox="0 0 180 220"
      className={className}
      role="img"
      aria-label="Lírio branco"
    >
      <defs>
        <linearGradient id="lilyPetal" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="72%" stopColor="#eef5ff" />
          <stop offset="100%" stopColor="#c7d9f4" />
        </linearGradient>
        <linearGradient id="lilyStem" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#587864" />
          <stop offset="100%" stopColor="#2f5542" />
        </linearGradient>
        <filter id="lilyShadow" x="-30%" y="-30%" width="160%" height="160%">
          <feDropShadow dx="0" dy="7" stdDeviation="7" floodColor="#17365d" floodOpacity="0.13" />
        </filter>
      </defs>

      <path d="M91 106 C86 143 88 178 84 216" fill="none" stroke="url(#lilyStem)" strokeWidth="5" strokeLinecap="round" />
      <path d="M87 161 C58 147 45 158 42 178 C59 177 74 171 87 161Z" fill="#6f927a" opacity="0.92" />
      <path d="M87 183 C111 166 126 169 136 187 C116 191 101 189 87 183Z" fill="#5f846d" opacity="0.9" />

      <g filter="url(#lilyShadow)" transform="translate(90 87)">
        <path className={petal} d="M0 8 C-17 -19 -18 -58 -4 -78 C9 -56 13 -23 0 8Z" fill="url(#lilyPetal)" />
        <path className={petal} d="M2 9 C19 -17 49 -38 72 -34 C62 -9 35 10 2 9Z" fill="url(#lilyPetal)" />
        <path className={petal} d="M0 10 C32 12 55 33 59 57 C31 57 8 39 0 10Z" fill="url(#lilyPetal)" />
        <path className={petal} d="M-2 10 C-30 18 -52 40 -55 63 C-28 59 -7 41 -2 10Z" fill="url(#lilyPetal)" />
        <path className={petal} d="M-2 8 C-27 -5 -55 -30 -61 -54 C-34 -53 -11 -29 -2 8Z" fill="url(#lilyPetal)" />
        <path className={petal} d="M0 10 C-11 34 -9 61 3 78 C17 58 18 31 0 10Z" fill="url(#lilyPetal)" opacity="0.95" />

        <circle cx="0" cy="7" r="10" fill="#d9b66d" />
        <g stroke="#b98f43" strokeWidth="2" strokeLinecap="round">
          <path d="M0 2 L-18 -18" /><path d="M0 2 L18 -16" /><path d="M0 2 L26 4" />
          <path d="M0 2 L-24 8" /><path d="M0 2 L10 28" />
        </g>
        <g fill="#c99a45">
          <ellipse cx="-20" cy="-20" rx="3.5" ry="6" transform="rotate(-35 -20 -20)" />
          <ellipse cx="20" cy="-18" rx="3.5" ry="6" transform="rotate(35 20 -18)" />
          <ellipse cx="29" cy="5" rx="3.5" ry="6" transform="rotate(80 29 5)" />
          <ellipse cx="-27" cy="9" rx="3.5" ry="6" transform="rotate(-80 -27 9)" />
          <ellipse cx="11" cy="31" rx="3.5" ry="6" transform="rotate(8 11 31)" />
        </g>
      </g>
    </svg>
  );
}
