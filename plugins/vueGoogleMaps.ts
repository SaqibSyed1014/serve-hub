import VueGoogleMaps from 'vue-google-maps-community-fork'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(VueGoogleMaps, {
        load: {
            key: 'AIzaSyDZRlHL9XjA3BMkEEk4SQcB9q5o9HIQ3MI',
            libraries: 'places',
            loading: 'async'
        },
    })
})
