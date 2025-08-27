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
        "bridal-health": "#F5F1ED",
        "swiss-coffee": "#E8D5C4",
        "cod-gray": "#4A3728",
        "trace-ash": "#4A3728",
      },
    },
  },
  plugins: [],
};
export default config;
