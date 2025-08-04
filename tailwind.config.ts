import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Your original brand colors with modern enhancements
        primary: {
          DEFAULT: '#0F0327',
          50: '#f4f3ff',
          100: '#ebe9fe',
          200: '#d9d6fe',
          300: '#bfb8fd',
          400: '#a390fa',
          500: '#8b70f7',
          600: '#7c55f3',
          700: '#6d3ee6',
          800: '#5b33c2',
          900: '#4c2a9f',
          950: '#0F0327'
        },
        secondary: {
          DEFAULT: '#990134',
          50: '#fef2f4',
          100: '#fde6ea',
          200: '#fbd0db',
          300: '#f7aabe',
          400: '#f17a9b',
          500: '#e84d7a',
          600: '#d12e5e',
          700: '#b01f4a',
          800: '#931d42',
          900: '#990134',
          950: '#4a0118'
        },
        background: {
          DEFAULT: '#FCC700',
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d',
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#FCC700'
        },
        // Surface colors for dark theme areas
        surface: '#1a1625',
        'surface-2': '#2a2435',
        border: '#3a3445',
        'text-primary': '#ffffff',
        'text-secondary': '#e2e2e2',
        'text-muted': '#a0a0a0'
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif']
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-up': 'slideUp 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.6s ease-out forwards',
        'slide-in-right': 'slideInRight 0.6s ease-out forwards',
        'scale-in': 'scaleIn 0.5s ease-out forwards',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'gradient': 'gradient 8s linear infinite'
      },
      backdropBlur: {
        xs: '2px',
      },
      boxShadow: {
        'glow': '0 0 20px rgba(153, 1, 52, 0.3)',
        'glow-lg': '0 0 40px rgba(153, 1, 52, 0.4)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 40px rgba(0, 0, 0, 0.2)'
      }
    }
  },
  plugins: [],
} satisfies Config;
