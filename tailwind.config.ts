import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./slices/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bridal-health": "#FFFBF6",
        "swiss-coffee": "#DAD3CF",
        "cod-gray": "#131313",
        "trace-ash": "#0F0F0F",
      },
    },
  },
  plugins: [],
};
export default config;
