<script setup lang="ts">
const screenWidth = ref<number>(0);

onMounted(() => {
  screenWidth.value = window.innerWidth;
});
</script>

<template>
  <div class="pagination border-t border-[#EAECF0] flex justify-between text-sm pt-5">
    <BaseButton color="gray" :outline="true" :label="screenWidth >= 768 ? 'Previous' : ''">
      <template #prepend-icon>
        <SvgoArrowLeft class="w-4 h-4 text-gray-600"/>
      </template>
    </BaseButton>
    <p class="flex items-center text-sm text-[#344054] md:hidden font-medium">Page 1 of 10</p>
    <ul class="hidden md:flex pagination font-medium">
      <li class="active">1</li>
      <li>2</li>
      <li>3</li>
      <li class="dots">...</li>
      <li>8</li>
      <li>9</li>
      <li>10</li>
    </ul>
    <BaseButton color="gray" :outline="true" :label="screenWidth >= 768 ? 'Next' : ''">
      <template #append-icon>
        <SvgoArrowRight class="w-4 h-4 text-gray-600"/>
      </template>
    </BaseButton>
  </div>
</template>

<style scoped lang="postcss">
.pagination ul li{
  @apply flex items-center px-4 py-2 rounded-md cursor-pointer text-gray-600 hover:bg-gray-50 transition
}
.pagination .active{
  @apply bg-gray-50 text-gray-800
}
</style>
