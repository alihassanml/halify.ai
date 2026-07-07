/** @type {import('tailwindcss').Config} */
export default {
  darkMode: false,
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#0B0E14',
        'ink-soft': '#4B5468',
        'ink-faint': '#8A93A6',
        paper: '#FFFFFF',
        'paper-alt': '#F6F7FB',
        'paper-alt-2': '#EEF0F8',
        line: '#E6E8F0',
        'line-soft': '#EEF0F6',
        primary: '#2454FF',
        'primary-dark': '#173BBF',
        'primary-soft': '#EAF0FF',
        violet: '#7C3AED',
        'violet-soft': '#F3EBFE',
        amber: '#F59E0B',
        'amber-soft': '#FEF3E2',
        success: '#16A34A',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Inter', 'system-ui', 'sans-serif'],
      },
      maxWidth: {
        container: '1280px',
      },
      boxShadow: {
        card: '0 1px 2px rgba(11,14,20,0.04), 0 8px 24px -8px rgba(11,14,20,0.08)',
        'card-hover': '0 4px 12px rgba(11,14,20,0.06), 0 24px 48px -16px rgba(36,84,255,0.18)',
        nav: '0 1px 0 rgba(11,14,20,0.06), 0 8px 24px -12px rgba(11,14,20,0.08)',
      },
    },
  },
  plugins: [],
};
