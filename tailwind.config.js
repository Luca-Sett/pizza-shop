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
    colors: {
      "off-white": "#F1F2F3",
      white: "#FFFFFF",
      dark: "#181818",
      black: "#000000",
      "red-fg": "#F76E6E",
      "red-bg": "#F9D2D2",
      red: "#E04646",
      "green-fg": "#77CC66",
      "green-bg": "#DBF3D6",
    },
    fontFamily: {
      header: "var(--font-header)",
    },
  },
  plugins: [],
};
