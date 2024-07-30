<script setup lang="ts">
defineProps<{
  item: { question: string, answer: string }
}>()

const toggleItem = ref(false)
</script>

<template>
  <div
      class="bg-gray-50 hover:bg-gray-100 transition rounded-2xl p-4 cursor-pointer"
      @click="toggleItem = !toggleItem"
  >
    <div class="flex items-center gap-6">
      <div class="shrink-0">
        <SvgoMinusCircle v-if="toggleItem" class="w-4 h-4 text-brand-600" />
        <SvgoPlusCircle v-else class="w-4 h-4 text-gray-400" />
      </div>
      <div>
        <p class="font-medium">
          {{ item.question }}
        </p>
      </div>
    </div>
    <p v-if="toggleItem" class="text-gray-600 pl-10 pt-2">
      {{ item.answer }}
    </p>

  </div>

</template>

