import { useState } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import BottleIllustration from '@/components/common/BottleIllustration'
import { getFeatured } from '@/data/products'
import { useCart } from '@/context/CartContext'

function FeaturedCard({ product, index }) {
  const { addToCart } = useCart()
  const defaultSize = product.sizes.find(s => s.ml === product.defaultSize) || product.sizes[0]
  const [added, setAdded] = useState(false)

  const handleAdd = () => {
    addToCart(product, defaultSize)
    setAdded(true)
    setTimeout(() => setAdded(false), 1800)
  }

  return (
    <div
      className={`reveal opacity-0 translate-y-6 transition-all duration-[900ms] group relative rounded-3xl border border-white/8 overflow-hidden`}
      style={{
        transitionDelay: `${index * 120}ms`,
        background: 'linear-gradient(145deg, rgba(14,16,24,0.95), rgba(8,10,16,0.98))',
      }}
    >
      {/* Hover glow */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none"
        style={{ background: `radial-gradient(circle at 50% 40%, ${product.glowColor.replace('0.4', '0.08')} 0%, transparent 60%)` }}
      />

      {/* Bottle area */}
      <div className="relative flex items-center justify-center pt-10 pb-6 min-h-[260px]">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: `radial-gradient(circle at 50% 70%, ${product.glowColor.replace('0.4', '0.18')} 0%, transparent 60%)` }}
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
      <div className="px-6 pb-7">
        {product.badge && (
          <Badge variant="amber" className="mb-3 text-[10px] tracking-[0.18em] uppercase">
            {product.badge}
          </Badge>
        )}
        <h3 className="font-serif text-2xl text-white mb-1">{product.name}</h3>
        <p className="text-xs uppercase tracking-[0.15em] text-muted/70 mb-3">{product.category}</p>
        <p className="text-sm text-silver/70 leading-relaxed mb-5 line-clamp-2">{product.description}</p>

        {/* Price + CTA */}
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs text-muted/60 mb-0.5 uppercase tracking-widest">From</p>
            <p className="font-serif text-xl text-amber">
              {new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(
                Math.min(...product.sizes.map(s => s.price))
              )}
            </p>
          </div>
          <Button
            variant="amber"
            size="sm"
            onClick={handleAdd}
            className="text-xs tracking-widest uppercase transition-all"
          >
            {added ? 'Added ✓' : 'Add to Cart'}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default function FeaturedProducts() {
  const featured = getFeatured()

  return (
    <section className="py-28 px-6 max-w-7xl mx-auto">
      <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <div className="flex items-center gap-3 mb-4">
            <div className="w-8 h-px bg-amber/60" />
            <span className="text-xs uppercase tracking-[0.28em] text-amber/80">Signature Collection</span>
          </div>
          <h2 className="font-serif text-[clamp(2.2rem,4vw,3.5rem)] text-white tracking-wide leading-tight">
            Crafted for the<br />bold and the rare.
          </h2>
        </div>
        <Button variant="ghost" className="text-xs tracking-widest uppercase shrink-0 group" asChild>
          <Link to="/shop">
            View all fragrances
            <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
          </Link>
        </Button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featured.map((product, i) => (
          <FeaturedCard key={product.id} product={product} index={i} />
        ))}
      </div>
    </section>
  )
}
