/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html" , "./src/**/*.{html,js,jsx}",],
  theme: {
    extend: {
      colors: {
        bgColor: "#dfe9f5",
        btnColor: "#",
        headingColor: "#181A1E",
        textColor: "#4E545F",
        grey: '#F3F3F3',
      },
      boxShadow: {
        panelShadow: "rgba(17, 12, 46, 0.15) 0px 48px 100px 0px",
        mainShadow: "0 20px 35px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
}

