<template>
  <div>
    <label v-if="label" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
      {{ label }}
      <span v-show="subLabel" class="w-[210px] text-slate-600 text-sm font-normal leading-normal">
        <br />
        {{ subLabel }}
      </span>
    </label>
    <div class="mt-2 sm:col-span-2 sm:mt-0">
      <div class="relative">
        <div class="flex flex-col gap-y-1.5 relative">
          <input
              :value="modelValue"
              :type="type"
              :placeholder="placeholder"
              @input="$emit('update:modelValue', $event.target.value)"
              @blur="$emit('blur')"
              class="form-input w-full"
          />
          <p>{{ error }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{
  error: string,
  modelValue: string,
  label: string,
  subLabel?: string,
  type: string,
  placeholder?: string
}>();

const emit = defineEmits(['update:modelValue', 'blur']);
</script>
