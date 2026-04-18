/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./lib/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: "#2563EB",    // blue-600 — main brand color
        success: "#16A34A",    // green-600
        danger: "#DC2626",     // red-600
        warning: "#D97706",    // amber-600
        surface: "#F8FAFC",    // off-white background
      },
    },
  },
  plugins: [],
};