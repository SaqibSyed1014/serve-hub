<script setup lang="ts">
import { register } from 'swiper/element/bundle';
import type { JobSearchFilters } from "~/segments/common.types";
import { useJobStore } from "~/segments/jobs/store";
import {encode} from "js-base64";
import {getFilterByQuery} from "~/components/core/constants/jobs.constants";
register();

const router = useRouter();
const jobStore = useJobStore();

const { jobListings, itemsFound } = storeToRefs(jobStore)

function searchJobs(filters :JobSearchFilters) {
  jobStore.setCoordinates(filters.coordinates);  // saving coordinates in store for persistence purpose
  const locationName = filters.location;
  let appliedLocationFilter = '';
  if (filters.coordinates.lat !== 0 && filters.coordinates.lng !== 0) {
    appliedLocationFilter = `geo_location:(${filters.coordinates.lat}, ${filters.coordinates.lng}, 10 mi)`
  }
  const queryParams = {
    keyword: filters.keyword.length ? filters.keyword : '*',
    ...(locationName.length && { location: locationName }),  // skip location from url if no location is searched
    page: 1,
    mode: 'list',
    filter_by: getFilterByQuery('(min_salary:>=20000&&max_salary:<=200000)||is_salary_empty:true', '', appliedLocationFilter)
  }

  router.push({
    path: '/jobs',
    query: {
      params: JSON.stringify(queryParams)
    }
  });
}
</script>

<template>
  <section class="hero-section overflow-hidden">
    <div class="container relative">
      <div class="content text-center relative z-20 py-24">
        <h1 class="font-inter font-semibold text-4xl md:text-5xl lg:text-6xl tracking-[-2%] w-full md:w-10/12 2xl:w-8/12 mx-auto">
          Your Future in Education <span class="text-brand-600">Awaits</span>
        </h1>

        <p class="text-gray-600 text-lg md:text-xl w-full md:w-8/12 mx-auto pt-6 pb-12">
          Embark on a rewarding educational career, from classroom teaching to district office roles
        </p>

        <SearchBar
            @updated-values="searchJobs"
            class="md:max-w-[800px] xl:max-w-[875px] mx-auto"
        />
      </div>

      <div class="dashed-ring forth-ring" />
      <div class="dashed-ring third-ring" />
      <div class="dashed-ring second-ring" />
      <div class="dashed-ring first-ring" />


      <div class="bg-brand-800/60 w-[300px] h-[300px] absolute -bottom-10 -right-1/4 blur-3xl z-[-1]"></div>
      <div class="bg-brand-100 w-[650px] h-[350px] absolute -bottom-1/2 -left-1/4 blur-3xl z-[-1]"></div>
    </div>

    <template v-if="itemsFound !== 0">
      <swiper-container
          :loop="true"
          :space-between="20"
          slides-per-view="auto"
          :auto-resize="false"
          :autoplay-delay="1"
          :autoplay-disable-on-interaction="false"
          :speed="4000"
          class="jobs-slider z-20"
      >
        <swiper-slide v-for="(job, i) in jobListings" :key="i" class="!w-[340px]">
          <JobCard :job="job" :card-form="true" :show-job-description="false"/>
        </swiper-slide>
      </swiper-container>
    </template>
  </section>
</template>
