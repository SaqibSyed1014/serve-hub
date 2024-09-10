// https://nuxt.com/docs/api/configuration/nuxt-config
// import { GlobalSettings } from './enviromentsettings'
import { globalSettings} from './enviromentsettings'
import type { EnvType } from "./enviromentsettings";

const appEnv :EnvType  = process.env.NUXT_ENV as EnvType || 'development'


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
            ],
            meta: [
                { property: 'og:title', content: 'ServeHub.io' },
                { property: 'og:description', content: 'Find your next job in the hospitality industry. Explore roles in hotels, restaurants, bars, and more.' },
                { property: 'og:image', content: 'https://assets.servehub.io/images/og-logo.png' },
                { property: 'og:url', content: 'https://www.servehub.io' },
                { property: 'og:type', content: 'website' },
                { name: 'theme-color', content: '#099250' }
            ]
        }
    },
    runtimeConfig: {
        API_URL: globalSettings[appEnv].API_URL,
        API_KEY: globalSettings[appEnv].API_KEY,
        STRAPI_API_URL: globalSettings[appEnv].STRAPI_API_URL,
        STRAPI_API_TOKEN: globalSettings[appEnv].STRAPI_API_TOKEN,
        SITE_ENVIRONMENT: globalSettings[appEnv].SITE_ENVIRONMENT, //globalSettings[appEnv].telephone,
        public: {
          API_URL: globalSettings[appEnv].API_URL,
          API_KEY: globalSettings[appEnv].API_KEY,
          STRAPI_API_URL: globalSettings[appEnv].STRAPI_API_URL,
          STRAPI_API_TOKEN: globalSettings[appEnv].STRAPI_API_TOKEN,
          SITE_ENVIRONMENT: globalSettings[appEnv].SITE_ENVIRONMENT, //globalSettings[appEnv].telephone,
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
        'nuxt-lodash',
        '@vite-pwa/nuxt'
    ],
    pwa: {
        mode: 'development',
        registerType: 'autoUpdate',
        manifest: {
            name: 'ServeHub.io',
            short_name: 'ServeHub',
            description: 'Find ur next job in the hospitality industry. Explore roles in hotels, restaurants, bars, and more.',
            theme_color: '#099250',
            icons: [
                {
                    src: 'android-chrome-192x192.png',
                    sizes: '192x192',
                    type: 'image/png'
                },
                {
                    src: 'android-chrome-512x512.png',
                    sizes: '512x512',
                    type: 'image/png'
                }
            ],
        },
        workbox: {
            navigateFallback: '/'
        },
        devOptions: {
            enabled: true,
            type: 'module'
        }
    },
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
