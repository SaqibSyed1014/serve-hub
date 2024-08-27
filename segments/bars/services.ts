import { convertQueryToString, useApiCall } from "~/segments/utils"


const getBarsList = async (query: any) :Promise<BusinessResponseType> => {
    const queryString = convertQueryToString(query);
    return await useApiCall<BusinessResponseType>(`businesses/list?${queryString}`);
}

const getBarDetails = async (slug: string) :Promise<BusinessDocument> => {
    return await useApiCall<BusinessDocument>(`org/${slug}`);
}

export {
    getBarsList,
    getBarDetails
}
