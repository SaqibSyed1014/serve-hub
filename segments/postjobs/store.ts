import {
    getStripeCheckDetails,
    getOrgTypes,
    getExperienceLevels,
    getSearchedOrgName,
    checkUserMailExists,
    saveJobData
} from "~/segments/postjobs/services"

interface StripeCheckout {
    content: StripeCheckoutSession | null ;
    duration: number | null;
    status: string | null;
    requestId: string | null;
    businessTypes: BusinessType[];
    experienceLevels: ExperienceLevel[];
    searchedOrgNames: OrgDocument[];
    checkoutURL: string;
}

export const usePostjobStore = defineStore('postjobStore', {
    state: () => ({
        content: null,
        duration: null,
        status: null,
        requestId: null,
        businessTypes: [],
        experienceLevels: [],
        searchedOrgNames: [],
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

        async fetchOrgTypes() {
            this.$state.businessTypes = await getOrgTypes();
        },
        async fetchExperienceLevels() {
            this.$state.experienceLevels = await getExperienceLevels();
        },
        async fetchSearchedOrgNames(name :string) {
            const { hits } = await getSearchedOrgName(name);
            this.$state.searchedOrgNames = hits.map((org:OrgHit) => org.document)
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
        businessTypesDropdown: (state) => {
            return state.businessTypes.map((org :BusinessType) => ({
                label: org.business_type,
                value: org.business_type_id
            }))
        },
        experienceLevelOptions: (state) => {
            return state.experienceLevels
                .sort((a :ExperienceLevel, b :ExperienceLevel) => a.sort_order - b.sort_order)
                .map((experience :ExperienceLevel) => ({
                    label: experience.experience_level,
                    value: experience.experience_level_id,
                    desc: experience.experience_level_description
                })) || []
        },
        orgNamesDropdown: (state) => {
            return state.searchedOrgNames?.map((org :OrgDocument) => ({
                label: org.name,
                value: org.id
            })) || []
        },
    }
})
