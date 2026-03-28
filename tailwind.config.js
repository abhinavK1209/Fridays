/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Cormorant Garamond', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg:          '#090b0f',
        'bg-elevated':'#11141d',
        cream:       '#f5f0e8',
        amber: {
          DEFAULT:   '#df9550',
          glow:      'rgba(223,149,80,0.35)',
        },
        electric: {
          DEFAULT:   '#5a8bff',
          glow:      'rgba(90,139,255,0.35)',
        },
        silver:  '#c7cbd6',
        muted:   '#a7aab4',
      },
      animation: {
        'float':       'float 6s ease-in-out infinite',
        'glow-pulse':  'glowpulse 3s ease-in-out infinite',
        'fade-up':     'fadeup 0.9s cubic-bezier(0.16,1,0.3,1) forwards',
        'marquee':     'marqueeScroll 35s linear infinite',
        'marquee-rev': 'marqueeScroll 35s linear infinite reverse',
        'scroll-line': 'scrollLine 2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%':       { transform: 'translateY(-18px)' },
        },
        glowpulse: {
          '0%, 100%': { opacity: '0.45' },
          '50%':       { opacity: '0.9' },
        },
        fadeup: {
          from: { opacity: '0', transform: 'translateY(28px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        marqueeScroll: {
          from: { transform: 'translateX(0)' },
          to:   { transform: 'translateX(-33.333%)' },
        },
        scrollLine: {
          '0%, 100%': { opacity: '0.7', transform: 'scaleY(1)' },
          '50%':       { opacity: '0.2', transform: 'scaleY(0.4)' },
        },
      },
      transitionTimingFunction: {
        'out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
