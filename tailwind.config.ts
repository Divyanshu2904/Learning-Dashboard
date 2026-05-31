import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)"],
        body: ["var(--font-body)"],
        mono: ["var(--font-mono)"],
      },
      colors: {
        bg: {
          DEFAULT: "#080C14",
          secondary: "#0D1220",
          tertiary: "#111827",
          card: "#0F1520",
          hover: "#141C2E",
        },
        accent: {
          cyan: "#00D4FF",
          blue: "#3B82F6",
          purple: "#A855F7",
          green: "#10B981",
          orange: "#F97316",
          pink: "#EC4899",
        },
        border: {
          DEFAULT: "#1E2D45",
          glow: "#00D4FF33",
        },
        text: {
          primary: "#E8F4FD",
          secondary: "#8BA4C0",
          muted: "#4A6785",
        },
      },
      backgroundImage: {
        "glow-cyan": "radial-gradient(ellipse at center, #00D4FF22 0%, transparent 70%)",
        "glow-blue": "radial-gradient(ellipse at center, #3B82F622 0%, transparent 70%)",
        "glow-purple": "radial-gradient(ellipse at center, #A855F722 0%, transparent 70%)",
        "mesh-1": "radial-gradient(at 40% 20%, #00D4FF0D 0px, transparent 50%), radial-gradient(at 80% 0%, #3B82F60D 0px, transparent 50%), radial-gradient(at 0% 50%, #A855F70D 0px, transparent 50%)",
        "mesh-2": "radial-gradient(at 80% 50%, #10B9810D 0px, transparent 50%), radial-gradient(at 0% 100%, #F973160D 0px, transparent 50%)",
        "mesh-3": "radial-gradient(at 50% 0%, #EC48990D 0px, transparent 50%), radial-gradient(at 100% 100%, #00D4FF0D 0px, transparent 50%)",
      },
      boxShadow: {
        "glow-cyan": "0 0 20px #00D4FF33, 0 0 60px #00D4FF11",
        "glow-blue": "0 0 20px #3B82F633, 0 0 60px #3B82F611",
        "glow-purple": "0 0 20px #A855F733, 0 0 60px #A855F711",
        "card": "0 4px 24px rgba(0,0,0,0.4), 0 1px 0 rgba(255,255,255,0.04) inset",
        "card-hover": "0 8px 40px rgba(0,0,0,0.5), 0 1px 0 rgba(255,255,255,0.06) inset",
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "shimmer": "shimmer 2s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
    },
  },
  plugins: [],
};
export default config;
