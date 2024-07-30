<script setup lang="ts">
import { toRef, watch } from 'vue';
import { useField } from 'vee-validate';

const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  modelValue: {
    type: String,
    default: '',
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
    default: '',
  },
  placeholder: {
    type: String,
    default: '',
  },
  className: {
    type: String,
    default: '',
  },
  autofocus: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
});

const emit = defineEmits(['update:modelValue', 'input', 'blur']);

const name = toRef(props, 'name');
const initialValue = toRef(props, 'modelValue');

const {
  value: inputValue,
  errorMessage,
  handleBlur,
  handleChange,
  meta,
  setValue,
    errors
} = useField(name, undefined, {
  initialValue: props.modelValue,
});

watch(inputValue, (newValue: any) => {
  emit('update:modelValue', newValue);
});

watch(() => props.modelValue, (newValue: any) => {
    setValue(newValue);
  }
);

function onBlur() {
  handleBlur();
  emit('blur', meta.valid);
}
function onInput(event :InputEvent) {
  handleChange(event.target.value);
  emit('input', event);
}
</script>

<template>
  <div :class="[className, { 'has-error': !!errorMessage, success: meta.valid }]">
    <label :for="name" v-if="label" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
      {{ label }}
      <span v-show="subLabel" class="w-[210px] text-slate-600 text-sm font-normal leading-normal">
        <br />
        {{ subLabel }}
      </span>
    </label>
    <div class="mt-2 sm:col-span-2 sm:mt-0">
      <div class="relative">
        <div class="flex flex-col gap-y-1.5 relative">
          <div :class="errorMessage ? 'border border-red-300 flex relative rounded-md ring-0 ring-inset ring-gray-300 ' : 'flex relative rounded-md '">
            <input
              :name="name"
              :id="name"
              :type="type"
              v-model="inputValue"
              :placeholder="placeholder"
              :autofocus="autofocus"
              :disabled="disabled"
              @blur="onBlur"
              @input="onInput"
              class="form-input w-full"
              :class="{ 'has-error': errorMessage }"
            />
          </div>
          <p class="error-message" v-show="errorMessage || meta.valid">
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
