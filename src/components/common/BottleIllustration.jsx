import { cn } from '@/lib/utils'

/**
 * CSS-rendered perfume bottle illustration.
 * Pass `gradient`, `glowColor`, and `accentColor` from the product data.
 */
export default function BottleIllustration({
  gradient,
  glowColor = 'rgba(90,139,255,0.4)',
  accentColor = '#5a8bff',
  label = "Friday's",
  sublabel = '',
  size = 'md',
  animate = true,
  className,
}) {
  const dims = {
    sm:  { wrap: [72, 116],  neck: [28, 14],  body: [62,  96],  textSize: '5px',  subSize: '4px', shine: [8, 60],  radius: 10 },
    md:  { wrap: [130, 210], neck: [52, 24],  body: [110, 170], textSize: '9px',  subSize: '7px', shine: [10, 90], radius: 14 },
    lg:  { wrap: [200, 360], neck: [78, 38],  body: [170, 314], textSize: '10px', subSize: '8px', shine: [12, 120], radius: 20 },
    xl:  { wrap: [230, 400], neck: [88, 42],  body: [200, 348], textSize: '11px', subSize: '8px', shine: [14, 130], radius: 22 },
  }
  const d = dims[size] || dims.md

  return (
    <div
      className={cn('relative', animate && 'animate-float', className)}
      style={{ width: d.wrap[0], height: d.wrap[1] }}
    >
      {/* Glow orb behind bottle */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none animate-glow-pulse"
        style={{
          width: d.wrap[0] * 1.4,
          height: d.wrap[0] * 1.4,
          borderRadius: '50%',
          background: `radial-gradient(circle, ${glowColor} 0%, transparent 70%)`,
          filter: 'blur(12px)',
          bottom: '-10%',
        }}
      />

      {/* Neck */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 rounded-t-xl rounded-b-sm border border-white/20"
        style={{
          width: d.neck[0],
          height: d.neck[1],
          background: 'linear-gradient(180deg, #3a4460 0%, #1c2236 100%)',
        }}
      />

      {/* Body */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 border border-white/20 flex items-center justify-center overflow-hidden"
        style={{
          width: d.body[0],
          height: d.body[1],
          borderRadius: d.radius,
          background: gradient,
          boxShadow: `inset 0 0 60px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.15), 0 20px 60px rgba(0,0,0,0.55), 0 0 80px ${glowColor}`,
        }}
      >
        {/* Accent line */}
        <div
          className="absolute top-0 left-0 right-0 h-px opacity-30"
          style={{ background: `linear-gradient(90deg, transparent, ${accentColor}, transparent)` }}
        />

        {/* Label text */}
        <div className="text-center select-none z-10 relative px-2">
          <p
            className="font-serif uppercase tracking-[0.3em] text-white/80"
            style={{ fontSize: d.textSize }}
          >
            {label}
          </p>
          <div
            className="mx-auto my-1.5 opacity-50"
            style={{ width: d.wrap[0] * 0.25, height: 1, background: accentColor }}
          />
          {sublabel && (
            <p
              className="uppercase tracking-[0.2em] text-white/50"
              style={{ fontSize: d.subSize }}
            >
              {sublabel}
            </p>
          )}
        </div>

        {/* Inner shine streak */}
        <div
          className="absolute rounded-full opacity-30 pointer-events-none"
          style={{
            top: '8%',
            left: '14%',
            width: d.shine[0],
            height: d.shine[1],
            background: 'linear-gradient(180deg, rgba(255,255,255,0.9) 0%, transparent 100%)',
            filter: 'blur(2px)',
          }}
        />
        {/* Second subtle shine */}
        <div
          className="absolute rounded-full opacity-10 pointer-events-none"
          style={{
            top: '20%',
            right: '18%',
            width: d.shine[0] * 0.5,
            height: d.shine[1] * 0.6,
            background: 'linear-gradient(180deg, rgba(255,255,255,0.6) 0%, transparent 100%)',
            filter: 'blur(4px)',
          }}
        />
      </div>
    </div>
  )
}
