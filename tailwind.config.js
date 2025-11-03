/** @type {import('tailwindcss').Config} */
import defaultTheme from 'tailwindcss/defaultTheme';

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'black': '#000000',
        'white': '#FFFFFF',
        'background': '#1C1C1C',
        'primary': '#D8D2C9',
        'anthracite': '#373737', // Gris Anthracite
        'sand': '#D8D2C9', // Beige Sable
      },
      fontFamily: {
        sans: ['Inter', ...defaultTheme.fontFamily.sans],
        mono: ['"Courier New"', ...defaultTheme.fontFamily.mono], // Proxy for GT America Mono
      },
      spacing: {
        '8': '8px',
        '16': '16px',
        '24': '24px',
        '32': '32px',
        '40': '40px',
        '48': '48px',
        '56': '56px',
        '64': '64px',
        '72': '72px',
        '80': '80px',
        '96': '96px',
        '128': '128px',
      },
      fontSize: {
        'xs': '0.75rem',
        'sm': '0.875rem',
        'base': '1rem',
        'lg': '1.125rem',
        'xl': '1.25rem',
        '2xl': '1.5rem',
        '3xl': '1.875rem',
        '4xl': '2.25rem',
        '5xl': '3rem',
        '6xl': '4rem',
      },
      fontWeight: {
        light: '300',
        normal: '400',
        bold: '700',
      },
      transitionDuration: {
        '800': '800ms',
      }
    },
  },
  plugins: [],
}
