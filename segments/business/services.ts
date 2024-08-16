import { usePayloadUrl , convertQueryToString } from "~/segments/utils"


const getBusinessesList = (query: any) :Promise<BusinessResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    const queryString = convertQueryToString(query);
    return $fetch(`${baseUrl}/businesses/list?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getBusinessDetails = (slug: string) :Promise<BusinessDocument> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/org/${slug}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getBusinessesList,
    getBusinessDetails
}
