/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#FF6B00',
          amber: '#F97316',
          darkOrange: '#EA580C',
          lightOrange: '#FB923C',
          gold: '#F59E0B',
          dark: '#070B12',
          card: '#0D1322',
          border: '#1E293B',
        },
      },
    },
  },
  plugins: [],
};
