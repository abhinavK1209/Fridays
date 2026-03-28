import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import BottleIllustration from '@/components/common/BottleIllustration'
import { products } from '@/data/products'

const hero = products[0]

// ── Text Scramble effect ─────────────────────────────────────────────────────
const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'

function useScramble(finalText, trigger = true, delay = 0) {
  const [display, setDisplay] = useState('')
  const frame = useRef(0)
  const raf   = useRef(null)

  useEffect(() => {
    if (!trigger) return
    let iteration = 0
    const totalFrames = finalText.length * 4 // frames per char

    const tick = () => {
      const next = finalText
        .split('')
        .map((char, i) => {
          if (char === ' ') return ' '
          if (i < Math.floor(iteration / 4)) return char
          return CHARS[Math.floor(Math.random() * CHARS.length)]
        })
        .join('')
      setDisplay(next)
      iteration++
      if (iteration < totalFrames + 8) {
        raf.current = requestAnimationFrame(tick)
      } else {
        setDisplay(finalText)
      }
    }

    const t = setTimeout(() => {
      raf.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(t)
      cancelAnimationFrame(raf.current)
    }
  }, [trigger, finalText, delay])

  return display || finalText.replace(/./g, '_')
}

// ── Parallax on scroll ───────────────────────────────────────────────────────
function useParallax(strength = 0.3) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onScroll = () => {
      el.style.transform = `translateY(${window.scrollY * strength}px)`
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [strength])
  return ref
}

export default function Hero() {
  const [mounted, setMounted] = useState(false)
  const bottleRef = useParallax(-0.12) // bottle drifts up slower than scroll

  useEffect(() => {
    // Short delay so the page has rendered before triggering scramble
    const t = setTimeout(() => setMounted(true), 180)
    return () => clearTimeout(t)
  }, [])

  const title    = useScramble("Friday's", mounted, 300)
  const subtitle = useScramble('Modern Scent Redefined.', mounted, 1100)

  return (
    <section
      id="home"
      style={{
        position:      'relative',
        height:        '100vh',      /* exact viewport height — keeps scroll indicator anchored */
        display:       'flex',
        flexDirection: 'column',
        overflow:      'hidden',
        background:    '#090b0f',
      }}
    >
      {/* ── Vercel-inspired radial spectrum glow ── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          background: `
            radial-gradient(ellipse 80% 55% at 65% 60%, rgba(223,149,80,0.13) 0%, transparent 60%),
            radial-gradient(ellipse 50% 40% at 20% 40%, rgba(90,139,255,0.07) 0%, transparent 55%),
            radial-gradient(ellipse 60% 50% at 85% 20%, rgba(150,80,220,0.05) 0%, transparent 50%)
          `,
        }}
      />

      {/* ── Subtle dot-grid overlay (Vercel-inspired) ── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          opacity:       0.18,
          backgroundImage: `radial-gradient(circle, rgba(223,149,80,0.4) 1px, transparent 1px)`,
          backgroundSize:  '44px 44px',
          maskImage:       'radial-gradient(ellipse 80% 70% at 65% 60%, black 0%, transparent 75%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 70% at 65% 60%, black 0%, transparent 75%)',
        }}
      />

      {/* ── Grain / noise texture ── */}
      <div
        aria-hidden="true"
        style={{
          position:      'absolute',
          inset:         0,
          pointerEvents: 'none',
          opacity:       0.025,
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E")`,
        }}
      />

      {/* ── Content wrapper: grows to fill, centers the grid, clears fixed nav ── */}
      <div
        style={{
          flex:           1,
          display:        'flex',
          alignItems:     'center',
          paddingTop:     '80px',
          position:       'relative',
          zIndex:         10,
        }}
      >

      {/* ── Content grid ── */}
      <div
        style={{
          width:        '100%',
          maxWidth:     '1280px',
          margin:       '0 auto',
          padding:      '24px 32px',
          display:      'grid',
          gridTemplateColumns: '1fr auto',
          gap:          '48px',
          alignItems:   'center',
        }}
      >
        {/* ── Left: Copy ── */}
        <div>
          {/* Eyebrow */}
          <div
            style={{
              display:    'flex',
              alignItems: 'center',
              gap:        '12px',
              marginBottom: '28px',
              opacity:    mounted ? 1 : 0,
              transform:  mounted ? 'none' : 'translateY(14px)',
              transition: 'opacity .8s ease .2s, transform .8s ease .2s',
            }}
          >
            <div style={{ width: 32, height: 1, background: 'rgba(223,149,80,.6)' }} />
            <span style={{
              fontSize:      '0.65rem',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              color:         'rgba(223,149,80,.85)',
              fontFamily:    "'Inter', sans-serif",
            }}>
              Luxury Fragrance House
            </span>
          </div>

          {/* Scrambled Title */}
          <h1
            style={{
              fontFamily:   "'Cormorant Garamond', Georgia, serif",
              fontSize:     'clamp(4rem, 9vw, 8rem)',
              fontWeight:   400,
              lineHeight:   1.0,
              letterSpacing: '0.06em',
              color:        '#ffffff',
              marginBottom: '16px',
              opacity:      mounted ? 1 : 0,
              transform:    mounted ? 'none' : 'translateY(20px)',
              transition:   'opacity 1s ease .5s, transform 1s ease .5s',
            }}
          >
            {title}
          </h1>

          {/* Scrambled subtitle */}
          <p
            style={{
              fontFamily:   "'Cormorant Garamond', Georgia, serif",
              fontSize:     'clamp(1.1rem, 2vw, 1.5rem)',
              fontStyle:    'italic',
              fontWeight:   300,
              color:        'rgba(223,149,80,.8)',
              letterSpacing: '0.06em',
              marginBottom: '28px',
              opacity:      mounted ? 1 : 0,
              transform:    mounted ? 'none' : 'translateY(14px)',
              transition:   'opacity .9s ease .9s, transform .9s ease .9s',
            }}
          >
            {subtitle}
          </p>

          <p
            style={{
              fontFamily:   "'Inter', sans-serif",
              fontSize:     '1.05rem',
              lineHeight:   1.75,
              color:        'rgba(199,203,214,.65)',
              maxWidth:     '480px',
              marginBottom: '44px',
              opacity:      mounted ? 1 : 0,
              transform:    mounted ? 'none' : 'translateY(12px)',
              transition:   'opacity .9s ease 1.1s, transform .9s ease 1.1s',
            }}
          >
            Friday's captures that defining transition — from the last hour of
            responsibility to the first pulse of possibility. Engineered for those
            who leave an impression.
          </p>

          {/* CTAs */}
          <div
            style={{
              display:    'flex',
              gap:        '16px',
              flexWrap:   'wrap',
              opacity:    mounted ? 1 : 0,
              transform:  mounted ? 'none' : 'translateY(12px)',
              transition: 'opacity .9s ease 1.3s, transform .9s ease 1.3s',
            }}
          >
            <Link
              to="/shop"
              data-hover
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                gap:            '8px',
                padding:        '14px 36px',
                background:     'rgba(223,149,80,1)',
                color:          '#090b0f',
                fontFamily:     "'Inter', sans-serif",
                fontSize:       '0.7rem',
                fontWeight:     600,
                letterSpacing:  '0.2em',
                textTransform:  'uppercase',
                textDecoration: 'none',
                transition:     'background .3s, box-shadow .3s, transform .2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background   = '#f0ebe0'
                e.currentTarget.style.boxShadow    = '0 12px 40px rgba(223,149,80,.35)'
                e.currentTarget.style.transform    = 'translateY(-2px)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background   = 'rgba(223,149,80,1)'
                e.currentTarget.style.boxShadow    = 'none'
                e.currentTarget.style.transform    = 'translateY(0)'
              }}
            >
              Explore Collection
              <ArrowRight size={14} style={{ transition: 'transform .3s' }} />
            </Link>

            <Link
              to="/about"
              data-hover
              style={{
                display:        'inline-flex',
                alignItems:     'center',
                padding:        '14px 36px',
                border:         '1px solid rgba(199,203,214,.25)',
                color:          'rgba(199,203,214,.8)',
                fontFamily:     "'Inter', sans-serif",
                fontSize:       '0.7rem',
                letterSpacing:  '0.2em',
                textTransform:  'uppercase',
                textDecoration: 'none',
                transition:     'border-color .3s, color .3s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = 'rgba(223,149,80,.5)'
                e.currentTarget.style.color       = 'rgba(223,149,80,1)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = 'rgba(199,203,214,.25)'
                e.currentTarget.style.color       = 'rgba(199,203,214,.8)'
              }}
            >
              Our Story
            </Link>
          </div>

          {/* Trust pillars */}
          <div
            style={{
              display:    'flex',
              gap:        '40px',
              marginTop:  '56px',
              paddingTop: '40px',
              borderTop:  '1px solid rgba(255,255,255,.06)',
              opacity:    mounted ? 1 : 0,
              transition: 'opacity 1s ease 1.6s',
            }}
          >
            {[
              { value: '12+', label: 'Hour Wear' },
              { value: '100%', label: 'Cruelty Free' },
              { value: '6', label: 'Fragrances' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize:   '1.8rem',
                  fontWeight: 400,
                  color:      '#ffffff',
                  lineHeight: 1,
                  marginBottom: '4px',
                }}>
                  {value}
                </p>
                <p style={{
                  fontSize:      '0.6rem',
                  letterSpacing: '0.22em',
                  textTransform: 'uppercase',
                  color:         'rgba(167,170,180,.6)',
                  fontFamily:    "'Inter', sans-serif",
                }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Right: Bottle with glow ── */}
        <div
          ref={bottleRef}
          style={{
            position:        'relative',
            display:         'flex',
            justifyContent:  'center',
            alignItems:      'center',
            opacity:         mounted ? 1 : 0,
            transform:       mounted ? 'none' : 'translateX(24px)',
            transition:      'opacity 1.2s ease .6s, transform 1.2s ease .6s',
          }}
        >
          {/* Blue outer glow — matches preview exactly */}
          <div style={{
            position:   'absolute',
            width:       480,
            height:      480,
            borderRadius:'50%',
            background:  'radial-gradient(circle, rgba(90,139,255,.35) 0%, transparent 65%)',
            filter:      'blur(28px)',
            animation:   'glowpulse 3s ease-in-out infinite',
            pointerEvents:'none',
          }} />
          {/* Amber inner glow */}
          <div style={{
            position:   'absolute',
            width:       260,
            height:      260,
            borderRadius:'50%',
            background:  'radial-gradient(circle, rgba(223,149,80,.22) 0%, transparent 70%)',
            filter:      'blur(12px)',
            animation:   'glowpulse 3s ease-in-out infinite 1s',
            pointerEvents:'none',
          }} />

          <BottleIllustration
            gradient={hero.bottleGradient}
            glowColor={hero.glowColor}
            accentColor={hero.accentColor}
            label="Friday's"
            sublabel={hero.name}
            size="xl"
          />
        </div>
      </div>
      </div>{/* end content wrapper */}

      {/* ── Scroll indicator — flex child pinned at section bottom ── */}
      <div
        style={{
          position:      'relative',
          zIndex:        10,
          flexShrink:    0,
          display:       'flex',
          flexDirection: 'column',
          alignItems:    'center',
          gap:           '12px',
          paddingBottom: '36px',
          paddingTop:    '16px',
          opacity:       mounted ? 0.45 : 0,
          transition:    'opacity 1s ease 2s',
        }}
      >
        <span style={{
          fontSize:      '0.58rem',
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color:         'rgba(167,170,180,.8)',
          fontFamily:    "'Inter', sans-serif",
        }}>
          Scroll
        </span>
        <div style={{
          width:      1,
          height:     52,
          background: 'linear-gradient(to bottom, rgba(223,149,80,.7), transparent)',
          animation:  'scrollLine 2s ease-in-out infinite',
        }} />
      </div>
    </section>
  )
}
