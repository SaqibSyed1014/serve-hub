<script setup lang="ts">
const props = defineProps<{
  title: String;
  options: any;
  totalJobs: string | number;
  insideSidebar?: boolean;
}>();
</script>

<template>
  <div
    class="py-2 divide divide-gray-200 flex-col justify-start items-start gap-5 inline-flex w-full"
  >
    <div class="justify-between items-center inline-flex w-full pb-2">
      <div class="justify-start items-center gap-3 flex text-gray-700">
        <component :is="options.icon" class="size-6" />
        <div class="text-base font-semibold leading-normal">
          {{ title }}
        </div>
        <span class="text-gray-400 text-base font-normal leading-normal"
          >{{ totalJobs ? `(${totalJobs})` : '' }}
        </span>
      </div>
    </div>

    <!-- Checkbox inputs -->
    <div
      class="pl-9 relative flex gap-x-6"
      v-for="(item, index) in options?.data"
      :key="item.id + index"
    >
      <div class="flex h-6 items-center">
        <input
          :id="`${insideSidebar?'sidebar-':''}filter-cb-${item.id}`"
          :name="item.id"
          type="checkbox"
          class="h-4 w-4 rounded-md border border-gray-300 text-brand-600 focus:ring-brand-600"
          :checked="item.checked"
          @change="$emit('toggleSchoolOption', options?.name, index, item.label, $event.target.checked)"
        />
      </div>
      <label :for="`${insideSidebar?'sidebar-':''}filter-cb-${item.id}`" class="text-gray-700 text-base font-medium">
        {{ item.label }}
      </label>
    </div>
  </div>
</template>
