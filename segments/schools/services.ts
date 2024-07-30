
import { usePayloadUrl , convertQueryToString} from "~/segments/utils"


const getSchoolsList = (query: any) :Promise<SchoolResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const queryString = convertQueryToString(query);
    const apiHeaders = {
        'API-Key': apiKey,
    }

    return $fetch(`${baseUrl}/charters/list?${queryString}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getSchoolDetails = (slug: string) :Promise<School> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/org/${slug}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getSchoolJobs = (slug: string) :Promise<JobResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }

    return $fetch(`${baseUrl}/org/jobs/${slug}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getSchoolsList,
    getSchoolDetails,
    getSchoolJobs
}
