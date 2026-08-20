/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        carbon: {
          950: '#050811',
          900: '#0B111B',
          850: '#0F172A',
          800: '#121A2A',
          700: '#1E293B',
          600: '#334155',
          border: '#1E293B',
        },
        brand: {
          cyan: '#00F5D4',
          neon: '#00F5D4',
          emerald: '#10B981',
          darkEmerald: '#059669',
          blue: '#2563EB',
          sky: '#38BDF8',
          indigo: '#4F46E5',
          gold: '#F59E0B',
          dark: '#050811',
          card: '#0B111B',
          panel: '#0F172A',
          border: '#1E293B',
        },
      },
      fontFamily: {
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
    },
  },
  plugins: [],
};
