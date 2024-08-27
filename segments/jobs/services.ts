import { convertQueryToString, useApiCall } from "~/segments/utils"


const getJobsList = async (query: any): Promise<JobResponseType> => {
    const queryString = convertQueryToString(query);
    return await useApiCall<JobResponseType>(`jobs/list?${queryString}`);
}

const getJobDetails = async (slug: string) :Promise<ExtendedJobDetails> => {
    return await useApiCall<ExtendedJobDetails>(`job/${slug}`);
}

export {
    getJobsList,
    getJobDetails
}
