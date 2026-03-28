import { useState, useEffect } from 'react'
import { ArrowUp } from 'lucide-react'

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  if (!visible) return null

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      data-hover
      style={{
        position:       'fixed',
        bottom:         '32px',
        right:          '32px',
        zIndex:         200,
        width:          '44px',
        height:         '44px',
        borderRadius:   '50%',
        border:         '1px solid rgba(223,149,80,0.4)',
        background:     'rgba(9,11,15,0.85)',
        backdropFilter: 'blur(12px)',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        color:          'rgba(223,149,80,0.9)',
        cursor:         'none',
        animation:      'fadeInUp 0.3s ease forwards',
        transition:     'border-color 0.3s, background 0.3s, transform 0.2s',
        boxShadow:      '0 4px 24px rgba(0,0,0,0.4)',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.background   = 'rgba(223,149,80,0.15)'
        e.currentTarget.style.borderColor  = 'rgba(223,149,80,0.8)'
        e.currentTarget.style.transform    = 'translateY(-3px)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.background   = 'rgba(9,11,15,0.85)'
        e.currentTarget.style.borderColor  = 'rgba(223,149,80,0.4)'
        e.currentTarget.style.transform    = 'translateY(0)'
      }}
    >
      <ArrowUp size={16} />
    </button>
  )
}
