import { useState, useEffect, useRef } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { ShoppingBag, Menu, X, User, Package, Settings, LogOut, ChevronDown } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Collection', to: '/shop' },
  { label: 'Story', to: '/about' },
]

function AccountDropdown({ user, logout }) {
  const [open, setOpen]   = useState(false)
  const ref               = useRef(null)
  const closeTimer        = useRef(null)
  const navigate          = useNavigate()

  function handleMouseEnter() {
    clearTimeout(closeTimer.current)
    setOpen(true)
  }

  function handleMouseLeave() {
    closeTimer.current = setTimeout(() => setOpen(false), 120)
  }

  // Close on outside click
  useEffect(() => {
    function handler(e) {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Close on route change
  const location = useLocation()
  useEffect(() => setOpen(false), [location.pathname])

  async function handleLogout() {
    setOpen(false)
    await logout()
    navigate('/')
  }

  const menuItems = [
    { label: 'My Orders',  Icon: Package,  to: '/account' },
    { label: 'Settings',   Icon: Settings, to: '/account?tab=settings' },
  ]

  return (
    <div ref={ref} style={{ position: 'relative' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {/* Trigger */}
      <button
        onClick={() => setOpen(v => !v)}
        aria-label="Account menu"
        style={{
          display:     'flex',
          alignItems:  'center',
          gap:         4,
          background:  'none',
          border:      'none',
          cursor:      'pointer',
          padding:     '6px 8px',
          color:       open ? '#df9550' : 'rgba(223,149,80,.8)',
          transition:  'color .2s',
        }}
        onMouseEnter={e => e.currentTarget.style.color = '#df9550'}
        onMouseLeave={e => e.currentTarget.style.color = open ? '#df9550' : 'rgba(223,149,80,.8)'}
      >
        <User size={18} />
        <ChevronDown
          size={12}
          style={{
            transition: 'transform .2s',
            transform:  open ? 'rotate(180deg)' : 'rotate(0deg)',
            opacity:    0.7,
          }}
        />
      </button>

      {/* Dropdown panel */}
      {open && (
        <div style={{
          position:     'absolute',
          top:          'calc(100% + 12px)',
          right:        0,
          width:        240,
          background:   '#090b0f',
          border:       '1px solid rgba(223,149,80,.15)',
          borderRadius: 16,
          boxShadow:    '0 32px 80px rgba(0,0,0,.8), 0 0 0 1px rgba(255,255,255,.04)',
          overflow:     'hidden',
          zIndex:       100,
        }}>
          {/* Amber top accent line */}
          <div style={{
            height:     1,
            background: 'linear-gradient(90deg, transparent, rgba(223,149,80,.6), transparent)',
          }} />

          {/* User info */}
          <div style={{
            padding:      '18px 18px 14px',
            borderBottom: '1px solid rgba(255,255,255,.06)',
          }}>
            <p style={{
              fontFamily:    "'Cormorant Garamond', Georgia, serif",
              fontSize:      '1.15rem',
              fontWeight:    400,
              color:         '#df9550',
              marginBottom:  3,
              letterSpacing: '0.04em',
            }}>
              {user.displayName || 'My Account'}
            </p>
            <p style={{
              fontFamily:   "'Inter', sans-serif",
              fontSize:     '0.68rem',
              color:        'rgba(199,203,214,.35)',
              overflow:     'hidden',
              textOverflow: 'ellipsis',
              whiteSpace:   'nowrap',
              letterSpacing:'0.02em',
            }}>
              {user.email}
            </p>
          </div>

          {/* Menu items */}
          <div style={{ padding: '8px 0' }}>
            {menuItems.map(({ label, Icon, to }) => (
              <Link
                key={label}
                to={to}
                style={{
                  display:        'flex',
                  alignItems:     'center',
                  gap:            12,
                  padding:        '11px 18px',
                  fontFamily:     "'Inter', sans-serif",
                  fontSize:       '0.72rem',
                  letterSpacing:  '0.12em',
                  textTransform:  'uppercase',
                  color:          'rgba(199,203,214,.55)',
                  textDecoration: 'none',
                  transition:     'background .15s, color .15s',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.background = 'rgba(223,149,80,.06)'
                  e.currentTarget.style.color      = '#df9550'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.background = 'transparent'
                  e.currentTarget.style.color      = 'rgba(199,203,214,.55)'
                }}
              >
                <Icon size={13} style={{ color: 'rgba(223,149,80,.5)' }} />
                {label}
              </Link>
            ))}
          </div>

          {/* Sign out */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,.05)', padding: '8px 0' }}>
            <button
              onClick={handleLogout}
              style={{
                width:         '100%',
                display:       'flex',
                alignItems:    'center',
                gap:           12,
                padding:       '11px 18px',
                background:    'none',
                border:        'none',
                cursor:        'pointer',
                fontFamily:    "'Inter', sans-serif",
                fontSize:      '0.72rem',
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color:         'rgba(239,68,68,.5)',
                transition:    'background .15s, color .15s',
                textAlign:     'left',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.background = 'rgba(239,68,68,.05)'
                e.currentTarget.style.color      = '#ef4444'
              }}
              onMouseLeave={e => {
                e.currentTarget.style.background = 'none'
                e.currentTarget.style.color      = 'rgba(239,68,68,.5)'
              }}
            >
              <LogOut size={13} style={{ color: 'rgba(239,68,68,.4)' }} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

export default function Header() {
  const { totalItems, openCart } = useCart()
  const { user }                 = useAuth()
  const { logout }               = useAuth()
  const [menuOpen, setMenuOpen]  = useState(false)
  const location                 = useLocation()

  useEffect(() => setMenuOpen(false), [location.pathname])

  return (
    <header
      style={{
        position:   'fixed',
        top:        0,
        left:       0,
        right:      0,
        zIndex:     50,
        height:     '72px',
        display:    'flex',
        alignItems: 'center',
        padding:    '0 24px',
        background: 'rgba(9,11,15,0.85)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      <div style={{ maxWidth: '1280px', width: '100%', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        {/* Logo */}
        <Link
          to="/"
          style={{
            fontFamily:    "'Cormorant Garamond', Georgia, serif",
            fontSize:      '1.5rem',
            fontWeight:    400,
            letterSpacing: '0.1em',
            color:         '#ffffff',
            textDecoration:'none',
          }}
        >
          Friday's
        </Link>

        {/* Desktop nav */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '32px' }} className="hidden md:flex">
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              style={{
                fontFamily:    "'Inter', sans-serif",
                fontSize:      '0.7rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         location.pathname === to ? '#df9550' : 'rgba(199,203,214,.65)',
                textDecoration:'none',
                transition:    'color .2s',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#df9550'}
              onMouseLeave={e => e.currentTarget.style.color = location.pathname === to ? '#df9550' : 'rgba(199,203,214,.65)'}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* Right icons */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {/* Cart */}
          <button
            onClick={openCart}
            aria-label="Open cart"
            style={{
              position:   'relative',
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              padding:    '6px 8px',
              color:      'rgba(199,203,214,.7)',
              transition: 'color .2s',
            }}
            onMouseEnter={e => e.currentTarget.style.color = '#ffffff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(199,203,214,.7)'}
          >
            <ShoppingBag size={18} />
            {totalItems > 0 && (
              <span style={{
                position:     'absolute',
                top:          '2px',
                right:        '2px',
                width:        '16px',
                height:       '16px',
                borderRadius: '50%',
                background:   '#df9550',
                color:        '#090b0f',
                fontSize:     '0.55rem',
                fontWeight:   700,
                display:      'flex',
                alignItems:   'center',
                justifyContent: 'center',
              }}>
                {totalItems}
              </span>
            )}
          </button>

          {/* Account */}
          {user ? (
            <AccountDropdown user={user} logout={logout} />
          ) : (
            <Link
              to="/account"
              style={{
                background: 'none',
                border:     'none',
                cursor:     'pointer',
                padding:    '6px 8px',
                color:      'rgba(223,149,80,.8)',
                transition: 'color .2s',
                display:    'flex',
                alignItems: 'center',
              }}
              onMouseEnter={e => e.currentTarget.style.color = '#df9550'}
              onMouseLeave={e => e.currentTarget.style.color = 'rgba(223,149,80,.8)'}
            >
              <User size={18} />
            </Link>
          )}

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMenuOpen(v => !v)}
            aria-label="Toggle menu"
            className="md:hidden"
            style={{
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              padding:    '6px 8px',
              color:      'rgba(199,203,214,.7)',
            }}
          >
            {menuOpen ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="md:hidden"
          style={{
            position:   'absolute',
            top:        '72px',
            left:       0,
            right:      0,
            background: 'rgba(9,11,15,0.98)',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
            padding:    '16px 24px 24px',
            backdropFilter: 'blur(20px)',
          }}
        >
          {navLinks.map(({ label, to }) => (
            <Link
              key={label}
              to={to}
              style={{
                display:       'block',
                padding:       '12px 0',
                fontFamily:    "'Inter', sans-serif",
                fontSize:      '0.75rem',
                letterSpacing: '0.18em',
                textTransform: 'uppercase',
                color:         location.pathname === to ? '#df9550' : 'rgba(199,203,214,.65)',
                textDecoration:'none',
                borderBottom:  '1px solid rgba(255,255,255,0.05)',
              }}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
