import { useEffect } from 'react'
import { HashRouter, Routes, Route, useLocation } from 'react-router-dom'
import { CartProvider } from '@/context/CartContext'
import Header      from '@/components/layout/Header'
import Footer      from '@/components/layout/Footer'
import CartSlideout from '@/components/cart/CartSlideout'
import CustomCursor from '@/components/effects/CustomCursor'
import ParticleCanvas from '@/components/effects/ParticleCanvas'
import HomePage    from '@/pages/HomePage'
import ShopPage    from '@/pages/ShopPage'
import AboutPage   from '@/pages/AboutPage'
import CheckoutPage from '@/pages/CheckoutPage'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [pathname])
  return null
}

function AppLayout() {
  const { pathname } = useLocation()
  const isCheckout   = pathname === '/checkout'

  return (
    <div className="min-h-screen flex flex-col font-sans" style={{ position: 'relative' }}>
      {/* Global ambient effects — always present */}
      <CustomCursor />
      <ParticleCanvas />

      {!isCheckout && <Header />}
      <CartSlideout />

      <main className="flex-1 page-enter" key={pathname}>
        <Routes>
          <Route path="/"         element={<HomePage />} />
          <Route path="/shop"     element={<ShopPage />} />
          <Route path="/about"    element={<AboutPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
        </Routes>
      </main>

      {!isCheckout && <Footer />}
    </div>
  )
}

export default function App() {
  return (
    <CartProvider>
      <HashRouter>
        <ScrollToTop />
        <AppLayout />
      </HashRouter>
    </CartProvider>
  )
}
