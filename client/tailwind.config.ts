// tailwind.config.ts
import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        outfit: ["Outfit", "sans-serif"],
        serif: ["Instrument Serif", "serif"],
        mono: ["Geist Mono", "monospace"],
      },
    },
  },
  plugins: [],
} satisfies Config;
