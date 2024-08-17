import {
    getStripeCheckDetails,
    getOrgTypes,
    getExperienceLevels,
    getSearchedBusinessName,
    checkUserMailExists,
    saveJobData
} from "~/segments/postjobs/services"

interface StripeCheckout {
    content: StripeCheckoutSession | null ;
    duration: number | null;
    status: string | null;
    requestId: string | null;
    experienceLevels: ExperienceLevel[];
    searchedBusinessesNames: BusinessDocument[];
    checkoutURL: string;
}

export const usePostjobStore = defineStore('postjobStore', {
    state: () => ({
        content: null,
        duration: null,
        status: null,
        requestId: null,
        experienceLevels: [],
        searchedBusinessesNames: [],
        checkoutURL: ''
    } as StripeCheckout),
    actions: {
        async fetchPayment( requestBody :JobPaymentPayload) {
                return await getStripeCheckDetails(requestBody)
                    .then(({ content }) => {
                        this.$state.checkoutURL = content.url;
                        return content;
                    })
                    .catch((err) => {
                        console.log('error ', err)
                        throw err;
                    })
        },

        reset() {
            this.$state.content  = null;
            this.$state.status  = null;
        },
        async fetchExperienceLevels() {
            this.$state.experienceLevels = await getExperienceLevels();
        },
        async fetchSearchedBusinessNames(name :string) {
            const { hits } = await getSearchedBusinessName(name);
            this.$state.searchedBusinessesNames = hits.map((org :BusinessHit) => org.document)
        },
        async checkUserMail(mail :string) {
            return await checkUserMailExists(mail)
                .then(({ error }) => {
                    return error;
                })
                .catch((err) => {
                    useNuxtApp().$toast.error('An Error Occurred');
                    throw err;
                })
        },
        async savingJobFormData(payload :any) {
            return await saveJobData(payload)
                .then(({ message }) => {
                    useNuxtApp().$toast.success(message);
                })
                .catch((err) => {
                    useNuxtApp().$toast.error('An Error Occurred');
                    throw err;
                })
        },
    },
    getters: {
        experienceLevelOptions: (state) => {
            return state.experienceLevels
                .sort((a :ExperienceLevel, b :ExperienceLevel) => a.sort_order - b.sort_order)
                .map((experience :ExperienceLevel) => ({
                    label: experience.experience_level,
                    value: experience.experience_level_id,
                    desc: experience.experience_level_description
                })) || []
        },
        businessNamesDropdown: (state) => {
            return state.searchedBusinessesNames?.map((org :BusinessDocument) => ({
                label: org.business_name,
                value: org.id
            })) || []
        },
    }
})
