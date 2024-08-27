
import {usePayloadUrl, convertQueryToString, useApiCall} from "~/segments/utils"


const getRestaurantsList = async (query: any) :Promise<BusinessResponseType> => {
    const queryString = convertQueryToString(query);
    return await useApiCall<BusinessResponseType>(`businesses/list?${queryString}`);
}

const getRestaurantDetail = async (slug: string) :Promise<BusinessDocument> => {
    return await useApiCall<BusinessDocument>(`org/${slug}`);
}

export {
    getRestaurantsList,
    getRestaurantDetail
}
