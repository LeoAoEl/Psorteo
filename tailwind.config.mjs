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
        primary: "#FF7F11",
        secondary: "#FFC300",
        fondo: "#1E1E1E",
        aFondo: "#292524",
      },
    },
  },
  plugins: [nextui(), require("@tailwindcss/typography")],
};
