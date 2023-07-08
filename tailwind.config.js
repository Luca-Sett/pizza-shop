/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.tsx", "./components/**/*.tsx"],
  theme: {
    screens: {
      md: "768px",
    },
    colors: {
      transparent: "transparent",
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
  plugins: [require("@tailwindcss/container-queries")],
};
