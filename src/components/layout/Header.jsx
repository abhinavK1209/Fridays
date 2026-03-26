import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ShoppingBag, Menu, X } from 'lucide-react'
import { useCart } from '@/context/CartContext'
import { cn } from '@/lib/utils'

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Story', to: '/about' },
]

export default function Header() {
  const { cartCount, openCart } = useCart()
  const location = useLocation()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Close mobile menu on navigation
  useEffect(() => setMobileOpen(false), [location.pathname])

  return (
    <>
      <header
        className={cn(
          'fixed top-0 w-full z-50 transition-all duration-500',
          scrolled
            ? 'backdrop-blur-xl border-b border-white/8 py-4'
            : 'py-6',
        )}
        style={{ background: scrolled ? 'rgba(7,9,12,0.75)' : 'transparent' }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <Link
            to="/"
            className="font-serif text-2xl tracking-widest text-white hover:text-amber transition-colors duration-300"
          >
            Friday's
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-10" aria-label="Main navigation">
            {navLinks.map(({ label, to }) => (
              <Link
                key={to}
                to={to}
                className={cn(
                  'text-sm tracking-widest uppercase transition-colors duration-300',
                  location.pathname === to
                    ? 'text-white'
                    : 'text-silver/70 hover:text-white',
                )}
              >
                {label}
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-4">
            {/* Cart button */}
            <button
              onClick={openCart}
              aria-label={`Open cart (${cartCount} items)`}
              className="relative p-2 text-silver hover:text-white transition-colors duration-300 group"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 w-4 h-4 rounded-full bg-amber text-[9px] font-bold text-bg flex items-center justify-center leading-none">
                  {cartCount > 9 ? '9+' : cartCount}
                </span>
              )}
            </button>

            {/* Mobile menu toggle */}
            <button
              onClick={() => setMobileOpen(v => !v)}
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              className="md:hidden p-2 text-silver hover:text-white transition-colors duration-300"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile nav overlay */}
      <div
        className={cn(
          'fixed inset-0 z-40 flex flex-col pt-24 px-6 pb-10 md:hidden transition-all duration-300',
          mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none',
        )}
        style={{ background: 'rgba(7,9,12,0.97)', backdropFilter: 'blur(20px)' }}
      >
        <nav className="flex flex-col gap-8 mt-8" aria-label="Mobile navigation">
          <Link to="/" className="font-serif text-3xl text-white/80 hover:text-white transition-colors">
            Home
          </Link>
          {navLinks.map(({ label, to }) => (
            <Link
              key={to}
              to={to}
              className="font-serif text-3xl text-white/80 hover:text-white transition-colors"
            >
              {label}
            </Link>
          ))}
        </nav>
        <div className="mt-auto border-t border-white/10 pt-8">
          <p className="text-muted text-sm tracking-widest uppercase">Modern Scent Redefined.</p>
        </div>
      </div>
    </>
  )
}
