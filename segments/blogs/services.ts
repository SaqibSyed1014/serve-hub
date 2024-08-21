import { useStrapiApiCall } from "~/segments/utils"

const getBlogsList = async (pageNumber :number, pageSize :number, queryValue :string, category :string) :Promise<BlogResponseType> => {
    const strapiFiltrationSchema = `filters[title][$containsi]=${queryValue}&`
    const categoryFilterSchema = `filters[category][category_name][$eq]=${category}&`
    const strapiFieldsSchema = 'populate[category][fields][0]=category_name&populate[author][fields][1]=name&populate[post_photo]=*';
    const strapiPaginationSchema = `pagination[page]=${pageNumber}&pagination[pageSize]=${pageSize}`;

    return await useStrapiApiCall<BlogResponseType>(`api/posts?${queryValue.length ? strapiFiltrationSchema : ''}${category.length ? categoryFilterSchema : ''}${strapiFieldsSchema}&${strapiPaginationSchema}`);
}

const getBlogsCategories = async () :Promise<BlogCategoriesResponseType> => {
    return await useStrapiApiCall<BlogCategoriesResponseType>(`api/categories`);
}

const getBlogDetails = async (slug :string) :Promise<BlogResponseType> => {
    return await useStrapiApiCall<BlogResponseType>(`api/posts?filters[slug][$eq]=${slug}&populate=*`);
}

export {
    getBlogsList,
    getBlogsCategories,
    getBlogDetails
}
