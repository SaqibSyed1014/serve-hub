import { getHotelsList, getHotelDetails } from "~/segments/hotels/services"
import { getJobsList } from "~/segments/jobs/services";

interface CollegesState {
    hotelsList: BusinessDocument[]
    total_page: number
    openedJobs: number
    hotelsFound: number
    totalPagesInHotelJobs: number
    hotelDetails: BusinessDocument | null
    hotelJobs: Job[]
}

export const useHotelsStore = defineStore('hotelsStore', {
    state: () => ({
        hotelsList: [],
        total_page: 0,
        hotelsFound: 0,
        openedJobs: 0,
        hotelDetails: null,
        totalPagesInHotelJobs: 0,
        hotelJobs: []
    } as CollegesState),
    actions: {
        async fetchHotels(query:any) {
            const { hits, found} = await getHotelsList(query)
            this.$state.hotelsList = hits.map((hit :BusinessHit) => hit.document);
            this.$state.total_page = Math.ceil(found / 24);
        },
        async fetchHotelDetails(slug :string) {
            this.$state.hotelDetails = await getHotelDetails(slug);
        },
        async fetchHotelsJobs(query :any) {
            if (query.q.length) query.query_by = 'job_title';
            else delete query.query_by;
            const { hits, found } = await getJobsList(query);
            this.$state.hotelJobs = hits.map((hit :JobHit) => hit.document);
            this.$state.openedJobs = found;
            this.$state.totalPagesInHotelJobs = Math.ceil(found / 10);
        }
    }
})
