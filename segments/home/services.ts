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

const getFeaturedOrganizations = () :Promise<FeaturedOrganizations[]> => {
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


export {
    getJobsSummaryByCities,
    getPartnersLogo,
    getFeaturedOrganizations,
    getOrgDetails,
    getStripeCheckoutURL
}
