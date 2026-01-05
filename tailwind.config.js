/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        // The Deep Grid Palette
        brand: {
          950: "#020617", // Midnight Navy (Global Background)
          900: "#0f172a", // Slate Navy (Cards & Surfaces)
          800: "#1e293b", // Lighter Navy (Borders & Separators)
          700: "#334155", // Muted Text
        },
        action: {
          DEFAULT: "#FFB800", // Voltaic Amber (Primary Buttons/Icons)
          hover: "#E5A500", // Darker Amber for hover states
        },
        status: {
          success: "#10B981", // Emerald (In Stock / Battery Full)
          danger: "#EF4444", // Red (Out of Stock / Error)
        },
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        heading: ["Space Grotesk", "sans-serif"],
      },
      backgroundImage: {
        "grid-pattern":
          "linear-gradient(to right, #1e293b 1px, transparent 1px), linear-gradient(to bottom, #1e293b 1px, transparent 1px)",
      },
    },
  },
  plugins: [],
};
