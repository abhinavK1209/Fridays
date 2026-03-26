import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, ChevronDown } from 'lucide-react'
import { Button } from '@/components/ui/button'
import BottleIllustration from '@/components/common/BottleIllustration'
import { products } from '@/data/products'

const hero = products[0] // Noir Ember as the hero product

export default function Hero() {
  const titleRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    el.classList.add('opacity-100', 'translate-y-0')
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at 20% 50%, rgba(30,38,60,0.8) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(20,24,40,0.6) 0%, transparent 50%), #090b0f',
      }}
    >
      {/* Ambient particles / texture */}
      <div className="absolute inset-0 pointer-events-none opacity-30"
        style={{ background: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\' opacity=\'0.08\'/%3E%3C/svg%3E")' }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full pt-28 pb-20 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

        {/* Left: Copy */}
        <div
          ref={titleRef}
          className="opacity-0 translate-y-8 transition-all duration-[1100ms] ease-out max-w-xl"
        >
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-px bg-amber/60" />
            <span className="text-xs uppercase tracking-[0.28em] text-amber/80">Luxury Fragrance House</span>
          </div>

          <h1 className="font-serif text-[clamp(3.2rem,6.5vw,5.8rem)] leading-[1.02] tracking-wide text-white mb-6">
            When the week ends,<br />
            <em className="text-amber not-italic">confidence</em><br />
            begins.
          </h1>

          <p className="text-silver/70 text-lg leading-relaxed mb-10 max-w-md">
            Friday's captures that defining transition — from the last hour of responsibility
            to the first pulse of possibility. Engineered for those who leave an impression.
          </p>

          <div className="flex flex-wrap gap-4">
            <Button variant="amber" size="lg" className="tracking-widest uppercase text-xs group" asChild>
              <Link to="/shop">
                Explore Collection
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
            <Button variant="ghost" size="lg" className="tracking-widest uppercase text-xs" asChild>
              <Link to="/about">Our Story</Link>
            </Button>
          </div>

          {/* Trust signals */}
          <div className="mt-12 flex items-center gap-8">
            {[
              { value: '12+', label: 'Hour wear' },
              { value: '100%', label: 'Cruelty free' },
              { value: '6', label: 'Fragrances' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="font-serif text-2xl text-white">{value}</p>
                <p className="text-xs text-muted/70 uppercase tracking-widest mt-0.5">{label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Bottle */}
        <div className="flex justify-center lg:justify-end items-center relative">
          {/* Outer glow ring */}
          <div
            className="absolute rounded-full animate-glow-pulse pointer-events-none"
            style={{
              width: 400,
              height: 400,
              background: `radial-gradient(circle, ${hero.glowColor} 0%, transparent 65%)`,
              filter: 'blur(20px)',
            }}
          />
          <BottleIllustration
            gradient={hero.bottleGradient}
            glowColor={hero.glowColor}
            accentColor={hero.accentColor}
            label="Friday's"
            sublabel="Noir Ember"
            size="xl"
          />
        </div>
      </div>

      {/* Scroll hint */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-40">
        <span className="text-xs uppercase tracking-[0.2em] text-muted">Scroll</span>
        <ChevronDown className="w-4 h-4 text-muted animate-bounce" />
      </div>
    </section>
  )
}
