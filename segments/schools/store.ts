import { getSchoolsList, getSchoolDetails } from "~/segments/schools/services"
import {getJobsList} from "~/segments/jobs/services";

interface SchoolState {
    schoolsList: School[]
    total_page: number
    schoolsFound: number
    openedJobs: number
    totalPagesInSchoolsJobs: number
    singleSchoolDetails: School | null
    schoolJobs: Job[]
}

export const useSchoolsStore = defineStore('schoolsStore', {
    state: () => ({
        schoolsList: [],
        total_page: 0,
        schoolsFound: 0,
        openedJobs: 0,
        totalPagesInSchoolsJobs: 0,
        singleSchoolDetails: null,
        schoolJobs: []
    } as SchoolState),
    actions: {
        async fetchCharterSchools(query:any) {
            const { hits, found} = await getSchoolsList(query);
            this.$state.schoolsList = hits.map((hit :SchoolHit) => hit.document);
            this.$state.total_page = Math.ceil(found / 24);
            this.$state.schoolsFound = found;
        },
        async fetchCharterSchoolDetails(slug :string) {
            this.$state.singleSchoolDetails = await getSchoolDetails(slug);
        },
        async fetchSchoolJobs(query :any) {
            if (query.q.length) query.query_by = 'job_title';
            else delete query.query_by;
            const { hits, found } = await getJobsList(query);
            this.$state.schoolJobs = hits.map((hit :JobHit) => hit.document);
            this.$state.openedJobs = found;
            this.$state.totalPagesInSchoolsJobs = Math.ceil(found / 10);
        }
    },
    getters: {
        charterSchoolDetails: (state) :School => {
            return state?.singleSchoolDetails
        }
    }
})
