import { useState, useEffect } from 'react'
import { SlidersHorizontal, X } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import ProductCard from '@/components/shop/ProductCard'
import ProductModal from '@/components/shop/ProductModal'
import { products } from '@/data/products'
import { useReveal } from '@/hooks/useReveal'
import { cn } from '@/lib/utils'

const categories = ['All', ...Array.from(new Set(products.map(p => p.category)))]

export default function ShopPage() {
  const [activeCategory, setActiveCategory] = useState('All')
  const [selectedProduct, setSelectedProduct] = useState(null)

  const filtered =
    activeCategory === 'All'
      ? products
      : products.filter(p => p.category === activeCategory)

  useReveal(activeCategory)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      {/* Hero strip */}
      <section
        className="pt-32 pb-16 px-6"
        style={{
          background:
            'radial-gradient(ellipse at 50% 0%, rgba(20,26,44,0.6) 0%, transparent 60%), #090b0f',
        }}
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-5">
            <div className="w-8 h-px bg-amber/60" />
            <span className="text-xs uppercase tracking-[0.28em] text-amber/80">The Collection</span>
          </div>
          <h1 className="font-serif text-[clamp(2.4rem,5vw,4rem)] text-white tracking-wide leading-tight mb-4">
            Every scent,<br />
            <em className="text-silver/70 not-italic">a statement.</em>
          </h1>
          <p className="text-silver/60 max-w-md leading-relaxed">
            {products.length} fragrances crafted for those who understand that presence is not worn — it is built.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <div className="sticky top-[72px] z-30 backdrop-blur-xl" style={{ background: 'rgba(9,11,15,0.9)' }}>
        <div className="max-w-7xl mx-auto px-6 py-3 flex items-center gap-3 overflow-x-auto scrollbar-hide">
          <SlidersHorizontal className="w-4 h-4 text-muted/50 shrink-0" />
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'shrink-0 px-4 py-1.5 rounded-full text-xs tracking-widest uppercase border transition-all duration-200',
                activeCategory === cat
                  ? 'border-amber/70 bg-amber/10 text-amber'
                  : 'border-white/12 text-muted/70 hover:border-white/25 hover:text-white'
              )}
            >
              {cat}
            </button>
          ))}
          {activeCategory !== 'All' && (
            <button
              onClick={() => setActiveCategory('All')}
              className="shrink-0 ml-auto flex items-center gap-1 text-xs text-muted/50 hover:text-muted transition-colors"
            >
              <X className="w-3 h-3" /> Clear
            </button>
          )}
        </div>
      </div>

      {/* Grid */}
      <section className="max-w-7xl mx-auto px-6 py-16">
        <div className="flex items-center justify-between mb-8">
          <p className="text-sm text-muted/60">
            Showing <span className="text-white">{filtered.length}</span> fragrance{filtered.length !== 1 ? 's' : ''}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((product, i) => (
            <div
              key={product.id}
              className="reveal opacity-0 translate-y-6 transition-all duration-[800ms]"
              style={{ transitionDelay: `${(i % 6) * 80}ms` }}
            >
              <ProductCard product={product} onOpen={setSelectedProduct} />
            </div>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-24">
            <p className="font-serif text-2xl text-white/40 mb-2">No fragrances found.</p>
            <button onClick={() => setActiveCategory('All')} className="text-sm text-amber/70 hover:text-amber">
              Show all
            </button>
          </div>
        )}
      </section>

      {/* Product modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  )
}
