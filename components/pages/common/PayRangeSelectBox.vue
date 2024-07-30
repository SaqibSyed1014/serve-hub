<script setup lang="ts">
import {toRef, watch} from "vue";
import { useField } from "vee-validate";
import { Field, ErrorMessage } from "vee-validate";

const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
  value: {
    type: String,
    default: "",
  },
  name: {
    type: String,
    required: true,
  },
  secondaryName: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  subLabel: {
    type: String,
    required: true,
  },
  successMessage: {
    type: String,
    default: "",
  },
  placeholder: {
    type: String,
    default: "",
  },
  className: {
    type: String,
    default: "",
  },
  data: {
    type: Array,
    default: [],
  },
  data2: {
    type: Array,
    default: [],
  },
  key: {
    type: String,
  },
  errorMessage: { type: String, default: "" },
});

const name = toRef(props, "name");
const secondaryName = toRef(props, "secondaryName");

const {
  value: inputValue,
  handleBlur,
  handleChange,
  meta,
  errorMessage
} = useField(name, undefined, {
  initialValue: props.modelValue[0],
});

const {
  value: secondaryInputValue,
} = useField(secondaryName, undefined, {
  initialValue: props.modelValue[1],
});

const selectedStartRange = ref(props.modelValue[0] || '');
const selectedEndRange = ref(props.modelValue[1] || '');

const rangeError = ref(false);

function convertPriceToNumber(price :string) {
  return Number(price.replace('$', '').replace(',', ''))
}

watch(() => [selectedStartRange.value, selectedEndRange.value], () => {
  // const startValue = convertPriceToNumber(selectedStartRange.value)
  // const endValue = convertPriceToNumber(selectedEndRange.value)
  const startValue = selectedStartRange.value
  const endValue = selectedEndRange.value
  rangeError.value = !!((startValue && endValue) && (endValue < startValue));
})

const modelValue = computed({
  get() {
    return [selectedStartRange.value, selectedEndRange.value]; // Return an array of both values
  },
  set(newValue) {
    [selectedStartRange.value, selectedEndRange.value] = newValue; // Update the refs when newValue changes
  }
});
</script>

<template>
  <div :class="[className]">
    <label
      v-if="label"
      :for="name"
      class="text-sm font-semibold text-gray-700 sm:pt-1.5"
    >
      {{ label }}
      <span
        v-show="subLabel"
        class="text-gray-400 text-base font-normal leading-normal"
      >
        {{ subLabel }}
      </span>
    </label>
    <div class="mt-1 sm:col-span-2 pt-1">
      <div class="flex">
        <div class="flex flex-col flex-1">
          <Field
              v-model="selectedStartRange"
              :name="name"
              as="select"
              :class="[
            'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full py-[11px] px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brand-500 dark:focus:border-brand-500',
            [errorMessage && 'border border-red-300'], // Apply border-red-300 class if errorMessage exists
          ]"
          >
            <option value="" disabled>($) From</option>
            <option
                v-for="item in data"
                :key="item + '1'"
                :value="item.value"
            >
              {{ item.label }}
            </option>
          </Field>

          <ErrorMessage
              class="error-message"
              :name="name"
          />
        </div>

        <span class="text-gray-600 text-sm font-normal leading-tight px-3 flex items-baseline mt-4">
          -
        </span>

        <div class="flex flex-col flex-1">
          <Field
              v-model="selectedEndRange"
              :name="secondaryName"
              as="select"
              :class="[
            'bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-brand-500 focus:border-brand-500 block w-full py-[11px] px-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-brand-500 dark:focus:border-brand-500',
            [(errorMessage || rangeError) && 'border border-red-300'],
          ]"
          >
            <option value="" disabled>($) To</option>
            <option
                v-for="item in data2"
                :key="item + '1'"
                :value="item.value"
            >
              {{ item.label }}
            </option>
          </Field>
          <ErrorMessage
              class="error-message"
              :name="secondaryName"
          />
          <div
              v-if="rangeError"
              class="error-message"
          >
            To Range can't be less than From Range
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
