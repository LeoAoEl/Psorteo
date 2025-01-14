/** @type {import('tailwindcss').Config} */
const { nextui, colors } = require("@nextui-org/react");

export default {
  content: [
    "./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#FF9B2D",
        secondary: "#FFC85B",
        fondo: "#0D2B3E",
        aFondo: "#09202F",
        detalle: "#316A55",
      },
    },
  },
  plugins: [nextui(), require("@tailwindcss/typography")],
};
