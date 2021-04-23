module.exports = {
  purge: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontFamily: {},
    colors: {
      "gold-100": "#C1B55E",
      "gold-200": "#CFC47F",
      "gold-300": "#DBD09E",
      "gold-400": "#EAE1BD",
      "gold-500": "#F5EFDD",
      "blue-100": "#15284B",
      "blue-200": "#414D6E",
      "blue-300": "#6F7690",
      "blue-400": "#9CA0B3",
      "blue-500": "#CECFD9",
      "dark-100": "#111111",
      "dark-200": "#333333",
      "dark-300": "#666666",
      "dark-400": "#AAAAAA",
      "dark-500": "#CCCCCC",
      white: "#FFFFFF",
      black: "#000000",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [
    require("@tailwindcss/forms"),
    // require("@tailwindcss/aspect-ratio"),
    // require("@tailwindcss/typography"),
    // require("tailwindcss-children"),
  ],
};
