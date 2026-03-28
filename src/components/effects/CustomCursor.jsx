import { useEffect, useRef } from 'react'

/**
 * CustomCursor — replaces default cursor with a golden amber orb + lagging ring.
 * Inspired by top award-winning luxury/creative websites.
 */
export default function CustomCursor() {
  const dotRef  = useRef(null)
  const ringRef = useRef(null)
  const pos     = useRef({ x: -100, y: -100 })
  const ring    = useRef({ x: -100, y: -100 })
  const raf     = useRef(null)

  useEffect(() => {
    const dot    = dotRef.current
    const ringEl = ringRef.current
    if (!dot || !ringEl) return

    // Move dot instantly
    const onMove = e => {
      pos.current.x = e.clientX
      pos.current.y = e.clientY
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    // Animate ring with lerp (smooth lag)
    const animate = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.13
      ring.current.y += (pos.current.y - ring.current.y) * 0.13
      ringEl.style.left = ring.current.x + 'px'
      ringEl.style.top  = ring.current.y + 'px'
      raf.current = requestAnimationFrame(animate)
    }

    // Hover state: ring expands, dot shrinks
    const addHover = () => document.documentElement.classList.add('cursor-hover')
    const rmHover  = () => document.documentElement.classList.remove('cursor-hover')
    const addClick = () => document.documentElement.classList.add('cursor-click')
    const rmClick  = () => document.documentElement.classList.remove('cursor-click')

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mousedown', addClick)
    document.addEventListener('mouseup',   rmClick)

    // Attach hover to interactive elements (including dynamically added ones)
    const attachHover = () => {
      document.querySelectorAll('a, button, [data-hover], input, select, textarea').forEach(el => {
        el.addEventListener('mouseenter', addHover)
        el.addEventListener('mouseleave', rmHover)
      })
    }
    attachHover()

    // Re-attach when DOM changes (React renders)
    const mo = new MutationObserver(attachHover)
    mo.observe(document.body, { childList: true, subtree: true })

    raf.current = requestAnimationFrame(animate)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', addClick)
      document.removeEventListener('mouseup',   rmClick)
      cancelAnimationFrame(raf.current)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      {/* Dot */}
      <div
        ref={dotRef}
        aria-hidden="true"
        style={{
          position:        'fixed',
          top:             0,
          left:            0,
          width:           10,
          height:          10,
          borderRadius:    '50%',
          background:      'rgba(223,149,80,1)',
          pointerEvents:   'none',
          zIndex:          99999,
          transform:       'translate(-50%, -50%)',
          transition:      'width .2s, height .2s, background .2s, opacity .2s',
          mixBlendMode:    'normal',
        }}
      />
      {/* Ring */}
      <div
        ref={ringRef}
        aria-hidden="true"
        style={{
          position:      'fixed',
          top:           0,
          left:          0,
          width:         38,
          height:        38,
          borderRadius:  '50%',
          border:        '1px solid rgba(223,149,80,0.5)',
          pointerEvents: 'none',
          zIndex:        99998,
          transform:     'translate(-50%, -50%)',
          transition:    'width .35s cubic-bezier(0.16,1,0.3,1), height .35s cubic-bezier(0.16,1,0.3,1), border-color .35s',
        }}
      />
    </>
  )
}
