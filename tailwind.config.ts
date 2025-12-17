import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#D4AF37",
          light: "#E5C866",
          dark: "#B8941F",
        },
        background: {
          DEFAULT: "#F5F1E8",
          light: "#FAF8F3",
        },
        text: {
          DEFAULT: "#2C2C2C",
          secondary: "#666666",
          muted: "#999999",
        },
        border: {
          DEFAULT: "#D3CFC4",
          light: "#E8E5DD",
        },
      },
      fontFamily: {
        sans: ["Anuphan", "Poppins", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;

