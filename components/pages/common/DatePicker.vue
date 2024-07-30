<script lang="ts" setup>
import Datepicker from "@vuepic/vue-datepicker";
import type { DatePickerInstance } from "@vuepic/vue-datepicker"
import "@vuepic/vue-datepicker/dist/main.css";
import { ErrorMessage, useField } from "vee-validate";

const props = defineProps({
  modelValue: {
    type: String,
    default: '',
  },
  name: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
  enableTimePicker: {
    type: Boolean,
    default: true
  }
});

const emit = defineEmits(['onInput', 'update:modelValue'])

const name = toRef(props, 'name');
const initialValue = toRef(props, 'modelValue');

const datepicker = ref<DatePickerInstance>(null);

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  meta,
  setValue,
} = useField(name, undefined, {
  initialValue: props.modelValue,
});

// const onInput = (event: Event) => {
//   // Update the value of `date` with the input's value
//   date.value = (event.target as HTMLInputElement).value;
// };

// const format = (date: any) => {
//   return date.toLocaleDateString("en-US", {
//     month: "long",
//     day: "numeric",
//     year: "numeric",
//   });
// };
const textInputOptions = {
  format: "MM/dd/yyyy",
};

watch(inputValue, (newValue: any) => {
  emit('update:modelValue', newValue);
  // if (datepicker.value) datepicker.value.closeMenu()
});

watch(
    () => props.modelValue,
    (newValue: any) => {
      setValue(newValue);
    }
);
</script>

<template>
  <div class="relative">
    <Datepicker
      :name="name as string"
      ref="datepicker"
      v-model="inputValue"
      :min-date="new Date()"
      class="fixed-input-icon"
      input-class-name="form-input w-full"
      menu-class-name="dp-custom-menu"
      autoApply
      :state="!errorMessage?.length"
      :text-input="textInputOptions"
      :enable-time-picker="false"
      @blur="handleBlur"
      :placeholder="placeholder"
    >
      <template #input-icon> </template>
    </Datepicker>

    <SvgoCalendar class="absolute h-5 top-3 right-3" />

    <ErrorMessage
      class="error-message"
      :name="name"
    />
  </div>
</template>

<style>
.dp__input{
  @apply bg-transparent rounded-lg border border-gray-200 py-2.5 px-3.5 shadow-field placeholder-gray-400
}
.dp__input_focus{
  @apply ring-2 ring-brand-600
}
.dp__input_valid {
  @apply shadow-none hover:border-inherit
}
.dp__input_invalid{
  @apply ring-2 ring-error-400 hover:border-inherit
}
.dp__menu_inner {
  @apply rounded-lg bg-white p-4 shadow-lg;
}

.dp__arrow_bottom {
  @apply bg-white transform-none;
}
.dp__month_year_select {
  width: 20%;
}

.dp__month_year_wrap {
  align-items: center;
  justify-content: center;
}

.dp__active_date {
  @apply bg-brand-600 !text-white;
}

.dp__today {
  @apply border border-brand-600;
}

.dp__calendar_header {
  @apply leading-6 text-sm font-medium text-gray-500;
}

.dp__cell_inner {
  @apply font-semibold text-sm;
}

.dp__icon {
  @apply stroke-gray-600;
}
</style>
