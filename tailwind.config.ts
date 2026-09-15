import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          blue: "#466cb4",
          blueDark: "#35538f",
          blueLight: "#c4d5f5",
          green: "#56c2b5",
          orange: "#e0954f",
          purple: "#7a6fd0",
          pink: "#d1638a",
          cyan: "#4fa8d8",
          bg: "#f4f4f5",
        },
      },
    },
  },
  plugins: [],
};

export default config;
