import {
    getRestaurantsList,
    getDistrictSchoolDetail
} from "~/segments/restaurants/services"
import { getJobsList } from "~/segments/jobs/services";

interface DistrictState {
    restaurantsList: BusinessDocument[],
    total_page: number
    openedJobs: number
    totalPagesInRestaurantJobs: number
    restaurantDetails: BusinessDocument | null
    restaurantJobs: Job[]
}

export const useRestaurantStore = defineStore('restaurantStore', {
    state: () => ({
        restaurantsList: [],
        total_page: 0,
        openedJobs: 0,
        totalPagesInRestaurantJobs: 0,
        restaurantDetails: null,
        restaurantJobs: []
    } as DistrictState),
    actions: {
        async fetchRestaurants(query:any) {
            const { hits, found} = await getRestaurantsList(query)
            this.$state.restaurantsList = hits.map((hit :BusinessHit) => hit.document);
            this.$state.total_page = Math.ceil(found / 24);
        },
        async fetchRestaurantDetails(slug :string) {
            this.$state.restaurantDetails = await getDistrictSchoolDetail(slug);
        },
        async fetchRestaurantJobs(query :any) {
            if (query.q.length) query.query_by = 'job_title';
            else delete query.query_by;
            const { hits, found } = await getJobsList(query);
            this.$state.restaurantJobs = hits.map((hit :JobHit) => hit.document);
            this.$state.openedJobs = found;
            this.$state.totalPagesInRestaurantJobs = Math.ceil(found / 10);
        }
    }
})
