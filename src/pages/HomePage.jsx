import { useEffect } from 'react'
import Hero from '@/components/home/Hero'
import FeaturedProducts from '@/components/home/FeaturedProducts'
import BrandStory from '@/components/home/BrandStory'
import { useReveal } from '@/hooks/useReveal'

export default function HomePage() {
  useReveal()

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' })
  }, [])

  return (
    <>
      <Hero />
      <FeaturedProducts />
      <BrandStory />
    </>
  )
}
