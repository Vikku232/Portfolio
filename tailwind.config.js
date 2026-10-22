/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Space Grotesk"', 'Inter', 'sans-serif'],
        display: ['"Syne"', '"Outfit"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      colors: {
        bgLight: '#F5F5F7',
        bgDark: '#0D0E12',
        cardDark: '#14161D',
        accentGold: '#E5A93C',
        accentYellow: '#FFE600',
        accentRed: '#FF334B',
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      }
    },
  },
  plugins: [],
}
