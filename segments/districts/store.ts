import {
    getRestaurantsList,
    getDistrictSchoolDetail
} from "~/segments/districts/services"
import { getJobsList } from "~/segments/jobs/services";

interface DistrictState {
    restaurantsList: BusinessHit[],
    total_page: number
    openedJobs: number
    totalPagesInDistrictJobs: number
    schoolDistrictDetails: BusinessDocument | null
    schoolDistrictJobs: Job[]
}

export const useDisrictsStore = defineStore('districtStore', {
    state: () => ({
        restaurantsList: [],
        total_page: 0,
        openedJobs: 0,
        totalPagesInDistrictJobs: 0,
        schoolDistrictDetails: null,
        schoolDistrictJobs: []
    } as DistrictState),
    actions: {
        async fetchRestaurants(query:any) {
            const { hits, found} = await getRestaurantsList(query)
            this.$state.restaurantsList = hits;
            this.$state.total_page = Math.ceil(found / 24);
        },
        async fetchDistrictSchoolDetails(slug :string) {
            this.$state.schoolDistrictDetails = await getDistrictSchoolDetail(slug);
        },
        async fetchSchoolDistrictJobs(query :any) {
            if (query.q.length) query.query_by = 'job_title';
            else delete query.query_by;
            const { hits, found } = await getJobsList(query);
            this.$state.schoolDistrictJobs = hits.map((hit :JobHit) => hit.document);
            this.$state.openedJobs = found;
            this.$state.totalPagesInDistrictJobs = Math.ceil(found / 10);
        }
    }
})
