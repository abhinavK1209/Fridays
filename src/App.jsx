import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import { ToastProvider } from '@/context/ToastContext'
import Header      from '@/components/layout/Header'
import Footer      from '@/components/layout/Footer'
import CartSlideout from '@/components/cart/CartSlideout'
import ParticleCanvas from '@/components/effects/ParticleCanvas'
import ScrollToTopButton from '@/components/effects/ScrollToTop'
import { useLenis } from '@/hooks/useLenis'
import { AnimatePresence, motion } from 'framer-motion'
import HomePage    from '@/pages/HomePage'
import ShopPage    from '@/pages/ShopPage'
import AboutPage   from '@/pages/AboutPage'
import CheckoutPage from '@/pages/CheckoutPage'
import NotFoundPage from '@/pages/NotFoundPage'
import PrivacyPage  from '@/pages/PrivacyPage'
import TermsPage    from '@/pages/TermsPage'
import CookiesPage  from '@/pages/CookiesPage'

function AppLayout() {
  const location   = useLocation()
  const { pathname } = location
  const isCheckout = pathname === '/checkout'
  useLenis()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ position: 'relative' }}>
      <ParticleCanvas />
      <ScrollToTopButton />

      {!isCheckout && <Header />}
      <CartSlideout />

      <main className="flex-1">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={pathname}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
          >
            <Routes location={location}>
              <Route path="/"         element={<HomePage />} />
              <Route path="/shop"     element={<ShopPage />} />
              <Route path="/about"    element={<AboutPage />} />
              <Route path="/checkout" element={<CheckoutPage />} />
              <Route path="/privacy"  element={<PrivacyPage />} />
              <Route path="/terms"    element={<TermsPage />} />
              <Route path="/cookies"  element={<CookiesPage />} />
              <Route path="*"         element={<NotFoundPage />} />
            </Routes>
          </motion.div>
        </AnimatePresence>
      </main>

      {!isCheckout && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <ToastProvider>
        <HashRouter>
          <AppLayout />
        </HashRouter>
      </ToastProvider>
    </CartProvider>
  )
}
