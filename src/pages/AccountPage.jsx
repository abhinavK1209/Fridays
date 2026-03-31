import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { Package, Settings, LogOut, ChevronDown, ChevronUp, User, Mail, Lock, CheckCircle, ShieldCheck } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAuth } from '@/context/AuthContext'
import { getUserOrders, getAllOrders } from '@/lib/firestore'
import { isAdmin } from '@/lib/email'
import { Input } from '@/components/ui/input'

const fmt = (n) =>
  new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

function OrderRow({ order }) {
  const [open, setOpen] = useState(false)
  const date = order.createdAt?.toDate
    ? order.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
    : 'Pending'

  return (
    <div style={{
      border:       '1px solid rgba(255,255,255,.07)',
      borderRadius: 14,
      overflow:     'hidden',
      background:   'rgba(10,12,18,0.7)',
    }}>
      {/* Header row */}
      <button
        onClick={() => setOpen(v => !v)}
        style={{
          width:          '100%',
          display:        'flex',
          alignItems:     'center',
          justifyContent: 'space-between',
          padding:        '18px 22px',
          background:     'none',
          border:         'none',
          cursor:         'pointer',
          gap:            12,
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flex: 1, minWidth: 0 }}>
          <div style={{
            width: 36, height: 36, borderRadius: 8,
            background: 'rgba(223,149,80,.1)', border: '1px solid rgba(223,149,80,.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <Package size={15} style={{ color: '#df9550' }} />
          </div>
          <div style={{ textAlign: 'left', minWidth: 0 }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.8rem', color: '#fff', marginBottom: 2 }}>
              {order.orderId}
            </p>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'rgba(199,203,214,.45)' }}>
              {date} · {order.items?.length} item{order.items?.length !== 1 ? 's' : ''}
            </p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexShrink: 0 }}>
          <span style={{
            fontFamily:    "'Cormorant Garamond', Georgia, serif",
            fontSize:      '1.1rem',
            color:         '#df9550',
          }}>
            {fmt(order.total)}
          </span>
          <span className="order-status-badge" style={{
            fontSize: '0.6rem', letterSpacing: '0.18em', textTransform: 'uppercase',
            padding: '3px 10px', borderRadius: 20,
            border: '1px solid rgba(34,197,94,.25)', color: 'rgba(34,197,94,.8)',
            background: 'rgba(34,197,94,.06)',
          }}>
            Confirmed
          </span>
          {open
            ? <ChevronUp size={14} style={{ color: 'rgba(199,203,214,.4)' }} />
            : <ChevronDown size={14} style={{ color: 'rgba(199,203,214,.4)' }} />
          }
        </div>
      </button>

      {/* Expanded items */}
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.22, ease: 'easeInOut' }}
            style={{ overflow: 'hidden' }}
          >
            <div style={{
              borderTop: '1px solid rgba(255,255,255,.06)',
              padding: '16px 22px 20px',
            }}>
              {/* Items */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
                {order.items?.map((item, i) => (
                  <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.83rem', color: 'rgba(255,255,255,.8)' }}>
                        {item.product?.name}
                      </p>
                      <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.7rem', color: 'rgba(199,203,214,.4)' }}>
                        {item.size?.label} × {item.quantity}
                      </p>
                    </div>
                    <p style={{ fontFamily: "'Inter', sans-serif", fontSize: '0.83rem', color: 'rgba(255,255,255,.7)' }}>
                      {fmt(item.size?.price * item.quantity)}
                    </p>
                  </div>
                ))}
              </div>

              {/* Shipping address */}
              {order.shipping && (
                <div style={{
                  padding: '12px 16px', borderRadius: 10,
                  border: '1px solid rgba(255,255,255,.06)',
                  background: 'rgba(255,255,255,.02)',
                }}>
                  <p style={{ fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(199,203,214,.35)', marginBottom: 6 }}>
                    Shipped to
                  </p>
                  <p style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,.6)', fontFamily: "'Inter', sans-serif" }}>
                    {order.shipping.firstName} {order.shipping.lastName} · {order.shipping.address}, {order.shipping.city}, {order.shipping.state} {order.shipping.zip}
                  </p>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

function OrdersTab({ uid }) {
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    getUserOrders(uid)
      .then(setOrders)
      .catch(() => setError('Could not load orders. Make sure Firestore is enabled in your Firebase console.'))
      .finally(() => setLoading(false))
  }, [uid])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <span style={{
          display: 'inline-block', width: 24, height: 24,
          border: '2px solid rgba(223,149,80,.3)', borderTop: '2px solid #df9550',
          borderRadius: '50%', animation: 'spin .7s linear infinite',
        }} />
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '24px', borderRadius: 14, border: '1px solid rgba(239,68,68,.2)', background: 'rgba(239,68,68,.05)' }}>
        <p style={{ fontSize: '0.85rem', color: 'rgba(239,68,68,.8)', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>{error}</p>
      </div>
    )
  }

  if (!orders.length) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <Package size={40} style={{ color: 'rgba(223,149,80,.3)', margin: '0 auto 16px' }} />
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.4rem', color: '#fff', marginBottom: 8 }}>
          No orders yet
        </p>
        <p style={{ fontSize: '0.85rem', color: 'rgba(199,203,214,.45)', marginBottom: 24 }}>
          Your order history will appear here.
        </p>
        <Link
          to="/shop"
          style={{
            display: 'inline-block', padding: '11px 28px',
            border: '1px solid rgba(223,149,80,.5)', borderRadius: 10,
            color: '#df9550', fontFamily: "'Inter', sans-serif",
            fontSize: '0.68rem', letterSpacing: '0.2em', textTransform: 'uppercase',
            textDecoration: 'none',
          }}
        >
          Shop the collection
        </Link>
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
      {orders.map(order => <OrderRow key={order.firestoreId} order={order} />)}
    </div>
  )
}

function SettingsTab({ user, resetPassword, logout }) {
  const [resetSent, setResetSent]   = useState(false)
  const [resetting, setResetting]   = useState(false)
  const navigate                    = useNavigate()

  async function handleReset() {
    setResetting(true)
    try {
      await resetPassword(user.email)
      setResetSent(true)
    } finally {
      setResetting(false)
    }
  }

  async function handleLogout() {
    await logout()
    navigate('/')
  }

  const isGoogle = user.providerData?.[0]?.providerId === 'google.com'

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 16, maxWidth: 480 }}>
      {/* Profile info */}
      <div style={{
        padding: '20px 22px', borderRadius: 14,
        border: '1px solid rgba(255,255,255,.07)',
        background: 'rgba(10,12,18,0.7)',
      }}>
        <p style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(223,149,80,.7)', marginBottom: 14 }}>
          Account
        </p>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <User size={14} style={{ color: 'rgba(199,203,214,.35)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,.7)', fontFamily: "'Inter', sans-serif" }}>
              {user.displayName || 'No display name'}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <Mail size={14} style={{ color: 'rgba(199,203,214,.35)', flexShrink: 0 }} />
            <span style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,.7)', fontFamily: "'Inter', sans-serif" }}>
              {user.email}
            </span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
            <span style={{
              fontSize: '0.6rem', letterSpacing: '0.15em', textTransform: 'uppercase',
              padding: '2px 8px', borderRadius: 20,
              border: '1px solid rgba(255,255,255,.1)', color: 'rgba(199,203,214,.5)',
            }}>
              {isGoogle ? 'Google' : 'Email'}
            </span>
          </div>
        </div>
      </div>

      {/* Password reset (email users only) */}
      {!isGoogle && (
        <div style={{
          padding: '20px 22px', borderRadius: 14,
          border: '1px solid rgba(255,255,255,.07)',
          background: 'rgba(10,12,18,0.7)',
        }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(223,149,80,.7)', marginBottom: 12 }}>
            Password
          </p>
          {resetSent ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              <CheckCircle size={14} style={{ color: '#df9550' }} />
              <span style={{ fontSize: '0.82rem', color: 'rgba(199,203,214,.6)', fontFamily: "'Inter', sans-serif" }}>
                Reset link sent to {user.email}
              </span>
            </div>
          ) : (
            <button
              onClick={handleReset}
              disabled={resetting}
              style={{
                display: 'flex', alignItems: 'center', gap: 8,
                background: 'none', border: '1px solid rgba(255,255,255,.1)',
                borderRadius: 10, padding: '9px 16px', cursor: 'pointer',
                color: 'rgba(199,203,214,.6)', fontFamily: "'Inter', sans-serif",
                fontSize: '0.78rem', transition: 'border-color .2s, color .2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(223,149,80,.4)'; e.currentTarget.style.color = '#df9550' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.1)'; e.currentTarget.style.color = 'rgba(199,203,214,.6)' }}
            >
              <Lock size={13} />
              {resetting ? 'Sending…' : 'Send password reset email'}
            </button>
          )}
        </div>
      )}

      {/* Sign out */}
      <button
        onClick={handleLogout}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          background: 'none', border: '1px solid rgba(239,68,68,.2)',
          borderRadius: 10, padding: '11px 18px', cursor: 'pointer',
          color: 'rgba(239,68,68,.7)', fontFamily: "'Inter', sans-serif",
          fontSize: '0.78rem', letterSpacing: '0.1em', transition: 'border-color .2s, color .2s',
          alignSelf: 'flex-start',
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,.5)'; e.currentTarget.style.color = '#ef4444' }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = 'rgba(239,68,68,.2)'; e.currentTarget.style.color = 'rgba(239,68,68,.7)' }}
      >
        <LogOut size={14} />
        Sign out
      </button>
    </div>
  )
}

function AdminTab() {
  const [orders, setOrders]   = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError]     = useState('')

  useEffect(() => {
    getAllOrders()
      .then(setOrders)
      .catch(() => setError('Could not load orders. Make sure Firestore is enabled in your Firebase console.'))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <span style={{
          display: 'inline-block', width: 24, height: 24,
          border: '2px solid rgba(223,149,80,.3)', borderTop: '2px solid #df9550',
          borderRadius: '50%', animation: 'spin .7s linear infinite',
        }} />
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ padding: '24px', borderRadius: 14, border: '1px solid rgba(239,68,68,.2)', background: 'rgba(239,68,68,.05)' }}>
        <p style={{ fontSize: '0.85rem', color: 'rgba(239,68,68,.8)', fontFamily: "'Inter', sans-serif", lineHeight: 1.6 }}>{error}</p>
      </div>
    )
  }

  if (!orders.length) {
    return (
      <div style={{ textAlign: 'center', padding: '60px 0' }}>
        <ShieldCheck size={40} style={{ color: 'rgba(223,149,80,.3)', margin: '0 auto 16px' }} />
        <p style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1.4rem', color: '#fff' }}>
          No orders yet
        </p>
      </div>
    )
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: "'Inter', sans-serif", fontSize: '0.8rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid rgba(255,255,255,.07)' }}>
            {['Order ID', 'Customer', 'Email', 'Items', 'Total', 'Date'].map(h => (
              <th key={h} style={{
                textAlign: 'left', padding: '10px 14px',
                fontSize: '0.6rem', letterSpacing: '0.2em', textTransform: 'uppercase',
                color: 'rgba(223,149,80,.6)', fontWeight: 400,
              }}>{h}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {orders.map(o => {
            const date = o.createdAt?.toDate
              ? o.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
              : '—'
            return (
              <tr key={o.firestoreId} style={{ borderBottom: '1px solid rgba(255,255,255,.04)' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,.02)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                <td style={{ padding: '12px 14px', color: 'rgba(255,255,255,.7)', fontFamily: 'monospace', fontSize: '0.75rem' }}>{o.orderId}</td>
                <td style={{ padding: '12px 14px', color: 'rgba(255,255,255,.7)' }}>
                  {o.shipping ? `${o.shipping.firstName} ${o.shipping.lastName}` : '—'}
                </td>
                <td style={{ padding: '12px 14px', color: 'rgba(199,203,214,.5)' }}>{o.shipping?.email || '—'}</td>
                <td style={{ padding: '12px 14px', color: 'rgba(199,203,214,.5)' }}>{o.items?.length ?? 0}</td>
                <td style={{ padding: '12px 14px', color: '#df9550', fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: '1rem' }}>
                  {fmt(o.total)}
                </td>
                <td style={{ padding: '12px 14px', color: 'rgba(199,203,214,.4)' }}>{date}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
      <p style={{ marginTop: 16, fontSize: '0.7rem', color: 'rgba(199,203,214,.3)', fontFamily: "'Inter', sans-serif" }}>
        {orders.length} order{orders.length !== 1 ? 's' : ''} total
      </p>
    </div>
  )
}

export default function AccountPage() {
  const { user, loading, openModal, resetPassword, logout } = useAuth()
  const navigate = useNavigate()
  const admin = user ? isAdmin(user.email) : false

  const TABS = [
    { id: 'orders',   label: 'Orders',   Icon: Package },
    { id: 'settings', label: 'Settings', Icon: Settings },
    ...(admin ? [{ id: 'admin', label: 'Admin', Icon: ShieldCheck }] : []),
  ]

  const [tab, setTab] = useState('orders')

  useEffect(() => {
    if (!loading && !user) navigate('/')
  }, [user, loading, navigate])

  if (loading || !user) return null

  return (
    <div style={{ minHeight: '100vh', paddingTop: 120, paddingBottom: 80, paddingLeft: 24, paddingRight: 24, background: '#090b0f' }}>
      <div style={{ maxWidth: 760, margin: '0 auto' }}>

        {/* Page heading */}
        <div style={{ marginBottom: 36 }}>
          <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(223,149,80,.7)', marginBottom: 8, fontFamily: "'Inter', sans-serif" }}>
            My Account
          </p>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 'clamp(2rem, 4vw, 2.8rem)', fontWeight: 400, color: '#fff', letterSpacing: '0.03em' }}>
            {user.displayName ? `Welcome back, ${user.displayName.split(' ')[0]}.` : 'Welcome back.'}
          </h1>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: 4, marginBottom: 28, borderBottom: '1px solid rgba(255,255,255,.07)', paddingBottom: 0, overflowX: 'auto' }}>
          {TABS.map(({ id, label, Icon }) => {
            const active = tab === id
            return (
              <button
                key={id}
                onClick={() => setTab(id)}
                style={{
                  display: 'flex', alignItems: 'center', gap: 7,
                  padding: '10px 20px', background: 'none', border: 'none', cursor: 'pointer',
                  fontFamily: "'Inter', sans-serif", fontSize: '0.72rem', letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  color: active ? '#df9550' : 'rgba(199,203,214,.45)',
                  borderBottom: active ? '1px solid #df9550' : '1px solid transparent',
                  marginBottom: -1,
                  transition: 'color .2s',
                }}
              >
                <Icon size={13} />
                {label}
              </button>
            )
          })}
        </div>

        {/* Tab content */}
        <AnimatePresence mode="wait">
          <motion.div
            key={tab}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.18 }}
          >
            {tab === 'orders'   && <OrdersTab uid={user.uid} />}
            {tab === 'settings' && <SettingsTab user={user} resetPassword={resetPassword} logout={logout} />}
            {tab === 'admin'    && admin && <AdminTab />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  )
}
