import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
      },
      textShadow: {
        DEFAULT: '2px 2px 0 rgba(0, 0, 0, 0.1)',
        md: '3px 3px 0 rgba(0, 0, 0, 0.2)',
        lg: '4px 4px 0 rgba(0, 0, 0, 0.3)',
        xl: '5px 5px 0 rgba(0, 0, 0, 0.4)',
      },
    },
  },
  plugins: [
    function ({ addUtilities }: any) {
      addUtilities({
        '.text-shadow': {
          textShadow: '2px 2px 0 rgba(0, 0, 0, 0.1)',
        },
        '.text-shadow-md': {
          textShadow: '3px 3px 0 rgba(0, 0, 0, 0.2)',
        },
        '.text-shadow-lg': {
          textShadow: '4px 4px 0 rgba(242, 235, 157, 0.3)',
        },
        '.text-shadow-xl': {
          textShadow: '5px 5px 0 rgba(0, 0, 0, 0.4)',
        },
      });
    },
  ],
};
export default config;
