/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#f97015",
        "background-light": "#f8f7f5",
        "background-dark": "#23170f",
        
      },
      fontFamily: {
        display: ["Work Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
