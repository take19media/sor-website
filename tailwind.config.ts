import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        cream: "#FAF8F5",
        ink: "#1A1A1A",
        slate: "#5C6B7A",
        rule: "#E6E2DA",
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
