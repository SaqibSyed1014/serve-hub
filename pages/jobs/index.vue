<script setup lang="ts">
import {storeToRefs} from "pinia";
import {initDropdowns} from "flowbite";
import JobSkeleton from "~/components/core/Skeletons/JobSkeleton.vue";
import {useJobStore} from "~/segments/jobs/store";
import NoRecordFound from "~/components/core/NoRecordFound.vue";
import type {JobQueryParams, JobSearchFilters, PaginationInfo, TypesenseQueryParam} from "~/segments/common.types";
import SignUpCard from "~/components/pages/job-listings/SignUpCard.vue";
import {
  divideFilterQuery,
  getFilterByQuery,
  itemsViewOptions,
  jobFilters
} from "~/components/core/constants/jobs.constants";
import {useHomeStore} from "~/segments/home/store";
import MapView from "~/components/pages/job-listings/MapView.vue";


const filters = ref(jobFilters);  // job's filters
const listingViewOptions = ref(itemsViewOptions);  // Grid/List/Map view options

const route = useRoute();
const router = useRouter();
const jobStore = useJobStore();
const homeStore = useHomeStore();

const { jobListings, facetCounts, totalPages, coordinates } = storeToRefs(jobStore);
const { employmentTypesFilter, businessTypesFilter, shiftTypesFilter, roleTypesFilter } = storeToRefs(homeStore);

const layoutOptionSelected = ref(0);
const searchedLocationText = ref('');
const coordinatesForMapView = ref([0, 0]);
const isFilterSidebarVisible = ref<boolean>(false);
const areFiltersLoading = ref<boolean>(true);

const sidebarFilters = ref<{ [key :string]: string | string[] }>({})

const pageInfo = ref<PaginationInfo>({
  currentPage: 1,
  itemsPerPage: 24,
  totalPages: 0
});

const initialQuery = {
  q: "*",
  page: pageInfo.value.currentPage,
  per_page: pageInfo.value.itemsPerPage,
  sort_by: 'date_posted:desc',
  facet_by: 'employment_type_id,job_role_id,experience_level,business_type_id,shift_type_id',
  filter_by: ''
};
const query = ref<TypesenseQueryParam>(initialQuery);

const queryParams = computed(() => {
  const urlParams :JobQueryParams = {
    keyword: query.value.q,
    ...(searchedLocationText.value?.length && { location: searchedLocationText.value }),  // skip location from url if no location is searched
    ...sidebarFilters.value,
    page: pageInfo.value.currentPage,
    mode: layoutOptionSelected.value === 0 ? 'list' : 'grid',
    coordinates: [coordinates.value.lat, coordinates.value.lng],
    sort_by: query.value.sort_by,
    filter_by: query.value.filter_by
  }
  return urlParams
})

watch(() => layoutOptionSelected.value, (val) => {
  localStorage.setItem('jobsLayout', val === 0 ? 'list' : 'grid');  // update saved layout on Grid/List btns clicking
  router.replace({  // update route with updated query when layout mode is changed
    path: "/jobs",
    query: {
      params: JSON.stringify(queryParams.value)
    },
  });
})


onMounted(async () => {
  initDropdowns();
  let savedLayout = '';
  areFiltersLoading.value = true;
  await fetchFilters();  // fetching side bar filters
  areFiltersLoading.value = false;

  if (process.client) {  // using process.client due to SSR
    savedLayout = localStorage.getItem('jobsLayout') ?? 'list';  // use layout if it's saved earlier else default layout
    layoutOptionSelected.value = savedLayout === 'grid' ? 1 : 0;
  }
  const paramsString = route.query.params as string;
  if (paramsString) {
    const parsedParams = JSON.parse(paramsString);
    await assignQueryParamsOnInitialLoad(parsedParams as JobQueryParams);
    return;
  }

  await doSearch(); // Initial fetch
});

async function fetchFilters() {
  await Promise.all([
      homeStore.fetchEmploymentTypes(),
      homeStore.fetchBusinessTypes(),
      homeStore.fetchShiftTypes(),
      homeStore.fetchRoleTypes()
  ]);
  if (filters.value[0].fieldName !== 'employment_type_id')  // check to avoid duplicate occurrence of employment type filter
    filters.value.unshift(employmentTypesFilter.value);
  if (filters.value[1].fieldName !== 'business_type_id')  // check to avoid duplicate occurrence of business type filter
    filters.value.splice(1, 0, businessTypesFilter.value);
  if (filters.value[2].fieldName !== 'shift_type_id')  // check to avoid duplicate occurrence of shift type filter
    filters.value.splice(2, 0, shiftTypesFilter.value);
  if (filters.value[3].fieldName !== 'job_role_id')  // check to avoid duplicate occurrence of shift type filter
    filters.value.splice(3, 0, roleTypesFilter.value);
}

onUnmounted(() => {
  jobStore.jobsList = [];
  coordinates.value = { lat: 0, lng: 0 };
  query.value = initialQuery;
  sidebarFilters.value = {}
  filters.value = [];
})

const jobsLoading = ref(true);
let selectedCompensation = ref<number[]>([0, 0]);
let appliedCompensationFilters = ref<string>('');
let appliedCheckboxFilters = ref<string>('');
let appliedLocationFilters = ref<string>('');

setInitialCompensationValues('salary');

function setInitialCompensationValues(wageType :string, isCompensationUpdate :boolean = false) {
  let values :number[] = [];
  if (wageType === 'salary') values = [20000, 200000];
  else if (wageType === 'hourly') values = [10, 200];
  selectedCompensation.value = values;
  if (isCompensationUpdate) return;  // only set the compensation values (when switch is toggled) and return

  appliedCompensationFilters.value = `(min_${wageType}:>=${values[0]}&&max_${wageType}:<=${values[1]})||is_salary_empty:true`;
  query.value.filter_by = getFilterByQuery(appliedCompensationFilters.value, appliedCheckboxFilters.value, appliedLocationFilters.value);
}

async function doSearch(resetToDefaultPage = false) {
  jobsLoading.value = true;
  if (resetToDefaultPage) pageInfo.value.currentPage = 1;  // set the current page to default (1)
  if (pageInfo.value.currentPage === 1) query.value.per_page = 23;  // 23 jobs will be fetched for first page due to signup card
  else query.value.per_page = 24;
  query.value.page = pageInfo.value.currentPage;

  await router.replace({
    path: '/jobs',
    query: {
      params: JSON.stringify(queryParams.value)
    }
  })
  if (query.value.q && query.value.q !== '*') query.value.query_by = 'job_title'  // search from job_title
  localStorage.setItem('jobsLayout', queryParams.value.mode);  // save layout before calling api
  await jobStore.fetchJobs(query.value);
  updateFiltersWithFacetCounts();
  pageInfo.value.totalPages = totalPages.value;
  jobsLoading.value = false;
}

function updateFiltersWithFacetCounts() {
  filters.value.map((filter) => {
    if (filter.type === 'checkbox') {
      facetCounts.value.forEach((facet) => {
        if (facet.field_name === filter.fieldName) {
          filter.list.forEach((filterItem) => {
            const count = facet.counts.find(count => count.value == filterItem.value);
            if (count) filterItem.counts = count.count;
            else filterItem.counts = 0;
          });
        }
      });
    }

    return filter;
  });
}

const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") pageInfo.value.currentPage--;
  else if (page === "next") pageInfo.value.currentPage++;
  else pageInfo.value.currentPage = page;

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });

  doSearch();
};

const fetchOnSearching = (searchValues :JobSearchFilters) => {
  query.value.q = searchValues.keyword.length ? searchValues.keyword : '*'

  if (searchValues.coordinates.lat && searchValues.coordinates.lng) {    // when user searches location on 'Search' click (searchValues are null when redirected from Home view)
    coordinates.value = searchValues.coordinates;
  }
  if (coordinates.value.lat && coordinates.value.lng) {    // check if both lat and lng are propagated by SearchBar
    appliedLocationFilters.value = `geo_location:(${coordinates.value.lat}, ${coordinates.value.lng}, 10 mi)`
    query.value.filter_by = getFilterByQuery(appliedCompensationFilters.value, appliedCheckboxFilters.value, appliedLocationFilters.value);
    searchedLocationText.value = searchValues.location // saving location string for route query
    coordinatesForMapView.value = [coordinates.value.lat, coordinates.value.lng]
  }

  doSearch(true);
}

function updateSideBarFilters(selectedFilters :{ field: string, values: string[] }[], updatedFilters :any, toggleFlag = false) {
  filters.value = updatedFilters;  // update filters with updated one from ListingFilters...
  if (Object.keys(selectedFilters)?.length) {
    sidebarFilters.value = {};   // reset sidebarFilters everytime for avoiding caching data
    selectedFilters.forEach(filter => {
      sidebarFilters.value[filter.field] = filter.values.join(',')
    });
  }
  else sidebarFilters.value = {};

  appliedCheckboxFilters.value = selectedFilters.map((obj: { field: string, values: string[] }) => {
    return `${obj.field}:=[${obj.values.join(',')}]`;
  }).join('&&');

  query.value.filter_by = getFilterByQuery(appliedCompensationFilters.value, appliedCheckboxFilters.value, appliedLocationFilters.value);

  if (toggleFlag) isFilterSidebarVisible.value = false;

  doSearch();
}

function applyCompensationFilters(filterString :string, shouldApply :boolean = true) { // replacing old compensation filters with new filter values
  appliedCompensationFilters.value = filterString;
  if (shouldApply) {
    query.value.filter_by = getFilterByQuery(appliedCompensationFilters.value, appliedCheckboxFilters.value, appliedLocationFilters.value)
    doSearch();
  }
}


const wageType = ref('salary');  // initial values for wage type and compensation checkbox
const includeAllJobs = ref(true);

async function assignQueryParamsOnInitialLoad(queryParams :JobQueryParams) {
  const { keyword, mode, location, employment_type_id, business_type_id, shift_type_id, job_role, experience_level, coordinates, filter_by, ...otherParams }
      = queryParams
  query.value = {
    ...query.value,
    ...otherParams as unknown as TypesenseQueryParam,
    q: keyword as string,
  }
  pageInfo.value.currentPage = otherParams.page
  layoutOptionSelected.value = mode === 'list' ? 0 : 1;
  if (location) searchedLocationText.value = location as string; // assign location in url for google map field

  if (employment_type_id) sidebarFilters.value.employment_type_id = employment_type_id;
  if (business_type_id) sidebarFilters.value.business_type_id = business_type_id;
  if (shift_type_id) sidebarFilters.value.shift_type_id = shift_type_id;
  if (job_role) sidebarFilters.value.job_role = job_role;
  if (experience_level) sidebarFilters.value.experience_level = experience_level;
  filters.value.forEach(filter => {
    if (filter.type === 'checkbox' && filter.list?.length) {
      filter.list.forEach(item => {
        const filterValues = sidebarFilters.value[filter.fieldName] || [];
        item.checked = filterValues.includes(item.value as string);
      });
    }
  });
  if (filter_by) {  // assigning filter_by compensation params
    const { min, max, type, isCompensationEmpty } = divideFilterQuery(filter_by);
    selectedCompensation.value[0] = min;
    selectedCompensation.value[1] = max;
    wageType.value = type;
    includeAllJobs.value = isCompensationEmpty;
  }
  if (coordinates && !coordinates?.includes(0)) {
    jobStore.coordinates.lat = coordinates[0];
    jobStore.coordinates.lng = coordinates[1];
    coordinatesForMapView.value = coordinates;
  }

  query.value.filter_by = filter_by;
  doSearch();
}

function sortJobs(sortBy :string) {
  if (sortBy === 'most_relevant') query.value.sort_by = 'date_posted:desc';
  if (sortBy === 'date_posted') query.value.sort_by = 'date_posted:asc';
  const sortDropdown = document.getElementById('dropdownToggler');
  if (sortDropdown) sortDropdown.click();
  doSearch();
}

const SortDropdownLabel = computed(() => {
  if (query.value.sort_by?.includes('asc')) return 'Date Posted';
  return 'Most Relevant';
})

const signUpCardIndex = Math.floor(Math.random() * 25);  // randomly generate index number for signup card

watch(() => coordinatesForMapView.value, (val) => {
  if (val.length && val[0] !== 0 && val[1] !== 0) {
    listingViewOptions.value[2].isDisabled = false;  // enable map view option
  } else listingViewOptions.value[2].isDisabled = true;
})
</script>

<template>
    <div class="job-listing-view">
      <ListingView>
        <template #filters>
            <ListingFilters
                class="hidden lg:flex"
                :is-sidebar-filter="false"
                :filtration-list="filters"
                :selected-compensation="selectedCompensation"
                :wage-type="wageType"
                :include-all-jobs="includeAllJobs"
                :filters-loading="areFiltersLoading"
                @compensation-filter-type-change="setInitialCompensationValues"
                @compensation-filter-change="applyCompensationFilters"
                @on-filters-change="updateSideBarFilters"
            />

          <SideBarWrapper :is-sidebar-visible="isFilterSidebarVisible">
            <ListingFilters
                :is-sidebar-filter="true"
                :filtration-list="filters"
                :selected-compensation="selectedCompensation"
                :wage-type="wageType"
                :include-all-jobs="includeAllJobs"
                :filters-loading="areFiltersLoading"
                @compensation-filter-type-change="setInitialCompensationValues"
                @apply-filters-on-click="(selectedFilters, filters) => updateSideBarFilters(selectedFilters, filters, true)"
                @compensation-filter-change="applyCompensationFilters"
                @close-filter-sidebar="isFilterSidebarVisible = false"
            />
          </SideBarWrapper>
        </template>

        <template #header>
          <ListingViewTitle
              title="Jobs"
              sub-title="Find your desired job from the comfort of your home."
          />
        </template>

        <template #search-filters>
          <SearchBar
            :query-value="query"
            :location="searchedLocationText as string"
            :coordinates="coordinates"
            @updated-values="fetchOnSearching"
            @searched-location-modified="() => coordinatesForMapView = [0, 0]"
          />
        </template>

        <template #cards-list>
          <div class="flex gap-4 justify-between lg:items-center">
            <div class="relative max-lg:flex-1">
              <BaseButton id="dropdownToggler" data-dropdown-toggle="sort-jobs-by-dropdown" color="gray" :outline="true" :full-sized-on-small="true" :label="SortDropdownLabel" class="justify-between text-sm max-lg:w-full">
                <template #prepend-icon>
                  <SvgoFilterFunnel class="w-5 h-5 text-gray-600"/>
                </template>
                <template #append-icon>
                  <SvgoChevronDown class="w-4 h-4 text-gray-600"/>
                </template>
              </BaseButton>

              <!-- Dropdown menu -->
              <div id="sort-jobs-by-dropdown" class="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-full dark:bg-gray-700">
                <ul class="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownToggler">
                  <li
                      @click="sortJobs('most_relevant')"
                      class="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      :class="{'bg-gray-100 hover:bg-gray-200': query.sort_by?.includes('desc')}"
                  >
                    Most Relevant
                  </li>
                  <li
                      @click="sortJobs('date_posted')"
                      class="cursor-pointer px-4 py-2 hover:bg-gray-100"
                      :class="{'bg-gray-100 hover:bg-gray-200': query.sort_by?.includes('asc')}"
                  >
                    Date Posted
                  </li>
                </ul>
              </div>
            </div>

            <div class="hidden lg:inline-flex rounded-md shadow-sm" role="group">
              <BaseButtonsGroup
                  v-model="layoutOptionSelected"
                  color="gray"
                  :outline="true"
                  :btns-group="listingViewOptions"
              />
            </div>

            <BaseButton @click="isFilterSidebarVisible = true" color="gray" :outline="true" label="" class="lg:hidden">
              <template #prepend-icon>
                <SvgoFilter class="w-5 h-5 text-gray-600"/>
              </template>
            </BaseButton>
          </div>

          <template v-if="layoutOptionSelected === 2 && !listingViewOptions[2].isDisabled">
            <MapView
                :searched-coordinates="coordinatesForMapView"
            />
          </template>

          <template v-else>
            <div v-if="jobsLoading || jobListings.length" class="grid gap-6"
                 :class="[layoutOptionSelected ? 'md:grid-cols-2 xl:grid-cols-3' : 'grid-cols-1']">
              <template v-if="jobsLoading" v-for="i in pageInfo.itemsPerPage">
                <client-only>
                  <JobSkeleton :key="i" :card-form="layoutOptionSelected === 1"/>
                </client-only>
              </template>

              <template v-else v-for="(job, index) in jobListings">
                <SignUpCard v-if="signUpCardIndex === index && pageInfo.currentPage === 1"/>

                <JobCard :job="job" :card-form="layoutOptionSelected === 1" :show-job-description="false"
                         :is-job-loading="jobsLoading"/>
              </template>
            </div>

            <template v-else>
              <NoRecordFound name="job" :search-value="query.q"/>
            </template>

            <CustomPagination
                v-if="jobListings.length"
                :current-page="pageInfo.currentPage"
                :total-pages="pageInfo.totalPages"
                @paginate="paginate"
            />
          </template>
        </template>
      </ListingView>

      <JobCTA />
    </div>
</template>

