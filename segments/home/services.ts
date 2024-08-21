import { useApiCall, useStrapiApiCall } from "~/segments/utils"

const getJobsSummaryByCities = async () :Promise<JobsInCities[]> => {
    return await useApiCall<JobsInCities[]>(`locations/summary`);
}

const getPartnersLogo = async () :Promise<PartnerLogo[]> => {
    return await useApiCall<PartnerLogo[]>(`org/homelogos`);
}

const getBusinessTypes = async () :Promise<BusinessType[]> => {
    return await useApiCall<BusinessType[]>(`businesses/types`);
}

const getEmploymentTypes= async () :Promise<EmploymentType[]> => {
    return await useApiCall<EmploymentType[]>(`jobs/employmenttypes`);
}

const getShiftTypes = async () :Promise<ShiftType[]> => {
    return await useApiCall<ShiftType[]>(`jobs/shifttypes`);
}

const getRoleTypes = async () :Promise<RoleType[]> => {
    return await useApiCall<RoleType[]>(`jobs/jobroles`);
}

const getFeaturedBusinesses = async () :Promise<FeaturedBusinesses[]> => {
    return await useApiCall<FeaturedBusinesses[]>(`org/getHomePageNavOrganizations`);
}

const getOrgDetails = async (slug :string) :Promise<Org> => {
    return await useApiCall<Org>(`org/${slug}`);
}

const getStripeCheckoutURL = async (payload :any) :Promise<{ content: { url: string } }> => {
    return await useApiCall<{ content: { url: string } }>(`payment/pricingcheckout`, 'post', payload);
}

const sendingClientMessage = async (payload :ContactFormPayload) :Promise<{ content: { url: string } }> => {
    return await useApiCall<{ content: { url: string } }>(`contactform/save`, 'post', payload);
}

const fetchingSEOData = async (routeName :string) :Promise<PageMetaResponse> => {
    return await useStrapiApiCall<PageMetaResponse>(`api/pages?populate[0]=seo&filters[page_slug][$eq]=${routeName}&fields[0]=page_slug`);
}


export {
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
}
