import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      backgroundImage:
      {"auth-dark": 'url("/images/auth-dark.png")',
        "auth-light": 'url("/images/auth-light.png")'
      }
    },
  },
  plugins: [require('tailwindcss-animate')],
}

export default config
