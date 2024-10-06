/** @type {import('tailwindcss').Config} */
export default {
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],

  content: ["./src/**/*.{html,js}"],
  theme: {
    fontFamily: {
      sans: ["Satoshi", "sans-serif"],
      serif: ["Merriweather", "serif"],
    },
    extend: {
      spacing: {
        "8xl": "96rem",
        "9xl": "128rem",
      },
      borderRadius: {
        "4xl": "2rem",
      },
      keyframes: {
        loader: {
          "0%": { height: ".8rem" },
          "50%": { height: "2rem" },
          "100%": { height: "1rem" },
        },
      },
    },
  },
};
