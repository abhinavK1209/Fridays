import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useReveal } from '@/hooks/useReveal'

const values = [
  {
    num: '01',
    title: 'Radical Honesty',
    body: "We print our ingredient lists in full, never hide synthetics behind 'fragrance', and price our work transparently. Luxury doesn't require mystery.",
  },
  {
    num: '02',
    title: 'Obsessive Sourcing',
    body: 'Our bergamot is Calabrian. Our rose is Damascene. Our oud is ethically harvested. We travel to the source so you never have to wonder.',
  },
  {
    num: '03',
    title: 'No Compromise Formulas',
    body: 'Industry standard EDP concentration is 15–20%. Ours starts at 22%. Not because we have to — because you deserve a fragrance that lasts until midnight.',
  },
  {
    num: '04',
    title: 'Minimal Footprint',
    body: 'Refillable bottles. Recycled cardboard. Carbon-neutral shipping. We believe that luxury and responsibility are not opposing forces.',
  },
]

const timeline = [
  { year: '2023', event: 'Founded in Charlotte, NC by a group of high schoolers with a single fragrance and a conviction.' },
  { year: '2024', event: 'Expanded to five fragrances — Aelia, Azura, Kayaan, Dreams, and Liara. Four figures and growing.' },
  { year: '2025', event: 'Building something bigger. The next chapter begins.' },
]

export default function AboutPage() {
  useReveal()

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      {/* Hero */}
      <section
        className="min-h-[60vh] flex items-end pt-32 pb-16 px-6 relative overflow-hidden"
        style={{
          background:
            'radial-gradient(ellipse at 30% 60%, rgba(28,36,60,0.7) 0%, transparent 55%), radial-gradient(ellipse at 70% 20%, rgba(20,24,38,0.5) 0%, transparent 50%), #090b0f',
        }}
      >
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms]">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-8 h-px bg-amber/60" />
              <span className="text-xs uppercase tracking-[0.28em] text-amber/80">About Friday's</span>
            </div>
            <h1 className="font-serif text-[clamp(2.6rem,5vw,4.5rem)] text-white leading-tight tracking-wide mb-6">
              Built for the<br />
              <em className="text-amber not-italic">last hour</em><br />
              of the week.
            </h1>
            <p className="text-silver/65 text-base leading-loose max-w-md">
              Friday's is a fragrance brand born in Charlotte, NC — founded by high schoolers who believed
              that great scent shouldn't cost a fortune. We build fragrances for anyone who wants to
              leave an impression, at a price that doesn't require a second thought.
            </p>
          </div>
          <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] delay-200 flex justify-center lg:justify-end">
            <img
              src="/images/together.png"
              alt="Friday's Fragrance Collection"
              className="w-full max-w-lg object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Brand manifesto */}
      <section className="py-24 px-6 border-y border-white/6"
        style={{ background: 'radial-gradient(ellipse at 50% 50%, rgba(18,24,42,0.4) 0%, transparent 70%)' }}>
        <div className="max-w-3xl mx-auto text-center">
          <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms]">
            <p className="font-serif text-[clamp(1.5rem,3vw,2.4rem)] leading-[1.4] text-white/85 tracking-wide">
              "We believe a fragrance is the most intimate thing you can wear. Not jewelry, not clothing —
              scent reaches people before you do. It stays after you leave. It is the most personal statement
              you can make, and we take that seriously."
            </p>
            <div className="mt-8 flex items-center justify-center gap-3">
              <div className="w-12 h-px bg-amber/40" />
              <span className="text-xs uppercase tracking-[0.22em] text-amber/70">The Friday's Founders</span>
              <div className="w-12 h-px bg-amber/40" />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] mb-14">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber/60" />
              <span className="text-xs uppercase tracking-[0.28em] text-amber/80">Our Values</span>
            </div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white tracking-wide">
              What we stand for.
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-px" style={{ background: 'rgba(255,255,255,0.06)' }}>
            {values.map(({ num, title, body }, i) => (
              <div
                key={num}
                className="about-values-cell reveal opacity-0 translate-y-6 transition-all duration-[900ms] group"
                style={{
                  transitionDelay: `${i * 100}ms`,
                  padding: '40px 36px',
                  background: '#090b0f',
                  transition: 'background .4s',
                  position: 'relative',
                  overflow: 'hidden',
                }}
                onMouseEnter={e => { e.currentTarget.style.background = 'rgba(13,15,20,1)' }}
                onMouseLeave={e => { e.currentTarget.style.background = '#090b0f' }}
              >
                <div style={{
                  position: 'absolute', top: 0, left: 0, right: 0, height: 1,
                  background: 'linear-gradient(90deg, transparent, rgba(223,149,80,0.4), transparent)',
                  opacity: 0, transition: 'opacity .4s',
                }} className="group-hover:opacity-100" />
                <span className="font-serif block mb-6" style={{ fontSize: '2.5rem', color: 'rgba(255,255,255,0.06)', lineHeight: 1 }}>{num}</span>
                <h3 className="font-serif text-xl text-white mb-3" style={{ letterSpacing: '0.02em' }}>{title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: 'rgba(199,203,214,0.55)', fontFamily: "'Inter', sans-serif" }}>{body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-24 px-6 border-t border-white/6">
        <div className="max-w-3xl mx-auto">
          <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] mb-14 text-center">
            <div className="flex items-center justify-center gap-3 mb-4">
              <div className="w-8 h-px bg-amber/60" />
              <span className="text-xs uppercase tracking-[0.28em] text-amber/80">Our Journey</span>
              <div className="w-8 h-px bg-amber/60" />
            </div>
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white tracking-wide">
              From a conviction to a collection.
            </h2>
          </div>
          <div className="relative">
            {/* Vertical line — sits at center of dot column */}
            <div className="absolute top-0 bottom-0 w-px bg-amber/15" style={{ left: 88 }} />
            <div className="space-y-10">
              {timeline.map(({ year, event }, i) => (
                <div
                  key={year}
                  className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] flex items-center gap-0"
                  style={{ transitionDelay: `${i * 100}ms` }}
                >
                  {/* Year */}
                  <div className="shrink-0 text-right pr-5" style={{ width: 80 }}>
                    <span className="font-serif text-base text-amber/80">{year}</span>
                  </div>

                  {/* Dot — centered on the line at left:88 */}
                  <div className="shrink-0 w-[17px] flex justify-center" style={{ position: 'relative', zIndex: 1 }}>
                    <div style={{
                      width: 7, height: 7,
                      borderRadius: '50%',
                      background: 'rgba(223,149,80,0.9)',
                      boxShadow: '0 0 8px rgba(223,149,80,0.4)',
                    }} />
                  </div>

                  {/* Event */}
                  <p className="text-silver/65 text-sm leading-relaxed pl-5">{event}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-24 px-6 border-t border-white/6">
        <div className="max-w-2xl mx-auto text-center">
          <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms]">
            <h2 className="font-serif text-[clamp(2rem,4vw,3rem)] text-white tracking-wide mb-6">
              Ready to find your signature?
            </h2>
            <Button variant="amber" size="lg" className="tracking-widest uppercase text-xs group" asChild>
              <Link to="/shop">
                Explore the Collection
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
