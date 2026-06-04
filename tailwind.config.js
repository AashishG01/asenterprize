/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        marble: {
          light: '#f9f9f9',
          DEFAULT: '#e6e6e6',
          dark: '#b3b3b3'
        },
        gold: {
          light: '#f5d799',
          DEFAULT: '#d4af37',
          dark: '#aa8c2c'
        },
        charcoal: {
          DEFAULT: '#222222',
          light: '#333333'
        },
        beige: {
          DEFAULT: '#f5f5dc',
          dark: '#e3e3c7'
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif']
      }
    },
  },
  plugins: [],
}
