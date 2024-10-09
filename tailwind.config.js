module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'], 
        "space-grotesk": ['"Space Grotesk"', 'sans-serif'],
        sans: ['"Helvetica Neue"', 'Arial', 'sans-serif'],
      },
        animation: {
          shimmer: "shimmer 2s linear infinite",
        },
        keyframes: {
          shimmer: {
            from: {
              backgroundPosition: "0 0",
            },
            to: {
              backgroundPosition: "-200% 0",
            },
          },
        },
    },
  },
  plugins: [],
}