/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        blue: "#00b1fc",
        green: "#69ba00",  
      },
    },
  },
  plugins: [require("daisyui")],
}
