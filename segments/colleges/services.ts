import { usePayloadUrl , convertQueryToString} from "~/segments/utils"


const getCollegesList = (query: any) :Promise<CollegesResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    const queryString = convertQueryToString(query);
    return $fetch(`${baseUrl}/bars/list?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getCollegeDetails = (slug: string) :Promise<CollegeDocument> => {
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
    getCollegesList,
    getCollegeDetails
}
