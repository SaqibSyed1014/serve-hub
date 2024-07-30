
import { usePayloadUrl , convertQueryToString} from "~/segments/utils"

const  getStripeCheckDetails = async (requestBody :JobPaymentPayload) :Promise<StripeResponse> => {

    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }

    return $fetch(`${baseUrl}/payment/checkout`, {
        method: 'POST',
        headers: apiHeaders,
        body: JSON.stringify(requestBody),
    });
}

const getOrgTypes = () :Promise<OrganizationType[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/reference/organizationtypes`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getGradesLevels = () :Promise<GradeLevel[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/reference/gradelevels`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getSubjects = () :Promise<Subject[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/reference/subjects`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getExperienceLevels = () :Promise<ExperienceLevel[]> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/reference/experiencelevels`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getSearchedOrgName = (query :string) :Promise<OrgResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/org/search?q=*&filter_by=name:${query}*`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const checkUserMailExists = (mail :string) :Promise<CheckUserMailResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/auth/userexists?email=${mail}`, {
        method: 'post',
        headers: apiHeaders,
    })
}

const saveJobData = (payload :any) :Promise<JobSaveResponseType> => {
    const { baseUrl, apiKey } = usePayloadUrl()
    const apiHeaders = {
        'API-Key': apiKey,
    }
    return $fetch(`${baseUrl}/job/save`, {
        method: 'post',
        headers: apiHeaders,
        body: payload
    })
}


export {
    getStripeCheckDetails,
    getGradesLevels,
    getSubjects,
    getExperienceLevels,
    getOrgTypes,
    getSearchedOrgName,
    checkUserMailExists,
    saveJobData
}
