/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./client/src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        peach: '#FFE5B4',
        yellow: '#FFF7AE',
        lavender: '#EBD8FF',
        cream: '#FDF6E3',
        fridgeText: '#2D2D2D',
      },
      // Extend screens instead of replacing them
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}
