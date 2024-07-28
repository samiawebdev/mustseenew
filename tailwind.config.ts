import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";
import daisyui from "daisyui"

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-geist-sans)", ...fontFamily.sans],
      },
    },
  },
  // darkMode: "class",
  plugins: [daisyui],
} satisfies Config;
