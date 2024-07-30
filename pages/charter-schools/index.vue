<script setup lang="ts">
import type {TypesenseQueryParam} from "~/segments/common.types";
import {useSchoolsStore} from "~/segments/schools/store";
import AlphabetsInRow from "~/components/pages/common/AlphabetsInRow.vue";
import {scrollToTop} from "~/segments/utils";

const schoolsStore = useSchoolsStore();
const { schoolsList, total_page, schoolsFound } = storeToRefs(schoolsStore);

let toggleSideBar = ref<boolean>(false);
const route = useRoute();
const router = useRouter();
const isLoading = ref<boolean>(true);
const selectedAlphabet = ref<string>('');
const currentPage = ref<number>(Number(route?.query?.page) || 1);
const queryValue = route?.query?.q === "*" ? "" : route?.query?.q;
const searchedValue = ref<string>(
  Array.isArray(queryValue) ? queryValue.join(", ") : queryValue || ""
);

const totalPages = ref(total_page);
const itemsPerPage = ref<number>(24);
const isGridView = ref(
  route?.query?.view
    ? route?.query?.view === "grid"
      ? "grid"
      : "list"
    : "list"
); // Reactive variable to store the current view mode
type SelectValue = { key1: string } | null;
type SelectStuValue = { key2: string } | null;
// type SelectJoValue = { key3: string } | null;
const selectschValue = ref<SelectValue>(null);
const selectstuValue = ref<SelectStuValue>(null);
// const selectjobValue = ref<SelectJoValue>(null);

let alphabetFilter = ref('');
let checkboxesFilter = ref('');

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

const stuOptions = ref({
  icon: "SvgoGraduationHat",
  name: "stuOptions",
  data: [
    { id: "5", label: "0 to 100", value: "0 to 100", checked: false },
    { id: "6", label: "101 to 500", value: "101 to 500", checked: false },
    { id: "7", label: "501 to 1000", value: "501 to 1000", checked: false },
    { id: "8", label: "1001 to 2000", value: "1001 to 2000", checked: false },
    { id: "9", label: "2001 to 3000", value: "2001 to 3000", checked: false },
    { id: "10", label: "3001 to 5000", value: "3001 to 5000", checked: false },
    {
      id: "11",
      label: "5001 to 10,000",
      value: "5001 to 10000",
      checked: false,
    },
    { id: "12", label: "10,000+", value: "10000", checked: false },
  ],
});

const schOptions = ref({
  icon: "SvgoBuildingLight",
  name: "schOptions",
  data: [
    { id: "13", label: "0 to 10", value: "0 to 10", checked: false },
    { id: "14", label: "11 to 25", value: "11 to 25", checked: false },
    { id: "15", label: "26 to 50", value: "26 to 50", checked: false },
    { id: "16", label: "51 to 100", value: "51 to 100", checked: false },
    { id: "17", label: "100+", value: "100", checked: false },
  ],
});

// Function to switch layout
function switchView(view :string) {
  isGridView.value = view;
  localStorage.setItem('schoolsLayout', view);
  router.replace({
    path: "/charter-schools",
    query: {
      view: view,
      ...queryParams?.value,
    },
  });
};

onMounted(async () => {
  let savedLayout :string | null = '';
  if (process.client) {   // using process.client due to SSR
    if (localStorage.getItem('schoolsLayout')) savedLayout = localStorage.getItem('schoolsLayout');
    else if (route?.query?.view) savedLayout = route?.query?.view as string
    else savedLayout = 'list'
    isGridView.value = savedLayout as string;
  }
  if (route?.query?.q?.length) await search();  // if search param is there, call search() function
  else await fetchSchools(); // Initial fetch

  if (route?.query?.filter_by) {
    query.value.filter_by = route?.query?.filter_by.toString();
    const splitFilterBy = query?.value?.filter_by.split('&&');
    const alphabetFilterVal = splitFilterBy.filter(val => val.includes('name'))[0] || ''
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

const query = ref<TypesenseQueryParam>({
  q: route?.query?.q ? route?.query?.q.toString() : "*",
  per_page: itemsPerPage.value,
  page: currentPage.value,
  filter_by: ''
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

async function fetchSchools() {
  localStorage.setItem('schoolsLayout', isGridView.value)
  isLoading.value = true;
  await schoolsStore.fetchCharterSchools(query?.value);
  isLoading.value = false;
  totalPages.value = total_page?.value;
}
// Function to handle pagination
const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") currentPage.value--;
  else if (page === "next") currentPage.value++;
  else currentPage.value = page;
  query.value.page = currentPage?.value;

  router.replace({
    path: "/charter-schools",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });

  scrollToTop();
  fetchSchools();
};

function togglingSidebarVisibility() {
  toggleSideBar.value = !toggleSideBar.value;
  if (toggleSideBar.value) document.body.classList.add("overflow-hidden");
  else document.body.classList.remove("overflow-hidden");
}

const selectAlphabet = (letter: string) => {
  selectedAlphabet.value = letter;
  if (letter.length) alphabetFilter.value = `name:=${letter}*`
  else alphabetFilter.value = '';
  query.value.filter_by = getCharterFilterQuery(alphabetFilter.value, checkboxesFilter.value);
  router.replace({
    path: "/charter-schools",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });
  fetchSchools();
};

const handleInput = _debounce(() => {
  search(true);
}, 500);

const search = (resetToDefaultPage = false) => {
  query.value.q = searchedValue.value.toString() ?? "*";
  query.value.query_by = "name";
  if (resetToDefaultPage) query.value.page = 1;
  else query.value.page = route?.query?.page ? route.query.page : 1;  // search with page number if there's page number in the query params
  currentPage.value = 1;
  router.replace({
    path: "/charter-schools",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });
  fetchSchools();
};

let selectedValues = ref<string[]>([])
function filtersChanged(filterName :string, i :number, label :string, isChecked :boolean, toggleFlag = true) {
  jobOptions.value.data[i].checked = isChecked;
  const value = jobOptions.value.data[i].value

  if (isChecked) selectedValues.value.push(value);
  else selectedValues.value = selectedValues.value.filter(v => v !== value);

  if (selectedValues.value.length) checkboxesFilter.value = `job_count:[${[selectedValues.value]}]`;
  else checkboxesFilter.value = '';

  if (toggleFlag) processFiltration();
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

function processFiltration() {
  query.value.filter_by = getCharterFilterQuery(alphabetFilter.value, checkboxesFilter.value);
  router.replace({
    path: "/charter-schools",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });
  fetchSchools();
}

function getCharterFilterQuery(alphabetFilter :string, cbFilters :string) {
  let result :string[] = [];
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
            <div class="py-2 flex-col justify-start items-start gap-2.5 inline-flex w-full">
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
                  :total-jobs="schoolsFound"
                  :inside-sidebar="true"
                  @toggleSchoolOption="(f, i, l ,c) => filtersChanged(f, i, l, c, false)"
                />

<!--                <FilterSection-->
<!--                  title="No. of students"-->
<!--                  :options="stuOptions"-->
<!--                  total-jobs="12,000"-->
<!--                  @toggleSchoolOption="toggleSchoolOption"-->
<!--                  :inside-sidebar="true"-->
<!--                />-->

<!--                <FilterSection-->
<!--                  title="No. of schools"-->
<!--                  :options="schOptions"-->
<!--                  total-jobs="13"-->
<!--                  @toggleSchoolOption="toggleSchoolOption"-->
<!--                  :inside-sidebar="true"-->
<!--                />-->
              </div>
              <div class="pt-[18px] w-full">
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
          <div
            class="py-2 flex-col justify-start items-start gap-2.5 inline-flex"
          >
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
                :total-jobs="schoolsFound"
                @toggleSchoolOption="filtersChanged"
              />

<!--              <FilterSection-->
<!--                title="No. of students"-->
<!--                :options="stuOptions"-->
<!--                total-jobs="12,000"-->
<!--                @toggleSchoolOption="toggleSchoolOption"-->
<!--              />-->

<!--              <FilterSection-->
<!--                title="No. of schools"-->
<!--                :options="schOptions"-->
<!--                total-jobs="13"-->
<!--                @toggleSchoolOption="toggleSchoolOption"-->
<!--              />-->
            </div>
          </div>
        </div>
      </div>

      <div class="w-full xl:w-4/5 xl:px-8 pt-8 pb-8">
        <div class="flex-col justify-start items-start gap-1 inline-flex">
          <div class="text-gray-900 text-3xl font-semibold leading-[38px]">
            Charter Schools
          </div>
          <div class="text-gray-600 text-base font-normal leading-normal">
            Find job openings at any charter school.
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
              <div class="relative">
                <SvgoSearchIcon
                  class="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-500"
                  aria-hidden="true"
                />
                <input
                  v-model="searchedValue"
                  id="search-field"
                  class="block h-full rounded-lg w-full md:w-[320px] shadow border border-gray-300 bg-transparent py-[13px] pl-8 pr-0 text-black sm:text-sm"
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
                <div class="text-slate-700 text-sm font-semibold leading-tight">
                  List
                </div>
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
                <div class="text-gray-800 text-sm font-semibold leading-tight">
                  Grid
                </div>
              </button>
            </div>
          </div>
        </div>

        <!--   Alphabet Filtration Row     -->
        <AlphabetsInRow
            :selected-alphabet="selectedAlphabet"
            @select-alphabet="selectAlphabet"
        />

        <div class="mt-1.5 mb-8">
          <div v-if="isLoading || schoolsList?.length" class="grid gap-6 pt-8" :class="[isGridView === 'grid' ? 'md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1']">
            <template v-if="isLoading" v-for="i in 24">
              <client-only>
                <SchoolSkeleton :card-form="isGridView === 'grid'" />
              </client-only>
            </template>

            <template v-else v-for="(item) in schoolsList">
              <SchoolCard :school="item" :card-form="isGridView === 'grid'" />
            </template>
          </div>
          <template v-else>
            <NoRecordFound name="schools" :search-value="searchedValue" />
          </template>
        </div>
        <div v-if="schoolsList?.length > 0">
          <CustomPagination
            :current-page="currentPage"
            :total-pages="totalPages"
            @paginate="paginate"
          />
        </div>
      </div>
    </div>
  </div>
</template>
