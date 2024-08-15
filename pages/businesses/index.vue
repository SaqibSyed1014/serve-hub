<script setup lang="ts">
import {ref} from "vue";
import type {BusinessQueryParams, PaginationInfo, TypesenseQueryParam,} from "~/segments/common.types";
import AlphabetsInRow from "~/components/pages/common/AlphabetsInRow.vue";
import BusinessCardSkeleton from "~/components/pages/business-types/BusinessCardSkeleton.vue";
import {useBusinessesStore} from "~/segments/business/store";
import {businessFilters, getBusinessFilterQuery} from "~/components/core/constants/businesses.constants";
import {useHomeStore} from "~/segments/home/store";

const businessStore = useBusinessesStore();
const homeStore = useHomeStore();
const { businessesList, total_page } = storeToRefs(businessStore);
const { businessTypesFilter } = storeToRefs(homeStore);

const route = useRoute();
const router = useRouter();
const isLoading = ref<boolean>(true);
const selectedAlphabet = ref<string>('');
let toggleSideBar = ref(false);
const totalPages = ref(total_page);
const currentPage = ref<number>(Number(route?.query?.page) || 1);
const queryValue = route?.query?.q === "*" ? "" : route?.query?.q;
const searchedValue = ref<string>(
  Array.isArray(queryValue) ? queryValue.join(", ") : queryValue || ""
);
const isGridView = ref(
  route?.query?.view
    ? route?.query?.view === "grid"
      ? "grid"
      : "list"
    : "list"
); // Reactive variable to store the current view mode

let alphabetFilter = ref('');
let checkboxesFilter = ref('');

const filters = ref<JobFilter[]>(businessFilters);
const isFilterSidebarVisible = ref<boolean>(false);
const sidebarFilters = ref<{ [key :string]: string | string[] }>({});
const areFiltersLoading = ref<boolean>(true);

const switchView = (view: string) => {
  isGridView.value = view;
  localStorage.setItem('BusinessLayout', view);
  router.replace({
    path: "/businesses",
    query: {
      view: view,
      ...queryParams?.value,
    },
  });
};

onMounted(async () => {
  let savedLayout :string | null = '';
  areFiltersLoading.value = true;
  await fetchFilters();  // fetching side bar filters
  areFiltersLoading.value = false;
  if (process.client) {   // using process.client due to SSR
    if (localStorage.getItem('BusinessLayout')) savedLayout = localStorage.getItem('BusinessLayout');
    else if (route?.query?.view) savedLayout = route?.query?.view as string
    else savedLayout = 'list'
    isGridView.value = savedLayout as string;
  }

  const paramsString = route.query;
  if (Object.keys(paramsString).length) {
    assignQueryParamsOnInitialLoad(paramsString as BusinessQueryParams);
    return;
  }
  await fetchBusinesses(); // Initial fetch
});

async function fetchFilters() {
  await Promise.all([
    homeStore.fetchBusinessTypes(),
  ]);
  console.log('filters ', filters.value)
  if (filters.value[0].fieldName !== 'business_type_id')  // check to avoid duplicate occurrence of business type filter
    filters.value.unshift(businessTypesFilter.value);
}

function assignQueryParamsOnInitialLoad(params :BusinessQueryParams) {
  query.value = {
    ...query.value,
    q: params.keyword as string,
  }
  if (params.keyword.length && params.keyword !== '*') searchedValue.value = params.keyword;
  const splitFilterBy = params?.filter_by.split('&&');
  const alphabetFilterVal = splitFilterBy.filter(val => val.includes('business_name'))[0] || ''
  if (alphabetFilterVal.length) {
    selectedAlphabet.value = alphabetFilterVal?.match(/:=([a-zA-Z]+)/)[1] || '';
    alphabetFilter.value = alphabetFilterVal;
  }

  const jobCountVal = splitFilterBy.filter(val => val.includes('job_count'))[0] || '';
  if (jobCountVal) {
    selectedValues.value = jobCountVal.match(/\[(.*?)\]/)[1] // Extract within []
        .split(",");
    sidebarFilters.value.job_count = selectedValues.value;
  }

  const businessTypeVal = splitFilterBy.filter(val => val.includes('business_type_id'))[0] || '';
  if (businessTypeVal) {
    selectedValues.value = businessTypeVal.match(/\[(.*?)\]/)[1] // Extract within []
        .split(",");
    sidebarFilters.value.business_type_id = selectedValues.value;
  }
  console.log('adding ', businessTypeVal, sidebarFilters.value)

  filters.value.forEach(filter => {
    if (filter.type === 'checkbox' && filter.list?.length) {
      filter.list.forEach(item => {
        const filterValues = sidebarFilters.value[filter.fieldName] || [];
        item.checked = filterValues.includes(item.value.toString() as string);
        console.log('filterValues ', filterValues, item)
      });
    }
  });

  query.value.filter_by = params?.filter_by;

  fetchBusinesses();
}

const pageInfo = ref<PaginationInfo>({
  currentPage: currentPage.value,
  itemsPerPage: 24,
  totalPages: 0,
});

const query = ref<TypesenseQueryParam>({
  q: "*",
  page: pageInfo.value.currentPage,
  per_page: pageInfo.value.itemsPerPage,
  filter_by: 'status:=active',
});

if (route?.query.filter_by?.length) { // If it exists, assign its value to the filter_by property
  query.value.filter_by = route?.query?.filter_by.toString();
}

const queryParams = computed(() => {
  return {
    keyword: query.value.q,
    page: query.value.page,
    filter_by: query.value.filter_by
  };
});

async function fetchBusinesses() {
  localStorage.setItem('BusinessLayout', isGridView.value);
  isLoading.value = true;
  if (query.value.q) query.value.query_by = 'business_name'  // search from job_title
  else query.value.q = '*'
  await router.replace({
    path: "/businesses",
    query: {
      ...queryParams.value,
    },
  });
  await businessStore.fetchBusinesses(query?.value);
  isLoading.value = false;
  totalPages.value = total_page?.value;
}

const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") currentPage.value--;
  else if (page === "next") currentPage.value++;
  else currentPage.value = page;
  query.value.page = currentPage?.value;

  router.replace({
    path: "/businesses",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  fetchBusinesses();
};

const selectAlphabet = (letter: string) => {
  selectedAlphabet.value = letter;
  if (letter.length) alphabetFilter.value = `business_name:=${letter}*`
  else alphabetFilter.value = '';
  query.value.filter_by = getBusinessFilterQuery(alphabetFilter.value, checkboxesFilter.value);
  router.replace({
    path: "/businesses",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });
  fetchBusinesses();
};

const handleInput = _debounce(() => {
  search(true);
}, 500); // Adjust the debounce delay as needed (in milliseconds)

const search = (resetToDefaultPage = false) => {
  query.value.q = searchedValue.value.toString() ?? "*";
  if (resetToDefaultPage) query.value.page = 1;
  else query.value.page = route?.query?.page ? route.query.page : 1;  // search with page number if there's page number in the query params
  currentPage.value = 1;
  fetchBusinesses();
};

let selectedValues = ref<string[]>([]);
function processFiltration() {
  query.value.filter_by = getBusinessFilterQuery(alphabetFilter.value, checkboxesFilter.value);

  router.replace({
    path: "/businesses",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });

  fetchBusinesses();
}

function applyFiltersOnClick() {
  toggleSideBar.value = false;
  processFiltration();
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

  checkboxesFilter.value = selectedFilters.map((obj: { field: string, values: string[] }) => {
    return `${obj.field}:=[${obj.values.join(',')}]`;
  }).join('&&');
  console.log('check inside ', checkboxesFilter.value, selectedFilters, sidebarFilters.value);

  query.value.filter_by = getBusinessFilterQuery(alphabetFilter.value, checkboxesFilter.value);

  if (toggleFlag) isFilterSidebarVisible.value = false;

  processFiltration();
}
</script>

<template>
  <ListingView>
    <template #filters>
      <ListingFilters
          class="hidden lg:flex"
          :is-sidebar-filter="false"
          :show-facet-count="false"
          :filtration-list="filters"
          :filters-loading="areFiltersLoading"
          @on-filters-change="updateSideBarFilters"
      />

      <SideBarWrapper :is-sidebar-visible="isFilterSidebarVisible">
        <ListingFilters
            :is-sidebar-filter="true"
            :show-facet-count="false"
            :filtration-list="filters"
            :filters-loading="areFiltersLoading"
            @apply-filters-on-click="(selectedFilters, filters) => updateSideBarFilters(selectedFilters, filters, true)"
            @close-filter-sidebar="isFilterSidebarVisible = false"
        />
      </SideBarWrapper>
    </template>

    <template #header>
      <ListingViewTitle
          title="Businesses"
          sub-title="Find job openings at any business."
      />
    </template>

    <template #search-filters>
      <div class="flex sm:flex-row flex-col gap-4 justify-between">
        <div class="flex justify-between gap-4">
          <form
              @submit.prevent="search"
              class="w-full"
              action="#"
              method="GET"
          >
            <label for="search-field" class="sr-only">Search</label>
            <div class="search-input-prepended">
              <SvgoSearchIcon
                  class="search-prepend-icon"
                  aria-hidden="true"
              />
              <input
                  v-model="searchedValue"
                  id="search-field"
                  class="search-input !w-full md:!w-[320px]"
                  placeholder="Search..."
                  type="search"
                  name="search"
                  @input="handleInput"
              />
            </div>
          </form>
          <div class="flex shrink-0 items-center shadow-sm md:pr-3">
            <BaseButton @click="isFilterSidebarVisible = true" color="gray" :outline="true" label="" class="lg:hidden">
              <template #prepend-icon>
                <SvgoFilter class="w-5 h-5 text-gray-600"/>
              </template>
            </BaseButton>
          </div>
        </div>
        <div class="hidden md:inline-flex justify-end">
          <div
              class="rounded-lg shadow justify-start items-start inline-flex"
          >
            <button
                type="button"
                @click="switchView('list')"
                :class="{
                  'pl-3.5 pr-4 py-[11px] rounded-s-lg justify-center bg-white border border-gray-300 h-full items-center gap-2 flex':
                    isGridView === 'grid',
                  'pl-3.5 pr-4 py-[11px] rounded-s-lg justify-center bg-gray-50 border border-gray-300 h-full items-center gap-2 flex':
                    isGridView === 'list',
                }"
            >
              <SvgoList class="size-5"/>
              <span class="text-slate-700 text-sm font-semibold leading-tight">
                  List
                </span>
            </button>
            <button
                type="button"
                @click="switchView('grid')"
                :class="{
                  'pl-3.5 pr-4 py-[11px] rounded-e-lg justify-center bg-gray-50 border border-gray-300 h-full items-center gap-2 flex':
                    isGridView === 'grid',
                  'pl-3.5 pr-4 py-[11px] rounded-e-lg justify-center bg-white border border-gray-300 h-full items-center gap-2 flex':
                    isGridView === 'list',
                }"
            >
              <SvgoGrid class="size-5"/>
              <span class="text-gray-800 text-sm font-semibold leading-tight">
                  Grid
                </span>
            </button>
          </div>
        </div>
      </div>
    </template>

    <template #cards-list>
      <!--   Alphabet Filtration Row     -->
      <AlphabetsInRow
          :selected-alphabet="selectedAlphabet"
          @select-alphabet="selectAlphabet"
      />

      <!--  Listing    -->
      <div class="mt-1.5 mb-8">
        <div v-if="isLoading || businessesList.length" class="grid gap-6" :class="[isGridView === 'grid' ? 'md:grid-cols-3' : 'grid-cols-1']">
          <template v-if="isLoading" v-for="i in pageInfo.itemsPerPage">
            <client-only>
              <BusinessCardSkeleton :has-grid-layout="isGridView === 'grid'"  />
            </client-only>
          </template>

          <template v-else v-for="(business) in businessesList">
            <BusinessCard
                :data="business"
                :has-grid-layout="isGridView === 'grid'"
            />
          </template>
        </div>

        <template v-else>
          <NoRecordFound name="bars" :search-value="searchedValue" />
        </template>
      </div>

      <!--   Pagination     -->
      <template v-if="businessesList?.length > 0">
        <CustomPagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @paginate="paginate"
        />
      </template>
    </template>

  </ListingView>
</template>
