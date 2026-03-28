import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'

function useGlitch(text, active = true) {
  const [display, setDisplay] = useState(text)
  const raf = useRef(null)

  useEffect(() => {
    if (!active) return
    let frame = 0
    const total = text.length * 5

    const tick = () => {
      const next = text.split('').map((char, i) => {
        if (char === ' ') return ' '
        if (i < Math.floor(frame / 5)) return char
        return CHARS[Math.floor(Math.random() * CHARS.length)]
      }).join('')
      setDisplay(next)
      frame++
      if (frame < total + 6) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
      }
    }

    raf.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf.current)
  }, [text, active])

  return display
}

export default function NotFoundPage() {
  const [ready, setReady] = useState(false)
  useEffect(() => { const t = setTimeout(() => setReady(true), 100); return () => clearTimeout(t) }, [])

  const code    = useGlitch('404', ready)
  const message = useGlitch('Page Not Found', ready)

  return (
    <section style={{
      minHeight:      '100vh',
      display:        'flex',
      flexDirection:  'column',
      alignItems:     'center',
      justifyContent: 'center',
      background:     '#090b0f',
      position:       'relative',
      overflow:       'hidden',
      padding:        '40px 24px',
    }}>
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position:     'absolute',
        width:        600,
        height:       600,
        borderRadius: '50%',
        background:   'radial-gradient(circle, rgba(223,149,80,0.06) 0%, transparent 65%)',
        top:          '50%',
        left:         '50%',
        transform:    'translate(-50%, -50%)',
        pointerEvents:'none',
        filter:       'blur(40px)',
      }} />

      {/* Large watermark */}
      <div aria-hidden="true" style={{
        position:      'absolute',
        top:           '50%',
        left:          '50%',
        transform:     'translate(-50%, -50%)',
        fontFamily:    "'Cormorant Garamond', Georgia, serif",
        fontSize:      'clamp(160px, 30vw, 320px)',
        fontWeight:    400,
        color:         'rgba(223,149,80,0.03)',
        letterSpacing: '0.1em',
        pointerEvents: 'none',
        userSelect:    'none',
        whiteSpace:    'nowrap',
      }}>
        404
      </div>

      {/* Content */}
      <div style={{ position: 'relative', textAlign: 'center', zIndex: 10 }}>
        <div style={{
          display:       'flex',
          alignItems:    'center',
          justifyContent:'center',
          gap:           '16px',
          marginBottom:  '32px',
          opacity:       ready ? 1 : 0,
          transition:    'opacity 0.8s ease 0.2s',
        }}>
          <div style={{ width: 48, height: 1, background: 'rgba(223,149,80,0.4)' }} />
          <span style={{
            fontSize:      '0.6rem',
            letterSpacing: '0.28em',
            textTransform: 'uppercase',
            color:         'rgba(223,149,80,0.7)',
            fontFamily:    "'Inter', sans-serif",
          }}>
            Error
          </span>
          <div style={{ width: 48, height: 1, background: 'rgba(223,149,80,0.4)' }} />
        </div>

        <h1 style={{
          fontFamily:    "'Cormorant Garamond', Georgia, serif",
          fontSize:      'clamp(5rem, 14vw, 10rem)',
          fontWeight:    300,
          color:         '#ffffff',
          lineHeight:    1,
          letterSpacing: '0.1em',
          marginBottom:  '16px',
        }}>
          {code}
        </h1>

        <p style={{
          fontFamily:    "'Cormorant Garamond', Georgia, serif",
          fontSize:      'clamp(1.1rem, 2.5vw, 1.6rem)',
          fontStyle:     'italic',
          color:         'rgba(223,149,80,0.8)',
          letterSpacing: '0.06em',
          marginBottom:  '16px',
          opacity:       ready ? 1 : 0,
          transform:     ready ? 'none' : 'translateY(8px)',
          transition:    'opacity 0.8s ease 0.6s, transform 0.8s ease 0.6s',
        }}>
          {message}
        </p>

        <p style={{
          fontFamily:  "'Inter', sans-serif",
          fontSize:    '0.9rem',
          color:       'rgba(199,203,214,0.5)',
          lineHeight:  1.7,
          maxWidth:    '380px',
          margin:      '0 auto 48px',
          opacity:     ready ? 1 : 0,
          transition:  'opacity 0.8s ease 0.9s',
        }}>
          This page has vanished like a forgotten scent. Let's guide you back to something remarkable.
        </p>

        <div style={{
          display:        'flex',
          gap:            '16px',
          justifyContent: 'center',
          flexWrap:       'wrap',
          opacity:        ready ? 1 : 0,
          transform:      ready ? 'none' : 'translateY(8px)',
          transition:     'opacity 0.8s ease 1.1s, transform 0.8s ease 1.1s',
        }}>
          <Link
            to="/"
            data-hover
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              padding:        '12px 32px',
              background:     'rgba(223,149,80,1)',
              color:          '#090b0f',
              fontFamily:     "'Inter', sans-serif",
              fontSize:       '0.68rem',
              fontWeight:     600,
              letterSpacing:  '0.2em',
              textTransform:  'uppercase',
              textDecoration: 'none',
              transition:     'background 0.3s, transform 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = '#f0ebe0'; e.currentTarget.style.transform = 'translateY(-2px)' }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(223,149,80,1)'; e.currentTarget.style.transform = 'none' }}
          >
            <ArrowLeft size={13} />
            Back Home
          </Link>

          <Link
            to="/shop"
            data-hover
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              padding:        '12px 32px',
              border:         '1px solid rgba(199,203,214,0.2)',
              color:          'rgba(199,203,214,0.7)',
              fontFamily:     "'Inter', sans-serif",
              fontSize:       '0.68rem',
              letterSpacing:  '0.2em',
              textTransform:  'uppercase',
              textDecoration: 'none',
              transition:     'border-color 0.3s, color 0.3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(223,149,80,0.5)'; e.currentTarget.style.color = 'rgba(223,149,80,1)' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(199,203,214,0.2)'; e.currentTarget.style.color = 'rgba(199,203,214,0.7)' }}
          >
            Explore Collection
          </Link>
        </div>
      </div>
    </section>
  )
}
