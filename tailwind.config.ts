import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        xxs: "0.625rem",
      },
      colors: {
        "color-primary": "rgb(var(--color-primary-rgb), <alpha-value>)",
        "color-secondary": "rgb(var(--color-secondary-rgb), <alpha-value>)",
        "color-alternative": "#eff1f3",
        "color-text-secondary": "rgba(148, 148, 148, <alpha-value>)",
      },
      borderRadius: {
        "sm": "2rem"
      }
    },
  },
  plugins: [],
};
export default config;
