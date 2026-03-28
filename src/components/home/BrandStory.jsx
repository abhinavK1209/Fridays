import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Sparkles, Wind, Leaf } from 'lucide-react'
import Marquee from '@/components/effects/Marquee'

const pillars = [
  {
    Icon: Clock,
    title: '12+ Hour Longevity',
    body: 'High-concentration oil formulas designed to evolve for half a day and beyond, with natural projection that commands a room.',
    color: 'rgba(223,149,80,.9)',
    bg:    'rgba(223,149,80,.06)',
    delay: 0,
  },
  {
    Icon: Sparkles,
    title: 'Rare Ingredients',
    body: 'Sourced from Grasse, oud regions, and beyond — every note is an authentic material, never a synthetic substitution.',
    color: 'rgba(90,139,255,.9)',
    bg:    'rgba(90,139,255,.06)',
    delay: 120,
  },
  {
    Icon: Wind,
    title: 'Master Perfumers',
    body: 'Composed by perfumers who approach scent as architecture — layered, intentional, and built to leave an impression.',
    color: 'rgba(150,80,220,.9)',
    bg:    'rgba(150,80,220,.06)',
    delay: 240,
  },
  {
    Icon: Leaf,
    title: 'Conscious Crafting',
    body: 'Cruelty-free formulation, recycled packaging, and a commitment to traceability across our entire supply chain.',
    color: 'rgba(80,200,140,.9)',
    bg:    'rgba(80,200,140,.06)',
    delay: 360,
  },
]

// ── Count-up animation for stats ──────────────────────────────────────────────
function StatItem({ value, label }) {
  const ref    = useRef(null)
  const hasRun = useRef(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const target = parseInt(value)
    const suffix = value.replace(/[0-9]/g, '')

    const obs = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !hasRun.current) {
        hasRun.current = true
        let cur = 0
        const step = target / 52
        const tick = () => {
          cur += step
          if (cur >= target) { el.textContent = target + suffix; return }
          el.textContent = Math.floor(cur) + suffix
          requestAnimationFrame(tick)
        }
        tick()
      }
    }, { threshold: 0.5 })

    obs.observe(el)
    return () => obs.disconnect()
  }, [value])

  return (
    <div style={{ textAlign: 'center' }}>
      <span
        ref={ref}
        style={{
          display:    'block',
          fontFamily: "'Cormorant Garamond', Georgia, serif",
          fontSize:   'clamp(2.4rem, 4vw, 3.6rem)',
          fontWeight:  400,
          color:       'rgba(223,149,80,1)',
          lineHeight:  1,
          marginBottom:'6px',
        }}
      >
        0
      </span>
      <span style={{
        fontSize:      '0.6rem',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color:         'rgba(167,170,180,.6)',
        fontFamily:    "'Inter', sans-serif",
      }}>
        {label}
      </span>
    </div>
  )
}

// ── Marquee scent words ───────────────────────────────────────────────────────
const scentWords = [
  'Amber', 'Oud', 'Bergamot', 'Sandalwood', 'Vetiver', 'Neroli',
  'Saffron', 'Leather', 'Tobacco', 'Iris', 'Cedar', 'Patchouli',
  'Musk', 'Jasmine', 'Lavender', 'Vanilla', 'Incense', 'Black Pepper',
]

export default function BrandStory() {
  return (
    <>
      {/* ── Brand Quote ── */}
      <section
        style={{
          padding:    '160px 32px',
          borderTop:  '1px solid rgba(255,255,255,.05)',
          borderBottom:'1px solid rgba(255,255,255,.05)',
          textAlign:  'center',
          position:   'relative',
          overflow:   'hidden',
          background: 'radial-gradient(ellipse 70% 50% at 50% 50%, rgba(22,28,48,.5) 0%, transparent 70%)',
        }}
      >
        {/* Large watermark text */}
        <div aria-hidden="true" style={{
          position:      'absolute',
          top:           '50%',
          left:          '50%',
          transform:     'translate(-50%, -50%)',
          fontFamily:    "'Cormorant Garamond', Georgia, serif",
          fontSize:      'clamp(80px, 15vw, 220px)',
          fontWeight:    400,
          color:         'rgba(223,149,80,.025)',
          letterSpacing: '0.3em',
          whiteSpace:    'nowrap',
          pointerEvents: 'none',
          userSelect:    'none',
        }}>
          FRIDAY'S
        </div>

        <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms]" style={{ maxWidth: '860px', margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '44px' }}>
            <div style={{ flex: 1, maxWidth: 64, height: 1, background: 'rgba(223,149,80,.3)' }} />
            <span style={{
              fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase',
              color: 'rgba(223,149,80,.7)', fontFamily: "'Inter', sans-serif",
            }}>
              Brand Story
            </span>
            <div style={{ flex: 1, maxWidth: 64, height: 1, background: 'rgba(223,149,80,.3)' }} />
          </div>

          <blockquote style={{
            fontFamily:    "'Cormorant Garamond', Georgia, serif",
            fontSize:      'clamp(1.7rem, 3.8vw, 3rem)',
            fontWeight:    400,
            lineHeight:    1.22,
            letterSpacing: '0.03em',
            color:         '#ffffff',
            marginBottom:  '32px',
          }}>
            "A scent is not a product.<br />
            <em style={{ color: 'rgba(90,139,255,.9)', fontStyle: 'italic' }}>It's a signature.</em>"
          </blockquote>

          <p style={{
            fontSize:     '1rem',
            lineHeight:   1.8,
            color:        'rgba(199,203,214,.6)',
            maxWidth:     '680px',
            margin:       '0 auto 36px',
            fontFamily:   "'Inter', sans-serif",
          }}>
            Friday's was born from a simple conviction: that luxury fragrance shouldn't require
            a French education or a trust fund. We set out to create the scents we wanted to wear
            — modern, bold, and unapologetically ambitious.
          </p>

          <Link
            to="/about"
            data-hover
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '10px',
              fontFamily:     "'Inter', sans-serif",
              fontSize:       '0.68rem',
              letterSpacing:  '0.2em',
              textTransform:  'uppercase',
              color:          'rgba(199,203,214,.6)',
              textDecoration: 'none',
              transition:     'color .3s, gap .3s',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = 'rgba(223,149,80,1)'; e.currentTarget.style.gap = '18px' }}
            onMouseLeave={e => { e.currentTarget.style.color = 'rgba(199,203,214,.6)'; e.currentTarget.style.gap = '10px' }}
          >
            Read our full story <ArrowRight size={13} />
          </Link>
        </div>
      </section>

      {/* ── Marquee Strip ── */}
      <div style={{
        padding:    '20px 0',
        borderTop:  '1px solid rgba(223,149,80,.08)',
        borderBottom:'1px solid rgba(223,149,80,.08)',
        background: 'rgba(223,149,80,.03)',
      }}>
        <Marquee items={scentWords} speed={38} />
      </div>

      {/* ── Stats Row ── */}
      <section style={{
        padding:    '100px 32px',
        background: 'rgba(10,11,15,.8)',
      }}>
        <div style={{
          maxWidth:              '1280px',
          margin:                '0 auto',
          display:               'grid',
          gridTemplateColumns:   'repeat(4, 1fr)',
          gap:                   '1px',
          background:            'rgba(223,149,80,.07)',
        }}>
          {[
            { value: '6+',   label: 'Fragrances' },
            { value: '12+',  label: 'Hour Wear' },
            { value: '100%', label: 'Cruelty Free' },
            { value: '47',   label: 'Ingredients' },
          ].map(s => (
            <div key={s.label} style={{
              background: '#090b0f',
              padding:    '64px 40px',
              transition: 'background .3s',
            }}
              onMouseEnter={e => e.currentTarget.style.background = 'rgba(223,149,80,.03)'}
              onMouseLeave={e => e.currentTarget.style.background = '#090b0f'}
            >
              <StatItem value={s.value} label={s.label} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Reverse Marquee ── */}
      <div style={{
        padding:     '20px 0',
        borderTop:   '1px solid rgba(90,139,255,.06)',
        borderBottom:'1px solid rgba(90,139,255,.06)',
        background:  'rgba(90,139,255,.02)',
      }}>
        <Marquee
          items={['Noir Ember', 'Midnight Alloy', 'Dusk Meridian', 'Velvet Archive', 'Weekend Code', "Friday's Ritual"]}
          speed={28}
          direction="right"
          separator="·"
        />
      </div>

      {/* ── Pillars ── */}
      <section style={{ padding: '120px 32px' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div
            className="reveal opacity-0 translate-y-6 transition-all duration-[900ms]"
            style={{ marginBottom: '64px' }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
              <div style={{ width: 32, height: 1, background: 'rgba(223,149,80,.6)' }} />
              <span style={{
                fontSize: '0.65rem', letterSpacing: '0.28em', textTransform: 'uppercase',
                color: 'rgba(223,149,80,.85)', fontFamily: "'Inter', sans-serif",
              }}>
                The Experience
              </span>
            </div>
            <h2 style={{
              fontFamily:    "'Cormorant Garamond', Georgia, serif",
              fontSize:      'clamp(2rem, 4vw, 3.2rem)',
              fontWeight:    400,
              color:         '#ffffff',
              letterSpacing: '0.03em',
            }}>
              Precision. Presence. Purpose.
            </h2>
          </div>

          <div style={{
            display:             'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap:                 '12px',
          }}>
            {pillars.map(({ Icon, title, body, color, bg, delay }) => (
              <div
                key={title}
                data-hover
                className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] group"
                style={{
                  transitionDelay: `${delay}ms`,
                  padding:         '28px 24px',
                  borderRadius:    '12px',
                  border:          '1px solid rgba(255,255,255,.07)',
                  background:      'rgba(13,15,22,.8)',
                  transition:      'border-color .4s, background .4s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = color.replace('.9', '.3')
                  e.currentTarget.style.background  = bg
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,.07)'
                  e.currentTarget.style.background  = 'rgba(13,15,22,.8)'
                }}
              >
                <div style={{
                  width:          40,
                  height:         40,
                  borderRadius:   '10px',
                  border:         `1px solid ${color.replace('.9', '.2')}`,
                  background:     bg,
                  display:        'flex',
                  alignItems:     'center',
                  justifyContent: 'center',
                  marginBottom:   '20px',
                  transition:     'background .4s',
                }}>
                  <Icon size={18} style={{ color }} />
                </div>
                <h3 style={{
                  fontFamily:   "'Cormorant Garamond', Georgia, serif",
                  fontSize:     '1.2rem',
                  color:        '#ffffff',
                  marginBottom: '10px',
                }}>
                  {title}
                </h3>
                <p style={{
                  fontSize:   '0.85rem',
                  lineHeight: 1.7,
                  color:      'rgba(199,203,214,.6)',
                  fontFamily: "'Inter', sans-serif",
                }}>
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
