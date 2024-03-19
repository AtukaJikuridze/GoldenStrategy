export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      border: {
        gray: "0.5px solid #FFFFFF",
      },
      boxShadow: {
        yellowShadow: "0px 0px 30.5px 0px #FFD106;",
      },

      colors: {
        cardBgBlack: "rgba(20, 20, 20, 1)",
        yellowButton: "rgba(255, 209, 6, 1)",
      },
      fontFamily: {
        interM: ["interMedium"],
      },
    },
  },
  plugins: [],
};
