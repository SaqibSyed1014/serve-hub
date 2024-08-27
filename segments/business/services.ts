import { convertQueryToString, useApiCall } from "~/segments/utils"


const getBusinessesList = async (query: any) :Promise<BusinessResponseType> => {
    const queryString = convertQueryToString(query);
    return await useApiCall<BusinessResponseType>(`businesses/list?${queryString}`);
}

const getBusinessDetails = async (slug: string) :Promise<BusinessDocument> => {
    return await useApiCall<BusinessDocument>(`org/${slug}`);
}

export {
    getBusinessesList,
    getBusinessDetails
}
