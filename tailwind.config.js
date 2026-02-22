/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: {
        // Light theme
        "light-bg": "#ffffff",
        "light-bg-alt": "#f8fafc",
        "light-text": "#0f172a",
        "light-text-secondary": "#64748b",
        "light-accent": "#2563eb",
        "light-accent-light": "#eff6ff",
        "light-border": "#e2e8f0",
        // Dark theme
        "dark-bg": "#0a0a0a",
        "dark-bg-alt": "#111111",
        "dark-text": "#ededed",
        "dark-text-secondary": "#888888",
        "dark-accent": "#6366f1",
        "dark-border": "#222222",
      },
      fontFamily: {
        sans: ["Inter", "-apple-system", "BlinkMacSystemFont", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 10px 30px rgba(0,0,0,0.08)",
        "card-hover-dark": "0 12px 40px rgba(0,0,0,0.5)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
