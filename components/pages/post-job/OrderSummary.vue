<script setup lang="ts">
defineProps<{
  totalPostingPrice: string
}>()
</script>

<template>
  <div
      class="block xl:max-w-sm p-4 border border-gray-200 rounded-lg shadow"
  >
    <p class="text-gray-900 text-base font-medium">Order Summary</p>
    <div class="w-full mt-5">
      <div class="flex items-start justify-between gap-4">
        <p class="text-gray-600 text-sm font-medium">Job posting fee</p>
        <p class="text-gray-900 text-sm font-medium">$49</p>
      </div>
      <div v-if="totalPostingPrice === '$79'" class="flex items-start justify-between gap-4">
        <p class="text-gray-600 text-sm font-medium">Job featuring fee</p>
        <p class="text-gray-900 text-sm font-medium">$30</p>
      </div>
      <hr class="border-b border-gray-200 my-3 w-full" />
      <div class="flex items-center justify-between gap-4">
        <p class="text-gray-600 text-sm font-medium">Total</p>
        <p class="text-gray-900 text-lg font-semibold leading-7">{{ totalPostingPrice }}</p>
      </div>
    </div>
  </div>
</template>
