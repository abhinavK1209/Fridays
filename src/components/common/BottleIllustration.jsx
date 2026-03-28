import { useId } from 'react'

/**
 * SVG-based perfume bottle — matches the preview.html design exactly.
 * Amber cap, gradient body with shoulder path, glass shine, label.
 */
function parseGradientStops(gradientStr) {
  const pattern = /(#[0-9a-fA-F]{3,6})\s+([\d.]+)%/g
  const stops = []
  let match
  while ((match = pattern.exec(gradientStr)) !== null) {
    stops.push({ color: match[1], offset: match[2] + '%' })
  }
  return stops.length > 0 ? stops : [
    { color: '#1a1a2e', offset: '0%' },
    { color: '#0a0a1e', offset: '100%' },
  ]
}

export default function BottleIllustration({
  gradient,
  glowColor = 'rgba(90,139,255,0.4)',
  accentColor = '#5a8bff',
  label = "Friday's",
  sublabel = '',
  size = 'md',
  animate = true,
}) {
  const uid = useId().replace(/:/g, '')
  const stops = parseGradientStops(gradient || '')

  const dims = {
    sm:  { w: 55,  h: 130 },
    md:  { w: 80,  h: 190 },
    lg:  { w: 120, h: 280 },
    xl:  { w: 160, h: 370 },
  }
  const d = dims[size] || dims.md

  // All bottles use a fixed viewBox; width/height scales it
  return (
    <div
      style={{ position: 'relative', width: d.w, height: d.h, display: 'inline-block' }}
    >
      {/* Glow behind bottle */}
      <div style={{
        position:     'absolute',
        bottom:       '-12%',
        left:         '50%',
        transform:    'translateX(-50%)',
        width:        d.w * 2.2,
        height:       d.w * 2.2,
        borderRadius: '50%',
        background:   `radial-gradient(circle, ${glowColor} 0%, transparent 65%)`,
        filter:       'blur(18px)',
        pointerEvents:'none',
        animation:    'glowpulse 3s ease-in-out infinite',
      }} />

      <svg
        width={d.w}
        height={d.h}
        viewBox="0 0 160 370"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: animate ? 'float 7s ease-in-out infinite' : 'none', display: 'block' }}
      >
        <defs>
          <linearGradient id={`bg-${uid}`} x1="0" y1="0" x2="1" y2="1">
            {stops.map((s, i) => (
              <stop key={i} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>
          <radialGradient id={`shine-${uid}`} cx="28%" cy="18%" r="55%">
            <stop offset="0%"   stopColor="rgba(255,255,255,.13)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>
        </defs>

        {/* Drop shadow */}
        <ellipse cx="80" cy="356" rx="50" ry="9" fill={glowColor.replace(/[\d.]+\)$/, '0.18)')} />

        {/* Cap — always amber gold */}
        <rect x="50" y="2" width="60" height="32" rx="5" fill="#df9550" />
        <rect x="56" y="7" width="48" height="18" rx="3" fill="rgba(255,210,150,.28)" />

        {/* Neck */}
        <rect x="58" y="34" width="44" height="26" rx="3" fill="#b87a38" opacity=".85" />
        <rect x="63" y="37" width="34" height="18" rx="2" fill="rgba(255,200,120,.1)" />

        {/* Shoulder curve */}
        <path d="M22 98 Q22 60 58 60 L102 60 Q138 60 138 98" fill={`url(#bg-${uid})`} />

        {/* Body */}
        <rect x="22" y="98" width="116" height="230" rx="6" fill={`url(#bg-${uid})`} />

        {/* Glass shine overlay */}
        <rect x="22" y="98" width="116" height="230" rx="6" fill={`url(#shine-${uid})`} />

        {/* Left edge glint */}
        <rect x="30" y="108" width="12" height="210" rx="6" fill="rgba(255,255,255,.055)" />

        {/* Right subtle glint */}
        <rect x="120" y="120" width="7" height="160" rx="3" fill="rgba(255,255,255,.025)" />

        {/* Label rectangle */}
        <rect
          x="30" y="148" width="100" height="112" rx="3"
          fill={accentColor + '14'}
          stroke={accentColor}
          strokeWidth=".75"
          strokeOpacity=".35"
        />

        {/* Top rule inside label */}
        <line x1="38" y1="153" x2="122" y2="153" stroke={accentColor} strokeWidth=".6" strokeOpacity=".22" />

        {/* Brand name */}
        <text
          x="80" y="191"
          textAnchor="middle"
          fill="rgba(255,255,255,.88)"
          fontFamily="'Cormorant Garamond',Georgia,serif"
          fontSize="14"
          letterSpacing="5"
          fontWeight="400"
        >
          {label.toUpperCase()}
        </text>

        {/* Divider line */}
        <line x1="44" y1="201" x2="116" y2="201" stroke={accentColor} strokeWidth=".5" strokeOpacity=".2" />

        {/* Product name */}
        {sublabel && (
          <text
            x="80" y="218"
            textAnchor="middle"
            fill={accentColor}
            fillOpacity=".65"
            fontFamily="'Cormorant Garamond',Georgia,serif"
            fontSize="7.5"
            letterSpacing="3.5"
          >
            {sublabel.toUpperCase()}
          </text>
        )}

        {/* Base bottom bar */}
        <rect x="22" y="328" width="116" height="7" rx="3" fill="#070a0e" />
      </svg>
    </div>
  )
}
