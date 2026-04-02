import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Check, Package } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'

export default function OrderSuccessPage() {
  const { clearCart } = useCart()

  // Clear cart once when landing on success page
  useEffect(() => {
    clearCart()
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [clearCart])

  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{ background: 'var(--color-bg, #080a10)' }}
    >
      <div className="text-center max-w-md">

        {/* Check icon */}
        <div className="w-20 h-20 rounded-full bg-amber/10 border border-amber/30 flex items-center justify-center mx-auto mb-8">
          <Check className="w-10 h-10 text-amber" strokeWidth={1.5} />
        </div>

        <h1 className="font-serif text-4xl text-white mb-3">Order Confirmed</h1>
        <p className="text-silver/60 mb-8 leading-relaxed">
          Thank you for your order. Your Friday's fragrance is being prepared with care and will be on its way soon.
        </p>

        {/* Info card */}
        <div
          className="flex items-center gap-3 p-4 rounded-xl border border-white/10 mb-10 text-left"
          style={{ background: 'rgba(12,14,20,0.8)' }}
        >
          <Package className="w-5 h-5 text-amber/60 shrink-0" />
          <div>
            <p className="text-xs text-muted/50 uppercase tracking-widest mb-0.5">What's next</p>
            <p className="text-sm text-silver/70">
              You'll receive a confirmation email from Stripe with your receipt and order details.
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3">
          <Button variant="amber" className="text-xs tracking-widest uppercase" asChild>
            <Link to="/shop">Continue Shopping</Link>
          </Button>
          <Button variant="ghost" className="text-xs tracking-widest uppercase" asChild>
            <Link to="/">Back to Home</Link>
          </Button>
        </div>

      </div>
    </div>
  )
}
