import {
    getDistrictList,
    getDistrictSchoolDetail
} from "~/segments/districts/services"
import { getJobsList } from "~/segments/jobs/services";

interface DistrictState {
    distictsList: DistrictHit[],
    total_page: number
    openedJobs: number
    totalPagesInDistrictJobs: number
    schoolDistrictDetails: DistrictDocument | null
    schoolDistrictJobs: Job[]
}

export const useDisrictsStore = defineStore('districtStore', {
    state: () => ({
        distictsList: [],
        total_page: 0,
        openedJobs: 0,
        totalPagesInDistrictJobs: 0,
        schoolDistrictDetails: null,
        schoolDistrictJobs: []
    } as DistrictState),
    actions: {
        async fetchDistricts(query:any) {
            const { hits, found} = await getDistrictList(query)
            this.$state.distictsList = hits;
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
