<script setup lang="ts">
import OrgMapLocation from "~/components/pages/schoolDistrict/OrgMapLocation.vue";
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import BusinessOpenedJobsList from "~/components/pages/common/BusinessOpenedJobsList.vue";
import {defaultImageMockup} from "~/components/core/constants/home.constants";
import {useBusinessesStore} from "~/segments/business/store";

const activeTab = ref(0);

const tabs = ref([
  {
    name: "About Business",
    heading: "About The Business",
    subHeading: "Read out the information about"
  },
  {
    name: "Open Jobs",
    heading: "List of Jobs",
    subHeading: " Find exciting opportunities at"
  }
]);

const route = useRoute();
const router = useRouter();
const businessStore = useBusinessesStore();

const { businessDetails, businessJobs } = storeToRefs(businessStore);

const isBarFetching = ref<boolean>(true);

onMounted(async () => {
  isBarFetching.value = true;
  await businessStore.fetchBusinessDetails(route.params?.id as string);
  isBarFetching.value = false;
})

const searchedJob= ref<string>('');

// remove the About Business tab if no description is found
watch(() => businessDetails.value, (val) => {
  if (!val?.organization_description.length) {
    tabs.value[0].name = '';
    activeTab.value = 1;
  }
})
</script>

<template>
  <div v-if="isBarFetching" class="container">
    <div class="flex justify-center items-center h-[calc(100vh-80px)] w-full">
      <BaseSpinner size="lg" :show-loader="isBarFetching" />
    </div>
  </div>

  <div v-else-if="businessDetails" class="border-t md:border-b border-gray-200 mb-24">
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
        <!-- Content for each tab -->
        <div>
          <div
              class="w-full h-5 justify-between items-start inline-flex pl-3 sm:pl-0"
          >
            <div class="pl-3 justify-start items-center gap-3 hidden lg:flex">
              <div class="justify-center items-center flex">
                <NuxtLink
                    to="/businesses"
                    class="text-slate-600 text-sm font-medium leading-tight"
                >
                  Businesses
                </NuxtLink>
              </div>
              <SvgoChevronRight class="size-4" />
              <div class="justify-center items-center flex">
                <div class="text-brand-800 text-sm font-semibold leading-tight">
                  {{ businessDetails.name }}
                </div>
              </div>
            </div>
            <button
                @click="router.back()"
                type="button"
                class="justify-center items-center gap-1.5 flex group text-brand-800"
            >
              <SvgoArrowLeft
                  class="size-5 group-hover:-translate-x-2 transition"
              />
              <span class="text-sm font-semibold leading-tight">Back</span>
            </button>
          </div>

          <div class="pt-5">
            <img
                :src="defaultImageMockup"
                alt="Default Cover Image"
                class="h-[140px] md:h-60 w-full object-cover"
            />
          </div>
          <div class="-mt-5 px-4 lg:px-8">
            <div
                class="justify-start lg:items-center lg:gap-6 flex flex-col lg:flex-row"
            >
              <div class="w-24 h-24 shrink-0 bg-white rounded-[10px] shadow-lg flex justify-center items-center mb-2">
                <template v-if="businessDetails?.logo_path?.length">
                  <img :src="businessDetails.logo_path" :alt="businessDetails.name" class="w-full h-full object-cover">
                </template>

                <SvgoBuilding v-else class="size-14 shrink-0" />
              </div>
              <div class="flex-col justify-start items-start gap-5 inline-flex">
                <BaseTooltip :tooltip-content="businessDetails.name" id="orgTitle">
                  <h2 class="text-2xl lg:text-3xl md:text-ellipsis md:line-clamp-1">
                    {{ businessDetails.name }}
                  </h2>
                </BaseTooltip>
              </div>
            </div>

            <div
                class="flex max-sm:flex-wrap gap-x-12 gap-y-6 lg:gap-x-14 pb-6 pt-6 lg:pt-0 border-b border-gray-200"
            >
              <div class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight">Location</span>
                <div class="inline-flex gap-2 text-slate-600">
                  <SvgoUsFlag class="size-5 shrink-0" />
                  <span class="text-base font-medium leading-normal">
                    {{ `${businessDetails.city}, ${businessDetails.state_code}` }}
                  </span>
                </div>
              </div>

              <div v-if="businessDetails?.business_type" class="flex flex-col gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight">
                  Business Type
                </span>
                <div class="inline-flex gap-2 text-slate-600">
                  <SvgoBuilding class="size-5" />
                  <span class="text-base font-medium leading-normal">
                    {{ businessDetails.business_type }}
                  </span>
                </div>
              </div>

              <div class="flex flex-col items-start gap-2">
                <span class="text-gray-900 text-sm font-medium leading-tight">Number of Jobs</span>
                <div @click="activeTab = 1" class="inline-flex gap-2 group text-slate-600 hover:text-slate-800 cursor-pointer">
                  <SvgoBriefCase class="size-5" />
                  <span class="text-base font-medium leading-normal group-hover:underline">
                    {{ businessDetails.job_count }}
                  </span>
                </div>
              </div>

              <div v-if="businessDetails?.website_url" class="flex flex-col gap-2 col-span-2 sm:col-span-1">
                <span class="text-gray-900 text-sm font-medium leading-tight">Website</span>
                <div class="inline-flex gap-2">
                  <SvgoGlobe class="size-5 shrink-0" />
                  <a
                      :href="businessDetails.website_url"
                      target="_blank"
                      class="text-brand-800 text-base font-medium underline leading-normal hover:text-brand-600 transition"
                  >
                    Visit Website
                  </a>
                </div>
              </div>
            </div>

            <form class="w-full mx-auto block lg:hidden pt-8">
              <select
                  v-model="activeTab"
                  id="countries"
                  class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full p-2.5"
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
                      activeTab === 0 && businessDetails.organization_description.length
                          ? tabs[activeTab].heading
                          : activeTab === 1
                              ? tabs[activeTab].heading : ""
                    }}
                  </p>
                  <p class="text-slate-600 text-base font-normal leading-normal">
                    {{
                      activeTab === 0 && businessDetails.organization_description.length
                          ? `${tabs[activeTab].subHeading} ${businessDetails.name}.`
                          : activeTab === 1 ? `${tabs[activeTab].subHeading} ${businessDetails.name}` : ""
                    }}
                  </p>
                </div>
              </div>

              <div
                  v-if="activeTab === 1 && businessDetails.job_count"
                  class="w-full sm:w-1/2 sm:flex sm:items-end sm:justify-end relative"
              >
                <label for="search-field" class="sr-only">Search</label>
                <div class="search-input-prepended">
                  <SvgoSearchIcon
                      class="search-prepend-icon"
                      aria-hidden="true"
                  />
                  <input
                      v-model="searchedJob"
                      id="search-field"
                      class="search-input !w-full md:!w-[320px]"
                      placeholder="Search..."
                      type="search"
                      name="search"
                  /></div>
              </div>
            </div>

            <!--   Bar Description   -->
            <template v-if="activeTab === 0">
              <div class="description-content mb-5">
                <div v-html="businessDetails.organization_description"></div>
              </div>
            </template>

            <div v-if="activeTab === 1">
              <BusinessOpenedJobsList
                :opened-jobs="businessJobs"
                :searched-keyword="searchedJob"
              />
            </div>


            <OrgMapLocation v-if="activeTab === 3" :coordinates="[businessDetails.geo_lat, businessDetails.geo_lng]" />
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
