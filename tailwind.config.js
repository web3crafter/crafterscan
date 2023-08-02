/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        "primary-light": {
          50: "#f9f6f8",
          100: "#f5eef3",
          200: "#eddde8",
          300: "#dfc2d6",
          400: "#ca9cba",
          500: "#b57a9f",
          600: "#a16186",
          700: "#884e6e",
          800: "#72425b",
          900: "#603b4f",
          950: "#381f2c",
        },
        "primary-dark": {
          50: "#f5f4fa",
          100: "#e9e6f3",
          200: "#d8d2eb",
          300: "#bdb4dc",
          400: "#9e90ca",
          500: "#8b75bc",
          600: "#7f62ae",
          700: "#75579e",
          800: "#644b82",
          900: "#4d3c63",
          950: "#352a41",
        },
        twitter: "#1D9BF0",
      },
      keyframes: {
        "accordion-down": {
          from: { height: 0 },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: 0 },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}
