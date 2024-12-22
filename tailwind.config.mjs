/** @type {import('tailwindcss').Config} */
const { nextui } = require("@nextui-org/react");

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#ffbc04",
        secondary: "#309c34",
        fondo: "#303030",
        aFondo: "#282424",
      },
    },
  },
  plugins: [nextui(), require("@tailwindcss/typography")],
};
