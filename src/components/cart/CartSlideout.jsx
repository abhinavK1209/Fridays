import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { X, Trash2, ShoppingBag } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { useCart } from '@/context/CartContext'

function CartItem({ item, onRemove, onUpdateQty }) {
  const fmt = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

  return (
    <div className="flex items-start gap-4 py-5 border-b border-white/8 last:border-0">
      {/* Mini bottle visual */}
      <div
        className="w-16 h-20 rounded-xl border border-white/10 flex items-center justify-center shrink-0 relative overflow-hidden"
        style={{ background: 'linear-gradient(145deg, rgba(18,22,30,0.95), rgba(10,12,18,0.98))' }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 70%, ${item.product.glowColor.replace(/[\d.]+\)$/, '0.2)')} 0%, transparent 70%)`,
          }}
        />
        {/* Tiny bottle shape */}
        <div className="relative" style={{ width: 28, height: 44 }}>
          <div
            className="absolute top-0 left-1/2 -translate-x-1/2 rounded-t-md rounded-b-sm border border-white/20"
            style={{ width: 10, height: 5, background: 'linear-gradient(180deg, #3a4460, #1c2236)' }}
          />
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 rounded-lg border border-white/15 flex items-center justify-center"
            style={{
              width: 24,
              height: 34,
              background: item.product.bottleGradient,
            }}
          >
            <span className="font-serif text-[5px] tracking-[0.2em] text-white/70 uppercase">F</span>
          </div>
        </div>
      </div>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <p className="font-serif text-base text-white mb-0.5 truncate">{item.product.name}</p>
        <p className="text-xs text-muted/60 mb-3">{item.size.label}</p>
        {/* Qty controls */}
        <div className="flex items-center gap-2">
          <div className="flex items-center border border-white/15 rounded-full overflow-hidden">
            <button
              onClick={() => onUpdateQty(item.key, -1)}
              className="w-7 h-7 flex items-center justify-center text-muted hover:text-white transition-colors text-sm"
              aria-label="Decrease"
            >
              −
            </button>
            <span className="w-7 text-center text-xs text-white">{item.quantity}</span>
            <button
              onClick={() => onUpdateQty(item.key, 1)}
              className="w-7 h-7 flex items-center justify-center text-muted hover:text-white transition-colors text-sm"
              aria-label="Increase"
            >
              +
            </button>
          </div>
        </div>
      </div>

      {/* Price + remove */}
      <div className="flex flex-col items-end gap-2">
        <p className="font-serif text-base text-white">
          {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
            item.size.price * item.quantity
          )}
        </p>
        <button
          onClick={() => onRemove(item.key)}
          aria-label="Remove item"
          className="text-muted/40 hover:text-red-400/80 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  )
}

export default function CartSlideout() {
  const { items, isOpen, closeCart, removeFromCart, updateQty, cartSubtotal } = useCart()

  const fmt = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) document.body.style.overflow = 'hidden'
    else document.body.style.overflow = ''
    return () => { document.body.style.overflow = '' }
  }, [isOpen])

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[55] bg-black/60 backdrop-blur-sm"
            onClick={closeCart}
            aria-hidden="true"
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 32, stiffness: 300 }}
            className="fixed top-0 right-0 h-full z-[56] w-full sm:w-[420px] flex flex-col border-l border-white/8"
            style={{ background: 'linear-gradient(160deg, #0c0e16, #090b10)' }}
            role="dialog"
            aria-modal="true"
            aria-label="Shopping cart"
          >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-4 h-4 text-amber" />
            <h2 className="font-serif text-lg text-white">Your Cart</h2>
            {items.length > 0 && (
              <span className="text-xs text-muted/60">({items.length} {items.length === 1 ? 'item' : 'items'})</span>
            )}
          </div>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="w-8 h-8 rounded-full border border-white/15 flex items-center justify-center text-silver/60 hover:text-white hover:border-white/35 transition-all"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <ShoppingBag className="w-10 h-10 text-muted/25 mb-4" />
              <p className="font-serif text-lg text-white/50 mb-2">Your cart is empty.</p>
              <p className="text-sm text-muted/40 mb-8">Add a fragrance to get started.</p>
              <Button variant="amber" size="sm" onClick={closeCart} asChild className="text-xs tracking-widest uppercase">
                <Link to="/shop">Explore Collection</Link>
              </Button>
            </div>
          ) : (
            <div>
              <AnimatePresence initial={false}>
                {items.map((item, i) => (
                  <motion.div
                    key={item.key}
                    initial={{ opacity: 0, x: 24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 24, height: 0 }}
                    transition={{ duration: 0.25, delay: i * 0.04 }}
                  >
                    <CartItem
                      item={item}
                      onRemove={removeFromCart}
                      onUpdateQty={updateQty}
                    />
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-white/8 px-6 py-6">
            {/* Free shipping progress */}
            {cartSubtotal < 100 && (
              <div className="mb-5">
                <div className="flex justify-between text-xs text-muted/50 mb-2">
                  <span>Free shipping at $100</span>
                  <span>{fmt(100 - cartSubtotal)} away</span>
                </div>
                <div className="h-1 rounded-full bg-white/8 overflow-hidden">
                  <div
                    className="h-full rounded-full bg-amber transition-all duration-500"
                    style={{ width: `${Math.min((cartSubtotal / 100) * 100, 100)}%` }}
                  />
                </div>
              </div>
            )}
            {cartSubtotal >= 100 && (
              <p className="text-xs text-amber/70 mb-5 text-center">✓ You've unlocked free shipping</p>
            )}
            {/* Subtotal */}
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted/70">Subtotal</span>
              <span className="font-serif text-lg text-white">{fmt(cartSubtotal)}</span>
            </div>
            <p className="text-xs text-muted/40 mb-5">Taxes calculated at checkout</p>

            <Button
              variant="amber"
              size="lg"
              className="w-full tracking-widest uppercase text-xs"
              onClick={closeCart}
              asChild
            >
              <Link to="/checkout">Proceed to Checkout</Link>
            </Button>

            <button
              onClick={closeCart}
              className="w-full text-center text-xs text-muted/50 hover:text-muted mt-3 transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  )
}
