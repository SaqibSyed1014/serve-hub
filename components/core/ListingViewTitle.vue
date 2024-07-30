<script setup lang="ts">
defineProps<{
  title: String
  subTitle: String
}>()
</script>

<template>
  <div class="flex flex-col gap-1">
    <h2 class="text-3xl font-semibold">
      {{ title }}
    </h2>
    <p class="text-gray-600">
      {{ subTitle }}
    </p>
  </div>
</template>
