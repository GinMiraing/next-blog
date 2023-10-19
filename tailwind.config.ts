import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      textColor: {
        pink: "#ff6b81",
      },
      colors: {
        pink: "#ff6b81",
      },
    },
  },
  plugins: [],
};
export default config;
