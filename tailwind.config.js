/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neon: "#00ffff",
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
