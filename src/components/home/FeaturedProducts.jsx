import { useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import BottleImage from '@/components/common/BottleImage'
import { getFeatured } from '@/data/products'
import { useCart } from '@/context/CartContext'

// ── 3D Tilt Hook ─────────────────────────────────────────────────────────────
function useTilt(strength = 10) {
  const ref = useRef(null)

  const onMouseMove = e => {
    const el   = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x    = e.clientX - rect.left
    const y    = e.clientY - rect.top
    const cx   = rect.width  / 2
    const cy   = rect.height / 2
    const rotX = ((y - cy) / cy) * -strength
    const rotY = ((x - cx) / cx) *  strength
    el.style.transform  = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(6px)`
    el.style.transition = 'transform 0.05s linear'
    // Move the glow to follow cursor
    const glowEl = el.querySelector('.card-glow')
    if (glowEl) {
      glowEl.style.background = `radial-gradient(circle at ${(x / rect.width) * 100}% ${(y / rect.height) * 100}%, ${glowEl.dataset.glowColor} 0%, transparent 60%)`
    }
  }

  const onMouseLeave = (e) => {
    const el = ref.current
    if (!el) return
    el.style.transition = 'transform .6s cubic-bezier(0.16,1,0.3,1)'
    el.style.transform  = 'perspective(1200px) rotateX(0) rotateY(0) translateZ(0)'
    e.currentTarget.style.borderColor = 'rgba(255,255,255,0.07)'
  }

  return { ref, onMouseMove, onMouseLeave }
}

// ── Featured Card ─────────────────────────────────────────────────────────────
function FeaturedCard({ product, index }) {
  const { addToCart } = useCart()
  const defaultSize   = product.sizes.find(s => s.ml === product.defaultSize) || product.sizes[0]
  const [added, setAdded] = useState(false)
  const { ref, onMouseMove, onMouseLeave } = useTilt(8)

  const handleAdd = () => {
    addToCart(product, defaultSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div
      ref={ref}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      data-hover
      className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] group relative overflow-hidden"
      style={{
        transitionDelay:  `${index * 120}ms`,
        borderRadius:     '20px',
        border:           '1px solid rgba(255,255,255,0.07)',
        background:       '#101318',
        transformStyle:   'preserve-3d',
        willChange:       'transform',
        transition:       'border-color .45s',
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${product.accentColor}38` }}
    >
      {/* Cursor-tracking glow layer */}
      <div
        className="card-glow"
        data-glow-color={product.glowColor}
        style={{
          position:      'absolute',
          inset:         0,
          background:    `radial-gradient(circle at 50% 70%, ${product.glowColor} 0%, transparent 60%)`,
          opacity:       0.5,
          transition:    'opacity .5s, background .1s',
          pointerEvents: 'none',
          borderRadius:  '20px',
        }}
      />
      <style>{`
        .group:hover .card-glow { opacity: 1 !important; }
      `}</style>

      {/* Top accent line that lights up on hover */}
      <div style={{
        position:   'absolute',
        top:        0,
        left:       0,
        right:      0,
        height:     1,
        background: `linear-gradient(90deg, transparent, ${product.accentColor}, transparent)`,
        opacity:    0,
        transition: 'opacity .5s',
      }}
        className="group-hover:opacity-60"
      />

      {/* Bottle area */}
      <div
        style={{
          position:        'relative',
          display:         'flex',
          alignItems:      'center',
          justifyContent:  'center',
          paddingTop:      '40px',
          paddingBottom:   '20px',
          minHeight:       '260px',
        }}
      >
        <div style={{
          position:      'absolute',
          inset:         0,
          background:    `radial-gradient(circle at 50% 70%, ${product.glowColor.replace('0.4', '0.18').replace('0.35', '0.14').replace('0.3', '0.12')} 0%, transparent 60%)`,
          pointerEvents: 'none',
          transition:    'opacity .5s',
        }} />
        {/* Bottle lifts on hover via CSS transform */}
        <div style={{
          transition: 'transform .5s cubic-bezier(0.16,1,0.3,1)',
        }}
          className="group-hover:-translate-y-3"
        >
          <BottleImage
            image={product.image}
            gradient={product.bottleGradient}
            glowColor={product.glowColor}
            accentColor={product.accentColor}
            sublabel={product.name}
            size="md"
          />
        </div>
      </div>

      {/* Info */}
      <div style={{ padding: '0 24px 28px' }}>
        {product.badge && (
          <div style={{ marginBottom: '12px' }}>
            <span style={{
              display:       'inline-block',
              fontSize:      '0.6rem',
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              padding:       '3px 10px',
              border:        `1px solid rgba(223,149,80,.4)`,
              color:         'rgba(223,149,80,.9)',
              fontFamily:    "'Inter', sans-serif",
            }}>
              {product.badge}
            </span>
          </div>
        )}

        <h3 style={{
          fontFamily:    "'Cormorant Garamond', Georgia, serif",
          fontSize:      '1.6rem',
          fontWeight:    400,
          color:         '#ffffff',
          marginBottom:  '4px',
          letterSpacing: '0.04em',
        }}>
          {product.name}
        </h3>

        <p style={{
          fontSize:      '0.62rem',
          letterSpacing: '0.18em',
          textTransform: 'uppercase',
          color:         'rgba(167,170,180,.6)',
          marginBottom:  '10px',
          fontFamily:    "'Inter', sans-serif",
        }}>
          {product.category}
        </p>

        <p style={{
          fontSize:     '0.88rem',
          color:        'rgba(199,203,214,.65)',
          lineHeight:   1.65,
          marginBottom: '22px',
          display:      '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          overflow:     'hidden',
          fontFamily:   "'Inter', sans-serif",
        }}>
          {product.description}
        </p>

        {/* Scent note pills */}
        <div style={{
          display:      'flex',
          gap:          '6px',
          flexWrap:     'wrap',
          marginBottom: '24px',
        }}>
          {[...product.scentNotes.top.slice(0, 2), product.scentNotes.base[0]].map(note => (
            <span
              key={note}
              style={{
                fontSize:      '0.56rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                padding:       '3px 9px',
                border:        '1px solid rgba(255,255,255,0.1)',
                color:         'rgba(167,170,180,.7)',
                borderRadius:  '2px',
                fontFamily:    "'Inter', sans-serif",
                transition:    'border-color .3s, color .3s',
              }}
            >
              {note}
            </span>
          ))}
        </div>

        {/* Price + CTA */}
        <div style={{
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          paddingTop:     '20px',
          borderTop:      '1px solid rgba(255,255,255,.06)',
        }}>
          <div>
            <p style={{
              fontSize:      '0.58rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color:         'rgba(167,170,180,.5)',
              marginBottom:  '2px',
              fontFamily:    "'Inter', sans-serif",
            }}>From</p>
            <p style={{
              fontFamily: "'Cormorant Garamond', Georgia, serif",
              fontSize:   '1.35rem',
              color:      'rgba(223,149,80,1)',
            }}>
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                Math.min(...product.sizes.map(s => s.price))
              )}
            </p>
          </div>

          <button
            data-hover
            onClick={handleAdd}
            style={{
              padding:       '10px 20px',
              background:    added ? 'rgba(223,149,80,.15)' : 'rgba(223,149,80,1)',
              color:         added ? 'rgba(223,149,80,1)' : '#090b0f',
              border:        added ? '1px solid rgba(223,149,80,.5)' : '1px solid transparent',
              fontFamily:    "'Inter', sans-serif",
              fontSize:      '0.62rem',
              fontWeight:    600,
              letterSpacing: '0.18em',
              textTransform: 'uppercase',
              cursor:        'none',
              transition:    'all .35s',
            }}
          >
            {added ? '✓ Added' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Section ───────────────────────────────────────────────────────────────────
export default function FeaturedProducts() {
  const featured = getFeatured()

  return (
    <section className="featured-section" style={{ padding: '120px 32px', maxWidth: '1280px', margin: '0 auto' }}>
      {/* Header */}
      <div
        className="reveal opacity-0 translate-y-6 transition-all duration-[900ms]"
        style={{
          display:        'flex',
          flexDirection:  'column',
          gap:            '24px',
          marginBottom:   '72px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{ width: 32, height: 1, background: 'rgba(223,149,80,.6)' }} />
          <span style={{
            fontSize: '0.65rem', letterSpacing: '0.28em',
            textTransform: 'uppercase', color: 'rgba(223,149,80,.85)',
            fontFamily: "'Inter', sans-serif",
          }}>
            Signature Collection
          </span>
        </div>

        <div className="featured-header">
          <h2 style={{
            fontFamily:    "'Cormorant Garamond', Georgia, serif",
            fontSize:      'clamp(2rem, 4.5vw, 3.8rem)',
            fontWeight:    400,
            lineHeight:    1.1,
            color:         '#ffffff',
            letterSpacing: '0.03em',
            maxWidth:      '600px',
          }}>
            Crafted for the bold<br />and the rare.
          </h2>

          <Link
            to="/shop"
            data-hover
            style={{
              display:        'inline-flex',
              alignItems:     'center',
              gap:            '8px',
              fontFamily:     "'Inter', sans-serif",
              fontSize:       '0.68rem',
              letterSpacing:  '0.2em',
              textTransform:  'uppercase',
              color:          'rgba(199,203,214,.7)',
              textDecoration: 'none',
              flexShrink:     0,
              transition:     'color .3s, gap .3s',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = 'rgba(223,149,80,1)'
              e.currentTarget.style.gap   = '14px'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(199,203,214,.7)'
              e.currentTarget.style.gap   = '8px'
            }}
          >
            View all fragrances <ArrowRight size={13} />
          </Link>
        </div>
      </div>

      {/* Grid */}
      <div style={{
        display:               'grid',
        gridTemplateColumns:   'repeat(auto-fit, minmax(300px, 1fr))',
        gap:                   '16px',
      }}>
        {featured.map((product, i) => (
          <FeaturedCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
