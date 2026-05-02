import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        bg:      '#000000',
        surface: '#0A0A0A',
        card:    '#111111',
        gold:    '#FACC15',
        text:    '#FFFFFF',
        muted:   '#6B7280',
      },
      fontFamily: {
        display: ['Inter', 'sans-serif'],
        body:    ['Inter', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200% center' },
          '100%': { backgroundPosition: '200% center' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        'yellow-pulse': {
          '0%, 100%': { boxShadow: '0 0 8px rgba(250,204,21,0.4), 0 0 20px rgba(250,204,21,0.2)' },
          '50%': { boxShadow: '0 0 20px rgba(250,204,21,0.7), 0 0 40px rgba(250,204,21,0.4)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'film-march': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scan: {
          '0%': { top: '-4px' },
          '100%': { top: '100%' },
        },
        flicker: {
          '0%, 95%, 100%': { opacity: '1' },
          '96%': { opacity: '0.85' },
          '97%': { opacity: '1' },
          '98%': { opacity: '0.9' },
          '99%': { opacity: '1' },
        },
      },
      animation: {
        shimmer:      'shimmer 2s linear infinite',
        float:        'float 3s ease-in-out infinite',
        'yellow-pulse': 'yellow-pulse 2s ease-in-out infinite',
        marquee:      'marquee 28s linear infinite',
        'film-march': 'film-march 18s linear infinite',
        scan:         'scan 2.5s linear infinite',
        flicker:      'flicker 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

export default config
