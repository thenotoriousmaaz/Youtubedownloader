/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#E50914",
      },
      container: {
        center: true,
        padding: "1rem",
        screens: { "2xl": "1200px" }
      }
    },
  },
  plugins: [],
}
