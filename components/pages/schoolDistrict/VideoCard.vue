<script lang="ts" setup>
defineProps<{ data: any[] }>();
</script>

<template>
  <div
    class="grid sm:grid-cols-2 xl:grid-cols-3 gap-6 md:gap-8 border-t border-gray-200"
  >
    <div
      v-for="(item, index) in data"
      :key="index"
      class="flex-col justify-start items-start gap-4 inline-flex pt-6"
    >
      <div class="relative">
        <img
          class="w-full h-full md:h-[315px] xl:h-[250px] object-cover relative rounded-xl"
          :src="item?.image"
        />
        <!-- <SvgoPlayButton class="size-20 absolute inset-0 w-full" /> -->
      </div>
      <div class="flex-col justify-start items-start gap-2 flex">
        <p class="text-gray-900 text-xl md:text-2xl font-semibold">
          {{ item?.title }}
        </p>
        <p class="text-slate-600 text-sm font-normal">
          {{ item?.date }}
        </p>
      </div>
    </div>
  </div>
  <div class="mt-6 pt-5 border-t border-gray-200">
    <Pagination />
  </div>
</template>
