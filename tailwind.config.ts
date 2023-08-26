import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: {
        "2xl": "1360px",
      },
    },
    extend: {
      colors: {
        background: "#2B3467",
        light: "#FCFFE7",
        dark: "#BAD7E9",
        accent: "#EB455F",
        success: "#C8E4B2",
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
export default config;
