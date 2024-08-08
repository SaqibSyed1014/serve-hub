import {
    getJobsSummaryByCities,
    getPartnersLogo,
    getBusinessTypes,
    getEmploymentTypes,
    getShiftTypes,
    getFeaturedBusinesses,
    getOrgDetails,
    getStripeCheckoutURL,
    sendingClientMessage
} from "~/segments/home/services";

interface HomeSectionsData {
    jobsByCities: JobsInCities[]
    partnersLogos: PartnerLogo[]
    businessTypes: BusinessType[]
    employmentTypes: EmploymentType[]
    shiftTypes: ShiftType[]
    featuredBusinesses: FeaturedBusinesses[]
    orgDetail: Org | null
    checkoutURL: string
}

export const useHomeStore = defineStore('homeStore', {
    state: () => ({
        jobsByCities: [],
        partnersLogos: [],
        businessTypes: [],
        employmentTypes: [],
        shiftTypes: [],
        featuredBusinesses: [],
        orgDetail: null,
        checkoutURL: ''
    } as HomeSectionsData),
    actions: {
        async fetchJobsSummaryByCities() {
            this.$state.jobsByCities = await getJobsSummaryByCities();
        },
        async fetchPartnersLogos() {
            this.$state.partnersLogos = await getPartnersLogo();
        },
        async fetchBusinessTypes() {
            this.$state.businessTypes = await getBusinessTypes();
        },
        async fetchEmploymentTypes() {
            this.$state.employmentTypes = await getEmploymentTypes();
        },
        async fetchShiftTypes() {
            this.$state.shiftTypes = await getShiftTypes();
        },
        async fetchFeaturedBusinesses() {
            this.$state.featuredBusinesses = await getFeaturedBusinesses();
        },
        async fetchOrgDetails(slug :string) {
            this.$state.orgDetail = await getOrgDetails(slug);
        },
        async fetchStripeCheckoutURL(payload :any) {
            const { content } = await getStripeCheckoutURL(payload);
            this.$state.checkoutURL = content.url;
        },
        async sendClientMessage(payload :ContactFormPayload) {
            await sendingClientMessage(payload)
                .then(() => {
                    useNuxtApp().$toast.success('Message sent successfully');
                })
                .catch(() => {
                    useNuxtApp().$toast.error('Message sending failed');
                });
        }
    },
    getters: {
        jobsInEachCity: (state) :JobsInCities[] => {
            return state.jobsByCities.filter((city :JobsInCities) => city.lat && city.lng)
                .sort((a, b) => a.priority_rank - b.priority_rank) || []
        },
        partnersLogo: (state) :PartnerLogo[] => {
            if (!Array.isArray(state.partnersLogos)) return [];
            return state.partnersLogos.filter((logo :PartnerLogo) => logo.is_active === 1 && logo.logo_path)
                .sort((a :PartnerLogo, b :PartnerLogo) => a.display_order - b.display_order) || []
        },
        businessTypesList: (state) => {
            return state.businessTypes?.map((business :BusinessType) => ({
                label: business.business_type,
                value: business.business_type_id,
                ...business
            })).sort((a :BusinessType, b :BusinessType) => a.sort_order - b.sort_order) || []
        },
        employmentTypesFilter: (state) => {
             const filterList = state.employmentTypes
                 .sort((a :EmploymentType, b :EmploymentType) => a.sort_order - b.sort_order)
                 ?.map((employment :EmploymentType) => ({
                    label: employment.employment_type,
                    value: employment.employment_type,
                     checked: false,
                     counts: 0
                })) || []
            return {
                fieldName: 'employment_type',
                type: 'checkbox',
                title: 'Employment Type',
                icon: 'SvgoClock',
                list: filterList
            }
        },
        businessTypesFilter: (state) => {
            const filterList = state.businessTypes
                .sort((a :BusinessType, b :BusinessType) => a.sort_order - b.sort_order)
                ?.map((business :BusinessType) => ({
                    label: business.business_type,
                    value: business.business_type_id,
                    checked: false,
                    counts: 0
                })) || []
            return {
                fieldName: 'business_type_id',
                type: 'checkbox',
                title: 'Business Type',
                icon: 'SvgoClock',
                list: filterList
            }
        },
        shiftTypesFilter: (state) => {
            const filterList = state.shiftTypes
                .sort((a :ShiftType, b :ShiftType) => a.sort_order - b.sort_order)
                ?.map((shift :ShiftType) => ({
                    label: shift.shift_type,
                    value: shift.shift_type,
                    checked: false,
                    counts: 0
                })) || []
            return {
                fieldName: 'shift_type',
                type: 'checkbox',
                title: 'Shift Type',
                icon: 'SvgoClock',
                list: filterList
            }
        }
    }
})
