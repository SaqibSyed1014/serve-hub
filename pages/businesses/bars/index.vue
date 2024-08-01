<script setup lang="ts">
import {ref} from "vue";
import {useCollegesStore} from "~/segments/colleges/store";
import type {PaginationInfo, TypesenseQueryParam,} from "~/segments/common.types";
import AlphabetsInRow from "~/components/pages/common/AlphabetsInRow.vue";
import JobSkeleton from "~/components/pages/job-listings/JobSkeleton.vue";
import SignUpCard from "~/components/pages/job-listings/SignUpCard.vue";
import BusinessCardSkeleton from "~/components/pages/business-types/BusinessCardSkeleton.vue";

const collegesStore = useCollegesStore();
const { barsList, total_page, collegesFound } = storeToRefs(collegesStore);

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

const switchView = (view: string) => {
  isGridView.value = view;
  localStorage.setItem('collegesLayout', view);
  router.replace({
    path: "/businesses/bars",
    query: {
      view: view,
      ...queryParams?.value,
    },
  });
};

onMounted(async () => {
  let savedLayout :string | null = '';
  if (process.client) {   // using process.client due to SSR
    if (localStorage.getItem('collegesLayout')) savedLayout = localStorage.getItem('collegesLayout');
    else if (route?.query?.view) savedLayout = route?.query?.view as string
    else savedLayout = 'list'
    isGridView.value = savedLayout as string;
  }
  await fetchColleges(); // Initial fetch

  if (route?.query?.filter_by) {
    query.value.filter_by = route?.query?.filter_by.toString();
    const splitFilterBy = query?.value?.filter_by.split('&&');
    const alphabetFilterVal = splitFilterBy.filter(val => val.includes('business_name'))[0] || ''
    if (alphabetFilterVal.length) {
      selectedAlphabet.value = alphabetFilterVal?.match(/:=([a-zA-Z]+)/)[1] || '';
      alphabetFilter.value = alphabetFilterVal;
    }

    const filteredJobCount = splitFilterBy.filter(val => val.includes('job_count'))[0] || ''
    setCheckedValues(filteredJobCount);
    checkboxesFilter.value = filteredJobCount;
    selectedValues.value = checkboxesFilter.value.match(/\[(.*?)\]/)[1] // Extract within []
        .split(",")
  }
});

const setCheckedValues = (jobFilter :string) => {
  // Check if filterBy exists
  if (jobFilter.length) {
    // Parse and set checked values for school_count
    const jobRanges = jobFilter.match(/\d+\s*to\s*\d+|\d+|>\d+/g);
    jobRanges.forEach((range: any) => {
      jobOptions.value.data.forEach((item) => {
        const [itemStart, itemEnd] = item.label.split(" to ").map(Number);
        if (range.startsWith(">")) {
          const foundItem = jobOptions.value.data.find(
              (item) => item.value === range
          );
          if (foundItem) foundItem.checked = true;
        }

        if (
            String(range) === String(itemStart) ||
            String(range) === String(itemEnd)
        ) item.checked = true;
      });
    });
  }
};

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
  business_type: 'Bars'
});

if (route?.query.filter_by?.length) { // If it exists, assign its value to the filter_by property
  query.value.filter_by = route?.query?.filter_by.toString();
}

const queryParams = computed(() => {
  return {
    q: query.value.q,
    page: query.value.page,
    filter_by: query.value.filter_by
  };
});

async function fetchColleges() {
  localStorage.setItem('collegesLayout', isGridView.value)
  isLoading.value = true;
  await collegesStore.fetchBars(query?.value);
  isLoading.value = false;
  totalPages.value = total_page?.value;
}

const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") currentPage.value--;
  else if (page === "next") currentPage.value++;
  else currentPage.value = page;
  query.value.page = currentPage?.value;

  router.replace({
    path: "/businesses/bars",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  fetchColleges();
};

function togglingSidebarVisibility() {
  toggleSideBar.value = !toggleSideBar.value;
  if (toggleSideBar.value) document.body.classList.add("overflow-hidden");
  else document.body.classList.remove("overflow-hidden");
}

const jobOptions = ref({
  icon: "SvgoBriefCaseLight",
  name: "jobOptions",
  data: [
    { id: "1", label: "0 to 10", value: "0..10", checked: false },
    { id: "2", label: "11 to 50", value: "11..50", checked: false },
    { id: "3", label: "51 to 100", value: "51..100", checked: false },
    { id: "4", label: "100+", value: ">100", checked: false },
  ],
});

const selectAlphabet = (letter: string) => {
  selectedAlphabet.value = letter;
  if (letter.length) alphabetFilter.value = `business_name:=${letter}*`
  else alphabetFilter.value = '';
  query.value.filter_by = getCollegesFilterQuery(alphabetFilter.value, checkboxesFilter.value);
  router.replace({
    path: "/businesses/bars",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });
  fetchColleges();
};

const handleInput = _debounce(() => {
  search(true);
}, 500); // Adjust the debounce delay as needed (in milliseconds)

const search = (resetToDefaultPage = false) => {
  query.value.q = searchedValue.value.toString() ?? "*";
  query.value.query_by = "business_name";
  if (resetToDefaultPage) query.value.page = 1;
  else query.value.page = route?.query?.page ? route.query.page : 1;  // search with page number if there's page number in the query params
  currentPage.value = 1;
  router.replace({
    path: "/businesses/bars",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });
  fetchColleges();
};

let selectedValues = ref<string[]>([]);
function filtersChanged(filterName :string, i :number, label :string, isChecked :boolean, toggleFlag = true) {
  jobOptions.value.data[i].checked = isChecked;

  const value = jobOptions.value.data[i].value;

  if (isChecked) selectedValues.value.push(value);
  else selectedValues.value = selectedValues.value.filter(v => v !== value);

  if (selectedValues.value.length) checkboxesFilter.value = `job_count:[${[selectedValues.value]}]`;
  else checkboxesFilter.value = '';

  if (toggleFlag) processFiltration();
}

function processFiltration() {
  query.value.filter_by = getCollegesFilterQuery(alphabetFilter.value, checkboxesFilter.value);

  router.replace({
    path: "/businesses/bars",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });

  fetchColleges();
}

function applyFiltersOnClick() {
  toggleSideBar.value = false;
  processFiltration();
}

const clearAll = (applyResetFilters :boolean) => {
  [jobOptions].forEach((option) => {
    option.value.data.forEach((opt: any) => {
      opt.checked = false;
    });
  });
  checkboxesFilter.value = '';
  selectedValues.value = [];
  if (applyResetFilters) {
    toggleSideBar.value = false;
    processFiltration();
  }
};

function getCollegesFilterQuery(alphabetFilter :string, cbFilters :string) {
  let result :string[] = [];
  result.push('status:=active');
  if (alphabetFilter.length) result.push(alphabetFilter);
  if (cbFilters.length) result.push(cbFilters)
  return result.join('&&');
}
</script>

<template>
  <div class="border-t border-b border-gray-200 mb-20">
    <div class="container flex w-full">
      <!-- For Mobile -->
      <div class="block xl:hidden">
        <SideBarWrapper :is-sidebar-visible="toggleSideBar">
          <div class="flex flex-col gap-3 relative">
            <div class="flex justify-end">
              <SvgoXClose class="w-4 h-4" @click="togglingSidebarVisibility" />
            </div>
            <div class="py-2 flex-col justify-start items-start gap-2.5 inline-flex">
              <div class="justify-between items-center inline-flex w-full border-b border-gray-200 pb-2">
                <div class="justify-start items-center gap-3 flex">
                  <SvgoFilterLines class="size-6" />
                  <div
                    class="text-gray-700 text-base font-semibold leading-normal"
                  >
                    Filters
                  </div>
                </div>
                <div class="justify-center items-center gap-1.5 flex">
                  <button
                    @click="clearAll(false)"
                    class="text-brand-800 text-sm font-semibold leading-tight"
                  >
                    Clear All
                  </button>
                </div>
              </div>

              <div class="divide-y divide-gray-200">
                <FilterSection
                  title="No. of jobs"
                  :options="jobOptions"
                  :total-jobs="collegesFound"
                  :inside-sidebar="true"
                  @toggleSchoolOption="(f, i, l ,c) => filtersChanged(f, i, l, c, false)"
                />
              </div>
              <div class="pt-6 pb-36 w-full">
                <BaseButton label="Apply" color="primary" :fullSized="true" @click="applyFiltersOnClick" />
              </div>
            </div>
          </div>
        </SideBarWrapper>
      </div>

      <!-- for desktop -->
      <div class="hidden xl:inset-y-0 xl:z-30 xl:flex xl:w-1/5 xl:flex-col">
        <div
          class="flex grow flex-col gap-y-5 pt-8 overflow-y-auto border-r pr-4 border-gray-200 bg-transparent ring-1 ring-white/5"
        >
          <div class="py-2 flex-col justify-start items-start gap-2.5 inline-flex">
            <div
              class="justify-between items-center inline-flex w-full border-b border-gray-200 pb-2"
            >
              <div class="justify-start items-center gap-3 flex">
                <SvgoFilterLines class="size-6" />
                <div
                  class="text-gray-700 text-base font-semibold leading-normal"
                >
                  Filters
                </div>
              </div>
              <div class="justify-center items-center gap-1.5 flex">
                <button
                  @click="clearAll(true)"
                  class="text-brand-800 text-sm font-semibold leading-tight"
                >
                  Clear All
                </button>
              </div>
            </div>

            <div class="divide-y divide-gray-200">
              <FilterSection
                title="No. of jobs"
                :options="jobOptions"
                :total-jobs="collegesFound"
                @toggleSchoolOption="filtersChanged"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full xl:w-4/5 xl:px-8 pt-8 pb-8">
        <div class="flex-col justify-start items-start gap-1 inline-flex">
          <div class="text-gray-900 text-3xl font-semibold leading-[38px]">
            Bars
          </div>
          <div class="text-gray-600 text-base font-normal leading-normal">
            Find job openings at any bar.
          </div>
        </div>

        <div class="pt-8 flex sm:flex-row flex-col gap-4 justify-between">
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
              <button
                type="button"
                class="size-11 flex items-center text-black xl:hidden rounded-lg shadow border border-gray-300 justify-center"
                @click="togglingSidebarVisibility"
              >
                <span class="sr-only">Open sidebar</span>
                <SvgoFilterLines class="size-6" />
              </button>
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
                <SvgoList class="size-5" />
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
                <SvgoGrid class="size-5" />
                <span class="text-gray-800 text-sm font-semibold leading-tight">
                  Grid
                </span>
              </button>
            </div>
          </div>
        </div>

        <!--   Alphabet Filtration Row     -->
        <AlphabetsInRow
            :selected-alphabet="selectedAlphabet"
            @select-alphabet="selectAlphabet"
        />

        <!--  Listing    -->
        <div class="pt-8 mt-1.5 mb-8">
          <div v-if="isLoading || barsList.length" class="grid gap-6" :class="[isGridView === 'grid' ? 'md:grid-cols-3' : 'grid-cols-1']">
            <template v-if="isLoading" v-for="i in pageInfo.itemsPerPage">
              <client-only>
                <BusinessCardSkeleton :has-grid-layout="isGridView === 'grid'"  />
              </client-only>
            </template>

            <template v-else v-for="(bar) in barsList">
              <BusinessCard
                  business-type="bars"
                  :data="bar"
                  :has-grid-layout="isGridView === 'grid'"
              />
            </template>
          </div>

          <template v-else>
            <NoRecordFound name="bars" :search-value="searchedValue" />
          </template>
        </div>

        <!--   Pagination     -->
        <template v-if="barsList?.length > 0">
          <CustomPagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @paginate="paginate"
          />
        </template>
      </div>
    </div>
  </div>
</template>
