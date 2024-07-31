<script setup lang="ts">
import * as Yup from "yup";
import {Form, ErrorMessage, useForm} from "vee-validate";
import {usePostjobStore} from "~/segments/postjobs/store";
import Multiselect from "vue-multiselect";
import {debounce} from "~/segments/utils";
import {drop} from "lodash-es";

const emit = defineEmits(['handleFormSubmission', 'formDataListener']);

const props = defineProps<{
  initialFormValues: any
}>()

const jobPostStore = usePostjobStore();
const { businessTypesDropdown, orgNamesDropdown, searchedOrgNames } = storeToRefs(jobPostStore);

const uploadedImage = ref("");

const schema = Yup.object({
  businessId: Yup.string(),
  businessName: Yup.string().required("Business Name is required"),
  businessTypeId: Yup.number().typeError('Business type is required').required('Business type is required'),
  logoPath: Yup.mixed(),
  email: Yup.string().required('Email is required').email('Invalid email'),
  fullName: Yup.string().required("Full Name is required"),
})


const { defineField, handleSubmit, values, errors, resetForm } = useForm({
  validationSchema: schema
});
const [businessId] = defineField('businessId');
const [businessName, businessNameAttrs] = defineField('businessName');
const [businessTypeId, businessTypeAttrs] = defineField('businessTypeId');
const [logoPath] = defineField('logoPath');
const [email, emailAttrs] = defineField('email');
const [fullName, fullNameAttrs] = defineField('fullName');

const handleImageUpload = (event: any) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader(); // Read the uploaded file as a data URL
    reader.onload = (e: any) => {
      uploadedImage.value = e.target.result; // Set the uploaded image URL to the state variable
      logoPath.value = uploadedImage.value;
    };
    reader.readAsDataURL(file);
  }
};

let showUserLoginModal= ref<boolean>(false);
let isUserExist = ref<boolean>(false);

resetForm({
  values: props.initialFormValues,
});

watch(() => [values.businessName, uploadedImage.value], (val) => {
  emit('formDataListener', {
    orgName: val[0],
    image: val[1]
  });
})

const onSubmit = handleSubmit(values => {
  if (isUserExist.value) {
    showUserLoginModal.value = true;
    return;
  }
  emit('handleFormSubmission', values, 1)
});

defineExpose({
  onSubmit
})

const searchedName = ref<any>(null);
const searchingName = ref<boolean>(false);


const orgAutocomplete = ref(null);

const getSearchedText = debounce(async (input :string) => {
  if (input.length) {
    if (orgAutocomplete.value) orgAutocomplete.value.search = input;
    searchingName.value = true;
    await jobPostStore.fetchSearchedOrgNames(input);
    searchingName.value = false;
    if (!orgNamesDropdown.value.length) {  // if no results are found, assign default id i-e: 0
      searchedName.value = {
        label: input,
        value: 0
      }
      checkSelection(); // assign to form values
    }
  } else resetOrgAutocomplete();
}, 600)

function checkSelection() {
  businessName.value = searchedName.value.label;
  businessId.value = searchedName.value.value;
  if (orgAutocomplete.value) orgAutocomplete.value.search = businessName.value;
}

watch(() => props.initialFormValues, (val) => {
  if (val.businessName) {  // if orgName is selected and exists in form
    searchedName.value = {
      label: val.businessName,
      value: val.businessId
    }
  }
}, { immediate: true })

watch(() => searchedName.value, (val :any) => {
  if (!val) resetOrgAutocomplete(); // reset search fields if autocomplete gets empty
})
function dropdownClosed() {
  if (!searchedName.value) resetOrgAutocomplete();
}

function resetOrgAutocomplete() {
  searchedOrgNames.value = [];
  searchedName.value = null;
  businessName.value = '';
  businessId.value = null;
}

async function checkUserEmail(isFieldValid :boolean) {
  if (isFieldValid) {
    await jobPostStore.checkUserMail(email.value)
        .then((isUserFound) => {
            isUserExist.value = isUserFound;
            showUserLoginModal.value = isUserFound;
        })
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="mt-5 border-b border-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0">
      <div class="form-field-layout">
        <label class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
          Organization Name*
        </label>
        <div class="sm:col-span-2 sm:mt-0">
          <multiselect
              ref="orgAutocomplete"
              id="businessName"
              v-model="searchedName"
              :options="orgNamesDropdown"
              label="label"
              track-by="value"
              :multiple="false"
              :show-labels="false"
              :searchable="true"
              :preserve-search="true"
              :show-no-options="false"
              :show-no-results="false"
              :clear-on-select="false"
              class="custom-multi-select autocomplete"
              placeholder="e.g. Unified School District"
              :loading="searchingName"
              @search-change="getSearchedText"
              @select="checkSelection"
              @close="dropdownClosed"
              :class="{ 'has-error': errors?.businessName }"
          >
            <template #caret>
              <span></span>
            </template>
            <template #noResult>
                <span></span>
            </template>
            <template #noOptions>
              <span></span>
            </template>
          </multiselect>

          <ErrorMessage
              class="error-message"
              name="businessName"
          />
        </div>
      </div>

      <SelectBox
          v-model="businessTypeId"
          v-bind="businessTypeAttrs"
          name="businessTypeId"
          label="Business Type"
          :data="businessTypesDropdown"
          :label-value-options="true"
          subLabel=""
          :value="values.businessTypeId"
          className="form-field-layout mt-0"
      />

      <ImageFileUpload
          label="Business Logo/Icon"
          subLabel="This will be displayed on your profile."
          :uploaded-image="uploadedImage"
          :handle-image-upload="handleImageUpload"
      />

      <div
          class="mt-5 space-y-8 divide-b divide-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
      >
        <TextInput
            v-model="email"
            v-bind="emailAttrs"
            name="email"
            type="email"
            label="Your work email address*"
            placeholder="example@servehub.com"
            subLabel="Used to send you an email confirmation"
            className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
            @blur="checkUserEmail"
        />
      </div>

      <div
          class="mt-5 space-y-8 border-b border-gray-900/10 sm:space-y-0 sm:divide-y sm:divide-gray-900/10 sm:border-t sm:pb-0"
      >
        <TextInput
            v-model="fullName"
            v-bind="fullNameAttrs"
            name="fullName"
            type="text"
            label="Your full name*"
            placeholder="John Doe"
            subLabel=""
            className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4 sm:py-6"
        />
      </div>
    </div>

    <FormFooterButtons
      :hide-back-button="true"
    />
  </form>

  <BaseModal
    v-model="showUserLoginModal"
    id="user-login-prompt"
    title=""
    width="450px"
    :hide-cancel-btn="true"
    :hide-ok-btn="true"
    @close="() => showUserLoginModal = false"
  >
    <template #body>
      <div class="flex flex-col items-center gap-4">
        <p class="font-semibold text-lg text-center">
          A user account exists with this email address.
          Please log in before posting a job.
        </p>
        <BaseButton navigate-to="/login" label="Login"/>
      </div>
    </template>
  </BaseModal>
</template>
