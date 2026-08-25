import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#0B1F33",
          deep: "#081827",
          muted: "#1A3348",
        },
        forest: {
          DEFAULT: "#456333",
          dark: "#385428",
          mid: "#5C7A44",
          pale: "#E7EEDC",
          mist: "#F1F5E8",
        },
        cream: {
          DEFAULT: "#F6F3EC",
          soft: "#F3EFE6",
          bar: "#EBE3D4",
          dark: "#E4DAC8",
        },
        gold: {
          DEFAULT: "#C9A227",
          dark: "#A8871C",
        },
        ink: {
          DEFAULT: "#1C2430",
          muted: "#5C6570",
          light: "#7A838E",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      maxWidth: {
        content: "1400px",
      },
      boxShadow: {
        card: "0 8px 28px rgba(11, 31, 51, 0.06)",
        soft: "0 4px 18px rgba(11, 31, 51, 0.05)",
      },
    },
  },
  plugins: [],
};

export default config;
