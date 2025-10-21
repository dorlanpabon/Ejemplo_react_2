/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: '#1e3a8a', // blue-800
          light: '#3b82f6',   // blue-500
          dark: '#0b2256',    // custom deep navy
        },
      },
    },
  },
  plugins: [],
}

