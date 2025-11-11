import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-accent': 'var(--primary-accent)',
        'secondary-accent': 'var(--secondary-accent)',
        'light-gray': 'var(--light-gray)',
        'light-background': 'var(--background)', // Using --background from globals.css
        'dark-foreground': 'var(--foreground)', // Using --foreground from globals.css
      },
    },
  },
  plugins: [],
};
export default config;
