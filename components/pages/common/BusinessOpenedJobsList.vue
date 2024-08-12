<script setup lang="ts">
import type {PaginationInfo} from "~/segments/common.types";
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import {useRestaurantStore} from "~/segments/restaurants/store";
import {useBarsStore} from "~/segments/bars/store";
import {useHotelsStore} from "~/segments/hotels/store";

const props = defineProps<{
  type: 'Bars' | 'Restaurants' | 'Hotels'
  openedJobs: any
  searchedKeyword: string
}>()

const route = useRoute();
const barStore = useBarsStore();
const restaurantStore = useRestaurantStore();
const hotelStore = useHotelsStore();

const { totalPagesInBarJobs } = storeToRefs(barStore);
const { totalPagesInRestaurantJobs } = storeToRefs(restaurantStore);
const { totalPagesInHotelJobs } = storeToRefs(hotelStore);

const businessJobsFetching = ref<boolean>(false);

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
    filter_by: `job_slug:${route.params?.id}`,
    query_by: 'job_title'
  };
})

watch(() => props.searchedKeyword, () => {
  pageInfo.value.currentPage = 1;
  pageInfo.value
  getBusinessJobs();
})

onMounted(async () => {
  businessJobsFetching.value = true;
  await getBusinessJobs();
  businessJobsFetching.value = false;
})

async function getBusinessJobs() {
  businessJobsFetching.value = true;
  switch (props.type) {
    case 'Bars':
      await barStore.fetchBarJobs(queryParams.value);
      pageInfo.value.totalPages = totalPagesInBarJobs.value;
      break;
    case 'Restaurants':
      await restaurantStore.fetchRestaurantJobs(queryParams.value)
      pageInfo.value.totalPages = totalPagesInRestaurantJobs.value;
      break;
    case 'Hotels':
      await hotelStore.fetchHotelsJobs(queryParams.value)
      pageInfo.value.totalPages = totalPagesInHotelJobs.value;
      break;
  }
  businessJobsFetching.value = false;
}

const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") pageInfo.value.currentPage--;
  else if (page === "next") pageInfo.value.currentPage++;
  else pageInfo.value.currentPage = page;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  getBusinessJobs();
};
</script>

<template>
  <div v-if="businessJobsFetching" class="container">
    <div class="flex justify-center items-center h-[calc(100vh-60px)] w-full">
      <BaseSpinner size="lg" :show-loader="businessJobsFetching" />
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
