/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      colors: {
        primary: '#191817', // Warm Black
        secondary: '#EFEDE8', // Alabaster
        accent: '#B0987A', // Antique Gold
        white: '#FFFFFF',
        surface: '#E4E1DB',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.19, 1, 0.22, 1)',
        'slow': 'cubic-bezier(0.77, 0, 0.175, 1)',
      },
      letterSpacing: {
        widest: '0.2em',
      }
    },
  },
  plugins: [],
}