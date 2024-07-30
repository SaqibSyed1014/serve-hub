<script setup lang="ts">
defineProps<{
  selectedAlphabet: string;
}>()

const emit = defineEmits(['selectAlphabet']);

const capitals = ref<string[]>([]);

for (let i = 65; i <= 90; i++) {
  capitals.value.push(String.fromCharCode(i));
}

function selectingAlphabet(value :string) {
  emit('selectAlphabet', value);
}
</script>

<template>
  <div class="pt-6 w-full gap-2 flex flex-col xl:flex-row border-b border-gray-200">
    <div>
      <p class="text-gray-500 text-sm font-semibold !w-[139px]">
        Search by alphabet
      </p>
    </div>

    <div class="flex flex-wrap gap-2.5 sm:gap-x-0 items-center w-full justify-between">
      <div
          v-for="(capital, index) in capitals"
          :key="index"
          class="pr-1.5 borer-b border-gray-200"
      >
        <button
            :class="[
                  capital === selectedAlphabet
                    ? 'text-brand-800 border-b-2 px-[5px] border-brand-800'
                    : 'md:px-[5px]',
                ]"
            @click="selectingAlphabet(capital)"
        >
          <span class="text-xs md:text-sm">{{ capital }}</span>
        </button>
      </div>
      <div @click="selectingAlphabet('')" class="text-brand-800 text-sm font-semibold leading-tight cursor-pointer">
        Clear
      </div>
    </div>
  </div>
</template>
