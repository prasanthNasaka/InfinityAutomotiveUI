/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        playfair: ["Playfair Display", "serif"],
        roboto: ["Roboto", "sans-serif"],
        robotoCondensed: ["Roboto Condensed", "sans-serif"],
        robotoMono: ["Roboto Mono", "monospace"],
      },
      animation: {
        leftToRight: "leftToRight 2s ease-in-out infinite",
        rightToLeft: "rightToLeft 2s ease-in-out infinite",
        spin: "spin 3s linear infinite",
      },
      keyframes: {
        leftToRight: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(200px)" },
        },
        rightToLeft: {
          "0%, 100%": { transform: "translateX(0)" },
          "50%": { transform: "translateX(-200px)" },
        },
        spin: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
      },

      screens: {
        "2xl": { max: "2095px" },
        // => @media (max-width: 1535px) { ... }

        desk: { max: "1279px" },
        // => @media (max-width: 1279px) { ... }

        lappy: { max: "1023px" },
        // => @media (max-width: 1023px) { ... }

        lappydesk: {max: "980px"},
        // =>@media (max-width: 980px) { ... }

        tab: { max: "767px" },
        // => @media (max-width: 767px) { ... }

        phone: { max: "639px" },
        // => @media (max-width: 639px) { ... }

        iphone: { max: "400px" },
        // => @media (max-width: 639px) { ... }
      },
    },
  },
  plugins: [],
};
