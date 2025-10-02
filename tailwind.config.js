/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./shared/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand': '#f6821f',
        'accent': '#ff3d00',
        'bg-1': 'var(--color-bg-1)',
        'bg-2': 'var(--color-bg-2)', 
        'bg-3': 'var(--color-bg-3)',
        'bg-4': 'var(--color-bg-4)',
        'border-primary': 'var(--color-border-primary)',
        'border-secondary': 'var(--color-border-secondary)', 
        'border-tertiary': 'var(--color-border-tertiary)',
        'text-primary': 'var(--color-text-primary)',
        'text-secondary': 'var(--color-text-secondary)',
        'text-tertiary': 'var(--color-text-tertiary)',
        'text-inverted': 'var(--color-text-inverted)',
        'brand-heavy': 'var(--color-brand-heavy)',
        'brand-primary': 'var(--color-brand-primary)',
        'brand-subtle': 'var(--color-brand-subtle)',
      },
      fontFamily: {
        'departure': ['departureMono', 'monospace'],
      },
      borderRadius: {
        'sm': 'var(--radius-sm)',
        'md': 'var(--radius-md)', 
        'lg': 'var(--radius-lg)',
        'xl': 'var(--radius-xl)',
      },
      boxShadow: {
        'textarea': 'var(--shadow-textarea)',
        'dialog': 'var(--shadow-dialog)',
        'elevation': 'var(--shadow-elevation)',
        'soft-layered': 'var(--shadow-soft-layered)',
      },
      animation: {
        'chat-edge-throb': 'chat-edge-throb 1.6s ease-in-out infinite',
        'typing-dot': 'var(--animate-typing-dot)',
        'shake': 'var(--animate-shake)',
      },
    },
  },
  darkMode: 'class',
  plugins: [
    require('@tailwindcss/typography'),
  ],
};