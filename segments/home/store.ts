import {
    getJobsSummaryByCities,
    getPartnersLogo,
    getBusinessTypes,
    getFeaturedOrganizations,
    getOrgDetails,
    getStripeCheckoutURL
} from "~/segments/home/services";
import {getOrgTypes} from "~/segments/postjobs/services";

interface HomeSectionsData {
    jobsByCities: JobsInCities[]
    partnersLogos: PartnerLogo[]
    businessTypes: BusinessType[]
    featuredOrganizations: FeaturedOrganizations[]
    orgDetail: Org | null
    checkoutURL: string
}

export const useHomeStore = defineStore('homeStore', {
    state: () => ({
        jobsByCities: [],
        partnersLogos: [],
        businessTypes: [],
        featuredOrganizations: [],
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
            console.log('hdhd ', this.$state.businessTypes)
        },
        async fetchFeaturedOrganizations() {
            this.$state.featuredOrganizations = await getFeaturedOrganizations();
        },
        async fetchOrgDetails(slug :string) {
            this.$state.orgDetail = await getOrgDetails(slug);
        },
        async fetchStripeCheckoutURL(payload :any) {
            const { content } = await getStripeCheckoutURL(payload);
            this.$state.checkoutURL = content.url;
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
    }
})
