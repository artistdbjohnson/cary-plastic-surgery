import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        paper: "var(--paper)",
        "paper-2": "var(--paper-2)",
        ink: "var(--ink)",
        brand: "var(--brand)",
        muted: "var(--muted)",
        line: "var(--line)",
        gold: "var(--gold)",
      },
      fontFamily: {
        sans: ["var(--font-mont)", "Montserrat", "sans-serif"],
        serif: ["var(--font-news)", "Newsreader", "serif"],
      },
      letterSpacing: {
        caps: "0.18em",
      },
    },
  },
  plugins: [],
};

export default config;
