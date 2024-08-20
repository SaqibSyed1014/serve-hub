import { getBusinessesList, getBusinessDetails } from "~/segments/business/services"
import { getJobsList } from "~/segments/jobs/services";

interface CollegesState {
    businessesList: BusinessDocument[]
    total_page: number
    openedJobs: number
    businessesFound: number
    totalPagesInBusinessJobs: number
    businessDetails: BusinessDocument | null
    businessJobs: Job[]
}

export const useBusinessesStore = defineStore('businessesStore', {
    state: () => ({
        businessesList: [],
        total_page: 0,
        businessesFound: 0,
        openedJobs: 0,
        businessDetails: null,
        totalPagesInBusinessJobs: 0,
        businessJobs: []
    } as CollegesState),
    actions: {
        async fetchBusinesses(query:any) {
            const { hits, found} = await getBusinessesList(query)
            this.$state.businessesList = hits.map((hit :BusinessHit) => hit.document);
            this.$state.total_page = Math.ceil(found / 24);
        },
        async fetchBusinessDetails(slug :string) {
            this.$state.businessDetails = await getBusinessDetails(slug);
        },
        async fetchBusinessJobs(query :any) {
            if (query.q.length) query.query_by = 'job_title';
            else delete query.query_by;
            const { hits, found } = await getJobsList(query);
            this.$state.businessJobs = hits.map((hit :JobHit) => hit.document);
            console.log('found ', hits, this.$state.businessJobs);
            this.$state.openedJobs = found;
            this.$state.totalPagesInBusinessJobs = Math.ceil(found / 10);
        }
    }
})
