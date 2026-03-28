import { useEffect, useRef } from 'react'

/**
 * CustomCursor — replaces default cursor with a golden amber dot.
 */
export default function CustomCursor() {
  const dotRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    if (!dot) return

    const onMove = e => {
      dot.style.left = e.clientX + 'px'
      dot.style.top  = e.clientY + 'px'
    }

    const addClick = () => document.documentElement.classList.add('cursor-click')
    const rmClick  = () => document.documentElement.classList.remove('cursor-click')

    document.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mousedown', addClick)
    document.addEventListener('mouseup',   rmClick)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mousedown', addClick)
      document.removeEventListener('mouseup',   rmClick)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      id="cursor-dot"
      aria-hidden="true"
      style={{
        position:      'fixed',
        top:           0,
        left:          0,
        width:         10,
        height:        10,
        borderRadius:  '50%',
        background:    'rgba(223,149,80,1)',
        pointerEvents: 'none',
        zIndex:        99999,
        transform:     'translate(-50%, -50%)',
        transition:    'width .2s, height .2s, transform .15s',
      }}
    />
  )
}
