import {
    getBlogsList,
    getBlogsCategories,
    getBlogDetails
} from "~/segments/blogs/services";
import type {PaginationInfo} from "~/segments/common.types";
import type {DropdownOptions} from "flowbite";

interface BlogState {
    blogs: Blog[]
    categories: BlogCategory[]
    blogDetails: Blog | null
    pagination: {
        page: number
        pageCount: number
        pageSize: number
        total: number
    }
}

export const useBlogStore = defineStore('blogStore', {
    state: () => ({
        blogs: [],
        categories: [],
        blogDetails: null,
        pagination: {
            page: 0,
            pageCount: 0,
            pageSize: 0,
            total: 0
        }
    } as BlogState),
    actions: {
        async fetchBlogs(pageInfo :PaginationInfo, queryVal :string = '', category :string = '') {
            return await getBlogsList(pageInfo.currentPage, pageInfo.itemsPerPage, queryVal, category==='View All'? '':category)
                .then(({data, meta }) => {
                    this.$state.blogs = data;
                    this.$state.pagination = meta.pagination
                })
                .catch((err) => {
                    console.log('error ', err);
                    throw err;
                })
        },
        async fetchBlogsCategories() {
            return await getBlogsCategories()
                .then(({data, meta }) => {
                    this.$state.categories = data;
                })
                .catch((err) => {
                    console.log('error ', err);
                    throw err;
                })
        },
        async fetchBlogDetails(blogSlug :string) {
            return await getBlogDetails(blogSlug)
                .then(({ data }) => {
                    this.$state.blogDetails = data[0];
                })
                .catch((err) => {
                    console.log('error ', err);
                    throw err;
                })
        }
    },
    getters: {
        categoriesDropdown: (state) :{ label: string, value: number }[] => {
            const categoriesArray = state.categories.map((category: BlogCategory) => ({
                label: category.category_name,
                value: category.id
            }));

            categoriesArray.unshift({ label: 'View All', value: -1 });

            return categoriesArray;
        },
    }
})
