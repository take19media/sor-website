import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "rgb(var(--color-cream) / <alpha-value>)",
        ink: "rgb(var(--color-ink) / <alpha-value>)",
        slate: "rgb(var(--color-slate) / <alpha-value>)",
        rule: "rgb(var(--color-rule) / <alpha-value>)",
        whatsapp: "#25D366",
      },
      fontFamily: {
        serif: ["var(--font-serif)", "Cormorant Garamond", "serif"],
        sans: ["var(--font-sans)", "Inter", "system-ui", "sans-serif"],
      },
      maxWidth: {
        prose: "62ch",
      },
    },
  },
  plugins: [],
};
export default config;
