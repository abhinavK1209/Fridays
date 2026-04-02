import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingBag, Menu, X, User, Package, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

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
          padding: '8px',
          color: open ? '#df9550' : 'rgba(199,203,214,.7)',
          transition: 'color .3s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#df9550'}
        onMouseLeave={e => e.currentTarget.style.color = open ? '#df9550' : 'rgba(199,203,214,.7)'}
      >
        <User style={{ width: 20, height: 20 }} />
        <ChevronDown size={11} style={{ transition: 'transform .2s', transform: open ? 'rotate(180deg)' : 'none', opacity: 0.7 }} />
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
              <Link key={label} to={to}
                style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 18px', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(199,203,214,.55)', textDecoration: 'none', transition: 'background .15s, color .15s' }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(223,149,80,.06)'; e.currentTarget.style.color = '#df9550' }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'rgba(199,203,214,.55)' }}
              >
                <Icon size={13} style={{ color: 'rgba(223,149,80,.5)' }} />{label}
              </Link>
            ))}
          </div>
          <div style={{ borderTop: '1px solid rgba(255,255,255,.05)', padding: '8px 0' }}>
            <button onClick={handleLogout}
              style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '11px 18px', background: 'none', border: 'none', cursor: 'pointer', fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(239,68,68,.5)', transition: 'background .15s, color .15s', textAlign: 'left' }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(239,68,68,.05)'; e.currentTarget.style.color = '#ef4444' }}
              onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'rgba(239,68,68,.5)' }}
            >
              <LogOut size={13} style={{ color: 'rgba(239,68,68,.4)' }} />Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { cartCount, openCart }    = useCart()
  const { user, logout, openModal } = useAuth()
  const location                    = useLocation()
  const [scrolled,  setScrolled]    = useState(false)
  const [menuOpen,  setMenuOpen]    = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500',
          scrolled ? 'backdrop-blur-xl py-4' : 'py-6'
        )}
        style={{ background: scrolled ? 'rgba(7,9,12,0.75)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">

          {/* Logo */}
          <Link to="/" style={{
            fontFamily:    "'Cormorant Garamond', Georgia, serif",
            fontSize:      '1.7rem',
            fontWeight:    300,
            letterSpacing: '0.45em',
            color:         '#df9550',
            textTransform: 'uppercase',
            textDecoration:'none',
          }}>
            Friday's
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-11" aria-label="Main navigation">
            {navLinks.map(({ label, to }) => {
              const active = location.pathname === to
              return (
                <Link
                  key={to}
                  to={to}
                  style={{
                    fontSize:      '0.68rem',
                    letterSpacing: '0.22em',
                    textTransform: 'uppercase',
                    textDecoration:'none',
                    color:         active ? '#df9550' : 'rgba(199,203,214,.65)',
                    transition:    'color .3s',
                    position:      'relative',
                    paddingBottom: '4px',
                  }}
                  onMouseEnter={e => e.currentTarget.style.color = '#df9550'}
                  onMouseLeave={e => e.currentTarget.style.color = active ? '#df9550' : 'rgba(199,203,214,.65)'}
                >
                  {label}
                  {active && (
                    <span style={{
                      position:     'absolute',
                      bottom:       0,
                      left:         0,
                      right:        0,
                      height:       1,
                      background:   'linear-gradient(90deg, transparent, #df9550, transparent)',
                      borderRadius: '1px',
                    }} />
                  )}
                </Link>
              )
            })}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">

            {/* Shop Now */}
            <Link
              to="/shop"
              data-hover
              className="hidden md:inline-flex items-center"
              style={{
                fontSize:      '0.65rem',
                letterSpacing: '0.2em',
                textTransform: 'uppercase',
                color:         '#090b0f',
                background:    '#df9550',
                padding:       '11px 26px',
                fontWeight:    500,
                textDecoration:'none',
                transition:    'background .3s, box-shadow .3s, transform .2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background  = '#f0ebe0'
                e.currentTarget.style.transform   = 'translateY(-2px)'
                e.currentTarget.style.boxShadow   = '0 8px 28px rgba(223,149,80,.3)'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background  = '#df9550'
                e.currentTarget.style.transform   = 'none'
                e.currentTarget.style.boxShadow   = 'none'
              }}
            >
              Shop Now
            </Link>

            {/* Account */}
            {user ? (
              <AccountDropdown user={user} logout={logout} />
            ) : (
              <button
                onClick={openModal}
                aria-label="Sign in"
                className="relative p-2 transition-colors duration-300"
                style={{ color: 'rgba(199,203,214,.7)' }}
                onMouseEnter={e => e.currentTarget.style.color = '#df9550'}
                onMouseLeave={e => e.currentTarget.style.color = 'rgba(199,203,214,.7)'}
              >
                <User className="w-5 h-5" />
              </button>
            )}

            {/* Cart */}
            <button
              onClick={openCart}
              aria-label={`Open cart (${cartCount} items)`}
              className="relative p-2 text-silver hover:text-white transition-colors duration-300"
              style={{ color: 'rgba(199,203,214,.7)' }}
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber text-[9px] font-bold text-bg flex items-center justify-center leading-none">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile toggle */}
            <button
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden p-2 text-silver hover:text-white transition-colors duration-300"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile full-screen overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-10 md:hidden transition-all duration-300',
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        )}
        style={{ background: 'rgba(7,9,12,0.97)', backdropFilter: 'blur(20px)' }}
      >
        <nav className="flex flex-col gap-8 mt-8" aria-label="Mobile navigation">
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="font-serif text-3xl text-white/80 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
          {user && (
            <>
              <Link to="/account"              className="font-serif text-3xl text-white/80 hover:text-white transition-colors">My Orders</Link>
              <Link to="/account?tab=settings" className="font-serif text-3xl text-white/80 hover:text-white transition-colors">Settings</Link>
            </>
          )}
        </nav>

        <div className="mt-auto border-t border-white/10 pt-8 flex flex-col gap-4">
          <Link
            to="/shop"
            onClick={() => setMenuOpen(false)}
            style={{
              display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
              padding: '14px 32px', background: '#df9550', color: '#090b0f',
              fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', fontWeight: 600,
              letterSpacing: '0.2em', textTransform: 'uppercase', textDecoration: 'none',
            }}
          >
            Shop Now
          </Link>
          <p className="text-muted text-sm tracking-widest uppercase">Modern Scent Redefined.</p>
        </div>
      </div>
    </>
  )
}
