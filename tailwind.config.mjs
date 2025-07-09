// tailwind.config.js
export default {
  content: [
    //this is my html contents
    "./client/dist/index.html",
    //this is all of my react elements
    "./client/src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
