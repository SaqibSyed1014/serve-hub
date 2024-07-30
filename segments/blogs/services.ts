import { usePayloadUrl } from "~/segments/utils"

const getBlogsList = (pageNumber :number, pageSize :number, queryValue :string, category :string) :Promise<BlogResponseType> => {
    const { strapiBaseUrl, strapiApiToken } = usePayloadUrl()

    const apiHeaders = {
        Authorization: `Bearer ${strapiApiToken}`,
    }
    const strapiFiltrationSchema = `filters[title][$containsi]=${queryValue}&`
    const categoryFilterSchema = `filters[category][category_name][$eq]=${category}&`
    const strapiFieldsSchema = 'populate[category][fields][0]=category_name&populate[author][fields][1]=name&populate[post_photo]=*';
    const strapiPaginationSchema = `pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}`;
    return $fetch(`${strapiBaseUrl}/api/posts?${queryValue.length ? strapiFiltrationSchema : ''}${category.length ? categoryFilterSchema : ''}${strapiFieldsSchema}&${strapiPaginationSchema}`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getBlogsCategories = () :Promise<BlogCategoriesResponseType> => {
    const { strapiBaseUrl, strapiApiToken } = usePayloadUrl()

    const apiHeaders = {
        Authorization: `Bearer ${strapiApiToken}`,
    }
    return $fetch(`${strapiBaseUrl}/api/categories`, {
        method: 'get',
        headers: apiHeaders,
    })
}

const getBlogDetails = (slug :string) :Promise<BlogResponseType> => {
    const { strapiBaseUrl, strapiApiToken } = usePayloadUrl()

    const apiHeaders = {
        Authorization: `Bearer ${strapiApiToken}`,
    }
    return $fetch(`${strapiBaseUrl}/api/posts?filters[slug][$eq]=${slug}&populate=*`, {
        method: 'get',
        headers: apiHeaders,
    })
}

export {
    getBlogsList,
    getBlogsCategories,
    getBlogDetails
}
