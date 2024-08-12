<script setup lang="ts">
type ColorVariant = 'primary' | 'secondary' | 'gray' | 'plain' | 'brand'
const props = withDefaults(defineProps<{
  color?: ColorVariant,
  label: string
  type?: string
  outline?: boolean
  fullSized?: boolean
  fullSizedOnSmall?: boolean
  navigateTo?: string
  disabled?: boolean
  isExternalLink?: boolean
  isLoading?: boolean
}>(), {
  color: 'primary',
  isExternalLink: false,
  isLoading: false
})

const defaultStyles = 'inline-flex items-center justify-center gap-3 shrink-0 disabled:cursor-not-allowed'

const btnStyles = computed(() => {
  const colorStyles = {
    primary: props.outline ? 'border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white' : 'bg-brand-600 text-white hover:bg-brand-500 disabled:bg-brand-300',
    secondary: props.outline ? 'border border-brand-600 text-brand-600 hover:bg-brand-600 hover:text-white' : 'bg-brand-600 text-white hover:bg-brand-500',
    gray: props.outline ? 'border border-gray-300 text-gray-700 hover:bg-gray-200' : 'bg-gray-300 text-white hover:bg-gray-200',
    plain: props.outline ? 'border border-gray-700 transparent text-gray-600' : 'bg-transparent text-gray-600 hover:bg-gray-200',
    brand: props.outline ? 'border border-gray-700 transparent text-gray-600' : 'bg-brand-50 text-brand-800 hover:bg-brand-100',
  };

  const baseStyles = 'rounded-lg px-4 py-2.5 font-semibold transition';

  const outlineStyles = props.outline ? 'hover:bg-gray-200' : '';


  return [
    colorStyles[props.color || 'primary'],
    outlineStyles,
    baseStyles,
  ].filter(Boolean).join(' ');
});

const btnSize = computed(() => props.fullSized ? 'w-full' : '');
const btnSizeOnSmall = computed(() => props.fullSizedOnSmall ? 'max-md:w-full' : '');

const btnStyleClasses = computed(() => [
  defaultStyles,
  btnStyles.value,
  btnSize.value,
  btnSizeOnSmall.value
]);

const component = computed(() => {
  if (props.navigateTo) return defineNuxtLink({})
  return 'button'
})
</script>

<template>
  <component :type="type" :is="component" :to="navigateTo" :target="isExternalLink ? '_blank':''" :class="[defaultStyles, btnStyleClasses]" :disabled="disabled || isLoading">
    <slot name="prepend-icon" />
    <template v-if="!isLoading">{{ label }}</template>
    <BaseSpinner size="xs" :show-loader="isLoading" />
    <slot name="append-icon" />
  </component>
</template>
