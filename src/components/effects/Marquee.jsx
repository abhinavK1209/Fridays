import { useRef, useState } from 'react'

export default function Marquee({
  items = [],
  speed = 40,
  direction = 'left',
  separator = '◆',
  className = '',
}) {
  const [paused, setPaused] = useState(false)

  const animStyle = {
    display:        'flex',
    gap:            '60px',
    width:          'max-content',
    animation:      `marqueeScroll ${speed}s linear infinite`,
    animationDirection: direction === 'right' ? 'reverse' : 'normal',
    animationPlayState: paused ? 'paused' : 'running',
    willChange:     'transform',
  }

  const rendered = [...items, ...items, ...items].map((item, i) => (
    <span
      key={i}
      style={{
        display:        'inline-flex',
        alignItems:     'center',
        gap:            '60px',
        whiteSpace:     'nowrap',
        fontFamily:     "'Cormorant Garamond', Georgia, serif",
        fontStyle:      'italic',
        fontSize:       '1.05rem',
        color:          paused ? 'rgba(223,149,80,0.9)' : 'rgba(223,149,80,0.7)',
        letterSpacing:  '0.05em',
        transition:     'color 0.3s',
      }}
    >
      {item}
      <span style={{ fontSize: '0.38rem', opacity: 0.45, fontStyle: 'normal' }}>{separator}</span>
    </span>
  ))

  return (
    <div
      className={className}
      style={{ overflow: 'hidden', width: '100%', position: 'relative' }}
      aria-hidden="true"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      <div style={{
        position:   'absolute', inset: 0, zIndex: 2,
        background: 'linear-gradient(to right, #090b0f 0%, transparent 8%, transparent 92%, #090b0f 100%)',
        pointerEvents: 'none',
      }} />
      <div style={animStyle}>
        {rendered}
      </div>
    </div>
  )
}
