<script setup lang="ts">
import type {PaginationInfo} from "~/segments/common.types";
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import {useDisrictsStore} from "~/segments/districts/store";
import {useBarsStore} from "~/segments/bars/store";
import {useSchoolsStore} from "~/segments/schools/store";

const props = defineProps<{
  type: 'Bars' | 'Restaurants'
  openedJobs: any
  searchedKeyword: string
}>()

const route = useRoute();
const districtStore = useDisrictsStore();
const schoolStore = useSchoolsStore();
const barStore = useBarsStore();

const { totalPagesInDistrictJobs } = storeToRefs(districtStore);
const { totalPagesInSchoolsJobs } = storeToRefs(schoolStore);
const { totalPagesInBarJobs } = storeToRefs(barStore);

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
    filter_by: `business_slug:${route.params?.id}`,
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
    case 'Bars':
      await barStore.fetchBarJobs(queryParams.value);
      pageInfo.value.totalPages = totalPagesInBarJobs.value;
      break;
    case 'Restaurants':
      await schoolStore.fetchSchoolJobs(queryParams.value);
      pageInfo.value.totalPages = totalPagesInSchoolsJobs.value;
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
