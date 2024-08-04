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
        },
        async fetchBarDetails(slug :string) {
            this.$state.barDetails = await getBarDetails(slug);
        },
        async fetchBarJobs(query :any) {
            if (query.q.length) query.query_by = 'job_title';
            else delete query.query_by;
            const { hits, found } = await getJobsList(query);
            this.$state.barJobs = hits.map((hit :JobHit) => hit.document);
            this.$state.openedJobs = found;
            this.$state.totalPagesInBarJobs = Math.ceil(found / 10);
        }
    }
})
