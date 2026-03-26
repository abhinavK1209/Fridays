import { useState, useEffect, useRef } from 'react'
import { X, Star, ChevronDown, ChevronUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import BottleIllustration from '@/components/common/BottleIllustration'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={cn('w-3.5 h-3.5', i < rating ? 'text-amber fill-amber' : 'text-white/20')}
        />
      ))}
    </div>
  )
}

function NoteGroup({ label, notes, accentColor }) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-[0.22em] mb-2" style={{ color: accentColor }}>
        {label}
      </p>
      <div className="flex flex-wrap gap-1.5">
        {notes.map(note => (
          <span
            key={note}
            className="px-2.5 py-1 rounded-full text-xs border border-white/12 text-silver/80"
            style={{ background: 'rgba(255,255,255,0.04)' }}
          >
            {note}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function ProductModal({ product, onClose }) {
  const { addToCart } = useCart()
  const closeRef = useRef(null)
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find(s => s.ml === product.defaultSize) || product.sizes[0]
  )
  const [qty, setQty] = useState(1)
  const [added, setAdded] = useState(false)
  const [ingredientsOpen, setIngredientsOpen] = useState(false)

  const fmt = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

  // Focus trap
  useEffect(() => {
    closeRef.current?.focus()
    const onKey = (e) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const handleAdd = () => {
    addToCart(product, selectedSize, qty)
    setAdded(true)
    setTimeout(() => {
      setAdded(false)
      onClose()
    }, 1000)
  }

  const avgRating = Math.round(
    product.reviews.reduce((s, r) => s + r.rating, 0) / product.reviews.length
  )

  return (
    <div
      className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center p-0 sm:p-4"
      role="dialog"
      aria-modal="true"
      aria-label={product.name}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/75 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className="relative w-full sm:max-w-4xl max-h-[94vh] sm:max-h-[90vh] overflow-y-auto rounded-t-3xl sm:rounded-3xl border border-white/10 flex flex-col lg:flex-row"
        style={{ background: 'linear-gradient(145deg, #0e1018, #080a10)' }}
      >
        {/* Close */}
        <button
          ref={closeRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-silver/70 hover:text-white hover:border-white/40 transition-all duration-200"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Left: Visual */}
        <div
          className="lg:w-2/5 flex flex-col items-center justify-center py-12 px-8 relative shrink-0"
          style={{
            background: `radial-gradient(circle at 50% 60%, ${product.glowColor.replace(/[\d.]+\)$/, '0.2)')} 0%, transparent 60%), rgba(8,10,14,0.8)`,
          }}
        >
          <BottleIllustration
            gradient={product.bottleGradient}
            glowColor={product.glowColor}
            accentColor={product.accentColor}
            sublabel={product.name}
            size="lg"
          />
        </div>

        {/* Right: Info */}
        <div className="flex-1 p-7 lg:p-10 overflow-y-auto">
          {/* Category + badge */}
          <div className="flex items-center gap-2 mb-3">
            <span className="text-[11px] uppercase tracking-[0.22em] text-muted/60">{product.category}</span>
            {product.badge && (
              <Badge variant="amber" className="text-[10px] tracking-[0.15em] uppercase">
                {product.badge}
              </Badge>
            )}
          </div>

          {/* Title + tagline */}
          <h2 className="font-serif text-[clamp(1.8rem,3vw,2.5rem)] text-white leading-tight mb-2">
            {product.name}
          </h2>
          <p className="text-silver/60 text-sm italic mb-5">{product.tagline}</p>

          {/* Reviews summary */}
          <div className="flex items-center gap-2 mb-6">
            <StarRating rating={avgRating} />
            <span className="text-xs text-muted/60">{product.reviews.length} reviews</span>
          </div>

          {/* Description */}
          <p className="text-silver/75 text-sm leading-relaxed mb-7">{product.longDescription}</p>

          {/* Scent notes */}
          <div className="mb-7 space-y-4">
            <p className="text-xs uppercase tracking-[0.22em] text-white/40">Scent Notes</p>
            <NoteGroup label="Top Notes" notes={product.scentNotes.top} accentColor={product.accentColor} />
            <NoteGroup label="Heart Notes" notes={product.scentNotes.heart} accentColor={product.accentColor} />
            <NoteGroup label="Base Notes" notes={product.scentNotes.base} accentColor={product.accentColor} />
          </div>

          {/* Size selector */}
          <div className="mb-6">
            <p className="text-xs uppercase tracking-[0.22em] text-white/40 mb-3">Size</p>
            <div className="flex flex-wrap gap-2">
              {product.sizes.map(size => (
                <button
                  key={size.ml}
                  onClick={() => setSelectedSize(size)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm border transition-all duration-200 flex items-center gap-2',
                    selectedSize.ml === size.ml
                      ? 'border-amber/70 bg-amber/10 text-amber'
                      : 'border-white/15 text-muted hover:border-white/35 hover:text-white'
                  )}
                >
                  <span>{size.label}</span>
                  <span className="text-xs opacity-70">{fmt(size.price)}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Qty + price + add */}
          <div className="flex items-center gap-4 mb-7">
            {/* Qty control */}
            <div className="flex items-center border border-white/15 rounded-full overflow-hidden">
              <button
                onClick={() => setQty(q => Math.max(1, q - 1))}
                className="w-9 h-10 flex items-center justify-center text-muted hover:text-white transition-colors"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-8 text-center text-sm text-white">{qty}</span>
              <button
                onClick={() => setQty(q => q + 1)}
                className="w-9 h-10 flex items-center justify-center text-muted hover:text-white transition-colors"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            <div className="flex-1">
              <p className="font-serif text-2xl text-white">{fmt(selectedSize.price * qty)}</p>
            </div>

            <Button
              variant="amber"
              size="lg"
              onClick={handleAdd}
              className="text-xs tracking-widest uppercase"
            >
              {added ? 'Added ✓' : 'Add to Cart'}
            </Button>
          </div>

          {/* Ingredients accordion */}
          <div className="border-t border-white/8 pt-5 mb-7">
            <button
              onClick={() => setIngredientsOpen(v => !v)}
              className="flex items-center justify-between w-full text-left group"
            >
              <span className="text-xs uppercase tracking-[0.2em] text-white/50 group-hover:text-white/70 transition-colors">
                Ingredients
              </span>
              {ingredientsOpen
                ? <ChevronUp className="w-4 h-4 text-muted/50" />
                : <ChevronDown className="w-4 h-4 text-muted/50" />
              }
            </button>
            {ingredientsOpen && (
              <p className="text-xs text-muted/60 leading-relaxed mt-3">{product.ingredients}</p>
            )}
          </div>

          {/* Reviews */}
          <div className="border-t border-white/8 pt-5">
            <p className="text-xs uppercase tracking-[0.2em] text-white/50 mb-5">Customer Reviews</p>
            <div className="space-y-5">
              {product.reviews.map((review, i) => (
                <div key={i} className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-white/80">{review.author}</span>
                    <span className="text-xs text-muted/50">{review.date}</span>
                  </div>
                  <StarRating rating={review.rating} />
                  <p className="text-sm text-silver/65 leading-relaxed">{review.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
