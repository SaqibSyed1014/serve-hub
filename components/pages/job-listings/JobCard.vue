<script setup lang="ts">
import {getDaysDifference} from "~/segments/utils";

defineProps<{
  job :Job,
  cardForm: Boolean
  showJobDescription: Boolean
}>()
</script>

<template>
  <NuxtLink :to="`/jobs/${job.job_slug}`">
    <!-- Grid Form Card  -->
    <div v-if="cardForm" class="job-card flex flex-col gap-5 bg-white border border-gray-200 shadow-xs rounded-xl p-5 h-full">
      <div class="job-card-header">
        <div class="flex justify-between">
          <div v-if="job.job_logo"  class="flex place-items-center rounded-full overflow-hidden w-12 h-12 shrink-0">
            <img :src="job.job_logo" :alt="job.job_title" class="w-full h-full object-cover">
          </div>
          <SvgoBuilding v-else class="size-12" />

          <div class="job-badge">
            {{ getDaysDifference(job.date_posted) }}
          </div>
        </div>
        <div class="pt-3">
          <p class="font-semibold line-clamp-2">{{ job.job_title }}</p>

          <p v-if="job?.organization_name" class="text-gray-600 text-sm">{{ job.organization_name }}</p>
        </div>
      </div>
      <div class="job-post-body flex flex-col gap-4">
        <div class="flex gap-3 font-medium">
          <div v-if="job?.job_location" class="badges-outline">
            {{ job.job_location }}
          </div>

          <div v-if="job?.job_role" class="badges-outline">
            <div class="w-2 h-2 rounded-full bg-blue-500"/>
            {{ job.job_role }}
          </div>
        </div>

        <template v-if="showJobDescription">
          <div v-html="job.job_description" class="text-gray-600" />
        </template>
      </div>
      <div class="job-post-footer flex items-center gap-5 font-medium text-gray-600">
        <div v-if="job?.employment_type" class="flex items-center gap-2">
          <SvgoClock class="w-5 h-5 text-gray-400" />
          <span>{{ job.employment_type }}</span>
        </div>

        <div v-if="job?.organization_type" class="flex items-center capitalize gap-2">
          <SvgoBuilding class="w-5 h-5 text-gray-400" />
          <span>{{ job.organization_type }}</span>
        </div>
      </div>
    </div>

    <!-- List Form Card  -->
    <div v-else class="job-card flex flex-col justify-between gap-5 bg-white border border-gray-200 shadow-xs relative rounded-xl p-5">
      <div class="job-card-top">
        <div class="flex justify-between gap-3">
          <div class="flex max-sm:flex-col sm:items-center gap-3">
            <div v-if="job.job_logo" class="flex place-items-center rounded-full overflow-hidden w-12 h-12 shrink-0">
              <img :src="job.job_logo" :alt="job.job_title" class="w-full h-full object-cover">
            </div>
            <SvgoBuilding v-else class="size-12 shrink-0"/>

            <div>
              <p class="font-semibold max-sm:line-clamp-2 sm:w-[80%] xl:w-auto">{{ job.job_title }}</p>

              <p class="text-gray-600 text-sm">{{ job.organization_name }}</p>
            </div>
          </div>
          <div v-if="job?.date_posted" class="job-badge absolute top-5 right-5">
            {{ getDaysDifference(job.date_posted) }}
          </div>
        </div>
      </div>

      <div class="job-card-bottom flex max-md:flex-col-reverse justify-between md:items-center">
        <div class="flex items-center gap-5 text-gray-600 font-medium pt-5">
          <div v-if="job?.employment_type" class="flex items-center gap-2">
            <SvgoClock class="w-5 h-5 text-gray-400" />
            <span>{{ job.employment_type }}</span>
          </div>

          <div v-if="job?.organization_type" class="flex items-center capitalize gap-2">
            <SvgoCurrencyDollar class="w-5 h-5 text-gray-400" />
            <span>{{ job.organization_type }}</span>
          </div>
        </div>

        <div class="flex gap-3 mt-auto">
          <div v-if="job?.job_location" class="badges-outline">
            {{ job.job_location }}
          </div>

          <div v-if="job?.job_role" class="badges-outline">
            <div class="w-2 h-2 rounded-full bg-blue-500"/>
            {{ job.job_role }}
          </div>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="postcss">
.badges-outline{
  @apply flex gap-2 items-center border border-gray-300 shadow-xs rounded-md px-2 py-0.5 h-fit text-xs
}
.job-badge{
  @apply flex justify-center items-center bg-brand-500 text-white rounded-2xl text-sm h-fit px-2.5 py-0.5 shrink-0
}
</style>
