import { convertQueryToString, useApiCall } from "~/segments/utils"


const getHotelsList = async (query: any) :Promise<BusinessResponseType> => {
    const queryString = convertQueryToString(query);
    return await useApiCall<BusinessResponseType>(`businesses/list?${queryString}`);
}

const getHotelDetails = async (slug: string) :Promise<BusinessDocument> => {
    return await useApiCall<BusinessDocument>(`org/${slug}`);
}

export {
    getHotelsList,
    getHotelDetails
}
