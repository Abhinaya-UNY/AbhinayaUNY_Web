/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-plus-jakarta)', 'system-ui', 'sans-serif'],
        heading: ['var(--font-outfit)', 'sans-serif'],
        mono: ['ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      colors: {
        brand: {
          orange: '#10B981', // Backward-compatible alias mapping legacy orange classes to Refined Emerald
          amber: '#F59E0B',
          darkOrange: '#059669', // Emerald 600 hover
          lightOrange: '#34D399', // Emerald 400 text
          gold: '#F59E0B',
          dark: '#0B0B0E', // Deep Obsidian canvas
          card: '#121216', // Primary Card surface
          cardElevated: '#18181B', // Secondary Card surface
          border: '#27272A', // Delicate border
          obsidian: '#0B0B0E',
          emerald: '#10B981',
        },
        obsidian: {
          DEFAULT: '#0B0B0E',
          canvas: '#0B0B0E',
          card: '#121216',
          elevated: '#18181B',
          subtle: '#15151A',
          border: '#27272A',
        },
        emerald: {
          50: '#ecfdf5',
          100: '#d1fae5',
          200: '#a7f3d0',
          300: '#6ee7b7',
          400: '#34D399',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
          glow: 'rgba(16, 185, 129, 0.12)',
        },
      },
      boxShadow: {
        'emerald-glow': '0 0 25px -5px rgba(16, 185, 129, 0.25), 0 0 10px -6px rgba(16, 185, 129, 0.2)',
        'emerald-glow-sm': '0 0 15px -3px rgba(16, 185, 129, 0.18)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in-up': 'fadeInUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-glow': 'pulseGlow 2.5s infinite ease-in-out',
        'shimmer': 'shimmer 2s infinite linear',
        'float': 'float 4s ease-in-out infinite',
        'aurora-drift-1': 'auroraDrift1 16s ease-in-out infinite',
        'aurora-drift-2': 'auroraDrift2 20s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeInUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(1)' },
          '50%': { opacity: '0.8', transform: 'scale(1.05)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        },
        auroraDrift1: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(40px, 20px) scale(1.08)' },
        },
        auroraDrift2: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1.05)' },
          '50%': { transform: 'translate(-30px, 25px) scale(0.95)' },
        },
      },
    },
  },
  plugins: [],
};
