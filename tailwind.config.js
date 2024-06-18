/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        DEFAULT: '8px',
        lg: '12px',
        xl: '16px',
        '2xl': '24px',
      },
      gradientColorStops: theme => ({
        ...theme('colors'),
        'glass-1': 'rgba(255, 255, 255, 0.05)',
        'glass-2': 'rgba(255, 255, 255, 0.10)',
        'glass-3': 'rgba(255, 255, 255, 0.15)',
        'glass-4': 'rgba(255, 255, 255, 0.20)',
        'glass-5': 'rgba(255, 255, 255, 0.25)',
        'glass-6': 'rgba(255, 255, 255, 0.30)',
        'glass-7': 'rgba(255, 255, 255, 0.35)',
        'glass-8': 'rgba(255, 255, 255, 0.40)',
        'glass-9': 'rgba(255, 255, 255, 0.45)',
        'glass-10': 'rgba(255, 255, 255, 0.50)',
      }),
      boxShadow: {
        'neumorphism': '10px 10px 20px #b3b3b3, -10px -10px 20px #ffffff',
      },
      animation: {
        'gradient-move': 'gradientMove 3s ease infinite',
      },
      keyframes: {
        gradientMove: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}