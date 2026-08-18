/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    container: {
      center: true,
      padding: { DEFAULT: '1.25rem', lg: '2rem' },
      screens: { '2xl': '1280px' },
    },
    extend: {
      colors: {
        ink: {
          950: '#04060B',
          900: '#070A12',
          850: '#0A0E18',
          800: '#0E1320',
          700: '#151B2B',
          600: '#1E2637',
        },
        electric: {
          50: '#EAF4FF',
          200: '#9CCBFF',
          300: '#6BB2FF',
          400: '#3D97FF',
          500: '#0A84FF',
          600: '#0066D6',
          700: '#0050A8',
        },
        gold: {
          200: '#F4E2A8',
          300: '#EBCF80',
          400: '#DFB94F',
          500: '#D4AF37',
          600: '#B08D22',
        },
        steel: {
          200: '#D6DBE4',
          300: '#B4BCCB',
          400: '#8A94A6',
          500: '#657084',
          600: '#48525F',
        },
      },
      fontFamily: {
        display: ['Sora', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(10,132,255,.25), 0 18px 60px -18px rgba(10,132,255,.55)',
        'glow-gold': '0 0 0 1px rgba(212,175,55,.3), 0 18px 60px -20px rgba(212,175,55,.45)',
        card: '0 24px 60px -28px rgba(0,0,0,.9)',
      },
      backgroundImage: {
        'grid-tech':
          'linear-gradient(rgba(255,255,255,.035) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.035) 1px, transparent 1px)',
      },
      keyframes: {
        'fade-up': { '0%': { opacity: 0, transform: 'translateY(24px)' }, '100%': { opacity: 1, transform: 'none' } },
        'fade-in': { '0%': { opacity: 0 }, '100%': { opacity: 1 } },
        'scan': { '0%': { transform: 'translateY(-110%)' }, '100%': { transform: 'translateY(410%)' } },
        'float-soft': { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-10px)' } },
        'sheen': { '0%': { transform: 'translateX(-120%)' }, '100%': { transform: 'translateX(220%)' } },
        'pulse-ring': { '0%': { transform: 'scale(.9)', opacity: .7 }, '70%': { transform: 'scale(1.5)', opacity: 0 }, '100%': { opacity: 0 } },
      },
      animation: {
        'fade-up': 'fade-up .7s cubic-bezier(.16,1,.3,1) both',
        'fade-in': 'fade-in .8s ease both',
        scan: 'scan 3.6s ease-in-out infinite',
        'float-soft': 'float-soft 7s ease-in-out infinite',
        sheen: 'sheen 2.4s ease-in-out infinite',
        'pulse-ring': 'pulse-ring 2.4s ease-out infinite',
      },
    },
  },
  plugins: [],
}
