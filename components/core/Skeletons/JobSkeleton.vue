<script setup lang="ts">
defineProps<{
  cardForm: Boolean
}>()
</script>

<template>
  <div class="job-skeleton">
    <div v-if="cardForm" class="job-card flex flex-col gap-5 bg-white border border-gray-200 shadow-xs rounded-xl p-5">
      <div class="job-card-header">
        <div class="flex justify-between">
          <div class="flex place-items-center rounded-full overflow-hidden w-12 h-12">
            <Skeleton type="circle" class="w-full h-full" />
          </div>

          <Skeleton class="w-16 h-6 !rounded-2xl" />
        </div>
        <div class="pt-3">
          <Skeleton class="h-5 mb-2" />

          <Skeleton class="h-5" />
        </div>
      </div>
      <div class="job-post-body flex flex-col gap-4">
        <div class="flex gap-3 text-xs font-medium">
          <Skeleton class="flex-grow h-5 shrink-0" />

          <Skeleton class="flex-grow h-5 shrink-0" />
        </div>

<!--          <div>-->
<!--            <Skeleton v-for="i in 4" class="h-3 shrink-0 mb-1.5" />-->
<!--          </div>-->
      </div>
      <div class="job-post-footer flex items-center gap-5 font-medium text-gray-600">
        <Skeleton class="w-1/4 h-5 shrink-0" />

        <Skeleton class="w-1/4 h-5 shrink-0" />
      </div>
    </div>

    <div v-else class="job-card flex justify-between gap-5 bg-white border border-gray-200 shadow-xs rounded-xl p-5">
      <div class="job-card-left">
        <div class="flex gap-3 items-center">
          <div class="flex place-items-center rounded-full overflow-hidden w-12 h-12">
            <Skeleton type="circle" class="w-full h-full" />
          </div>
          <div>
            <Skeleton class="w-32 h-5 mb-2" />

            <Skeleton class="w-32 h-5" />
          </div>
        </div>
        <div class="flex items-center gap-5 text-gray-600 font-medium pt-5">
          <Skeleton class="w-24 h-5 shrink-0" />

          <Skeleton class="w-24 h-5 shrink-0" />
        </div>
      </div>
      <div class="jo-card-right flex flex-col items-end ">
        <Skeleton class="w-16 h-6 !rounded-2xl" />

        <div class="flex gap-3 mt-auto">
          <Skeleton class="w-24 h-5" />

          <Skeleton class="w-24 h-5" />
        </div>
      </div>
    </div>
  </div>
</template>
