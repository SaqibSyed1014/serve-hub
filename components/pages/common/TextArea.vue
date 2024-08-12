<script setup lang="ts">
import { toRef } from "vue";
import { useField } from "vee-validate";
// import { QuillEditor } from "@vueup/vue-quill";
// import "@vueup/vue-quill/dist/vue-quill.snow.css";
const props = defineProps({
  value: {
    type: String,
    default: "",
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

const name = toRef(props, "name");

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
      class="block text-sm font-medium md:font-semibold text-gray-700 sm:pt-1.5"
    >
      {{ label }}
      <span
        v-show="subLabel"
        class="w-[228px] text-slate-600 text-sm md:text-base font-normal leading-normal"
      >
        <br />
        {{ subLabel }}
      </span>
    </label>
    <div class="mt-2 sm:col-span-2 sm:mt-0">
      <!-- <QuillEditor theme="snow" /> -->
      <div class="relative">
        <div class="flex flex-col gap-y-1.5">
          <div
            :class="
              errorMessage
                ? 'border border-red-300 flex relative rounded-md ring-0 ring-inset ring-gray-300 '
                : 'flex relative rounded-md ring-1 ring-inset ring-gray-300 focus-within:ring-0 focus-within:ring-inset focus-within:ring-brand-600'
            "
          >
            <textarea
              :name="name"
              rows="4"
              v-model="inputValue"
              class="form-input w-full"
              :placeholder="placeholder"
              maxlength="50"
              @input="handleChange"
              @blur="handleBlur"
              :class="{ 'has-error': errorMessage }"
            ></textarea>
          </div>
<!--          <div class="text-gray-600 text-sm font-normal leading-tight pt-1.5">-->
<!--            {{ 40 - inputValue?.length }} words left-->
<!--          </div>-->
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
