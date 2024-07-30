module.exports = {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./nuxt.config.{js,ts}",
    "./node_modules/flowbite/**/*.{js,ts}",
  ],
  theme: {
    container: {
      padding: '1rem',
      center: true,
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1280px',
        '2xl': '1440px',
      },
    },
    extend: {
      fontFamily: {
        inter: ['"Inter"', "sans-serif"]
      },
      colors: {
        gray: {
          25: '#FCFCFD',
          50: '#F9FAFB',
          100: '#F2F4F7',
          200: '#EAECF0',
          300: '#D0D5DD',
          400: '#98A2B3',
          500: '#667085',
          600: '#475467',
          700: '#344054',
          800: '#182230',
          900: '#101828',
          950: '#0C111D'
        },
        brand: {
          25:  '#F6FEF9',
          50:  '#EDFCF2',
          100: '#D3F8DF',
          200: '#AAF0C4',
          300: '#73E2AE',
          400: '#3CCB7F',
          500: '#16B364',
          600: '#099250',
          700: '#087443',
          800: '#095C37',
          900: '#084C2E',
          950: '#052E1C'
        },
        error: {
          25: '#FFFBFA',
          50: '#FEF3F2',
          100: '#FEE4E2',
          200: '#FECDCA',
          300: '#FDA29B',
          400: '#F97066',
          500: '#F04438',
          600: '#D92D20',
          700: '#B42318',
          800: '#912018',
          900: '#7A271A',
          950: '#55160C'
        },
        warning: {
          25: '#FFFCF5',
          50: '#FFFAEB',
          100: '#FEF0C7',
          200: '#FEDF89',
          300: '#FEC84B',
          400: '#FDB022',
          500: '#F79009',
          600: '#DC6803',
          700: '#B54708',
          800: '#93370D',
          900: '#7A2E0E',
          950: '#4E1D09'
        },
        success: {
          25: '#F6FEF9',
          50: '#ECFDF3',
          100: '#DCFAE6',
          200: '#ABEFC6',
          300: '#75E0A7',
          400: '#47CD89',
          500: '#17B26A',
          600: '#079455',
          700: '#067647',
          800: '#085D3A',
          900: '#074D31',
          950: '#053321'
        }
      },
      boxShadow: {
        'xs': '0 1px 2px 0 #1018280D',
        'field': '0 2px 4px -2px #3B73FA0F, 0 4px 8px -2px #3B73FA1A'
      },
      backgroundImage: (theme) => ({
        "overlay-gradient-45": [
          "45deg",
          theme("colors.brand.800"),
          theme("colors.brand.600"),
        ],
      })
    }
  },
  plugins: [
    require('flowbite/plugin')
  ],
}
