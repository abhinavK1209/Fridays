import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import BottleIllustration from '@/components/common/BottleIllustration'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'

export default function ProductCard({ product, onOpen }) {
  const { addToCart } = useCart()
  const [selectedSize, setSelectedSize] = useState(
    product.sizes.find(s => s.ml === product.defaultSize) || product.sizes[0]
  )
  const [added, setAdded] = useState(false)

  const handleAdd = (e) => {
    e.stopPropagation()
    addToCart(product, selectedSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  const fmt = (n) =>
    new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(n)

  return (
    <div
      className="group relative rounded-3xl border border-white/8 overflow-hidden cursor-pointer transition-all duration-500 hover:border-white/18 hover:-translate-y-1"
      style={{ background: 'linear-gradient(145deg, rgba(13,15,22,0.97), rgba(8,10,15,0.98))' }}
      onClick={() => onOpen(product)}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{
          background: `radial-gradient(circle at 50% 35%, ${product.glowColor.replace(/[\d.]+\)$/, '0.07)')} 0%, transparent 65%)`,
        }}
      />

      {/* Badge */}
      {product.badge && (
        <div className="absolute top-4 left-4 z-10">
          <Badge variant="amber" className="text-[10px] tracking-[0.18em] uppercase">
            {product.badge}
          </Badge>
        </div>
      )}

      {/* Bottle */}
      <div className="relative flex items-center justify-center py-10 min-h-[240px]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(circle at 50% 70%, ${product.glowColor.replace(/[\d.]+\)$/, '0.15)')} 0%, transparent 55%)`,
          }}
        />
        <BottleIllustration
          gradient={product.bottleGradient}
          glowColor={product.glowColor}
          accentColor={product.accentColor}
          sublabel={product.name}
          size="md"
        />
      </div>

      {/* Info */}
      <div className="px-5 pb-6">
        <div className="mb-1">
          <span className="text-[10px] uppercase tracking-[0.2em] text-muted/60">{product.category}</span>
        </div>
        <h3 className="font-serif text-xl text-white mb-1.5">{product.name}</h3>
        <p className="text-sm text-silver/60 leading-relaxed mb-4 line-clamp-2">{product.tagline}</p>

        {/* Size selector */}
        {product.sizes.length > 1 && (
          <div className="flex gap-1.5 mb-5" onClick={e => e.stopPropagation()}>
            {product.sizes.map(size => (
              <button
                key={size.ml}
                onClick={() => setSelectedSize(size)}
                className={cn(
                  'px-2.5 py-1 rounded-full text-[11px] tracking-wide border transition-all duration-200',
                  selectedSize.ml === size.ml
                    ? 'border-amber/70 bg-amber/10 text-amber'
                    : 'border-white/15 text-muted/70 hover:border-white/30 hover:text-white'
                )}
              >
                {size.label}
              </button>
            ))}
          </div>
        )}

        {/* Price + add */}
        <div className="flex items-center justify-between" onClick={e => e.stopPropagation()}>
          <p className="font-serif text-xl text-white">{fmt(selectedSize.price)}</p>
          <Button
            variant="amber"
            size="sm"
            onClick={handleAdd}
            className="text-[11px] tracking-widest uppercase"
          >
            {added ? 'Added ✓' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  )
}
