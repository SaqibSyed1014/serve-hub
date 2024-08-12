
import { usePayloadUrl , convertQueryToString} from "~/segments/utils"


const getRestaurantsList = (query: any) :Promise<BusinessResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
        const queryString = convertQueryToString(query);
        const apiHeaders = {
            'API-Key': apiKey,
        }

    return $fetch(`${baseUrl}/businesses/list?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getRestaurantDetail = (slug: string) :Promise<BusinessDocument> => {
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
    getRestaurantsList,
    getRestaurantDetail
}
