/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      rotate: {
        'y-180': 'rotateY(180deg)',
      },
      ringColor: {
        'theme-color-navy-blue': '#001f3f', // Custom navy blue ring color
      },
      colors: {
        logoColor: '#FF6600',
        richblue: {
          900: '#003366',
        },
        danger: '#F44336',
      },
      animation: {
        blink: 'blink 2s infinite ease-in-out',
        drawLine1: 'drawLine 4s linear infinite',
        drawLine2: 'drawLine 4s linear infinite 0.5s',
        drawLine3: 'drawLine 4s linear infinite 1s',
        drawLine4: 'drawLine 4s linear infinite 1.5s',
        drawLine5: 'drawLine 4s linear infinite 2s',
        drawLine6: 'drawLine 4s linear infinite 2.5s',
      },
      keyframes: {
        blink: {
          '0%, 20%': { opacity: '0.7' },
          '50%': { opacity: '1' },
          '100%': { opacity: '0.9' },
        },
        drawLine: {
          '0%': { stroke: 'transparent', opacity: '0' },
          '50%': { stroke: '#003366', opacity: '1' },
          '100%': { stroke: 'transparent', opacity: '0' },
        },
      },
    },
  },
  plugins: [],
};
