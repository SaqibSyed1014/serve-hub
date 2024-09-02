import {
    getJobsSummaryByCities,
    getPartnersLogo,
    getBusinessTypes,
    getEmploymentTypes,
    getShiftTypes,
    getRoleTypes,
    getFeaturedBusinesses,
    getOrgDetails,
    getStripeCheckoutURL,
    sendingClientMessage,
    fetchingSEOData
} from "~/segments/home/services";
import { defaultMetaInfo } from "~/components/core/constants/home.constants";

interface HomeSectionsData {
    jobsByCities: JobsInCities[]
    partnersLogos: PartnerLogo[]
    businessTypes: BusinessType[]
    employmentTypes: EmploymentType[]
    shiftTypes: ShiftType[]
    roleTypes: RoleType[]
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
        roleTypes: [],
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
        async fetchRoleTypes() {
            this.$state.roleTypes = await getRoleTypes();
        },
        async fetchFeaturedBusinesses() {
            this.$state.featuredBusinesses = await getFeaturedBusinesses();
        },
        async fetchOrgDetails(slug :string) {
            this.$state.orgDetail = await getOrgDetails(slug);
        },
        async fetchStripeCheckoutURL(payload :any) {
            await getStripeCheckoutURL(payload)
                .then(({ content }) => {
                    this.$state.checkoutURL = content.url;
                })
                .catch((err) => {
                    useNuxtApp().$toast.error('Something went wrong');
                    throw err;
                });
        },
        async sendClientMessage(payload :ContactFormPayload) {
            await sendingClientMessage(payload)
                .then(() => {
                    useNuxtApp().$toast.success('Message sent successfully');
                    return true;
                })
                .catch((err) => {
                    useNuxtApp().$toast.error('Message sending failed');
                    throw err;
                });
        },
        fetchSEOData(routeName :string) {
            return fetchingSEOData(routeName)
                .then(({ data }) => {
                    if (data[0]?.id) return data[0].seo
                    return defaultMetaInfo;
                })
                .catch((err) => {
                    throw err
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
        roleTypesList: (state) => {
            return state.roleTypes?.map((role :RoleType) => ({
                label: role.job_role,
                value: role.job_role_id,
                description: role.job_role_summary
            })) || []
        },
        employmentTypesFilter: (state) => {
             const filterList = state.employmentTypes
                 .sort((a :EmploymentType, b :EmploymentType) => a.sort_order - b.sort_order)
                 ?.map((employment :EmploymentType) => ({
                    label: employment.employment_type,
                    value: employment.employment_type_id,
                    checked: false,
                    counts: 0
                })) || []
            return {
                fieldName: 'employment_type_id',
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
                icon: 'SvgoBuilding',
                list: filterList
            }
        },
        shiftTypesFilter: (state) => {
            const filterList = state.shiftTypes
                .sort((a :ShiftType, b :ShiftType) => a.sort_order - b.sort_order)
                ?.map((shift :ShiftType) => ({
                    label: shift.shift_type,
                    value: shift.shift_type_id,
                    checked: false,
                    counts: 0
                })) || []
            return {
                fieldName: 'shift_type_id',
                type: 'checkbox',
                title: 'Shift Type',
                icon: 'SvgoClock',
                list: filterList
            }
        },
        roleTypesFilter: (state) => {
            const filterList = state.roleTypes
                ?.map((role :RoleType) => ({
                    label: role.job_role,
                    value: role.job_role_id,
                    checked: false,
                    counts: 0
                })) || []
            return {
                fieldName: 'job_role_id',
                type: 'checkbox',
                title: 'Role Type',
                icon: 'SvgoBarChart',
                list: filterList
            }
        }
    }
})
