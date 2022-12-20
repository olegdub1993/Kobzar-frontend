/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layouts/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      black: "black",
      red: "#a01f1f",
      "light-red": "#db8383",
      white: "white",
      error:"#d41a1a",
      // orange: "",
      green: "rgb(1 50 9)",
      yellow: "#ffffe3",
       "green-dark": "#044309",
      //  "green-dark": "rgb(1 50 9)",
      gray: "#8492a6",
      "gray-light": "#d3dce6",
    },
    extend: {},
  },
  plugins: [],
};
