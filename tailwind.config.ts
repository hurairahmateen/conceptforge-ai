import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
      colors: {
        arch: {
          charcoal: "#1A1A1A",
          slate: "#F8F9FA",
          accent: "#2563EB",
          cream: "#FCFBF8",
        },
      },
    },
  },
  plugins: [],
};
export default config;
