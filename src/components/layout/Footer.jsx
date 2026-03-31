import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Instagram, Twitter, Send } from 'lucide-react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const footerLinks = {
  Shop: [
    { label: 'All Fragrances', to: '/shop' },
    { label: 'Bestsellers', to: '/shop' },
    { label: 'New Arrivals', to: '/shop' },
    { label: 'Gift Sets', to: '/shop' },
  ],
  Brand: [
    { label: 'Our Story', to: '/about' },
    { label: 'Craftsmanship', to: '/about' },
    { label: 'Sustainability', to: '/about' },
  ],
  Support: [
    { label: 'My Account', to: '/account' },
    { label: 'Shipping & Returns', to: '/terms' },
    { label: 'FAQ', to: '/terms' },
    { label: 'Contact', to: '/about' },
  ],
}

export default function Footer() {
  const [email, setEmail] = useState('')
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e) => {
    e.preventDefault()
    if (email.trim()) {
      setSubscribed(true)
      setEmail('')
    }
  }

  return (
    <footer
      className="border-t border-white/8 pt-16 pb-8"
      style={{ background: 'rgba(5,7,10,0.95)', position: 'relative', overflow: 'hidden' }}
    >
      {/* Ambient glow */}
      <div aria-hidden="true" style={{
        position:     'absolute',
        width:        500,
        height:       300,
        borderRadius: '50%',
        background:   'radial-gradient(circle, rgba(223,149,80,0.04) 0%, transparent 70%)',
        bottom:       '-100px',
        left:         '50%',
        transform:    'translateX(-50%)',
        pointerEvents:'none',
        filter:       'blur(40px)',
      }} />
      <div className="max-w-7xl mx-auto px-6">
        {/* Top grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 mb-16">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link to="/" className="font-serif text-3xl tracking-widest text-white block mb-4">
              Friday's
            </Link>
            <p className="text-muted text-sm leading-relaxed max-w-xs mb-6">
              Modern scent redefined. Luxury fragrance engineered for ambition, nightlife, and the freedom of Friday.
            </p>
            {/* Social */}
            <div className="flex gap-4">
              {[
                { Icon: Instagram, label: 'Instagram', href: 'https://instagram.com' },
                { Icon: Twitter, label: 'Twitter', href: 'https://x.com' },
              ].map(({ Icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-full border border-white/15 flex items-center justify-center text-silver/60 hover:text-white hover:border-amber/50 transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h3 className="text-xs uppercase tracking-[0.22em] text-amber/80 mb-5">{group}</h3>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-sm text-silver/70 hover:text-white transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Newsletter */}
        <div className="border-t border-white/8 pt-10 mb-10">
          <div className="max-w-md">
            <h3 className="font-serif text-xl text-white mb-2">Join the inner circle.</h3>
            <p className="text-sm text-muted mb-4">Early access to new releases, private events, and rare drops.</p>
            {subscribed ? (
              <p className="text-amber text-sm tracking-wide">You're in. Welcome to Friday's.</p>
            ) : (
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="flex-1 rounded-full"
                  required
                />
                <Button type="submit" variant="amber" size="sm" className="shrink-0 px-5 text-xs tracking-widest uppercase">
                  <Send className="w-3.5 h-3.5 mr-1.5" />
                  Join
                </Button>
              </form>
            )}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-muted/60">
            © {new Date().getFullYear()} Friday's Fragrance. All rights reserved.
          </p>
          <div className="flex gap-6">
            {[
              { label: 'Privacy Policy',   to: '/privacy' },
              { label: 'Terms of Service', to: '/terms' },
              { label: 'Cookie Policy',    to: '/cookies' },
            ].map(({ label, to }) => (
              <Link
                key={label}
                to={to}
                className="text-xs text-muted/60 hover:text-white/80 transition-colors duration-300"
              >
                {label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
