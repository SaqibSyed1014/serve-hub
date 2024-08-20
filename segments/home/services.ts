import { usePayloadUrl } from "~/segments/utils"

const getJobsSummaryByCities = () :Promise<JobsInCities[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/locations/summary`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getPartnersLogo = () :Promise<PartnerLogo[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/org/homelogos`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getBusinessTypes = () :Promise<BusinessType[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/businesses/types`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getEmploymentTypes= () :Promise<EmploymentType[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/jobs/employmenttypes`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getShiftTypes = () :Promise<ShiftType[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/jobs/shifttypes`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getRoleTypes = () :Promise<RoleType[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/jobs/jobroles`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getFeaturedBusinesses = () :Promise<FeaturedBusinesses[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/org/getHomePageNavOrganizations`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getOrgDetails = (slug :string) :Promise<Org> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/org/${slug}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getStripeCheckoutURL = (payload :any) :Promise<{ content: { url: string } }> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/payment/pricingcheckout`, {
        method: 'post',
        headers: apiHeaders,
        body: payload
    })
}

const sendingClientMessage = (payload :ContactFormPayload) :Promise<{ content: { url: string } }> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/contactform/save`, {
        method: 'post',
        headers: apiHeaders,
        body: payload
    })
}

const fetchingSEOData = (routeName :string) :Promise<PageMetaResponse> => {
    const { strapiBaseUrl, strapiApiToken } = usePayloadUrl();

    const apiHeaders = {
        Authorization: `Bearer ${strapiApiToken}`,
    }
    return $fetch(`${strapiBaseUrl}/api/pages?populate[0]=seo&filters[page_slug][$eq]=${routeName}&fields[0]=page_slug`, {
        method: 'get',
        headers: apiHeaders
    })
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
