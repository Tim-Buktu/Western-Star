/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  // Safelist dynamic classes that are built via template strings and would otherwise be purged in production
  // This covers brand colors and common utilities used with interpolation (from-*, to-*, text-*, bg-*, border-*, ring-*, hover:* variants)
  safelist: [
    // Brand color utilities with optional opacity suffixes
    { pattern: /^(from|to|text|bg|border|ring)-(brand-(teal|coral|orange))(\/([0-9]{1,3}))?$/ },
    { pattern: /^(hover:from|hover:to|hover:text|hover:bg|hover:border|hover:shadow)-(brand-(teal|coral|orange))(\/([0-9]{1,3}))?$/ },
    { pattern: /^(group-hover:from|group-hover:to|group-hover:text|group-hover:bg)-(brand-(teal|coral|orange))(\/([0-9]{1,3}))?$/ },

    // Ring and shadow intensities for brand colors used in interactions
    /^ring-brand-(teal|coral|orange)(\/([0-9]{1,3}))?$/,
    /^hover:shadow-brand-(teal|coral|orange)(\/([0-9]{1,3}))?$/,
    /^hover:border-brand-(teal|coral|orange)(\/([0-9]{1,3}))?$/,

    // Static palette used for tags (e.g., ring-${color}-300)
    /^ring-(blue|green|purple|orange|indigo|yellow|pink|cyan|teal|red)-300$/,
    /^text-(blue|green|purple|orange|indigo|yellow|pink|cyan|teal|red)$/,
    /^bg-(blue|green|purple|orange|indigo|yellow|pink|cyan|teal|red)(\/([0-9]{1,3}))?$/,
    /^border-(blue|green|purple|orange|indigo|yellow|pink|cyan|teal|red)(\/([0-9]{1,3}))?$/,
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Montserrat', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        brand: {
          teal: '#2AB7CA',      // Primary teal
          gray: '#E6E6EA',      // Light gray
          navy: '#13293D',      // Dark navy
          orange: '#FFB703',    // Bright orange
          coral: '#FB8550',     // Coral
        }
      },
      animation: {
        'gradient': 'gradient 8s ease infinite',
        'float': 'float 6s ease-in-out infinite',
        'bounce-slow': 'bounce 3s infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        gradient: {
          '0%, 100%': {
            'background-size': '200% 200%',
            'background-position': 'left center'
          },
          '50%': {
            'background-size': '200% 200%',
            'background-position': 'right center'
          },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        }
      },
      backgroundSize: {
        '300%': '300%',
      }
    },
  },
  plugins: [],
}
