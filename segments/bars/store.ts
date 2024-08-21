import { getBarsList, getBarDetails } from "~/segments/bars/services"
import { getJobsList } from "~/segments/jobs/services";

interface CollegesState {
    barsList: BusinessDocument[]
    total_page: number
    openedJobs: number
    barsFound: number
    totalPagesInBarJobs: number
    barDetails: BusinessDocument | null
    barJobs: Job[]
}

export const useBarsStore = defineStore('barsStore', {
    state: () => ({
        barsList: [],
        total_page: 0,
        barsFound: 0,
        openedJobs: 0,
        barDetails: null,
        totalPagesInBarJobs: 0,
        barJobs: []
    } as CollegesState),
    actions: {
        async fetchBars(query:any) {
            const { hits, found} = await getBarsList(query)
            this.$state.barsList = hits.map((hit :BusinessHit) => hit.document);
            this.$state.total_page = Math.ceil(found / 24);
        }
    }
})
