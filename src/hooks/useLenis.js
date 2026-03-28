import { useEffect } from 'react'
import Lenis from 'lenis'

export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration:    0.75,
      easing:      t => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    })

    let raf
    const tick = time => {
      lenis.raf(time)
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)

    // Pause Lenis when body scroll is locked (e.g. cart open)
    const obs = new MutationObserver(() => {
      if (document.body.style.overflow === 'hidden') lenis.stop()
      else lenis.start()
    })
    obs.observe(document.body, { attributes: true, attributeFilter: ['style'] })

    return () => {
      cancelAnimationFrame(raf)
      lenis.destroy()
      obs.disconnect()
    }
  }, [])
}
