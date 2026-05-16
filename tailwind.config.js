/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          '"SF Pro Display"',
          '"Inter"',
          "system-ui",
          "sans-serif",
        ],
        mono: ['ui-monospace', '"SF Mono"', "Menlo", "monospace"],
      },
      boxShadow: {
        card: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
        "card-hover": "0 10px 30px rgba(0,0,0,0.08)",
        "card-hover-dark": "0 12px 40px rgba(0,0,0,0.5)",
      },
      spacing: {
        "section-y": "120px",
        "section-y-md": "160px",
        "section-y-lg": "200px",
        gutter: "22px",
      },
      maxWidth: {
        apple: "980px",
        "apple-wide": "1280px",
      },
      transitionTimingFunction: {
        apple: "cubic-bezier(0.16, 1, 0.3, 1)",
        glide: "cubic-bezier(0.32, 0.72, 0, 1)",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
