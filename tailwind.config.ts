import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F9F9F9",
        light: "#EBCBAE",
        dark: "#8F8787",
        accent: "#A6E4E7",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
