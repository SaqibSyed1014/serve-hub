<script setup lang="ts">
import { ref, computed, watch } from "vue";

// Props
const props = defineProps<{ currentPage: number; totalPages: number }>();

// State
const currentPage = ref(props.currentPage);
const totalPages = ref(props.totalPages);

// Watch for changes in props
watch(
  () => props.currentPage,
  (newValue) => {
    currentPage.value = newValue;
  }
);

watch(
  () => props.totalPages,
  (newValue) => {
    totalPages.value = newValue;
  }
);

// Calculate the range of displayed page numbers
const displayedPages = computed(() => {
  const pages = [];
  const numPages = totalPages.value;

  // Display number of pages as it is without ellipsis if <= 10
  if (numPages <= 10) {
    for (let i = 1; i <= numPages; i++) {
      pages.push(i);
    }
    return pages;
  }

  // Display the first three pages
  for (let i = 1; i <= Math.min(3, numPages); i++) {
    pages.push(i);
  }

  // Display ellipsis if there are more than six pages
  if (numPages > 6 && currentPage.value > 3) {
    pages.push("...");
  }

  // Display three pages before the current page, the current page, and three pages after
  const startPage = Math.max(currentPage.value - 3, 4);
  const endPage = Math.min(currentPage.value + 3, numPages - 3);
  for (let i = startPage; i <= endPage; i++) {
    pages.push(i);
  }

  // Display ellipsis if there are more than six pages and the current page is not close to the last three pages
  if (numPages > 6 && currentPage.value < numPages - 2) {
    pages.push("...");
  }

  // Display the last three pages
  for (let i = numPages - 2; i <= numPages; i++) {
    pages.push(i);
  }

  return pages;
});

const screenWidth = ref<number>(0);

onMounted(() => {
  screenWidth.value = window.innerWidth;
});
</script>

<template>
  <nav aria-label="Page navigation example">
    <ul class="inline-flex justify-between -space-x-px text-base w-full">
      <li>
        <BaseButton
            :class="{ 'hidden': displayedPages[0] === currentPage }"
            color="gray"
            :outline="true"
            :label="screenWidth >= 768 ? 'Previous' : ''"
            @click="$emit('paginate', 'prev')"
        >
          <template #prepend-icon>
            <SvgoArrowLeft class="w-4 h-4 text-gray-600"/>
          </template>
        </BaseButton>
      </li>
      <div class="sm:inline-flex hidden">
        <li
          v-for="pageNumber in displayedPages"
          :key="pageNumber"
          :class="{ 'text-center items-center': pageNumber !== '...' }"
        >
          <button
            type="button"
            :class="[
              pageNumber === currentPage
                ? 'flex items-center justify-center px-3 py-2 leading-tight text-gray-800 bg-gray-100 hover:text-gray-700 rounded-lg'
                : 'flex items-center justify-center px-3 py-2 leading-tight text-gray-600 hover:text-gray-700',
            ]"
            @click="pageNumber === '...' ? '' : $emit('paginate', pageNumber)"
          >
            <span class="">{{ pageNumber }}</span>
          </button>
        </li>
      </div>
      <span
        class="sm:hidden flex items-center text-slate-700 text-sm font-normal"
        >Page {{ currentPage + " of " + totalPages }}</span
      >
      <li>
        <BaseButton
            :class="{ 'hidden': displayedPages[displayedPages.length - 1] === currentPage }"
            color="gray"
            :outline="true"
            :label="screenWidth >= 768 ? 'Next' : ''"
            @click="$emit('paginate', 'next')"
        >
          <template #append-icon>
            <SvgoArrowRight class="w-4 h-4 text-gray-600"/>
          </template>
        </BaseButton>
      </li>
    </ul>
  </nav>
</template>
