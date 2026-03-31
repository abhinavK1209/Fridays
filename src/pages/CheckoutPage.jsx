import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Check, Lock, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { cn } from '@/lib/utils'

const STEPS = ['Shipping', 'Payment']

function StepIndicator({ currentStep }) {
  return (
    <div className="flex items-center gap-2">
      {STEPS.map((label, i) => {
        const done = i < currentStep
        const active = i === currentStep
        return (
          <div key={label} className="flex items-center gap-2">
            <div className={cn(
              'w-7 h-7 rounded-full flex items-center justify-center text-xs font-medium transition-all duration-300',
              done ? 'bg-amber text-bg' : active ? 'border border-amber text-amber' : 'border border-white/15 text-muted/50'
            )}>
              {done ? <Check className="w-3.5 h-3.5" /> : i + 1}
            </div>
            <span className={cn(
              'text-xs tracking-wide hidden sm:block transition-colors',
              active ? 'text-white' : done ? 'text-amber/70' : 'text-muted/40'
            )}>
              {label}
            </span>
            {i < STEPS.length - 1 && <div className="w-8 h-px bg-white/10 mx-1" />}
          </div>
        )
      })}
    </div>
  )
}

function OrderSummary({ items, subtotal }) {
  const fmt = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)
  const shipping = subtotal >= 100 ? 0 : 9.95
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  return (
    <div
      className="rounded-2xl border border-white/10 p-6 sticky top-24"
      style={{ background: 'rgba(11,13,20,0.9)' }}
    >
      <h3 className="font-serif text-lg text-white mb-5">Order Summary</h3>
      <div className="space-y-3 mb-5 max-h-52 overflow-y-auto">
        {items.map(item => (
          <div key={item.key} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-10 rounded border border-white/10 shrink-0"
                style={{ background: 'rgba(14,16,24,0.9)' }} />
              <div className="min-w-0">
                <p className="text-sm text-white/80 truncate">{item.product.name}</p>
                <p className="text-xs text-muted/50">{item.size.label} × {item.quantity}</p>
              </div>
            </div>
            <p className="text-sm text-white shrink-0">{fmt(item.size.price * item.quantity)}</p>
          </div>
        ))}
      </div>
      <div className="border-t border-white/8 pt-4 space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-muted/70">Subtotal</span>
          <span className="text-white">{fmt(subtotal)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted/70">Shipping</span>
          <span className="text-white">{shipping === 0 ? 'Free' : fmt(shipping)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-muted/70">Tax (est.)</span>
          <span className="text-white">{fmt(tax)}</span>
        </div>
        <div className="border-t border-white/8 pt-3 flex justify-between">
          <span className="font-medium text-white">Total</span>
          <span className="font-serif text-xl text-amber">{fmt(total)}</span>
        </div>
      </div>
      {subtotal < 100 && (
        <p className="text-xs text-muted/50 mt-4 text-center">
          Add {fmt(100 - subtotal)} more for free shipping
        </p>
      )}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        <Lock className="w-3 h-3 text-muted/40" />
        <span className="text-xs text-muted/40">Secure checkout</span>
      </div>
    </div>
  )
}

function ShippingForm({ onNext }) {
  const { user, openModal } = useAuth()
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: user?.email || '', phone: '',
    address: '', apt: '', city: '', state: '', zip: '', country: 'US',
  })
  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    onNext(form)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl text-white mb-1">Shipping Information</h2>
        <p className="text-sm text-muted/60">Where should we send your order?</p>
      </div>

      {/* Sign-in nudge for guests */}
      {!user && (
        <div className="flex items-center justify-between p-4 rounded-xl border border-white/8 bg-white/2">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-amber/60" />
            <span className="text-xs text-muted/60">Sign in to save your order history</span>
          </div>
          <button
            type="button"
            onClick={openModal}
            className="text-xs text-amber/80 hover:text-amber transition-colors underline underline-offset-2"
          >
            Sign in
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">First Name *</label>
          <Input value={form.firstName} onChange={set('firstName')} placeholder="Marcus" required />
        </div>
        <div>
          <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">Last Name *</label>
          <Input value={form.lastName} onChange={set('lastName')} placeholder="Taylor" required />
        </div>
      </div>

      <div>
        <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">Email *</label>
        <Input
          type="email"
          value={form.email}
          onChange={set('email')}
          placeholder="you@email.com"
          required
          readOnly={!!user}
          style={user ? { opacity: 0.6, cursor: 'default' } : {}}
        />
      </div>

      <div>
        <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">Phone</label>
        <Input type="tel" value={form.phone} onChange={set('phone')} placeholder="+1 (555) 000-0000" />
      </div>

      <div>
        <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">Address *</label>
        <Input value={form.address} onChange={set('address')} placeholder="123 Fragrance Ave" required />
      </div>

      <div>
        <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">Apt / Suite</label>
        <Input value={form.apt} onChange={set('apt')} placeholder="Apt 4B (optional)" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div className="col-span-1">
          <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">City *</label>
          <Input value={form.city} onChange={set('city')} placeholder="Miami" required />
        </div>
        <div>
          <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">State *</label>
          <Input value={form.state} onChange={set('state')} placeholder="FL" required maxLength={2} />
        </div>
        <div>
          <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">ZIP *</label>
          <Input value={form.zip} onChange={set('zip')} placeholder="33101" required />
        </div>
      </div>

      <Button type="submit" variant="amber" size="lg" className="w-full tracking-widest uppercase text-xs group">
        Continue to Payment
        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
      </Button>
    </form>
  )
}

function RedirectingToStripe({ shippingInfo, items, onBack }) {
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleProceed = async () => {
    setLoading(true)
    setError(null)
    try {
      const origin     = window.location.origin
      const successUrl = `${origin}/#/success`
      const cancelUrl  = `${origin}/#/checkout`

      const res = await fetch('/.netlify/functions/create-checkout-session', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ items, shippingInfo, successUrl, cancelUrl }),
      })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Something went wrong')
      window.location.href = data.url
    } catch (err) {
      setError(err.message)
      setLoading(false)
    }
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="font-serif text-2xl text-white mb-1">Confirm & Pay</h2>
        <p className="text-sm text-muted/60">Review your shipping details, then proceed to secure payment.</p>
      </div>

      {/* Shipping review */}
      <div className="p-5 rounded-xl border border-white/10 space-y-1" style={{ background: 'rgba(10,12,18,0.6)' }}>
        <p className="text-xs text-muted/50 uppercase tracking-widest mb-3">Shipping to</p>
        <p className="text-sm text-white font-medium">{shippingInfo.firstName} {shippingInfo.lastName}</p>
        <p className="text-xs text-muted/60">
          {shippingInfo.address}{shippingInfo.apt ? `, ${shippingInfo.apt}` : ''},{' '}
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
        </p>
        {shippingInfo.email && (
          <p className="text-xs text-muted/60">{shippingInfo.email}</p>
        )}
      </div>

      {/* Stripe badge */}
      <div className="flex items-center gap-3 p-4 rounded-xl border border-white/8" style={{ background: 'rgba(10,12,18,0.4)' }}>
        <Lock className="w-4 h-4 text-amber/60 shrink-0" />
        <p className="text-xs text-muted/60 leading-relaxed">
          You'll be taken to Stripe's secure checkout page to complete payment. Your card details are never stored on our servers.
        </p>
      </div>

      {error && (
        <p className="text-xs text-red-400 p-3 rounded-lg border border-red-400/20 bg-red-400/5">{error}</p>
      )}

      <div className="flex gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          disabled={loading}
          className="text-xs tracking-widest uppercase"
        >
          Back
        </Button>
        <Button
          type="button"
          variant="amber"
          size="lg"
          className="flex-1 tracking-widest uppercase text-xs group"
          onClick={handleProceed}
          disabled={loading}
        >
          {loading ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Redirecting…
            </span>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 mr-2" />
              Proceed to Payment
            </>
          )}
        </Button>
      </div>
    </div>
  )
}


export default function CheckoutPage() {
  const { items, cartSubtotal } = useCart()
  const navigate  = useNavigate()
  const [step, setStep]               = useState(0) // 0=shipping, 1=confirm+pay
  const [shippingInfo, setShippingInfo] = useState(null)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  useEffect(() => {
    if (items.length === 0) navigate('/shop')
  }, [items, navigate])

  const handleShippingNext = (info) => {
    setShippingInfo(info)
    setStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen pt-24 pb-16" style={{ background: 'var(--color-bg, #080a10)' }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6">

        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Link to="/shop" className="flex items-center gap-2 text-xs text-muted/50 hover:text-amber/70 transition-colors tracking-widest uppercase">
            ← Back to Shop
          </Link>
          <StepIndicator currentStep={step} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Main form */}
          <div className="lg:col-span-3">
            {step === 0 && <ShippingForm onNext={handleShippingNext} />}
            {step === 1 && shippingInfo && (
              <RedirectingToStripe
                shippingInfo={shippingInfo}
                items={items}
                onBack={() => setStep(0)}
              />
            )}
          </div>

          {/* Order summary */}
          <div className="lg:col-span-2">
            <OrderSummary items={items} subtotal={cartSubtotal} />
          </div>
        </div>
      </div>
    </div>
  )
}