/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'pookie-indigo': '#1a1a3e',
        'pookie-pink': '#ffb3ba',
        'pookie-gold': '#ffd700',
        'pookie-peach': '#ffdab9',
        'pookie-lavender': '#e6e6fa',
        'pookie-cream': '#fff8dc',
        'pookie-mint': '#98ff98',
        'pookie-rose': '#ffb6c1',
        'pookie-sky': '#87ceeb',
        'pookie-storm': '#708090',
        'pookie-streetlight': '#ffa500'
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'twinkle': 'twinkle 3s ease-in-out infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'fall-petal': 'fall-petal 8s linear infinite',
        'rain-fall': 'rain-fall 2s linear infinite',
        'rainbow-draw': 'rainbow-draw 3s ease-out forwards'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' }
        },
        'pulse-glow': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(255, 215, 0, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(255, 215, 0, 0.8)' }
        },
        twinkle: {
          '0%, 100%': { opacity: '0.3' },
          '50%': { opacity: '1' }
        },
        sway: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' }
        },
        breathe: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' }
        },
        'fall-petal': {
          '0%': { transform: 'translateY(-100vh) rotate(0deg)', opacity: '0' },
          '10%': { opacity: '1' },
          '90%': { opacity: '1' },
          '100%': { transform: 'translateY(100vh) rotate(360deg)', opacity: '0' }
        },
        'rain-fall': {
          '0%': { transform: 'translateY(-100px)' },
          '100%': { transform: 'translateY(calc(100vh + 100px))' }
        },
        'rainbow-draw': {
          '0%': { clipPath: 'inset(0 100% 0 0)' },
          '100%': { clipPath: 'inset(0 0 0 0)' }
        }
      },
      fontFamily: {
        'handwritten': ['Brush Script MT', 'cursive'],
        'elegant': ['Georgia', 'serif']
      }
    },
  },
  plugins: [],
}
