import { useApiCall } from "~/segments/utils"

const  getStripeCheckDetails = async (requestBody :JobPaymentPayload) :Promise<StripeResponse> => {
    return await useApiCall<StripeResponse>(`payment/checkout`, 'post', JSON.stringify(requestBody));
}

const getExperienceLevels = async () :Promise<ExperienceLevel[]> => {
    return await useApiCall<ExperienceLevel[]>(`reference/experiencelevels`);
}

const getSearchedBusinessName = async (query :string) :Promise<BusinessResponseType> => {
    return await useApiCall<BusinessResponseType>(`org/search?q=*&filter_by=business_name:${query}*`);
}

const checkUserMailExists = async (mail :string) :Promise<CheckUserMailResponseType> => {
    return await useApiCall<CheckUserMailResponseType>(`auth/userexists?email=${mail}`, 'post');
}

const saveJobData = async (payload :any) :Promise<JobSaveResponseType> => {
    return await useApiCall<JobSaveResponseType>(`job/save`, 'post', payload);
}


export {
    getStripeCheckDetails,
    getExperienceLevels,
    getSearchedBusinessName,
    checkUserMailExists,
    saveJobData
}
