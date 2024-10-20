/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        Galada: ["Galada", 'cursive'],  // Add your custom font here
      },
    },
  },
  plugins: [],
}

