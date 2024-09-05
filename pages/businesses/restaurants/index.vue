<script setup lang="ts">
import {useRestaurantStore} from "~/segments/restaurants/store";
import type {TypesenseQueryParam} from "~/segments/common.types";
import AlphabetsInRow from "~/components/pages/common/AlphabetsInRow.vue";
import BusinessCardSkeleton from "~/components/pages/business-types/BusinessCardSkeleton.vue";

const restaurantStore = useRestaurantStore();
const { restaurantsList, total_page } = storeToRefs(restaurantStore);

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

let alphabetFilter = ref('');
let checkboxesFilter = ref('');

const jobOptions = ref({
  icon: "SvgoBriefCase",
  name: "jobOptions",
  data: [
    { id: "1", label: "1 to 10", value: "1..10", checked: false },
    { id: "2", label: "11 to 50", value: "11..50", checked: false },
    { id: "3", label: "51 to 100", value: "51..100", checked: false },
    { id: "4", label: "100+", value: ">100", checked: false }
  ],
});

const stuOptions = ref({
  icon: "SvgoGraduationHat",
  name: "stuOptions",
  data: [
    { id: "5", label: "0 to 100", value: "0..100", checked: false },
    { id: "6", label: "101 to 500", value: "101..500", checked: false },
    { id: "7", label: "501 to 1000", value: "501..1000", checked: false },
    { id: "8", label: "1001 to 2000", value: "1001..2000", checked: false },
    { id: "9", label: "2001 to 3000", value: "2001..3000", checked: false },
    { id: "10", label: "3001 to 5000", value: "3001..5000", checked: false },
    {
      id: "12",
      label: "5001 to 10,000",
      value: "5001..10000",
      checked: false,
    },
    { id: "13", label: "10,000+", value: ">10000", checked: false },
  ],
});

const schOptions = ref({
  icon: "SvgoBuildingLight",
  name: "schOptions",
  data: [
    { id: "14", label: "0 to 10", value: "0..10", checked: false },
    { id: "15", label: "11 to 25", value: "11..25", checked: false },
    { id: "16", label: "26 to 50", value: "26..50", checked: false },
    { id: "17", label: "51 to 100", value: "51..100", checked: false },
    { id: "18", label: "100+", value: ">100", checked: false },
  ],
});

// Function to switch to layout view
const switchView = (view: string) => {
  isGridView.value = view;
  localStorage.setItem('restaurantsLayout', view);
  router.replace({
    path: "/businesses/restaurants",
    query: {
      view: view,
      ...queryParams?.value,
    },
  });
};

onMounted(async () => {
  let savedLayout :string | null = '';
  if (process.client) {   // using process.client due to SSR
    if (localStorage.getItem('restaurantsLayout')) savedLayout = localStorage.getItem('restaurantsLayout');
    else if (route?.query?.view) savedLayout = route?.query?.view as string
    else savedLayout = 'list'
    isGridView.value = savedLayout as string;
  }
  if (route?.query?.q?.length) await search();  // if search param is there, call search() function
  else await fetchRestaurants(); // Initial fetch
  if (route?.query?.filter_by) {
    query.value.filter_by = route?.query?.filter_by.toString();
    const splitFilterBy = query?.value?.filter_by.split('&&');
    const alphabetFilterVal = splitFilterBy.filter(val => val.includes('business_name'))[0] || ''
    if (alphabetFilterVal.length) {
      selectedAlphabet.value = alphabetFilterVal?.match(/:=([a-zA-Z]+)/)[1] || '';
      alphabetFilter.value = alphabetFilterVal;
    }

    const filteredJobCount = splitFilterBy.filter(val => val.includes('job_count'))[0] || ''
    const filteredSclCount = splitFilterBy.filter(val => val.includes('school_count'))[0] || ''
    const filteredStdCount = splitFilterBy.filter(val => val.includes('student_count'))[0] || ''
    setCheckedValues(filteredJobCount, filteredSclCount, filteredStdCount);
    checkboxesFilter.value = [filteredJobCount, filteredStdCount, filteredSclCount].join('&&');
    parseFilterString(checkboxesFilter.value);
  }
});

function parseFilterString(filterString :string) {
  const preSelectedValues = {};
  const filterParts = filterString.split("&&");
  filterParts.forEach(part => {
    const [key, valueStr] = part.split(":");
    preSelectedValues[key] = valueStr?.match(/\[(.*?)\]/)[1]
        .split(",").map(value => value.trim());
  });
  selectedValues.value = preSelectedValues;
}

const setCheckedValues = (jobFilter :string, schoolFilter: string, studentFilter :string) => {
  if (jobFilter.length) {
    const jobRanges = jobFilter.match(/\d+\s*to\s*\d+|\d+|>\d+/g);
    jobRanges?.forEach((range: any) => {
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

  if (schoolFilter.length) {
      const schoolRanges = schoolFilter.match(/\d+\s*to\s*\d+|\d+|>\d+/g);
      schoolRanges?.forEach((range: any) => {
        schOptions.value.data.forEach((item) => {
          const [itemStart, itemEnd] = item.label.split(" to ").map(Number);
          if (range.startsWith(">")) {
            const foundItem = schOptions.value.data.find(
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

    if (studentFilter.length) {
      const studentRanges = studentFilter.match(/\d+\s*to\s*\d+|\d+|>\d+/g);
      studentRanges?.forEach((range: any) => {
        stuOptions.value.data.forEach((item) => {
          const [itemStart, itemEnd] = item.label.split(" to ").map(Number);
          if (range.startsWith(">")) {
            const foundItem = stuOptions.value.data.find(
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
  filter_by: 'status:=active&&business_type:=Restaurant',
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

async function fetchRestaurants() {
  localStorage.setItem('restaurantsLayout', isGridView.value)
  isLoading.value = true;
  await restaurantStore.fetchRestaurants(query?.value);
  isLoading.value = false;
  totalPages.value = total_page?.value;
}

const paginate = (page: number | "prev" | "next") => {
  if (page === "prev") currentPage.value--;
  else if (page === "next") currentPage.value++;
  else currentPage.value = page;
  query.value.page = currentPage?.value;

  router.replace({
    path: "/businesses/restaurants",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });

  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
  fetchRestaurants();
};

function togglingSidebarVisibility() {
  toggleSideBar.value = !toggleSideBar.value;
  if (toggleSideBar.value) document.body.classList.add("overflow-hidden");
  else document.body.classList.remove("overflow-hidden");
}

let selectedValues = ref<string[]>([]);
function filtersChanged(filterName :string, i :number, label :string, isChecked :boolean, toggleFlag = true) {
  let targetOptions :any = {};
  let filterPrefix :string = '';

  // Determine which option set is being changed
  switch (filterName) {
    case "jobOptions":
      targetOptions = jobOptions.value;
      filterPrefix = "job_count";
      break;
    case "stuOptions":
      targetOptions = stuOptions.value;
      filterPrefix = "student_count";
      break;
    case "schOptions":
      targetOptions = schOptions.value;
      filterPrefix = "school_count";
      break;
  }

  // Update the checked state
  targetOptions.data[i].checked = isChecked;
  const value = targetOptions.data[i].value;

  // Update selectedValues based on the specific filter type
  if (isChecked) {
    selectedValues.value[filterPrefix] = selectedValues.value[filterPrefix] || [];
    selectedValues.value[filterPrefix].push(value);
  } else {
    selectedValues.value[filterPrefix] = selectedValues.value[filterPrefix].filter(v => v !== value);
    if (selectedValues.value[filterPrefix].length === 0) {
      delete selectedValues.value[filterPrefix];
    }
  }

  if (toggleFlag) processFiltration();
}

function applyFiltersOnClick() {
  toggleSideBar.value = false;
  processFiltration();
}

function processFiltration() {
  if (Object.keys(selectedValues.value).length) {
    const filterParts = Object.entries(selectedValues.value)
        .map(([prefix, values]) => `${prefix}:[${values.join(",")}]`)
        .filter(part => part.length > 0);

    checkboxesFilter.value = filterParts.length > 0 ? filterParts.join("&&") : "";
  } else checkboxesFilter.value = '';
  query.value.filter_by = getRestaurantFilterQuery(alphabetFilter.value, checkboxesFilter.value);

  router.replace({
    path: "/businesses/restaurants",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });

  fetchRestaurants();
}
const clearAll = (applyResetFilters :boolean) => {
  [jobOptions, stuOptions, schOptions].forEach((option) => {
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

const selectAlphabet = (letter: string) => {
  selectedAlphabet.value = letter;
  if (letter.length) alphabetFilter.value = `business_name:=${letter}*`
  else alphabetFilter.value = '';
  query.value.filter_by = getRestaurantFilterQuery(alphabetFilter.value, checkboxesFilter.value);
  router.replace({
    path: "/businesses/restaurants",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });
  fetchRestaurants();
};

const handleInput = _debounce(() => {
  search(true);
}, 500); // Adjust the debounce delay as needed (in milliseconds)

const search = (resetToDefaultPage = false) => {
  localStorage.setItem('restaurantsLayout', isGridView.value)
  query.value.q = searchedValue.value.toString() ?? "*";
  query.value.query_by = "business_name";
  if (resetToDefaultPage) query.value.page = 1;
  else query.value.page = route?.query?.page ? route.query.page : 1;   // search with page number if there's page number in the query params
  currentPage.value = 1;
  router.replace({
    path: "/businesses/restaurants",
    query: {
      view: isGridView.value,
      ...queryParams.value,
    },
  });
  fetchRestaurants();
};

function getRestaurantFilterQuery(alphabetFilter :string, cbFilters :string) {
  let result :string[] = [];
  result.push('status:=active&&business_type:=Restaurant');
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
                  <div class="text-gray-700 text-base font-semibold leading-normal">
                    Filters
                  </div>
                </div>
                <div class="justify-center items-center gap-1.5 flex">
                  <button
                    @click="clearAll(false)"
                    class="text-brand-800 text-sm font-semibold leading-tight"
                  >Clear All</button>
                </div>
              </div>

              <div class="divide-y divide-gray-200">
                <FilterSection
                  title="No. of jobs"
                  :options="jobOptions"
                  total-jobs=""
                  @toggleSchoolOption="(f, i, l ,c) => filtersChanged(f, i, l, c, false)"
                  :inside-sidebar="true"
                />

                <FilterSection
                  title="No. of students"
                  :options="stuOptions"
                  total-jobs=""
                  @toggleSchoolOption="(f, i, l ,c) => filtersChanged(f, i, l, c, false)"
                  :inside-sidebar="true"
                />

                <FilterSection
                  title="No. of schools"
                  :options="schOptions"
                  total-jobs=""
                  @toggleSchoolOption="(f, i, l ,c) => filtersChanged(f, i, l, c, false)"
                  :inside-sidebar="true"
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
            <div class="justify-between items-center inline-flex w-full border-b border-gray-200 pb-2">
              <div class="justify-start items-center gap-3 flex">
                <SvgoFilterLines class="size-6" />
                <div class="text-gray-700 text-base font-semibold leading-normal">
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
                total-jobs=""
                @toggleSchoolOption="filtersChanged"
              />

              <FilterSection
                title="No. of students"
                :options="stuOptions"
                total-jobs=""
                @toggleSchoolOption="filtersChanged"
              />

              <FilterSection
                title="No. of schools"
                :options="schOptions"
                total-jobs=""
                @toggleSchoolOption="filtersChanged"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="w-full xl:w-4/5 xl:px-8 pt-8 pb-8">
        <div class="flex-col justify-start items-start gap-1 inline-flex">
          <div class="text-gray-900 text-3xl font-semibold leading-[38px]">
            Restaurants
          </div>
          <div class="text-gray-600 text-base font-normal leading-normal">
            Find job openings at any restaurant.
          </div>
        </div>

        <div class="py-8 flex sm:flex-row flex-col gap-4 justify-between">
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
          <div v-if="isLoading || restaurantsList.length" class="grid gap-6" :class="[isGridView === 'grid' ? 'md:grid-cols-3' : 'grid-cols-1']">
            <template v-if="isLoading" v-for="i in 24">
              <client-only>
                <BusinessCardSkeleton :has-grid-layout="isGridView === 'grid'"  />
              </client-only>
            </template>

            <template v-else v-for="(bar) in restaurantsList">
              <BusinessCard
                  business-type="restaurants"
                  :data="bar"
                  :has-grid-layout="isGridView === 'grid'"
              />
            </template>
          </div>

          <template v-else>
            <NoRecordFound name="restaurants" :search-value="searchedValue" />
          </template>
        </div>

        <!--   Pagination     -->
        <template v-if="restaurantsList?.length > 0">
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
