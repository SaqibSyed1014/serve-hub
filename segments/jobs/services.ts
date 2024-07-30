import { usePayloadUrl , convertQueryToString} from "~/segments/utils"


const getJobsList = (query: any) :Promise<JobResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }

    const queryString = convertQueryToString(query);
    return $fetch(`${baseUrl}/jobs/list?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getJobDetails = (slug: string) :Promise<ExtendedJobDetails> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/job/${slug}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getJobsList,
    getJobDetails
}
