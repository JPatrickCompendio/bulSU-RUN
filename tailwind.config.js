/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ember: '#943223',
        sand: '#cd8b55',
        ink: '#f4efe9',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(205, 139, 85, 0.25), 0 0 40px rgba(205, 139, 85, 0.16)',
        ember: '0 0 0 1px rgba(148, 50, 35, 0.25), 0 0 48px rgba(148, 50, 35, 0.22)',
      },
      backgroundImage: {
        'hero-mesh':
          'radial-gradient(900px 520px at 18% 12%, rgba(148, 50, 35, 0.35), transparent 55%), radial-gradient(900px 520px at 74% 18%, rgba(205, 139, 85, 0.22), transparent 60%)',
      },
      keyframes: {
        floaty: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-25%)' },
          '100%': { transform: 'translateX(25%)' },
        },
      },
      animation: {
        floaty: 'floaty 6s ease-in-out infinite',
        shimmer: 'shimmer 2.8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}

