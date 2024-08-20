<script setup lang="ts">
import {
  applyMethodOptions
} from "~/components/core/constants/post-job-form.constants";
import * as Yup from "yup";
import {Form, ErrorMessage, Field, useForm} from "vee-validate";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const emit = defineEmits(['moveToPrevStep', 'handleFormSubmission']);

const props = defineProps<{
  initialFormValues: any
}>()

const urlRegex = /((https?):\/\/)?(www.)?[a-z0-9]+(\.[a-z]{2,}){1,3}(#?\/?[a-zA-Z0-9#]+)*\/?(\?[a-zA-Z0-9-_]+=[a-zA-Z0-9-%]+&?)?$/

const schema = Yup.object({
    applicationMethod: Yup.string().required("You must choose your application method"),
    applyURL: Yup.string().when("applicationMethod", {
      is: "URL",
      then: (schema) => schema.matches(urlRegex, "Enter correct url!").required("URL is required")
    }),
    applyEmail: Yup.string().when("applicationMethod", {
      is: "Email",
      then: (schema) => schema.email('Invalid email').required('Email is required')
    }),
    applicationDeadline: Yup.string(),
})
const initialFormValues = {
  applicationMethod: 'URL'
}

const { defineField, handleSubmit, values, resetForm, errors } = useForm({
  validationSchema: schema,
  initialValues: initialFormValues
});
const [applicationMethod, applicationMethodAttrs] = defineField('applicationMethod');
const [applyURL, applyURLAttrs] = defineField('applyURL');
const [applyEmail, applyEmailAttrs] = defineField('applyEmail');
const [applicationDeadline, applicationDeadlineAttrs] = defineField('applicationDeadline');

resetForm({
  values: props.initialFormValues,
});

const onSubmit = handleSubmit(values => {
  emit('handleFormSubmission', values, 3)
});

defineExpose({
  onSubmit
})

const textInputOptions = {
  format: "MM/dd/yyyy",
};
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="w-full">
      <div
          class="mt-5 space-y-0 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t sm:pb-0"
      >
        <SelectBox
            v-model="applicationMethod"
            v-bind="applicationMethodAttrs"
            name="applicationMethod"
            label="Your work Application method"
            :data="applyMethodOptions"
            :value="values.applicationMethod"
            :label-value-options="true"
            subLabel="“Please choose how you would like to receive job applications when candidates apply"
            :errorMessage="errors.applicationMethod"
            className="form-field-layout"
        />
        <HttpInput
            v-if="values.applicationMethod === 'URL'"
            v-model="applyURL"
            v-bind="applyURLAttrs"
            name="applyURL"
            type="text"
            label="Apply URL"
            placeholder="example.com/apply-here"
            subLabel=""
            className="form-field-layout"
        />
        <TextInput
            v-if="values.applicationMethod === 'Email'"
            v-model="applyEmail"
            v-bind="applyEmailAttrs"
            name="applyEmail"
            type="email"
            label="Apply Email"
            placeholder="Email here"
            subLabel=""
        />

        <div class="xl:grid xl:grid-cols-3 xl:items-start xl:gap-8 py-4 sm:py-5">
          <label
              for="applicationDeadline"
              class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
          >
            Application deadline date
          </label>
          <div class="mt-2 sm:col-span-2 relative">
            <Datepicker
                id="applicationDeadline"
                v-model="applicationDeadline"
                name="applicationDeadline"
                :min-date="new Date()"
                class="fixed-input-icon"
                input-class-name="form-input w-full"
                menu-class-name="dp-custom-menu"
                autoApply
                :text-input="textInputOptions"
                :enable-time-picker="false"
            >
              <template #input-icon />
            </Datepicker>

            <SvgoCalendar class="absolute h-5 top-3 right-3" />
          </div>
        </div>
      </div>
    </div>

    <FormFooterButtons
        @back-btn-clicked="() => emit('moveToPrevStep')"
    />
  </form>
</template>
