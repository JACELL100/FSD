/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        boldonse: ["Boldonse", "sans-serif"],
        lilita: ["Lilita One", "cursive"],
        orbitron: ["Orbitron", "sans-serif"],
        smooch: ["Smooch Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
}