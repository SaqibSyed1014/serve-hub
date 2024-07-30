<script setup lang="ts">
import {useSchoolsStore} from "~/segments/schools/store";
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import OrgMapLocation from "~/components/pages/schoolDistrict/OrgMapLocation.vue";

const router = useRouter();
const route = useRoute();
const schoolStore = useSchoolsStore();

const { charterSchoolDetails, schoolJobs } = storeToRefs(schoolStore);

const activeTab = ref(0);
const tabs = ref([
  { name: "About Charter School" },
  { name: "Open Jobs" },
  { name: "Location" },
]);

const isSchoolFetching = ref<boolean>(true);

onMounted(async () => {
  isSchoolFetching.value = true;
  await schoolStore.fetchCharterSchoolDetails(route.params?.id as string);
  isSchoolFetching.value = false;
});

const searchedJob= ref<string>('');

// remove the 'About Charter School tab if no description is found'
watch(() => charterSchoolDetails.value, (val) => {
  if (!val?.organization_description.length) {
    tabs.value[0].name = '';
    activeTab.value = 1;
  }
})
</script>

<template>
  <div v-if="isSchoolFetching" class="container">
    <div class="flex justify-center items-center h-[calc(100vh-80px)] w-full">
      <BaseSpinner size="lg" :show-loader="isSchoolFetching" />
    </div>
  </div>

  <div v-else class="border-t md:border-b border-gray-200 mb-24">
    <div class="md:container flex">
      <!-- Sidebar -->
      <div class="flex flex-col border-r border-gray-200">
        <div class="sticky right-0 top-0 w-full">
          <aside
            class="sticky top-0 z-[1] w-[260px] hidden lg:flex flex-col pt-8"
          >
            <!-- Tabs -->
            <div class="flex flex-col">
              <template v-for="(tab, index) in tabs" :key="index">
                <button
                  v-if="tab.name.length"
                  :class="activeTab === index
                      ? 'text-brand-800 text-sm font-semibold py-2 px-3 flex items-center justify-between border-l-2 border-brand-600'
                      : 'py-2 px-3 flex items-center justify-between text-sm text-gray-500 ' "
                  @click="activeTab = index"
                >
                  <span>{{ tab.name }}</span>
                </button>
              </template>
            </div>
          </aside>
        </div>
      </div>

      <!-- Main Content -->
      <main class="pt-8 md:pb-10 w-full">
        <div>
          <div class="w-full h-5 justify-between items-start inline-flex pl-3 sm:pl-0">
            <div class="pl-3 justify-start items-center gap-3 hidden lg:flex">
              <div class="justify-center items-center flex">
                <NuxtLink
                  to="/charter-schools"
                  class="text-slate-600 text-sm font-medium leading-tight"
                >
                  Charter Schools
                </NuxtLink>
              </div>
              <SvgoChevronRight class="size-4" />
              <div class="justify-center items-center flex">
                <div class="text-blue-800 text-sm font-semibold leading-tight">
                  {{ charterSchoolDetails.name }}
                </div>
              </div>
            </div>
            <button
              @click="router.back()"
              type="button"
              class="justify-center items-center gap-1.5 flex group"
            >
              <SvgoArrowLeftBlue
                class="size-5 group-hover:-translate-x-[8px] transition"
              />
              <div class="text-blue-800 text-sm font-semibold leading-tight">
                Back
              </div>
            </button>
          </div>

          <div class="pt-5">
            <img
              src="/images/schoolDistrict/cover.webp"
              class="h-[140px] md:h-60 w-full object-cover"
            />
          </div>
          <div class="-mt-5 px-4 lg:px-8">
            <div
              class="justify-start lg:items-center lg:gap-6 flex flex-col lg:flex-row"
            >
              <div class="w-24 h-24 shrink-0 bg-white rounded-[10px] shadow-lg flex justify-center items-center mb-2">
                <template v-if="charterSchoolDetails?.logo_path">
                  <img :src="charterSchoolDetails.logo_path" :alt="charterSchoolDetails.name" class="w-full h-full object-cover">
                </template>

                <SvgoBuilding v-else class="size-14 shrink-0" />
              </div>
              <div class="flex-col justify-start items-start gap-5 inline-flex">
                <BaseTooltip :tooltip-content="charterSchoolDetails.name" id="title">
                  <h2 class="text-2xl lg:text-3xl md:text-ellipsis md:line-clamp-1">
                    {{ charterSchoolDetails.name }}
                  </h2>
                </BaseTooltip>
              </div>
            </div>

            <div
              class="flex flex-wrap gap-x-12 gap-y-6 lg:gap-x-14 pb-6 pt-6 lg:pt-0 border-b border-gray-200"
            >
              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight">
                  Location
                </span>
                <div class="inline-flex gap-2">
                  <SvgoUsFlag class="size-5" />
                  <span class="text-slate-600 text-base font-medium leading-normal">
                    {{ `${charterSchoolDetails.city}, ${charterSchoolDetails.county_name}` }}
                  </span>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight">
                  Number of Schools
                </span>
                <div class="inline-flex gap-2">
                  <SvgoBuilding class="size-5 text-gray-500" />
                  <span class="text-slate-600 text-base font-medium leading-normal">0</span>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight">
                  Number of Students
                </span>
                <div class="inline-flex gap-2">
                  <SvgoGraduationHat class="size-5" />
                  <span class="text-slate-600 text-base font-medium leading-normal">0</span>
                </div>
              </div>

              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight">
                  Number of Jobs
                </span>
                <div class="inline-flex gap-2">
                  <SvgoBriefCase class="size-5" />
                  <span class="text-slate-600 text-base font-medium leading-normal">{{ charterSchoolDetails.job_count }}</span>
                </div>
              </div>

              <div class="flex flex-col gap-2 col-span-2 sm:col-span-1">
                <span class="text-gray-900 text-sm font-medium leading-tight">
                  Website
                </span>
                <div class="inline-flex gap-2">
                  <SvgoGlobe class="size-5 shrink-0" />
                  <a
                    v-if="charterSchoolDetails.website_url && charterSchoolDetails.website_url !== 'No Data'"
                    :href="charterSchoolDetails.website_url"
                    target="_blank"
                    class="text-brand-800 text-base font-medium underline leading-normal hover:text-brand-600 transition"
                  >
                    Visit Website
                  </a>
                  <span v-else>N/A</span>
                </div>
              </div>
            </div>

            <form class="w-full mx-auto block lg:hidden pt-8">
              <select
                v-model="activeTab"
                id="countries"
                class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              >
                <option disabled value="">Choose an option</option>
                <template v-for="(option, index) in tabs" :key="index">
                  <option
                    v-if="option.name.length"
                    :value="index"
                    @click="activeTab = index"
                  >
                    {{ option.name }}
                  </option>
                </template>
              </select>
            </form>

            <div
              :class="
                activeTab === 1
                  ? 'flex-col sm:flex-row w-full justify-end items-end gap-5 flex pt-8  pb-5'
                  : 'flex-col sm:flex-row w-full justify-start items-start gap-5 flex pt-8  pb-5'
              "
            >
              <div class="justify-start items-start gap-4 inline-flex w-full">
                <div class="flex-col justify-start items-start gap-1 inline-flex">
                  <p class="text-gray-900 text-2xl md:text-3xl font-semibold leading-[38px]">
                    {{
                      activeTab === 0 && charterSchoolDetails.organization_description.length
                        ? "About Charter School"
                        : activeTab === 1
                        ? "List of Jobs"
                        : activeTab === 2
                        ? "Location" : ""
                    }}
                  </p>
                  <p class="text-slate-600 text-base font-normal leading-normal">
                    {{
                      activeTab === 0 && charterSchoolDetails.organization_description.length
                        ? "Read out the information about patlo alto unified school."
                        : activeTab === 1
                        ? "Have a look to the list of Jobs." : ""
                    }}
                  </p>
                </div>
              </div>

              <div
                v-if="activeTab === 1 && charterSchoolDetails.job_count"
                class="w-full sm:w-1/2 sm:flex sm:items-end sm:justify-end relative"
              >
                <label for="search-field" class="sr-only">Search</label>
                <SvgoSearchIcon
                  class="pointer-events-none absolute inset-y-0 left-2 h-full w-5 text-gray-500"
                  aria-hidden="true"
                />
                <input
                  v-model="searchedJob"
                  id="search-field"
                  class="form-input w-full md:w-[320px] pl-8"
                  placeholder="Search..."
                  type="search"
                  name="search"
                />
              </div>
            </div>

            <!--   Charter School Description   -->
            <template v-if="activeTab === 0">
              <div class="description-content mb-5">
                <div v-html="charterSchoolDetails.organization_description"></div>
              </div>
            </template>

            <div v-if="activeTab === 1">
              <OrgOpenedJobsList
                  type="school"
                  :opened-jobs="schoolJobs"
                  :searched-keyword="searchedJob"
              />
            </div>

<!--            <PhotoCard :data="photoList" v-if="activeTab === 2" />-->
<!--            <VideoCard v-if="activeTab === 3" :data="videoList" />-->

            <OrgMapLocation v-if="activeTab === 2" :coordinates="[charterSchoolDetails.geo_lat, charterSchoolDetails.geo_lng]" />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
.description-content :deep(ul) {
  @apply list-disc ml-6 mb-4
}
.description-content :deep(p) {
  @apply mb-2
}
.description-content :deep(a) {
  word-break: break-word;
}
</style>
