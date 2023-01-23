/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  daisyui: {
    themes: [
      {
        mytheme: {

          "primary": "rgba(15, 207, 236, 1)",

          "secondary": "rgba(25, 211, 174, 1)",


          "base-100": "rgba(246, 247, 249, 1)",
          "accent": "rgba(58, 66, 86, 1)",


        },
      },
    ],
  },

  plugins: [require("daisyui")],
}
