import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        brand: {
          50: "#eef2ff",
          100: "#e0e7ff",
          500: "#6366f1",
          600: "#4f46e5",
          700: "#4338ca",
          900: "#312e81",
        },
        jp: {
          rose: "#ff4d6d",
          crimson: "#c9184a",
          gold: "#ffb703",
        },
        kr: {
          emerald: "#10b981",
          teal: "#06b6d4",
          blue: "#3b82f6",
        },
        dark: {
          bg: "#0b0f19",
          card: "#111827",
          border: "#1f2937",
          hover: "#1f293d",
        }
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        jp: ["'Noto Sans JP'", "sans-serif"],
        kr: ["'Noto Sans KR'", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 25px -5px rgba(99, 102, 241, 0.3)",
        'glow-jp': "0 0 25px -5px rgba(255, 77, 109, 0.4)",
        'glow-kr': "0 0 25px -5px rgba(16, 185, 129, 0.4)",
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-6px)' },
        }
      }
    },
  },
  plugins: [],
};
export default config;
