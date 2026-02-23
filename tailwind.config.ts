import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        popRed: "#b92526",
        popYellow: "#f0df5a",
        popBlack: "#000000",
        popWhite: "#ffffff",
      },
      boxShadow: {
        pop: "4px 4px 0px #000000",
        "pop-hover": "6px 6px 0px #000000",
        "pop-active": "0px 0px 0px #000000",
      },
      fontFamily: {
        bangers: ["var(--font-bangers)"],
        nunito: ["var(--font-nunito)"],
      },
    },
  },
  plugins: [],
} satisfies Config;
