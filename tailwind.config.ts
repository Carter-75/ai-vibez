import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './shared/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      // Define spacing theme variables for Tailwind CSS v4
      spacing: {
        'xs': '0.5rem',
        'sm': '0.75rem', 
        'md': '1rem',
        'lg': '1.5rem',
        'xl': '2rem',
        '2xl': '3rem',
      },
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
        'sm': 'calc(var(--radius) - 4px)',
        'md': 'calc(var(--radius) - 2px)', 
        'lg': 'var(--radius)',
        'xl': 'calc(var(--radius) + 4px)',
      },
      boxShadow: {
        'textarea': 'var(--shadow-textarea)',
        'dialog': 'var(--shadow-dialog)',
        'elevation': 'var(--shadow-elevation)',
        'soft-layered': 'var(--shadow-soft-layered)',
      },
      animation: {
        'chat-edge-throb': 'chat-edge-throb 1.6s ease-in-out infinite',
        'typing-dot': 'typing-dot 1.2s ease-in-out infinite',
        'shake': 'shake 1s ease-in-out',
      },
      keyframes: {
        'chat-edge-throb': {
          '0%, 100%': {
            boxShadow: '0 0 0 0 rgba(246, 130, 31, 0.10), inset 0 0 0 1px rgba(246, 130, 31, 0.16)',
          },
          '50%': {
            boxShadow: '0 0 0 6px rgba(255, 61, 0, 0.08), inset 0 0 0 2px rgba(255, 61, 0, 0.22)',
          },
        },
      },
    },
  },
  darkMode: 'class',
  plugins: [],
};

export default config;