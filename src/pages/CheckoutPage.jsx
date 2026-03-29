import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Check, CreditCard, Lock, Package, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { useCart } from '@/context/CartContext'
import { useAuth } from '@/context/AuthContext'
import { processPayment } from '@/lib/stripe'
import { saveOrder } from '@/lib/firestore'
import { cn } from '@/lib/utils'

const STEPS = ['Shipping', 'Payment', 'Confirmation']

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

      <div className="grid grid-cols-2 gap-3">
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

      <div className="grid grid-cols-3 gap-3">
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

function PaymentForm({ shippingInfo, cartSubtotal, items, onConfirm, onBack }) {
  const [card, setCard] = useState({ number: '', expiry: '', cvv: '', name: '' })
  const [isProcessing, setIsProcessing] = useState(false)
  const setF = (k) => (e) => setCard(c => ({ ...c, [k]: e.target.value }))

  // Format card number with spaces
  const handleCardNumber = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 16)
    const formatted = val.replace(/(.{4})/g, '$1 ').trim()
    setCard(c => ({ ...c, number: formatted }))
  }

  // Format expiry MM/YY
  const handleExpiry = (e) => {
    const val = e.target.value.replace(/\D/g, '').slice(0, 4)
    const formatted = val.length >= 3 ? `${val.slice(0, 2)}/${val.slice(2)}` : val
    setCard(c => ({ ...c, expiry: formatted }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsProcessing(true)
    try {
      // ── STRIPE STUB ── replace with real stripe.confirmCardPayment()
      // See src/lib/stripe.js for integration instructions
      await processPayment({ amount: cartSubtotal, cardDetails: card, shippingInfo })
      await onConfirm(items, cartSubtotal)
    } finally {
      setIsProcessing(false)
    }
  }

  const fmt = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <h2 className="font-serif text-2xl text-white mb-1">Payment Details</h2>
        <p className="text-sm text-muted/60">Your payment information is encrypted and secure.</p>
      </div>

      {/* Stripe stub notice */}
      <div className="flex items-start gap-3 p-4 rounded-xl border border-amber/20 bg-amber/5">
        <CreditCard className="w-4 h-4 text-amber/70 shrink-0 mt-0.5" />
        <p className="text-xs text-amber/70 leading-relaxed">
          This is a Stripe-ready payment form. Connect your Stripe publishable key in{' '}
          <code className="text-amber/90">src/lib/stripe.js</code> to enable real payments.
        </p>
      </div>

      <div>
        <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">Name on Card *</label>
        <Input value={card.name} onChange={setF('name')} placeholder="Marcus Taylor" required />
      </div>

      <div>
        <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">Card Number *</label>
        <div className="relative">
          <Input
            value={card.number}
            onChange={handleCardNumber}
            placeholder="4242 4242 4242 4242"
            required
            className="pr-12"
          />
          <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted/40" />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">Expiry *</label>
          <Input
            value={card.expiry}
            onChange={handleExpiry}
            placeholder="MM/YY"
            required
            maxLength={5}
          />
        </div>
        <div>
          <label className="block text-xs text-muted/70 mb-1.5 tracking-wide">CVV *</label>
          <Input
            type="password"
            value={card.cvv}
            onChange={setF('cvv')}
            placeholder="•••"
            required
            maxLength={4}
          />
        </div>
      </div>

      {/* Shipping review */}
      <div className="p-4 rounded-xl border border-white/8 space-y-1" style={{ background: 'rgba(10,12,18,0.6)' }}>
        <p className="text-xs text-muted/50 uppercase tracking-wide mb-2">Shipping to</p>
        <p className="text-sm text-white">{shippingInfo.firstName} {shippingInfo.lastName}</p>
        <p className="text-xs text-muted/60">
          {shippingInfo.address}{shippingInfo.apt ? `, ${shippingInfo.apt}` : ''},{' '}
          {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}
        </p>
      </div>

      <div className="flex gap-3">
        <Button
          type="button"
          variant="ghost"
          onClick={onBack}
          className="text-xs tracking-widest uppercase"
        >
          <ArrowLeft className="w-4 h-4 mr-1" /> Back
        </Button>
        <Button
          type="submit"
          variant="amber"
          size="lg"
          className="flex-1 tracking-widest uppercase text-xs"
          disabled={isProcessing}
        >
          {isProcessing ? (
            <span className="flex items-center gap-2">
              <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
              Processing…
            </span>
          ) : (
            <>
              <Lock className="w-3.5 h-3.5 mr-2" />
              Pay {fmt(cartSubtotal * 1.08 + (cartSubtotal >= 100 ? 0 : 9.95))}
            </>
          )}
        </Button>
      </div>
    </form>
  )
}

function Confirmation({ shippingInfo, orderId }) {

  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 rounded-full bg-amber/15 border border-amber/30 flex items-center justify-center mx-auto mb-6">
        <Check className="w-8 h-8 text-amber" />
      </div>
      <h2 className="font-serif text-3xl text-white mb-3">Order Confirmed</h2>
      <p className="text-silver/60 mb-6 max-w-sm mx-auto leading-relaxed">
        Thank you, {shippingInfo?.firstName}. Your Friday's order is confirmed and being prepared
        with care.
      </p>
      <div
        className="inline-flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 mb-8"
        style={{ background: 'rgba(12,14,20,0.8)' }}
      >
        <Package className="w-4 h-4 text-amber/70" />
        <span className="text-sm text-silver/70">Order ID: </span>
        <span className="text-sm text-white font-mono">{orderId}</span>
      </div>
      <p className="text-xs text-muted/50 mb-8">
        A confirmation email has been sent to {shippingInfo?.email}
      </p>
      <div className="flex flex-wrap justify-center gap-3">
        <Button variant="amber" className="text-xs tracking-widest uppercase" asChild>
          <Link to="/shop">Continue Shopping</Link>
        </Button>
        <Button variant="ghost" className="text-xs tracking-widest uppercase" asChild>
          <Link to="/">Back to Home</Link>
        </Button>
      </div>
    </div>
  )
}

export default function CheckoutPage() {
  const { items, cartSubtotal, clearCart } = useCart()
  const { user } = useAuth()
  const navigate = useNavigate()
  const [step, setStep] = useState(0) // 0=shipping, 1=payment, 2=confirmation
  const [shippingInfo, setShippingInfo] = useState(null)
  const [orderId, setOrderId] = useState('')

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  // Redirect to shop if cart is empty (and not on confirmation step)
  useEffect(() => {
    if (items.length === 0 && step < 2) {
      navigate('/shop')
    }
  }, [items, step, navigate])

  const handleShippingNext = (info) => {
    setShippingInfo(info)
    setStep(1)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const handleConfirm = async (completedItems, completedSubtotal) => {
    const id = `FRI-${Date.now().toString(36).toUpperCase()}`
    setOrderId(id)
    const shipping  = cartSubtotal >= 100 ? 0 : 9.95
    const total     = completedSubtotal * 1.08 + shipping

    if (user) {
      try {
        await saveOrder(user.uid, {
          orderId:  id,
          items:    completedItems,
          shipping: shippingInfo,
          subtotal: completedSubtotal,
          total,
          status:   'confirmed',
        })
      } catch {
        // order still confirmed locally even if Firestore write fails
      }
    }

    clearCart()
    setStep(2)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen pt-28 pb-20 px-6" style={{ background: '#090b0f' }}>
      <div className="max-w-5xl mx-auto">
        {/* Top nav */}
        <div className="flex items-center justify-between mb-10">
          <Link to="/shop" className="flex items-center gap-2 text-sm text-muted/60 hover:text-white transition-colors">
            <ArrowLeft className="w-4 h-4" />
            <span className="font-serif text-lg text-white">Friday's</span>
          </Link>
          {step < 2 && <StepIndicator currentStep={step} />}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-10 items-start">
          {/* Left: Form */}
          <div
            className="rounded-2xl border border-white/8 p-7 sm:p-10"
            style={{ background: 'rgba(10,12,18,0.8)' }}
          >
            {step === 0 && (
              <ShippingForm onNext={handleShippingNext} />
            )}
            {step === 1 && (
              <PaymentForm
                shippingInfo={shippingInfo}
                cartSubtotal={cartSubtotal}
                items={items}
                onConfirm={handleConfirm}
                onBack={() => setStep(0)}
              />
            )}
            {step === 2 && (
              <Confirmation shippingInfo={shippingInfo} orderId={orderId} />
            )}
          </div>

          {/* Right: Summary (hide on confirmation) */}
          {step < 2 && items.length > 0 && (
            <OrderSummary items={items} subtotal={cartSubtotal} />
          )}
        </div>
      </div>
    </div>
  )
}
