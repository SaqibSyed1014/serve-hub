<script setup lang="ts">
import { ref, computed } from 'vue';

const props = defineProps<{
  minValue: number;
  maxValue: number;
  stepValue: number;
  selectedMin: number;
  selectedMax: number;
}>();

const emit = defineEmits<{
  (e: 'update:value', value: number[]): void;
}>();

const minAngle = ref(props.minValue);
const maxAngle = ref(props.maxValue);

const sliderMin = computed({
  get: () => minAngle.value,
  set: (val: number) => {
    val = Math.round(val / props.stepValue) * props.stepValue; // Round to nearest step
    if (val > sliderMax.value) {
      sliderMax.value = val;
    }
    minAngle.value = val;
  },
});

const sliderMax = computed({
  get: () => maxAngle.value,
  set: (val: number) => {
    val = Math.round(val / props.stepValue) * props.stepValue; // Round to nearest step
    if (val < sliderMin.value) {
      sliderMin.value = val;
    }
    maxAngle.value = val;
  },
});

function updateValue() {
  emit('update:value', [sliderMin.value, sliderMax.value]);
}

watch(() => props.selectedMin, (newSelectedMin) => minAngle.value = newSelectedMin, { immediate: true });

watch(() => props.selectedMax, (newSelectedMax) => maxAngle.value = newSelectedMax, { immediate: true });
</script>

<template>
  <div class="range-slider">
    <input type="range" :min="minValue" :max="maxValue" :step="stepValue" v-model="sliderMin" @change="updateValue">
    <input type="range" :min="minValue" :max="maxValue" :step="stepValue" v-model="sliderMax" @change="updateValue">
    <div class="absolute -bottom-8 flex justify-between w-full text-sm font-medium">
      <span>{{ `$${sliderMin.toLocaleString()}` }}</span>
      <span>{{ sliderMax === maxValue ? `$${sliderMax.toLocaleString()}+` : `$${sliderMax.toLocaleString()}` }}</span>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.range-slider {
  width: 100%;
  margin: auto;
  text-align: center;
  position: relative;
  height: 20px;
}

.range-slider input[type=range] {
  position: absolute;
  left: 0;
  bottom: 0;
}

input[type=range] {
  -webkit-appearance: none;
  width: 100%;
}

input[type=range]:focus {
  outline: none;
}

input[type=range]{
  @apply bg-brand-600
}

input[type=range]::-webkit-slider-runnable-track {
  width: 100%;
  height: 6px;
  cursor: pointer;
  border-radius: 3px;
  box-shadow: none;
  border: 0;
}

input[type=range]::-webkit-slider-thumb {
  z-index: 2;
  position: relative;
  box-shadow: 0px 0px 0px #000;
  border: 2px solid theme('colors.brand.600');
  height: 18px;
  width: 18px;
  border-radius: 25px;
  background: white;
  cursor: pointer;
  -webkit-appearance: none;
  margin-top: -6px;
}

</style>
