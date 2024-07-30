// https://nuxt.com/docs/api/configuration/nuxt-config
// import { GlobalSettings } from './enviromentsettings'
import { globalSettings } from './enviromentsettings'

const appEnv: string  = process.env.ENV || 'development'


export default defineNuxtConfig({
    app: {
        head: {
            title: 'ServeHub',
            charset: 'utf-8',
            viewport: 'width=device-width, initial-scale=1',
            link:  [
                { rel: 'icon', type: 'image/x-icon', sizes: '32x32', href: '/favicon.ico' },
                { rel: 'icon', type: 'image/png', sizes: '16x16', href: '/favicon-16x16.png' },
                { rel: 'icon', type: 'image/png', sizes: '32x32', href: '/favicon-32x32.png' },
                { rel: 'apple-touch-icon', type: 'image/png', sizes: '76x76', href: '/apple-touch-icon.png' }
            ]
        }
    },
    runtimeConfig: {
        API_URL: globalSettings[appEnv as keyof typeof globalSettings].API_URL,
        API_KEY: globalSettings[appEnv as keyof typeof globalSettings].API_KEY,
        STRAPI_API_URL: globalSettings[appEnv as keyof typeof globalSettings].STRAPI_API_URL,
        STRAPI_API_TOKEN: globalSettings[appEnv as keyof typeof globalSettings].STRAPI_API_TOKEN,
        SITE_ENVIRONMENT: globalSettings[appEnv as keyof typeof globalSettings].SITE_ENVIRONMENT, //globalSettings[appEnv].telephone,
        public: {
          API_URL: globalSettings[appEnv as keyof typeof globalSettings].API_URL,
          API_KEY: globalSettings[appEnv as keyof typeof globalSettings].API_KEY,
          STRAPI_API_URL: globalSettings[appEnv as keyof typeof globalSettings].STRAPI_API_URL,
          STRAPI_API_TOKEN: globalSettings[appEnv as keyof typeof globalSettings].STRAPI_API_TOKEN,
          SITE_ENVIRONMENT: globalSettings[appEnv as keyof typeof globalSettings].SITE_ENVIRONMENT, //globalSettings[appEnv].telephone,
        },
      },
    build: {
        transpile: ['vue-google-maps-community-fork', '@googlemaps/markercluster', '@vuepic/vue-datepicker', 'vue-multiselect'],
    },
    vite: {
        optimizeDeps: {
            include: [
                "fast-deep-equal",
            ],
        },
    },
    modules: [
        '@nuxtjs/tailwindcss',
        'nuxt-swiper',
        'nuxt-svgo',
        '@pinia/nuxt',
        'nuxt-lodash'
    ],
    components: [
        {
            path: '~/components', // will get any components nested in let's say /components/test too
            pathPrefix: false,
        },
    ],
    swiper: {
        prefix: 'Swiper'
    },
    tailwindcss: {
        cssPath: '~/assets/css/tailwind.css'
    },
    svgo: {
        defaultImport: 'component'
    },
    lodash: {
        prefix: "_",
        prefixSkip: ["string"],
        upperAfterPrefix: false,
        exclude: ["map"],
        alias: [
          ["camelCase", "stringToCamelCase"], // => stringToCamelCase
          ["kebabCase", "stringToKebab"], // => stringToKebab
          ["isDate", "isLodashDate"], // => _isLodashDate
        ],
      },
})
