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
                e.currentTarget.style