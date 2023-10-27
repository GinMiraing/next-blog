import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        pink: "var(--pink)",
      },
      colors: {
        pink: "var(--pink)",
      },
    },
  },
  plugins: [],
};
export default config;
