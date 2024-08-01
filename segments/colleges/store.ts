import { getBarsList, getCollegeDetails } from "~/segments/colleges/services"
import { getJobsList } from "~/segments/jobs/services";

interface CollegesState {
    collegesList: BusinessHit[]
    total_page: number
    openedJobs: number
    collegesFound: number
    totalPagesInCollegeJobs: number
    collegeDetails: BusinessDocument | null
    collegeJobs: Job[]
}

export const useCollegesStore = defineStore('collegesStore', {
    state: () => ({
        collegesList: [],
        total_page: 0,
        collegesFound: 0,
        openedJobs: 0,
        collegeDetails: null,
        totalPagesInCollegeJobs: 0,
        collegeJobs: []
    } as CollegesState),
    actions: {
        async fetchBars(query:any) {
            const { hits, found} = await getBarsList(query)
            this.$state.collegesList = hits;
            this.$state.total_page = Math.ceil(found / 24);
        },
        async fetchCollegeDetails(slug :string) {
            this.$state.collegeDetails = await getCollegeDetails(slug);
        },
        async fetchCollegeJobs(query :any) {
            if (query.q.length) query.query_by = 'job_title';
            else delete query.query_by;
            const { hits, found } = await getJobsList(query);
            this.$state.collegeJobs = hits.map((hit :JobHit) => hit.document);
            this.$state.openedJobs = found;
            this.$state.totalPagesInCollegeJobs = Math.ceil(found / 10);
        }
    }
})
