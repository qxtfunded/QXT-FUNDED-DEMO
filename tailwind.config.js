/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07070A',
          900: '#0C0C10',
          800: '#131318',
          700: '#1A1A21',
          600: '#24242D',
          500: '#33333F',
        },
        paper: {
          50: '#F8F7F4',
          100: '#EEEDE8',
          300: '#C7C5BD',
          400: '#8E8C85',
          500: '#65635E',
        },
        gold: {
          200: '#F3E4B8',
          300: '#EAD394',
          400: '#DDBB6C',
          500: '#C9A24B',
          600: '#A9832F',
          700: '#836327',
        },
        mint: {
          400: '#4FDBA0',
          500: '#2FBE87',
          600: '#1F9C6D',
        },
        signal: {
          success: '#2FBE87',
          warning: '#E3A23D',
          error: '#E2635E',
        },
      },
      fontFamily: {
        display: ['"Space Grotesk"', 'sans-serif'],
        body: ['"Inter"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      backgroundImage: {
        'grid-fade':
          'linear-gradient(to bottom, rgba(201,162,75,0.08) 1px, transparent 1px), linear-gradient(to right, rgba(201,162,75,0.08) 1px, transparent 1px)',
        'radial-glow':
          'radial-gradient(60% 50% at 50% 0%, rgba(201,162,75,0.16) 0%, rgba(7,7,10,0) 70%)',
        'gold-line': 'linear-gradient(90deg, transparent, #C9A24B, transparent)',
      },
      backgroundSize: {
        grid: '48px 48px',
      },
      boxShadow: {
        gold: '0 0 0 1px rgba(201,162,75,0.25), 0 8px 30px -8px rgba(201,162,75,0.25)',
        card: '0 1px 0 0 rgba(255,255,255,0.04) inset, 0 20px 40px -20px rgba(0,0,0,0.6)',
        'gold-lg': '0 20px 60px -15px rgba(201,162,75,0.35)',
      },
      keyframes: {
        ticker: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        drawline: {
          '0%': { strokeDashoffset: 1000 },
          '100%': { strokeDashoffset: 0 },
        },
        pulseGlow: {
          '0%, 100%': { opacity: 0.5 },
          '50%': { opacity: 1 },
        },
        floatSlow: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        ticker: 'ticker 40s linear infinite',
        drawline: 'drawline 2.4s ease-out forwards',
        pulseGlow: 'pulseGlow 2.5s ease-in-out infinite',
        floatSlow: 'floatSlow 6s ease-in-out infinite',
      },
      borderRadius: {
        xl2: '1.25rem',
      },
    },
  },
  plugins: [],
}
