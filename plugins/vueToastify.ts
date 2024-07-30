import Vue3Toastify, { toast } from 'vue3-toastify';
import 'vue3-toastify/dist/index.css';
import '@/assets/css/variables.css'

export default defineNuxtPlugin((nuxtApp) => {
    nuxtApp.vueApp.use(Vue3Toastify, {
        theme: 'colored',
        autoClose: 2000,
        transition: toast.TRANSITIONS.BOUNCE,
        limit: 5,
        closeButton: false,
        hideProgressBar: true
    });

    return {
        provide: { toast },
    };
});
