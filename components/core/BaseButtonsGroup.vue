<script setup lang="ts">
type ColorVariant = 'primary' | 'secondary' | 'gray' | 'plain'
const props = defineProps<{
  btnsGroup: any[]
  color? : ColorVariant
  label: String
  outline? : Boolean
  modelValue: number
}>()

const emits = defineEmits(['optionSelected', 'update:modelValue'])

let selectedOption = ref<number>(props.modelValue);

// In case, modelValue prop is updated from parent component
watch(() => props.modelValue, (newValue) => selectedOption.value = newValue);

function selectingOption(index :number) {
  selectedOption.value = index
  emits('optionSelected', index)
  emits('update:modelValue', index)
}
</script>

<template>
  <template v-for="(btn, i) in btnsGroup">
    <BaseButton
        :label="btn.label"
        :color="color"
        :outline="outline"
        :class="{
          'rounded-e-none': i === 0,
           'rounded-s-none': i === btnsGroup.length - 1,
           'bg-gray-50 text-gray-800': i === selectedOption,
           'bg-white': i !== selectedOption,
           'text-sm': true
        }"
        @click="selectingOption(i)"
    >
      <template #prepend-icon>
        <component :is="btn.icon" class="w-4 h-4 text-gray-600" />
      </template>
    </BaseButton>
  </template>
</template>

<style scoped lang="postcss">

</style>
