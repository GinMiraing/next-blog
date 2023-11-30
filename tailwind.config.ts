import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        regular: "HarmonyOS_Regular",
        medium: "HarmonyOS_Medium",
      },
      textColor: {
        primary: "var(--primary-text)",
        pink: "var(--pink)",
      },
      colors: {
        pink: "var(--pink)",
      },
      backgroundColor: {
        background: "var(--background)",
        banner: "var(--banner)",
      },
    },
  },
  plugins: [require("tailwindcss-animated")],
};
export default config;
