<script setup lang="ts">
import { Tooltip } from "flowbite";

const props = defineProps({
  id: String,
  tooltipContent: String,
  hideTooltip: Boolean,
  position: {
    type: String,
    default: 'top'
  }
})

onMounted(() => {
  // set the tooltip content element
  const $targetEl = document.getElementById(`tooltip-${props.id}-content`);
  // set the element that trigger the tooltip using hover or click
  const $triggerEl = document.getElementById(`tooltip-${props.id}-trigger`);
  // options with default values
  const options: any = {
    placement: props.position,
    triggerType: "hover",
  };
  if ($targetEl) {
    /*
     * targetEl: required
     * triggerEl: required
     * options: optional
     */
    const tooltip = new Tooltip($targetEl, $triggerEl, options);
    // show the tooltip
    tooltip.hide();
  }
})
</script>

<template>
  <div :id="`tooltip-${id}-trigger`">
    <slot></slot>
  </div>
  <div v-if="hideTooltip" :id="`tooltip-${id}-content`" role="tooltip" class="absolute z-10 invisible hidden md:inline-block px-3 py-2 text-sm font-medium text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 tooltip dark:bg-gray-700">
    {{ tooltipContent }}
    <div class="tooltip-arrow" data-popper-arrow></div>
  </div>
</template>

<style scoped lang="postcss">

</style>
