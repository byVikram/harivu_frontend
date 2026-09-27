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
        brand: {
          50: "#F0FDF4",
          100: "#DCFCE7", // Light Green
          200: "#BBF7D0",
          300: "#86EFAC",
          400: "#4ADE80",
          500: "#22C55E",
          600: "#16A34A",
          700: "#15803D",
          800: "#166534",
          900: "#14532D", // Primary Brand Green
          950: "#0B3B24", // Dark Green
        },
        natural: {
          cream: "#F8F7F0",
          warmWhite: "#FFFEFA",
          text: "#17201A",
          muted: "#66736A",
          border: "#DDE5DE",
          surface: "#F3F5F1",
          earth: "#856046",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "-apple-system", "sans-serif"],
        serif: ["var(--font-serif)", "Georgia", "serif"],
      },
      boxShadow: {
        subtle: "0 1px 2px 0 rgba(20, 83, 45, 0.05)",
        card: "0 4px 20px -2px rgba(20, 83, 45, 0.06), 0 2px 6px -1px rgba(20, 83, 45, 0.03)",
        elevated: "0 12px 32px -4px rgba(20, 83, 45, 0.12), 0 4px 12px -2px rgba(20, 83, 45, 0.06)",
      },
      borderRadius: {
        "2xl": "1rem",
        "3xl": "1.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
