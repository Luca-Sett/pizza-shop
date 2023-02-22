/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    screens: {
      sm: "425px",
      md: "768px",
      lg: "1024px",
      xl: "1440px",
    },
    extend: {
      boxShadow: {
        "button-sm": "0 0 18px 1px",
        "button-lg": "0 0 18px 4px",
      },
    },
  },
  plugins: [],
};
