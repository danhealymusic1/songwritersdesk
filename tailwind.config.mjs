/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        serif: ['"Fraunces"', 'ui-serif', 'Georgia', 'serif'],
        sans: ['"Inter Tight"', '"Inter"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      colors: {
        ink: {
          DEFAULT: '#1A1814',
          soft: '#2C2822',
          muted: '#6B6357',
        },
        paper: {
          DEFAULT: '#F4EFE6',
          warm: '#EDE6D6',
        },
        line: '#C9BFA8',
        accent: {
          DEFAULT: '#B4442A',
          dark: '#8B3620',
        },
        deep: '#2C4A6B',
        moss: '#4A5D3A',
      },
      letterSpacing: {
        'tracker': '0.18em',
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
          },
        },
      },
    },
  },
  plugins: [],
};
