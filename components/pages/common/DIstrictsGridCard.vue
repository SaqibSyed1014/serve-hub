<script setup lang="ts">
defineProps<{ data: any }>();
</script>

<template>
  <NuxtLink
    :to="`/school-districts/${data?.document?.slug}`"
    class="p-5 flex flex-col justify-between rounded-xl border border-gray-200 min-h-[208px]"
  >
    <div class="flex items-center gap-3">
      <SvgoBuilding class="size-12 shrink-0" />
      <h4
        class="text-gray-900 text-sm md:text-base font-semibold leading-normal text-pretty line-clamp-2"
      >
        {{ data?.document?.district_name }}
      </h4>
    </div>

    <div class="pt-5 flex flex-col gap-4">
      <div
        class="rounded-md inline-flex items-center w-fit space-x-1.5 px-1.5 py-0.5 shadow border border-gray-300"
      >
        <SvgoUsFlag class="size-4" />
        <span
          class="text-center text-gray-700 text-xs md:text-sm font-medium leading-tight"
        >
          {{ data?.document?.city + ", " + data?.document?.state_name }}
        </span>
      </div>

      <div class="inline-flex items-center text-center space-x-2">
        <SvgoBriefCase class="size-5" />
        <span
          class="text-gray-600 text-xs md:text-sm font-medium leading-tight"
        >
          {{ data?.document?.job_count }} jobs

        </span>
      </div>

      <div class="inline-flex space-x-3">
        <div
          class="inline-flex items-center text-center space-x-2 text-gray-600"
        >
          <SvgoBuilding class="size-5" />
          <span class="text-xs md:text-sm font-medium leading-tight">
            {{ data?.document?.school_count.toLocaleString() }} schools
          </span>
        </div>
        <div class="inline-flex items-center text-center space-x-2">
          <SvgoGraduationHat class="size-5" />
          <span class="text-gray-600 text-sm font-medium leading-tight">
            {{ data?.document?.student_count.toLocaleString() }} students
          </span>
        </div>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="postcss"></style>
