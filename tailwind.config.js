/** @type {import('tailwindcss').Config} */
module.exports = {
  // NativeWind usa diferentes rutas
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./src/app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#e8f4fc",
          100: "#c6dbf8",
          200: "#5a8bb8",
          300: "#19475f",
          400: "#0d3a52",
          500: "#083045",
          600: "#062738",
          700: "#041e2b",
          800: "#03151e",
          900: "#010b11",
        },
        gray: {
          50: "#f9fafb",
          100: "#f3f4f6",
          200: "#e5e7eb",
          300: "#d1d5db",
          400: "#9ca3af",
          500: "#6b7280",
          600: "#4b5563",
          700: "#374151",
          800: "#1f2937",
          900: "#111827",
        },
      },
      spacing: {
        18: "72px",
      },
      maxWidth: {
        message: "80%",
      },
      borderRadius: {
        xl: "12px",
        "2xl": "16px",
        "3xl": "24px",
      },
    },
  },
  plugins: [],
};
