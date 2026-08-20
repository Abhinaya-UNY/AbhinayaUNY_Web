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
          cyan: '#00F5D4',
          blue: '#2563EB',
          indigo: '#4F46E5',
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
