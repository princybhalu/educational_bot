/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
};
