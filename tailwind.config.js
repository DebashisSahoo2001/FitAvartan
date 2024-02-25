/** @type {import('tailwindcss').Config} */
// module.exports = {
//   content: ["./src/**"],
//   theme: {
//     extend: {},
//   },
//   plugins: [],
// };
module.exports = {
  content: ["./src/**",
    "./views/**/*.{html,js,ejs}", // Adjust if your views folder is located elsewhere
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}

