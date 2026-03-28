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
    sm:  { w: 48,  h: 120 },
    md:  { w: 72,  h: 180 },
    lg:  { w: 100, h: 250 },
    xl:  { w: 136, h: 340 },
    xxl: { w: 176, h: 440 },
  }
  const d = dims[size] || dims.md

  /*
   * viewBox: 0 0 176 440
   *
   * Anatomy — eau de parfum flacon (Dior / Chanel proportions):
   *   Cap:      y  8 →  68   w=80  cx=88  (45% body width)
   *   Collar:   y 63 →  74   w=92  cx=88
   *   Neck:     y 74 → 148   w=36  cx=88  (20% body width — long thin neck)
   *   Shoulder: y148 → 168   trapezoid neck→body
   *   Body:     y168 → 422   w=158 cx=88  (full width)
   *   Base:     y422 → 436
   *
   * Glass effect keys:
   *   - 2px bright white specular line on left edge
   *   - soft glow gradient behind it
   *   - right edge thin glint
   *   - diagonal light sweep across face
   */

  return (
    <div style={{ position: 'relative', width: d.w, height: d.h, display: 'inline-block' }}>
      {/* Soft ground glow */}
      <div style={{
        position:     'absolute',
        bottom:       '-2%',
        left:         '50%',
        transform:    'translateX(-50%)',
        width:        d.w * 1.8,
        height:       d.w * 0.4,
        borderRadius: '50%',
        background:   `radial-gradient(ellipse, ${glowColor} 0%, transparent 70%)`,
        filter:       'blur(16px)',
        pointerEvents:'none',
        animation:    'glowpulse 3s ease-in-out infinite',
      }} />

      <svg
        width={d.w}
        height={d.h}
        viewBox="0 0 176 440"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ animation: animate ? 'float 7s ease-in-out infinite' : 'none', display: 'block' }}
      >
        <defs>
          {/* Glass body — deep dark */}
          <linearGradient id={`glass-${uid}`} x1="0" y1="0" x2="1" y2="1">
            {stops.map((s, i) => (
              <stop key={i} offset={s.offset} stopColor={s.color} />
            ))}
          </linearGradient>

          {/* Left soft glow behind specular */}
          <linearGradient id={`lglow-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,.20)" />
            <stop offset="18%"  stopColor="rgba(255,255,255,.05)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Right edge glow */}
          <linearGradient id={`rglow-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,0)" />
            <stop offset="82%"  stopColor="rgba(255,255,255,.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.13)" />
          </linearGradient>

          {/* Diagonal face sweep — upper-left to lower-right */}
          <linearGradient id={`sweep-${uid}`} x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%"   stopColor="rgba(255,255,255,.09)" />
            <stop offset="35%"  stopColor="rgba(255,255,255,.03)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Bottom depth */}
          <linearGradient id={`depth-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="rgba(0,0,0,0)" />
            <stop offset="100%" stopColor="rgba(0,0,0,.60)" />
          </linearGradient>

          {/* Liquid tint */}
          <linearGradient id={`liquid-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor={accentColor} stopOpacity=".18" />
            <stop offset="100%" stopColor={accentColor} stopOpacity=".05" />
          </linearGradient>

          {/* Gold cap */}
          <linearGradient id={`cap-${uid}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%"   stopColor="#f5bc72" />
            <stop offset="42%"  stopColor="#e09852" />
            <stop offset="100%" stopColor="#9c6020" />
          </linearGradient>

          {/* Cap left shine */}
          <linearGradient id={`capshine-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,.45)" />
            <stop offset="28%"  stopColor="rgba(255,255,255,.15)" />
            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
          </linearGradient>

          {/* Neck glass */}
          <linearGradient id={`neck-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%"   stopColor="rgba(255,255,255,.18)" />
            <stop offset="30%"  stopColor="rgba(255,255,255,.04)" />
            <stop offset="100%" stopColor="rgba(255,255,255,.06)" />
          </linearGradient>

          {/* Body clip */}
          <clipPath id={`bclip-${uid}`}>
            <path d="M9 168 L9 422 Q9 434 21 434 L155 434 Q167 434 167 422 L167 168 Z" />
          </clipPath>
        </defs>

        {/* Ground shadow */}
        <ellipse cx="88" cy="437" rx="62" ry="7"
          fill={glowColor.replace(/[\d.]+\)$/, '0.12)')} />

        {/* ══ CAP ══  x=48..128  y=8..68  (width=80) */}
        <rect x="48" y="8"  width="80" height="60" rx="2"
          fill={`url(#cap-${uid})`} />
        <rect x="48" y="8"  width="80" height="60" rx="2"
          fill={`url(#capshine-${uid})`} />
        {/* Cap top specular */}
        <rect x="52" y="10" width="48" height="4"  rx="2"
          fill="rgba(255,240,200,.28)" />
        {/* Cap engraved band */}
        <rect x="48" y="30" width="80" height="2.5" rx="1"
          fill="rgba(0,0,0,.30)" />
        <rect x="48" y="32.5" width="80" height="1.5" rx=".75"
          fill="rgba(255,210,120,.22)" />
        {/* Cap right shadow edge */}
        <rect x="124" y="8" width="4" height="60" rx="2"
          fill="rgba(0,0,0,.25)" />

        {/* ══ COLLAR ══  x=44..132  y=63..74 */}
        <rect x="44" y="63" width="88" height="11" rx="2"
          fill="#a86822" />
        <rect x="44" y="63" width="88" height="3"  rx="1"
          fill="rgba(255,220,140,.20)" />

        {/* ══ NECK ══  x=70..106  y=74..148  (width=36) */}
        <rect x="70" y="74" width="36" height="74"
          fill={`url(#glass-${uid})`} />
        {/* Neck left bright specular */}
        <rect x="70" y="78" width="2"  height="66"
          fill="rgba(255,255,255,.65)" />
        {/* Neck left soft glow */}
        <rect x="72" y="78" width="10" height="66"
          fill={`url(#neck-${uid})`} />
        {/* Neck right glint */}
        <rect x="104" y="82" width="2" height="58"
          fill="rgba(255,255,255,.22)" />

        {/* ══ SHOULDER ══ trapezoid: neck (70..106) → body (9..167)  y=148..168 */}
        <path d="M70 148 L106 148 L167 168 L9 168 Z"
          fill={`url(#glass-${uid})`} />
        {/* Shoulder specular */}
        <path d="M70 148 L106 148 L140 168 L9 168 L9 162 Z"
          fill="rgba(255,255,255,.07)" />

        {/* ══ BODY ══  x=9..167  y=168..422  (width=158) */}
        <path d="M9 168 L9 422 Q9 434 21 434 L155 434 Q167 434 167 422 L167 168 Z"
          fill={`url(#glass-${uid})`} />

        {/* Liquid colour tint */}
        <rect x="11" y="174" width="154" height="256"
          fill={`url(#liquid-${uid})`}
          clipPath={`url(#bclip-${uid})`} />

        {/* Bottom depth */}
        <rect x="9" y="330" width="158" height="104"
          fill={`url(#depth-${uid})`}
          clipPath={`url(#bclip-${uid})`} />

        {/* Diagonal face sweep */}
        <rect x="9" y="168" width="158" height="256"
          fill={`url(#sweep-${uid})`}
          clipPath={`url(#bclip-${uid})`} />

        {/* Left soft glow band */}
        <rect x="9" y="168" width="40" height="256"
          fill={`url(#lglow-${uid})`}
          clipPath={`url(#bclip-${uid})`} />

        {/* ★ Left bright specular line — the key glass cue */}
        <rect x="9" y="170" width="2.5" height="250"
          fill="rgba(255,255,255,.70)"
          clipPath={`url(#bclip-${uid})`} />

        {/* Right soft glow */}
        <rect x="9" y="168" width="158" height="256"
          fill={`url(#rglow-${uid})`}
          clipPath={`url(#bclip-${uid})`} />

        {/* ★ Right bright specular line */}
        <rect x="163.5" y="178" width="2" height="220"
          fill="rgba(255,255,255,.30)"
          clipPath={`url(#bclip-${uid})`} />

        {/* ══ LABEL ══ */}
        <rect x="22" y="198" width="132" height="158" rx="1"
          fill={accentColor + '0b'}
          stroke={accentColor}
          strokeWidth=".7"
          strokeOpacity=".18" />

        {/* Top rule */}
        <line x1="34" y1="210" x2="142" y2="210"
          stroke={accentColor} strokeWidth=".5" strokeOpacity=".28" />

        {/* Brand name */}
        <text
          x="88" y="271"
          textAnchor="middle"
          dominantBaseline="middle"
          fill="rgba(255,255,255,.92)"
          fontFamily="'Cormorant Garamond',Georgia,serif"
          fontSize="17"
          letterSpacing="8"
          fontWeight="400"
        >
          {label.toUpperCase()}
        </text>

        {/* Divider */}
        <line x1="36" y1="284" x2="140" y2="284"
          stroke={accentColor} strokeWidth=".5" strokeOpacity=".20" />

        {/* Sub-label */}
        {sublabel && (
          <text
            x="88" y="304"
            textAnchor="middle"
            dominantBaseline="middle"
            fill={accentColor}
            fillOpacity=".52"
            fontFamily="'Cormorant Garamond',Georgia,serif"
            fontSize="8"
            letterSpacing="4"
          >
            {sublabel.toUpperCase()}
          </text>
        )}

        {/* Bottom rule */}
        <line x1="34" y1="346" x2="142" y2="346"
          stroke={accentColor} strokeWidth=".5" strokeOpacity=".28" />

        {/* ══ BASE ══ */}
        <rect x="9"  y="422" width="158" height="12" rx="3"
          fill="rgba(0,0,0,.55)" />
        <rect x="13" y="422" width="150" height="2.5" rx="1"
          fill="rgba(255,255,255,.05)" />
      </svg>
    </div>
  )
}
