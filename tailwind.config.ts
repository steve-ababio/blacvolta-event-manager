import type { Config } from "tailwindcss";

const config: Config = {
  darkMode:"class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        
      },
      backgroundColor:{
        "darkprimary":"#191C20",
        "btnprimary":"rgba(45,53,90,1)",
        "btnprimarybold":"rgba(25,40,70,1)"
      }
    },
  },
  plugins: [],
};
export default config;
