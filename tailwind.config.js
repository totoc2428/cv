/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          bg: "#f0f0f0",
          text: "#333333",
        },
        shadow: {
          light: "#ffffff",
          dark: "#d1d1d1",
        },
        border: "#cccccc",
      },
      boxShadow: {
        neumorphic: "5px 5px 10px #d1d1d1, -5px -5px 10px #ffffff",
        "neumorphic-inset":
          "inset 3px 3px 6px #d1d1d1, inset -3px -3px 6px #ffffff",
        "neumorphic-small": "3px 3px 6px #d1d1d1, -3px -3px 6px #ffffff",
      },
      fontFamily: {
        sans: ["Arial", "sans-serif"],
      },
    },
  },
  plugins: [],
};
