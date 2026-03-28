import { useId } from 'react'

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
    lg:  { w: 110, h: 260 },
    xl:  { w: 150, h: 355 },
    xxl: { w: 220, h: 520 },
  }
  const d = dims[size] || dims.md

  /*
   * Perfume bottle SVG — viewBox 0 0 200 480
   * Classic rectangular luxury flacon with:
   *  - Wide flat cap with engraved band
   *  - Short elegant neck
   *  - Wide square-ish body with very subtle taper
   *  - Glass bevels and reflections
   */

  return (
    <div style={{ position: 'relative', width: d.w, height: d.h, display: 'inline-block' }}>
      {/* Glow */}
      <div style={{
        position:     'absolute',
        bottom:       '-6%',
        left:         '50%',
        transform:    'translateX(-50%)',
        width:        d.w * 2.2,
        height:       d.w * 2.2,
        borderRadius: '50%',
        background:   `radial-gradient(circle, ${glowColor} 0%, transparent 65%)`,
        filter:       'blur(20px)',
        pointerEvents:'none',
        animation:    'glowpulse 3s ease-in-out infinite',
      }} />

      <svg
        width={d.w}
        height={d.h}
        viewBox="0 0 200 480"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: animate ? 'float 7s ease-in-out infinite' : 'none', display: 'block' }}
      >
        <defs>
          {/* Body gradient — dark glass */}
          <linearGradient id={`body-${uid}`} x1="0" y1="0" x2="1" y2="1">
            {stops.map((s, i) => (
              <stop key={i} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>

          {/* Left bevel highlight */}
          <linearGradient id={`bevel-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,.18)" />
            <stop offset="12%"  stopColor="rgba(255,255,255,.07)" />
            <stop offset="50%"  stopColor="rgba(255,255,255,.01)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Right bevel */}
          <linearGradient id={`rbevel-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
            <stop offset="85%"  stopColor="rgba(255,255,255,.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.08)" />
          </linearGradient>

          {/* Top shoulder shine */}
          <radialGradient id={`topshine-${uid}`} cx="28%" cy="15%" r="55%">
            <stop offset="0%"   stopColor="rgba(255,255,255,.14)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </radialGradient>

          {/* Liquid fill */}
          <linearGradient id={`liquid-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={accentColor} stopOpacity="0.20" />
            <stop offset="100%" stopColor={accentColor} stopOpacity="0.08" />
          </linearGradient>

          {/* Bottom depth */}
          <linearGradient id={`depth-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,.45)" />
          </linearGradient>

          {/* Cap gradient — gold */}
          <linearGradient id={`cap-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f2b06a" />
            <stop offset="45%"  stopColor="#df9550" />
            <stop offset="100%" stopColor="#a06520" />
          </linearGradient>

          {/* Cap shine */}
          <linearGradient id={`capshine-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,.40)" />
            <stop offset="35%"  stopColor="rgba(255,255,255,.14)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Body clip */}
          <clipPath id={`body-clip-${uid}`}>
            {/* Main body rectangle with very slight taper */}
            <path d="M30 148 L30 448 Q30 458 40 458 L160 458 Q170 458 170 448 L170 148 Z" />
          </clipPath>

          {/* Neck clip */}
          <clipPath id={`neck-clip-${uid}`}>
            <rect x="74" y="88" width="52" height="62" />
          </clipPath>
        </defs>

        {/* ── Ground shadow ── */}
        <ellipse cx="100" cy="466" rx="58" ry="9" fill={glowColor.replace(/[\d.]+\)$/, '0.18)')} />

        {/* ══════════════ CAP ══════════════ */}
        {/* Cap body — wide luxury cap */}
        <rect x="38" y="20" width="124" height="52" rx="3" fill={`url(#cap-${uid})`} />
        {/* Cap shine overlay */}
        <rect x="38" y="20" width="124" height="52" rx="3" fill={`url(#capshine-${uid})`} />
        {/* Cap top highlight */}
        <rect x="44" y="22" width="80" height="4" rx="2" fill="rgba(255,230,180,.30)" />
        {/* Cap engraved line (mid) */}
        <rect x="38" y="38" width="124" height="2"   rx="1"   fill="rgba(0,0,0,.30)" />
        <rect x="38" y="40" width="124" height="1.5" rx=".75" fill="rgba(255,200,100,.20)" />
        {/* Cap bottom plate */}
        <rect x="44" y="68" width="112" height="8" rx="2" fill="#b07828" />
        <rect x="44" y="68" width="112" height="2" rx="1" fill="rgba(255,220,140,.20)" />

        {/* ══════════════ NECK ══════════════ */}
        {/* Neck — narrow elegant column */}
        <rect x="78" y="76" width="44" height="72" rx="0" fill={`url(#body-${uid})`} />
        {/* Neck left glass glint */}
        <rect x="78" y="80" width="8" height="64" rx="4" fill="rgba(255,255,255,.10)" />
        {/* Neck right subtle */}
        <rect x="114" y="88" width="5" height="50" rx="2.5" fill="rgba(255,255,255,.04)" />

        {/* ══════════════ SHOULDER CONNECTOR ══════════════ */}
        {/* Trapezoid shoulder — neck widens to body */}
        <path d="M78 144 L30 158 L30 148 L78 144 Z" fill={`url(#body-${uid})`} />
        <path d="M122 144 L170 158 L170 148 L122 144 Z" fill={`url(#body-${uid})`} />
        <path d="M78 144 L122 144 L170 158 L30 158 Z" fill={`url(#body-${uid})`} />
        {/* Shoulder top highlight */}
        <path d="M78 144 L122 144 L170 158 L30 158 Z" fill="rgba(255,255,255,.06)" />

        {/* ══════════════ BODY ══════════════ */}
        {/* Main rectangular body */}
        <path d="M30 158 L30 448 Q30 458 40 458 L160 458 Q170 458 170 448 L170 158 Z"
          fill={`url(#body-${uid})`} />

        {/* Liquid fill layer */}
        <rect x="32" y="164" width="136" height="290" fill={`url(#liquid-${uid})`}
          clipPath={`url(#body-clip-${uid})`} />

        {/* Bottom depth darkening */}
        <rect x="30" y="340" width="140" height="120" fill={`url(#depth-${uid})`}
          clipPath={`url(#body-clip-${uid})`} />

        {/* Left strong bevel highlight */}
        <rect x="30" y="158" width="18" height="294" rx="9"
          fill="rgba(255,255,255,.09)"
          clipPath={`url(#body-clip-${uid})`} />
        <rect x="32" y="162" width="7" height="260" rx="3.5"
          fill="rgba(255,255,255,.12)"
          clipPath={`url(#body-clip-${uid})`} />

        {/* Right subtle bevel */}
        <rect x="158" y="175" width="12" height="210" rx="6"
          fill="rgba(255,255,255,.04)"
          clipPath={`url(#body-clip-${uid})`} />

        {/* Shoulder top-left radial shine */}
        <rect x="30" y="158" width="140" height="55"
          fill={`url(#topshine-${uid})`}
          clipPath={`url(#body-clip-${uid})`} />

        {/* Full body left-to-right soft shine */}
        <rect x="30" y="158" width="140" height="294"
          fill={`url(#bevel-${uid})`}
          clipPath={`url(#body-clip-${uid})`} />

        {/* ══════════════ LABEL ══════════════ */}
        {/* Label background */}
        <rect x="42" y="196" width="116" height="148" rx="1"
          fill={accentColor + '0c'}
          stroke={accentColor}
          strokeWidth="0.9"
          strokeOpacity=".22" />

        {/* Top decorative rule */}
        <line x1="54" y1="207" x2="146" y2="207"
          stroke={accentColor} strokeWidth=".6" strokeOpacity=".30" />

        {/* Brand name */}
        <text
          x="100" y="262"
          textAnchor="middle"
          fill="rgba(255,255,255,.92)"
          fontFamily="'Cormorant Garamond',Georgia,serif"
          fontSize="18"
          letterSpacing="8"
          fontWeight="400"
        >
          {label.toUpperCase()}
        </text>

        {/* Thin divider */}
        <line x1="56" y1="275" x2="144" y2="275"
          stroke={accentColor} strokeWidth=".6" strokeOpacity=".22" />

        {/* Sub label */}
        {sublabel && (
          <text
            x="100" y="296"
            textAnchor="middle"
            fill={accentColor}
            fillOpacity=".55"
            fontFamily="'Cormorant Garamond',Georgia,serif"
            fontSize="8.5"
            letterSpacing="4"
          >
            {sublabel.toUpperCase()}
          </text>
        )}

        {/* Bottom decorative rule */}
        <line x1="54" y1="334" x2="146" y2="334"
          stroke={accentColor} strokeWidth=".6" strokeOpacity=".30" />

        {/* ══════════════ BASE ══════════════ */}
        <rect x="30" y="448" width="140" height="10" rx="3" fill="rgba(0,0,0,.45)" />
        <rect x="34" y="448" width="132" height="2"  rx="1" fill="rgba(255,255,255,.05)" />
      </svg>
    </div>
  )
}
