import { Link } from 'react-router-dom'
import { ArrowRight, Clock, Sparkles, Wind, Leaf } from 'lucide-react'
import { Button } from '@/components/ui/button'

const pillars = [
  {
    Icon: Clock,
    title: '12+ Hour Longevity',
    body: 'High-concentration oil formulas designed to evolve for half a day and beyond, with natural projection that commands a room.',
    delay: '',
  },
  {
    Icon: Sparkles,
    title: 'Rare Ingredients',
    body: 'Sourced from Grasse, oud regions, and beyond — every note is an authentic material, never synthetic substitution.',
    delay: 'delay-150',
  },
  {
    Icon: Wind,
    title: 'Master Perfumers',
    body: 'Composed by perfumers who approach scent as architecture — layered, intentional, and built to leave an impression.',
    delay: 'delay-300',
  },
  {
    Icon: Leaf,
    title: 'Conscious Crafting',
    body: 'Cruelty-free formulation, recycled packaging, and a commitment to traceability across our entire supply chain.',
    delay: 'delay-[450ms]',
  },
]

export default function BrandStory() {
  return (
    <>
      {/* Brand quote */}
      <section
        className="py-28 px-6 border-y border-white/6"
        style={{
          background:
            'radial-gradient(ellipse at 50% 50%, rgba(22,28,48,0.5) 0%, transparent 70%), rgba(7,9,12,0.6)',
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms]">
            <div className="flex items-center justify-center gap-4 mb-10">
              <div className="w-16 h-px bg-amber/30" />
              <span className="text-xs uppercase tracking-[0.28em] text-amber/70">Brand Story</span>
              <div className="w-16 h-px bg-amber/30" />
            </div>
            <blockquote className="font-serif text-[clamp(1.8rem,3.8vw,3rem)] leading-[1.18] tracking-wide text-white mb-8">
              "A scent is not a product.<br />
              <em className="text-electric">It's a signature.</em>"
            </blockquote>
            <p className="text-silver/60 text-base leading-loose max-w-2xl mx-auto mb-10">
              Friday's was born from a simple conviction: that luxury fragrance shouldn't require a French education
              or a trust fund. We set out to create the scents we wanted to wear — modern, bold, and unapologetically
              ambitious — and make them accessible to anyone who takes themselves seriously.
            </p>
            <Button variant="ghost" size="sm" className="text-xs tracking-widest uppercase group" asChild>
              <Link to="/about">
                Read our full story
                <ArrowRight className="w-3.5 h-3.5 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Pillars */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber/60" />
              <span className="text-xs uppercase tracking-[0.28em] text-amber/80">The Experience</span>
            </div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] text-white tracking-wide">
              Precision. Presence. Purpose.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {pillars.map(({ Icon, title, body, delay }) => (
              <div
                key={title}
                className={`reveal opacity-0 translate-y-6 transition-all duration-[900ms] ${delay} group p-6 rounded-2xl border border-white/8 hover:border-electric/25 transition-colors duration-500`}
                style={{ background: 'rgba(13,15,22,0.8)' }}
              >
                <div className="w-10 h-10 rounded-xl bg-electric/8 border border-electric/18 flex items-center justify-center mb-5 group-hover:bg-electric/15 transition-colors duration-300">
                  <Icon className="w-5 h-5 text-electric" />
                </div>
                <h3 className="font-serif text-lg text-white mb-2">{title}</h3>
                <p className="text-sm text-silver/60 leading-relaxed">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
