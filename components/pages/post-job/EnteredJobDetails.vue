<script setup lang="ts">
import {employmentOptions} from "~/components/core/constants/post-job-form.constants";

const props = defineProps<{
  jobTitle: string,
  orgName: string,
  employment: number,
  selectedImage: string,
  salaryStartRange: string,
  salaryEndRange: string
}>()

const employmentTypeLabel = computed(() => {
  return employmentOptions.filter((employment) => employment?.value == props.employment)[0].label
})

const salaryRangePreview = computed(() => {
  let startRange = props.salaryStartRange;
  let endRange = props.salaryEndRange;
  if (startRange.length && startRange.includes('000')) startRange = startRange.replace(",000", "k");
  if (endRange.length && endRange.includes('000')) endRange = endRange.replace(",000", "k");
  return startRange && endRange ? `${startRange} - ${endRange}` : '80k - 100k'
})
</script>

<template>
  <div class="hidden md:block lg:max-w-sm p-4 border border-gray-200 rounded-lg shadow">
    <div class="flex-col items-start gap-5 flex w-full">
      <div>
        <img
            v-if="selectedImage.length"
            :src="selectedImage"
            alt="Selected Job Image"
            class="size-12 rounded-full object-cover"
        />
        <SvgoUpload v-else class="size-12" />
      </div>
      <div
          class="w-full flex-col justify-between items-start gap-5 flex"
      >
        <div class="w-full">
          <p class="text-gray-900 text-base font-medium leading-normal">
            {{ jobTitle?.length ? jobTitle : "Job Title" }}
          </p>
          <p class="text-gray-600 text-sm font-normal leading-tight">
            {{ orgName?.length ? orgName : "Company name" }}
          </p>
        </div>
        <div class="justify-between w-full xl:items-center gap-4 flex lg:flex-col xl:flex-row">
          <div class="flex items-center space-x-1.5">
            <SvgoClockLight class="h-5" />
            <p class="text-gray-600 text-sm font-medium leading-tight">
              {{ employment ? employmentTypeLabel : "Full-time" }}
            </p>
          </div>
          <div class="flex items-center space-x-1.5">
            <SvgoCurrencyDollarLight class="h-5" />
            <p class="text-gray-600 text-sm font-medium leading-tight">
              {{ salaryRangePreview }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>
