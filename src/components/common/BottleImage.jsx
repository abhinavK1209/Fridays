import { useState } from 'react'
import BottleIllustration from './BottleIllustration'

/**
 * BottleImage — shows the real product photo when `image` prop is provided,
 * falls back to the SVG BottleIllustration if no image or image fails to load.
 *
 * Props:
 *   image        — path to the photo (e.g. '/images/aelia.jpg')
 *   alt          — alt text (defaults to the product name)
 *   size         — 'sm' | 'md' | 'lg' | 'xl'  (used by fallback SVG too)
 *   gradient     — passed to fallback BottleIllustration
 *   glowColor    — passed to fallback BottleIllustration
 *   accentColor  — passed to fallback BottleIllustration
 *   label        — passed to fallback BottleIllustration
 *   sublabel     — passed to fallback BottleIllustration
 *   className    — extra CSS classes on the <img>
 *   style        — extra inline styles on the <img>
 */

const SIZE_H = { sm: 180, md: 300, lg: 420, xl: 540 }

export default function BottleImage({
  image,
  alt = 'Friday\'s fragrance bottle',
  size = 'md',
  gradient,
  glowColor,
  accentColor,
  label,
  sublabel,
  className = '',
  style = {},
}) {
  const [failed, setFailed] = useState(false)

  if (!image || failed) {
    return (
      <BottleIllustration
        gradient={gradient}
        glowColor={glowColor}
        accentColor={accentColor}
        label={label}
        sublabel={sublabel}
        size={size}
      />
    )
  }

  const h = SIZE_H[size] ?? SIZE_H.md

  return (
    <img
      src={image}
      alt={alt}
      onError={() => setFailed(true)}
      className={className}
      style={{
        height:     h,
        width:      'auto',
        objectFit:  'contain',
        display:    'block',
        // Remove white/grey background — only applies to images with transparency
        // For JPGs with white backgrounds we use mix-blend-mode to blend them nicely
        mixBlendMode: 'normal',
        ...style,
      }}
    />
  )
}
