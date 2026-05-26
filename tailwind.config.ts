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
        egra: {
          accent: "#b7373a",
          "accent-hover": "#9e2f32",
          dark: "#282828",
          muted: "#5c5c5c",
          light: "#d9d8d8",
          border: "#e0e0e0",
        },
      },
      fontFamily: {
        sans: ["var(--font-nunito-sans)", "Arial", "Helvetica", "sans-serif"],
        heading: ["var(--font-manrope)", "Arial", "Helvetica", "sans-serif"],
      },
      maxWidth: {
        page: "1400px",
      },
      borderRadius: {
        pill: "9999px",
      },
      lineHeight: {
        relaxed: "1.65",
        loose: "1.75",
      },
    },
  },
  plugins: [],
};

export default config;
