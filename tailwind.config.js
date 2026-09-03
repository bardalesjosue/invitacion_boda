/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        wedding: {
          gold: '#D4AF37',
          goldSatin: '#C5A059',
          cream: '#FAF6F0',
          dark: '#121212',
          darkGray: '#1e1e1e',
          burgundy: '#4A2E2B',
          earth: '#7D5A50',
        },
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Cinzel', 'serif'],
        sans: ['Montserrat', 'Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
