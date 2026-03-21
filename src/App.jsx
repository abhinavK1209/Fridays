import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Sparkles, Wind, Clock } from 'lucide-react'

function useReveal() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('opacity-100', 'translate-y-0')
          e.target.classList.remove('opacity-0', 'translate-y-6')
          obs.unobserve(e.target)
        }
      }),
      { threshold: 0.15 }
    )
    els.forEach(el => obs.observe(el))
    return () => obs.disconnect()
  }, [])
}

export default function App() {
  useReveal()

  return (
    <div className="min-h-screen font-sans" style={{ background: 'radial-gradient(circle at 15% 10%, #1b2133 0%, #090b0f 55%), linear-gradient(140deg, #090b0f 0%, #0a0e17 100%)' }}>

      {/* HEADER */}
      <header className="fixed top-0 w-full z-50 flex items-center justify-between px-[6vw] py-5 backdrop-blur-md border-b border-silver/10" style={{ background: 'rgba(7,9,12,0.5)' }}>
        <span className="font-serif text-2xl tracking-widest text-white">Friday's</span>
        <nav className="hidden md:flex gap-8">
          {['Signature','Story','Experience','Shop'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="text-silver text-sm tracking-wide hover:text-electric transition-colors duration-300">
              {item}
            </a>
          ))}
        </nav>
        <Button variant="amber" size="sm" className="hidden md:inline-flex text-xs tracking-widest uppercase">
          Shop Now
        </Button>
      </header>

      {/* HERO */}
      <section id="home" className="min-h-screen pt-24 px-[6vw] grid grid-cols-1 md:grid-cols-2 items-center gap-12 relative overflow-hidden">
        {/* ambient glows */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-[40%] right-[30%] w-96 h-96 rounded-full" style={{ background: 'radial-gradient(circle, rgba(90,139,255,0.18) 0%, transparent 70%)', filter: 'blur(8px)' }} />
          <div className="absolute top-[50%] right-[25%] w-80 h-80 rounded-full" style={{ background: 'radial-gradient(circle, rgba(223,149,80,0.14) 0%, transparent 70%)', filter: 'blur(10px)' }} />
        </div>

        {/* left content */}
        <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] z-10 max-w-lg">
          <Badge variant="amber" className="mb-6 uppercase tracking-[0.22em] text-[10px]">Luxury Fragrance House</Badge>
          <h1 className="font-serif text-[clamp(3rem,6vw,5.5rem)] leading-[1.04] tracking-wide text-white mb-5">
            Modern Scent<br />
            <em className="text-amber not-italic">Redefined</em>
          </h1>
          <p className="text-muted text-lg max-w-[420px] mb-8 leading-relaxed">
            A bold olfactory signature for ambition, nightlife, and the freedom of Friday.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Button variant="amber" size="lg" className="tracking-widest uppercase text-xs" asChild>
              <a href="#signature">Discover Friday's</a>
            </Button>
            <Button variant="ghost" size="lg" className="tracking-widest uppercase text-xs" asChild>
              <a href="#story">Our Story</a>
            </Button>
          </div>
        </div>

        {/* right: bottle */}
        <div className="justify-self-center relative z-10">
          {/* outer glow */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-72 h-72 rounded-full animate-glow-pulse pointer-events-none" style={{ background: 'radial-gradient(circle, rgba(90,139,255,0.45) 0%, transparent 70%)', filter: 'blur(14px)' }} />
          {/* bottle wrapper — floats */}
          <div className="animate-float relative mx-auto" style={{ width: 230, height: 400 }}>
            {/* neck */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-11 rounded-t-xl rounded-b-sm border border-silver/30" style={{ background: 'linear-gradient(180deg, #3c465e 0%, #191f2e 100%)' }} />
            {/* body */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[200px] h-[348px] rounded-[22px] border border-silver/30 flex items-center justify-center" style={{ background: 'linear-gradient(160deg, rgba(20,24,32,0.92) 0%, rgba(55,63,82,0.85) 45%, rgba(18,22,30,0.96) 100%)', boxShadow: 'inset 0 0 40px rgba(255,255,255,0.05), 0 24px 80px rgba(0,0,0,0.6), 0 0 60px rgba(90,139,255,0.08)' }}>
              {/* label */}
              <div className="text-center select-none">
                <p className="font-serif text-[11px] tracking-[0.34em] text-white/75 uppercase">Friday's</p>
                <div className="w-8 h-px bg-amber/50 mx-auto my-2" />
                <p className="text-[8px] tracking-[0.18em] text-silver/50 uppercase">Noir Ember</p>
              </div>
              {/* inner shine */}
              <div className="absolute top-6 left-5 w-3 h-32 rounded-full opacity-20" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)', filter: 'blur(4px)' }} />
            </div>
          </div>
        </div>
      </section>

      {/* SIGNATURE */}
      <section id="signature" className="px-[6vw] py-24">
        <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] mb-12">
          <Badge variant="amber" className="mb-4 uppercase tracking-[0.22em] text-[10px]">Signature Fragrance</Badge>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.4rem)] tracking-wide text-white">Friday's Noir Ember</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* product visual */}
          <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] delay-100 rounded-3xl border border-silver/12 grid place-items-center min-h-[480px] relative overflow-hidden" style={{ background: 'linear-gradient(130deg, rgba(17,20,29,0.97), rgba(10,12,18,0.97))' }}>
            <div className="absolute inset-0" style={{ background: 'radial-gradient(circle at 50% 60%, rgba(90,139,255,0.12) 0%, transparent 60%)' }} />
            {/* bottle */}
            <div className="relative mx-auto animate-float" style={{ width: 200, height: 360 }}>
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-20 h-10 rounded-t-xl rounded-b-sm border border-silver/30" style={{ background: 'linear-gradient(180deg, #3c465e 0%, #191f2e 100%)' }} />
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[170px] h-[314px] rounded-[20px] border border-silver/25 flex items-center justify-center" style={{ background: 'linear-gradient(160deg, rgba(20,24,32,0.92) 0%, rgba(55,63,82,0.85) 45%, rgba(18,22,30,0.96) 100%)', boxShadow: 'inset 0 0 40px rgba(255,255,255,0.05), 0 20px 60px rgba(0,0,0,0.55)' }}>
                <div className="text-center">
                  <p className="font-serif text-[10px] tracking-[0.34em] text-white/75 uppercase">Friday's</p>
                  <div className="w-6 h-px bg-amber/50 mx-auto my-2" />
                  <p className="text-[7px] tracking-[0.18em] text-silver/50 uppercase">Noir Ember</p>
                </div>
                <div className="absolute top-5 left-4 w-2.5 h-24 rounded-full opacity-20" style={{ background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)', filter: 'blur(3px)' }} />
              </div>
            </div>
          </div>

          {/* notes */}
          <div className="space-y-5">
            <p className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] text-muted text-base leading-relaxed max-w-md">
              An electrifying composition that opens with luminous clarity, deepens into smoky seduction, and settles into a warm, magnetic trail.
            </p>
            {[
              { label: 'Top Notes', notes: 'Bergamot · Black Pepper · Iced Mandarin', delay: 'delay-100' },
              { label: 'Heart Notes', notes: 'Lavender Absolute · Saffron · Violet Leaf', delay: 'delay-200' },
              { label: 'Base Notes', notes: 'Amber Resin · Vetiver Smoke · Cedarwood Musk', delay: 'delay-300' },
            ].map(({ label, notes, delay }) => (
              <div key={label} className={`reveal opacity-0 translate-y-6 transition-all duration-[900ms] ${delay} rounded-2xl border border-silver/12 p-5 hover:border-electric/40 hover:-translate-y-0.5 transition-all duration-300`} style={{ background: 'rgba(17,20,29,0.8)' }}>
                <p className="text-xs uppercase tracking-[0.18em] text-amber mb-1.5">{label}</p>
                <p className="text-silver text-sm">{notes}</p>
              </div>
            ))}
            <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] delay-[400ms] pt-2">
              <Button variant="amber" className="tracking-widest uppercase text-xs" asChild>
                <a href="#shop">Add to Cart — $148</a>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* STORY */}
      <section id="story" className="px-[6vw] py-24 border-t border-silver/8">
        <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] max-w-3xl mx-auto text-center">
          <Badge variant="amber" className="mb-6 uppercase tracking-[0.22em] text-[10px]">Brand Story</Badge>
          <blockquote className="font-serif text-[clamp(1.6rem,3.5vw,2.8rem)] leading-[1.2] tracking-wide text-white mb-8">
            "When the week ends,<br />
            <em className="text-electric">confidence begins.</em>"
          </blockquote>
          <p className="text-muted text-base leading-loose max-w-2xl mx-auto">
            Friday's captures that defining transition — the final hour of responsibility and the first pulse of possibility. Created for modern identity, our scents are engineered for ambition at dusk, presence at midnight, and authority that lasts until dawn.
          </p>
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="px-[6vw] py-24">
        <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] mb-12">
          <Badge variant="amber" className="mb-4 uppercase tracking-[0.22em] text-[10px]">The Experience</Badge>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] tracking-wide text-white">Precision Crafted for Lasting Impact</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            { icon: Clock, title: 'Long-Lasting Trail', body: 'High-concentration oils designed to evolve for 12+ hours with elegant projection.', delay: '' },
            { icon: Sparkles, title: 'Bold Modern Ingredients', body: 'A contemporary blend of citrus electricity, aromatic depth, and amber warmth.', delay: 'delay-150' },
            { icon: Wind, title: 'Refined Craftsmanship', body: 'Each batch balanced by perfumers who compose scent like cinematic atmosphere.', delay: 'delay-300' },
          ].map(({ icon: Icon, title, body, delay }) => (
            <Card key={title} className={`reveal opacity-0 translate-y-6 transition-all duration-[900ms] ${delay} p-1`}>
              <CardHeader>
                <div className="w-10 h-10 rounded-xl bg-electric/10 border border-electric/20 flex items-center justify-center mb-3">
                  <Icon className="w-5 h-5 text-electric" />
                </div>
                <CardTitle className="text-xl">{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-sm leading-relaxed">{body}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* SHOP */}
      <section id="shop" className="px-[6vw] py-24 border-t border-silver/8">
        <div className="reveal opacity-0 translate-y-6 transition-all duration-[900ms] mb-12">
          <Badge variant="amber" className="mb-4 uppercase tracking-[0.22em] text-[10px]">Shop Collection</Badge>
          <h2 className="font-serif text-[clamp(2rem,4vw,3.2rem)] tracking-wide text-white">Minimal Selection.<br />Maximum Presence.</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { name: 'Noir Ember', desc: '100ml Eau de Parfum', price: '$148', delay: '' },
            { name: 'Midnight Alloy', desc: '50ml Extrait', price: '$128', delay: 'delay-100' },
            { name: 'Weekend Code', desc: 'Travel Set', price: '$72', delay: 'delay-200' },
            { name: "Friday's Ritual", desc: 'Body & Scent Layering Kit', price: '$96', delay: 'delay-300' },
          ].map(({ name, desc, price, delay }) => (
            <Card key={name} className={`reveal opacity-0 translate-y-6 transition-all duration-[900ms] ${delay} group cursor-pointer`}>
              {/* product mockup */}
              <div className="h-52 rounded-xl mx-3 mt-3 flex items-center justify-center relative overflow-hidden border border-silver/10" style={{ background: 'linear-gradient(135deg, #0e1218 0%, #1e2435 50%, #0e1218 100%)' }}>
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(circle at 50% 50%, rgba(90,139,255,0.12) 0%, transparent 60%)' }} />
                <div className="relative animate-float" style={{ width: 72, height: 116 }}>
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 w-8 h-4 rounded-t-lg rounded-b-sm border border-silver/30" style={{ background: 'linear-gradient(180deg, #3c465e 0%, #191f2e 100%)' }} />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[62px] h-[96px] rounded-xl border border-silver/25 flex items-center justify-center" style={{ background: 'linear-gradient(160deg, rgba(20,24,32,0.92) 0%, rgba(55,63,82,0.85) 45%, rgba(18,22,30,0.96) 100%)' }}>
                    <p className="font-serif text-[5px] tracking-[0.26em] text-white/70 uppercase">F'S</p>
                  </div>
                </div>
              </div>
              <CardHeader className="pb-1">
                <CardTitle className="text-lg">{name}</CardTitle>
                <CardDescription>{desc}</CardDescription>
              </CardHeader>
              <CardContent className="flex items-center justify-between pt-1">
                <span className="text-amber font-semibold text-lg font-serif">{price}</span>
                <Button variant="outline" size="sm" className="text-xs tracking-wide">Add to Cart</Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="px-[6vw] py-14 border-t border-silver/12 grid grid-cols-1 md:grid-cols-3 gap-10" style={{ background: 'rgba(7,9,12,0.8)' }}>
        <div>
          <h2 className="font-serif text-3xl tracking-widest text-white mb-2">Friday's</h2>
          <p className="text-muted text-sm">Modern Scent Redefined.</p>
        </div>
        <div className="flex flex-col gap-3">
          {['Shop','About','Contact','Instagram'].map(link => (
            <a key={link} href="#" className="text-silver/80 hover:text-white text-sm transition-colors duration-300 w-fit">{link}</a>
          ))}
        </div>
        <form className="space-y-3" onSubmit={e => e.preventDefault()}>
          <p className="text-sm text-silver tracking-wide">Join the newsletter</p>
          <div className="flex gap-2">
            <Input type="email" placeholder="Enter your email" className="flex-1" />
            <Button variant="default" size="sm" className="shrink-0 rounded-full px-5 text-xs tracking-widest uppercase">Join</Button>
          </div>
        </form>
      </footer>

    </div>
  )
}
