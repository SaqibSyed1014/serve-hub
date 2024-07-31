<script setup lang="ts">
defineProps<{ data: any; isSchool: Boolean }>();
</script>

<template>
  <NuxtLink
    :to="`/colleges/${data?.document?.slug}`"
    class="p-4 flex flex-col gap-5 sm:gap-0 sm:flex-row justify-between items-start rounded-xl border border-gray-200"
  >
    <div class="flex flex-col md:flex-row md:items-center gap-3">
      <SvgoBuilding class="size-12 shrink-0" />
      <div>
        <h4
          class="text-gray-900 text-sm md:text-base font-semibold leading-normal"
        >
          {{ data?.document?.business_name }}
        </h4>

        <div class="inline-flex flex-wrap gap-5 pt-2">
          <div class="inline-flex items-center text-center space-x-2">
            <SvgoBriefCaseLight class="size-5" />
            <span
              class="text-gray-600 text-xs md:text-sm font-medium leading-tight"
            >
              0 jobs
            </span>
          </div>
<!--          <div class="inline-flex items-center text-center space-x-2">-->
<!--            <SvgoBuildingLight class="size-5" />-->
<!--            <span-->
<!--              class="text-gray-600 text-xs md:text-sm font-medium leading-tight"-->
<!--            >-->
<!--              0 schools-->
<!--            </span>-->
<!--          </div>-->
<!--          <div class="inline-flex items-center text-center space-x-2">-->
<!--            <SvgoGraduationHat class="size-5" />-->
<!--            <span class="text-gray-600 text-sm font-medium leading-tight">-->
<!--              0 students-->
<!--            </span>-->
<!--          </div>-->
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4">
      <div
        class="rounded-md inline-flex items-center w-fit space-x-1.5 px-1.5 py-0.5 shadow border border-gray-300"
      >
        <SvgoUsFlag class="size-4" />
        <span
          class="text-center text-gray-700 text-xs md:text-sm font-medium leading-tight"
          >{{ data?.document?.city + ", " + data?.document?.state_code }}
        </span>
      </div>
    </div>
  </NuxtLink>
</template>

<style scoped lang="postcss"></style>
