<script setup lang="ts">
import type {PaginationInfo} from "~/segments/common.types";
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import {useDisrictsStore} from "~/segments/districts/store";
import {useCollegesStore} from "~/segments/colleges/store";
import {useSchoolsStore} from "~/segments/schools/store";

const props = defineProps<{
  type: string
  openedJobs: any
  searchedKeyword: string
}>()

const route = useRoute();
const districtStore = useDisrictsStore();
const schoolStore = useSchoolsStore();
const collegeStore = useCollegesStore();

const { totalPagesInDistrictJobs } = storeToRefs(districtStore);
const { totalPagesInSchoolsJobs } = storeToRefs(schoolStore);
const { totalPagesInCollegeJobs } = storeToRefs(collegeStore);

const orgJobsFetching = ref<boolean>(false);

const pageInfo = ref<PaginationInfo>({
  currentPage: 1,
  itemsPerPage: 12,
  totalPages: 0,
});

const queryParams = computed(() => {
  return {
    q: props.searchedKeyword.length ? props.searchedKeyword : '*',
    page: pageInfo.value.currentPage,
    per_page: pageInfo.value.itemsPerPage,
    filter_by: `organization_slug:${route.params?.id}`,
    query_by: 'job_title'
  };
})

watch(() => props.searchedKeyword, () => {
  pageInfo.value.currentPage = 1;
  pageInfo.value
  getOrgJobs();
})

onMounted(async () => {
  orgJobsFetching.value = true;
  await getOrgJobs();
  orgJobsFetching.value = false;
})

async function getOrgJobs() {
  orgJobsFetching.value = true;
  switch (props.type) {
    case 'district':
      await districtStore.fetchSchoolDistrictJobs(queryParams.value);
      pageInfo.value.totalPages = totalPagesInDistrictJobs.value;
      break;
    case 'school':
      await schoolStore.fetchSchoolJobs(queryParams.value);
      pageInfo.value.totalPages = totalPagesInSchoolsJobs.value;
      break;
    case 'college':
      await collegeStore.fetchCollegeJobs(queryParams.value);
      pageInfo.value.totalPages = totalPagesInCollegeJobs.value;
      break;
  }
  orgJobsFetching.value = false;
}

const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") pageInfo.value.currentPage--;
  else if (page === "next") pageInfo.value.currentPage++;
  else pageInfo.value.currentPage = page;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  getOrgJobs();
};
</script>

<template>
  <div v-if="orgJobsFetching" class="container">
    <div class="flex justify-center items-center h-[calc(100vh-60px)] w-full">
      <BaseSpinner size="lg" :show-loader="orgJobsFetching" />
    </div>
  </div>

  <div v-else>
    <template v-if="pageInfo.totalPages">
      <div class="grid gap-6 grid-cols-1">
        <template v-for="job in openedJobs">
          <JobCard
              :job="job"
              :show-job-description="false"
              :card-form="false"
          />
        </template>
      </div>

      <CustomPagination
          :current-page="pageInfo.currentPage"
          :total-pages="pageInfo.totalPages"
          @paginate="paginate"
          class="pt-8"
      />
    </template>

    <NoRecordFound v-else name="jobs" :searchValue="searchedKeyword" />
  </div>

</template>
