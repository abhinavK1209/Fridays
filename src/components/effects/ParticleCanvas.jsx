import { useEffect, useRef } from 'react'

/**
 * ParticleCanvas — canvas-based floating amber particles.
 * Inspired by luxury perfume brand websites and creative agencies.
 * Particles slowly rise and fade, creating a smoke/ember atmosphere.
 */
export default function ParticleCanvas() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')

    let W = canvas.width  = window.innerWidth
    let H = canvas.height = window.innerHeight
    let raf

    const onResize = () => {
      W = canvas.width  = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize, { passive: true })

    // Amber palette: main amber, warm highlight, cool ember
    const colors = [
      [223, 149, 80],  // amber
      [201, 168, 76],  // gold
      [255, 200, 120], // warm
    ]

    class Particle {
      reset(fromBottom = true) {
        this.x     = Math.random() * W
        this.y     = fromBottom ? H + Math.random() * 20 : Math.random() * H
        this.r     = Math.random() * 1.8 + 0.3
        this.vy    = -(Math.random() * 0.42 + 0.1)
        this.vx    = (Math.random() - 0.5) * 0.18
        this.life  = 1
        this.decay = Math.random() * 0.0028 + 0.001
        this.alpha = Math.random() * 0.28 + 0.04
        this.color = colors[Math.floor(Math.random() * colors.length)]
      }
      constructor() { this.reset(false) }
      update() {
        this.x    += this.vx
        this.y    += this.vy
        this.life -= this.decay
        if (this.life <= 0 || this.y < -12) this.reset(true)
      }
      draw() {
        const [r, g, b] = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${this.alpha * this.life})`
        ctx.fill()
      }
    }

    // Occasional larger "spark" particles
    class Spark {
      reset(fromBottom = true) {
        this.x     = Math.random() * W
        this.y     = fromBottom ? H + 10 : Math.random() * H
        this.r     = Math.random() * 3 + 1.5
        this.vy    = -(Math.random() * 0.6 + 0.2)
        this.vx    = (Math.random() - 0.5) * 0.3
        this.life  = 1
        this.decay = Math.random() * 0.006 + 0.003
        this.alpha = Math.random() * 0.12 + 0.02
      }
      constructor() { this.reset(false) }
      update() {
        this.x    += this.vx
        this.y    += this.vy
        this.life -= this.decay
        if (this.life <= 0 || this.y < -12) this.reset(true)
      }
      draw() {
        // Soft glow via radial gradient
        const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 3)
        grad.addColorStop(0, `rgba(255,180,80,${this.alpha * this.life})`)
        grad.addColorStop(1, `rgba(223,149,80,0)`)
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r * 3, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      }
    }

    const particles = Array.from({ length: 90 }, () => new Particle())
    const sparks    = Array.from({ length: 15 }, () => new Spark())

    const animate = () => {
      ctx.clearRect(0, 0, W, H)
      particles.forEach(p => { p.update(); p.draw() })
      sparks.forEach(s    => { s.update();    s.draw() })
      raf = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position:      'fixed',
        inset:         0,
        width:         '100%',
        height:        '100%',
        pointerEvents: 'none',
        zIndex:        1,
        opacity:       0.55,
      }}
    />
  )
}
