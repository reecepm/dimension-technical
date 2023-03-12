/* eslint-disable @typescript-eslint/ban-ts-comment */
/** @type {import('tailwindcss').Config} */
const config = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        button: "0px 3px 0px #3F2ABD",
        dialog: "2px 2px 30px 10px rgba(0,0,0,0.2)",
      },
      colors: {
        button: {
          default: "#533BE5",
        },
        lightBorder: "#DFE1E499",

        shade: {
          100: "#F5F5F5",
          200: "#DFE1E4",
          300: "#94989E",
          400: "#6C6F75",
        }, // not sure on the scale/etc of these with missing colours, left out for now
      },
    },
  },
  plugins: [
    // @ts-ignore
    require("tailwindcss-animate"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/typography"),
  ],
};

module.exports = config;
