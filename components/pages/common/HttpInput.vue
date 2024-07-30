<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";

const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  value: {
    type: String,
    default: undefined,
  },
  name: {
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
});

// use `toRef` to create reactive references to `name` prop which is passed to `useField`
// this is important because vee-validte needs to know if the field name changes
// https://vee-validate.logaretm.com/v4/guide/composition-api/caveats
const name = toRef(props, "name");

// we don't provide any rules here because we are using form-level validation
// https://vee-validate.logaretm.com/v4/guide/validation#form-level-validation
const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
} = useField(name, undefined, {
  initialValue: props.value,
});
</script>

<template>
  <div
    :class="[className, { 'has-error': !!errorMessage, success: meta.valid }]"
  >
    <label
      :for="name"
      class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
    >
      {{ label }}
      <span
        v-show="subLabel"
        class="w-[228px] text-slate-600 text-sm md:text-base font-normal leading-normal"
      >
        <br />
        {{ subLabel }}
      </span></label
    >
    <div class="mt-2 sm:col-span-2 sm:mt-0">
      <div class="relative">
        <div class="flex flex-col gap-y-1.5">
          <div
            :class="
              errorMessage
                ? 'ring-2 !border-0 !ring-error-400 flex relative rounded-md  '
                : 'flex relative rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-0 focus-within:ring-inset focus-within:ring-brand-600'
            "
          >
            <span
              class="inline-flex items-center rounded-tl-lg rounded-bl-lg px-3 font-normal border border-gray-300 leading-normal text-gray-500 sm:text-base"
              :class="{ 'ring-2 !border-0 !ring-error-400': errorMessage }"
              >http://</span
            >
            <input
              :name="name"
              :id="name"
              :type="type"
              :value="inputValue"
              :placeholder="placeholder"
              @input="handleChange"
              @blur="handleBlur"
              class="form-input w-full"
              :class="{ 'ring-2 !border-0 !ring-error-400': errorMessage }"
            />
          </div>
          <p
            class="text-red-500 text-sm font-normal leading-tight"
            v-show="errorMessage || meta.valid"
          >
            {{ errorMessage || successMessage }}
          </p>
        </div>
        <div v-if="errorMessage" class="absolute right-2 top-3">
          <SvgoAlertCircle class="h-4" />
        </div>
      </div>
    </div>
  </div>
</template>
