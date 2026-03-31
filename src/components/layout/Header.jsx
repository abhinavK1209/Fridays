import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingBag, Menu, X, User, Package, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'

const navLinks = [
  { label: 'Home',       to: '/' },
  { label: 'Collection', to: '/shop' },
  { label: 'Story',      to: '/about' },
]

function AccountDropdown({ user, logout }) {
  const [open, setOpen]  = useState(false)
  const ref              = useRef(null)
  const closeTimer       = useRef(null)
  const navigate         = useNavigate()
  const location         = useLocation()

  function handleMouseEnter() { clearTimeout(closeTimer.current); setOpen(true) }
  function handleMouseLeave() { closeTimer.current = setTimeout(() => setOpen(false), 120) }

  useEffect(() => {
    function handler(e) { if (ref.current && !ref.current.contains(e.target)) setOpen(false) }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  useEffect(() => setOpen(false), [location.pathname])

  async function handleLogout() { setOpen(false); await logout(); navigate('/') }

  const menuItems = [
    { label: 'My Orders', Icon: Package,  to: '/account' },
    { label: 'Settings',  Icon: Settings, to: '/account?tab=settings' },
  ]

  return (
    <div ref={ref} style={{ position: 'relative' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Account menu"
        style={{
          display: 'flex', alignItems: 'center', gap: 4,
          background: 'none', border: 'none', cursor: 'pointer',
          padding: '6px 8px',
          color: open ? '#df9550' : 'rgba(199,203,214,.6)',
          transition: 'color .2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#df9550'}
        onMouseLeave={e => e.currentTarget.style.color = open ? '#df9550' : 'rgba(199,203,214,.6)'}
      >
        <User size={17} />
        <ChevronDown size={11} style={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none', opacity: 0.6 }} />
      </button>

      {open && (
        <div style={{
          position: 'absolute', top: 'calc(100% + 12px)', right: 0,
          width: 240, background: '#090b0f',
          border: '1px solid rgba(223,149,80,.15)', borderRadius: 16,
          boxShadow: '0 32px 80px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.04)',
          overflow: 'hidden', zIndex: 100,
        }}>
          <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, rgba(223,149,80,.6), transparent)' }} />
          <div style={{ padding: '18px 18px 14px', borderBottom: '1px solid rgba(255,255,255,.06)' }}>
            <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.15rem', fontWeight: 400, color: '#df9550', marginBottom: 3, letterSpacing: '0.04em' }}>
              {user.displayName || 'My Account'}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.68rem', color: 'rgba(199,203,214,.35)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', letterSpacing: '0.02em' }}>
              {user.email}
            </p>
          </div>
          <div style={{ padding: '8px 0' }}>
            {menuItems.map(({ label, Icon, to }) => (
              <Link key={label} to={to} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 18px', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(199,203,214,.55)', textDecoration: 'none', transition: 'background .15s, color .15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(223,149,80,.06)'; e.currentTarget.style.color = '#df9550' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(199,203,214,.55)' }}
              >
                <Icon size={13} style={{ color: 'rgba(223,149,80,.5)' }} />{label}
              </Link>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.05)', padding: '8px 0' }}>
            <button onClick={handleLogout} style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(239,68,68,.5)', transition: 'background .15s, color .15s', textAlign: 'left' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,.05)'; e.currentTarget.style.color = '#ef4444' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(239,68,68,.5)' }}
            >
              <LogOut size={13} style={{ color: 'rgba(239,68,68,.4)' }} />Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { totalItems, openCart }    = useCart()
  const { user, logout, openModal } = useAuth()
  const [menuOpen, setMenuOpen]     = useState(false)
  const location                    = useLocation()

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <header style={{
      position:        'fixed',
      top:             0,
      left:            0,
      right:           0,
      zIndex:          50,
      height:          '76px',
      background:      'rgba(10,11,14,0.97)',
      backdropFilter:  'blur(24px)',
      borderBottom:    '1px solid rgba(255,255,255,0.07)',
    }}>
      {/* Inner wrapper — logo left, nav absolute-center, actions right */}
      <div style={{
        maxWidth:   '1280px',
        width:      '100%',
        margin:     '0 auto',
        padding:    '0 40px',
        height:     '100%',
        display:    'flex',
        alignItems: 'center',
        position:   'relative',
      }}>

        {/* Logo — left */}
        <Link to="/" style={{
          fontFamily:    "'Cormorant Garamond', Georgia, serif",
          fontSize:      '1.35rem',
          fontWeight:    400,
          letterSpacing: '0.28em',
          textTransform: 'uppercase',
          color:         '#c8874a',
          textDecoration:'none',
          flexShrink:    0,
        }}>
          Friday's
        </Link>

        {/* Nav — absolutely centered in the header */}
        <nav className="hidden md:flex" style={{
          position:   'absolute',
          left:       '50%',
          transform:  'translateX(-50%)',
          display:    'flex',
          alignItems: 'center',
          gap:        '44px',
        }}>
          {navLinks.map(({ label, to }) => {
            const active = location.pathname === to
            return (
              <Link
                key={label}
                to={to}
                style={{
                  position:      'relative',
                  fontFamily:    "'Inter', sans-serif",
                  fontSize:      '0.65rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color:         active ? '#c8874a' : 'rgba(199,203,214,.42)',
                  textDecoration:'none',
                  paddingBottom: '14px',
                  transition:    'color .2s',
                }}
                onMouseEnter={e => e.currentTarget.style.color = '#c8874a'}
                onMouseLeave={e => e.currentTarget.style.color = active ? '#c8874a' : 'rgba(199,203,214,.42)'}
              >
                {label}
                {/* Active underline */}
                {active && (
                  <span style={{
                    position:   'absolute',
                    bottom:     0,
                    left:       '50%',
                    transform:  'translateX(-50%)',
                    width:      '20px',
                    height:     '1px',
                    background: '#c8874a',
                  }} />
                )}
              </Link>
            )
          })}
        </nav>

        {/* Actions — right */}
        <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '6px' }}>

          {/* Shop Now CTA */}
          <Link
            to="/shop"
            className="hidden md:flex"
            style={{
              alignItems:    'center',
              padding:       '9px 24px',
              borderRadius:  5,
              background:    '#c8874a',
              color:         '#09090b',
              fontFamily:    "'Inter', sans-serif",
              fontSize:      '0.62rem',
              fontWeight:    700,
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              textDecoration:'none',
              transition:    'background .2s, box-shadow .2s',
              whiteSpace:    'nowrap',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = '#b5763d'
              e.currentTarget.style.boxShadow  = '0 4px 18px rgba(200,135,74,.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = '#c8874a'
              e.currentTarget.style.boxShadow  = 'none'
            }}
          >
            Shop Now
          </Link>

          {/* Account icon */}
          {user ? (
            <AccountDropdown user={user} logout={logout} />
          ) : (
            <button
              onClick={openModal}
              aria-label="Sign in"
              style={{
                background: 'none', border: 'none', cursor: 'pointer',
                padding: '6px 10px', display: 'flex', alignItems: 'center',
                color: 'rgba(199,203,214,.55)', transition: 'color .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#c8874a'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(199,203,214,.55)'}
            >
              <User size={17} />
            </button>
          )}

          {/* Cart icon */}
          <button
            onClick={openCart}
            aria-label="Open cart"
            style={{
              position: 'relative', background: 'none', border: 'none',
              cursor: 'pointer', padding: '6px 10px',
              color: 'rgba(199,203,214,.55)', transition: 'color .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(199,203,214,.55)'}
          >
            <ShoppingBag size={17} />
            {totalItems > 0 && (
              <span style={{
                position: 'absolute', top: '2px', right: '4px',
                width: '15px', height: '15px', borderRadius: '50%',
                background: '#c8874a', color: '#09090b',
                fontSize: '0.5rem', fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                {totalItems}
              </span>
            )}
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            className="md:hidden"
            style={{
              background: 'none', border: 'none', cursor: 'pointer',
              padding: '6px 8px', color: 'rgba(199,203,214,.6)',
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden" style={{
          position: 'absolute', top: '76px', left: 0, right: 0,
          background: 'rgba(10,11,14,0.99)',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          padding: '16px 24px 24px',
          backdropFilter: 'blur(24px)',
        }}>
          {navLinks.map(({ label, to }) => (
            <Link key={label} to={to} style={{
              display: 'block', padding: '13px 0',
              fontFamily: "'Inter', sans-serif", fontSize: '0.72rem',
              letterSpacing: '0.2em', textTransform: 'uppercase',
              color: location.pathname === to ? '#c8874a' : 'rgba(199,203,214,.5)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(255,255,255,0.05)',
            }}>
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
