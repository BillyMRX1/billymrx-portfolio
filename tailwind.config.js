/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#00ffff",
        "text-primary": "#e5e5e5",
        "text-secondary": "#b3b3b3",
      },
      boxShadow: {
        neon: "0 0 12px #00ffff88",
      },
    },
  },
  plugins: [],
  corePlugins: {
    preflight: true,
  },
};
