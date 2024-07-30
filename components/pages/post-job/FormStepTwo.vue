<script setup lang="ts">
import {
  compensationTypesOptions,
  employmentOptions,
  hourlyRange,
  jobRolesOptions,
  salaryRange,
  toolbarOptions
} from "~/components/core/constants/post-job-form.constants";
import * as Yup from "yup";
import {ErrorMessage, Field, Form, useForm} from "vee-validate";
import {usePostjobStore} from "~/segments/postjobs/store";
import Datepicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";
import Multiselect from 'vue-multiselect'
import "vue-multiselect/dist/vue-multiselect.css"

const emit = defineEmits(['moveToPrevStep', 'handleFormSubmission', 'formDataListener']);

const props = defineProps<{
  initialFormValues: any
}>()

const postJobStore = usePostjobStore();
const {
  gradeLevelDropdown,
  subjectsDropdown,
  experienceLevelOptions
} = storeToRefs(postJobStore);

const jobRoles = ref(jobRolesOptions);

const schema = Yup.object({
    jobTitle: Yup.string().required("Job Title is required"),
    jobLocation: Yup.string().required("Location is required"),
    jobCity: Yup.string(),
    jobState: Yup.string(),
    jobCountry: Yup.string(),
    geoLat: Yup.number(),
    geoLng: Yup.number(),
    startDate: Yup.string().required("Start Date is required"),
    employmentTypeId: Yup.number().required("Employment Type is required"),
    experienceLevelId: Yup.number().required("Experience Level is required"),
    compensationTypeId: Yup.number(),
    minSalaryId: Yup.string().when("compensationTypeId", {
      is: 1,
      then: (schema) => schema.required("Salary Start Range is required")
    }),
    maxSalaryId: Yup.string().when("compensationTypeId", {
      is: 1,
      then: (schema) => schema.required("Salary End Range is required")
    }),
    minHourlyId: Yup.string().when("compensationTypeId", {
      is: 2,
      then: (schema) => schema.required("Hourly Start Range is required")
    }),
    maxHourlyId: Yup.string().when("compensationTypeId", {
      is: 2,
      then: (schema) => schema.required("Hourly End Range is required")
    }),
    jobRoleId: Yup.number().required("Job Role is required"),
    grades: Yup.array().of(Yup.number()).when("jobRoleId", {
      is: 1,
      then: (schema) => schema.min(1, "Grade Level(s) is required")
    }),
    subjects: Yup.number().when("jobRoleId", {
      is: 1,
      then: (schema) => schema.required("Subject Area(s) is required")
    }),
    jobDescription: Yup.string().required("Job Description is required"),
})

const { defineField, handleSubmit, values, errors, resetForm } = useForm({
  validationSchema: schema,
});
const [jobTitle, jobTitleAttrs] = defineField('jobTitle');
const [jobLocation] = defineField('jobLocation');
const [jobCity] = defineField('jobCity');
const [jobState] = defineField('jobState');
const [jobCountry] = defineField('jobCountry');
const [geoLat] = defineField('geoLat');
const [geoLng] = defineField('geoLng');
const [startDate, startDateAttrs] = defineField('startDate');
const [employmentTypeId, employmentTypeIdAttrs] = defineField('employmentTypeId');
const [experienceLevelId, experienceLevelIdAttrs] = defineField('experienceLevelId');
const [compensationTypeId, compensationTypeIdAttrs] = defineField('compensationTypeId');
const [minSalaryId, minSalaryIdAttrs] = defineField('minSalaryId');
const [maxSalaryId, maxSalaryIdAttrs] = defineField('maxSalaryId');
const [minHourlyId, minHourlyIdAttrs] = defineField('minHourlyId');
const [maxHourlyId, maxHourlyIdAttrs] = defineField('maxHourlyId');
const [jobRoleId] = defineField('jobRoleId');
const [grades] = defineField('grades');
const [subjects, subjectsAttrs] = defineField('subjects');
const [jobDescription, jobDescriptionAttrs] = defineField('jobDescription');

resetForm({
  values: props.initialFormValues,
});

const selectedSalaryRange = ref([])
const selectedHourlyRange = ref([])
if (minSalaryId.value && maxSalaryId.value) selectedSalaryRange.value = [minSalaryId.value, maxSalaryId.value];
if (minHourlyId.value && maxHourlyId.value) selectedHourlyRange.value = [minHourlyId.value, maxHourlyId.value];

function setLocationsCoordinates(location :any) {
  const locationInput = document.getElementById('jobLocationInput')
  if (locationInput) jobLocation.value = locationInput.value;

  geoLat.value = location.geometry.location.lat() as number;
  geoLng.value = location.geometry.location.lng() as number;
  const addressComponents = location.address_components;
  let selectedCity = '', selectedState = '', selectedCountry = '';
  addressComponents.forEach((component :any) => {
    const types = component.types;
    if (types.includes('locality')) selectedCity = component.long_name;
    else if (types.includes('administrative_area_level_1')) selectedState = component.short_name;
    else if (types.includes('country')) selectedCountry = component.long_name;
  });
  jobCity.value = selectedCity;
  jobState.value = selectedState;
  jobCountry.value = selectedCountry;
}

function resetLocationOnInput() {
  jobLocation.value = ''
  jobCity.value = ''
  jobState.value = '';
  jobCountry.value = '';
  geoLat.value = 0;
  geoLng.value = 0;
}

const options = ref({
  modules: {
    toolbar: toolbarOptions,
  },
  readOnly: false,
});

watch(() => [
  values.jobTitle,
  values.employmentTypeId,
  values.minSalaryId,
  values.maxSalaryId,
  values.minHourlyId,
  values.maxHourlyId
], (val) => {
  let startRange = '', endRange = '';
  if (val[2]) startRange = salaryRange.filter((salary) => salary.value === val[2])[0].label;
  if (val[3]) endRange = salaryRange.filter((salary) => salary.value === val[3])[0].label;
  if (val[4]) startRange = hourlyRange.filter((salary) => salary.value === val[4])[0].label;
  if (val[5]) endRange = hourlyRange.filter((salary) => salary.value === val[5])[0].label;
  emit('formDataListener', {
    jobTitle: val[0],
    employment: val[1],
    salaryStartRange: startRange,
    salaryEndRange: endRange
  });
})

const onSubmit = handleSubmit(values => {
  emit('handleFormSubmission', values, 2);
});

defineExpose({
  onSubmit
})

function handleInput(delta :string) {
  if (delta === '<p><br></p>') jobDescription.value = ''
}

const textInputOptions = {
  format: "MM/dd/yyyy",
};

const selectedMin = computed(() => {
  return compensationTypeId.value === 1 ? minSalaryId.value : minHourlyId.value;
});

let selectedGrades = ref<{ label: string, value: string }[]>([]);

watch(() => props.initialFormValues, (initialData) => {
  selectedGrades.value = (props.initialFormValues?.grades || []).map((selectedGrade :any) => {
    return gradeLevelDropdown.value.find(grade => grade.value === selectedGrade);
  }).filter((item :any) => item !== undefined) as any[];

  setTimeout(() => {
    const locationInput = document.getElementById('jobLocationInput')
    if (locationInput) locationInput.value = jobLocation.value;
  }, 1000)
}, { immediate: true })

watch(() => jobRoleId.value, (val) => {  // remove selected grades on non-instructional selection
  if (val === 2) selectedGrades.value = [];
})

function checkSelection() {
  grades.value = selectedGrades.value.map(grade => grade.value);
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="w-full">
      <div class="mt-5 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t">
        <!--    Job Title Field    -->
        <TextInput
            v-model="jobTitle"
            name="jobTitle"
            type="text"
            label="Job Title"
            placeholder="e.g. Project Manager"
            subLabel=""
            className="form-field-layout"
        />

        <!--    Location Field    -->
        <div class="form-field-layout">
          <label for="date" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
            Job Location
          </label>
          <div class="mt-2 sm:col-span-2 sm:mt-0 relative">
            <client-only>
              <GMapAutocomplete
                  id="jobLocationInput"
                  placeholder="Anywhere"
                  class="form-input job-location-input w-full"
                  :class="{ 'has-error': errors?.jobLocation }"
                  :options="{
                    componentRestrictions: { country: 'US' },
                    strictBounds: true
                  }"
                  @place_changed="setLocationsCoordinates"
                  @input="resetLocationOnInput"
              />
            </client-only>

            <ErrorMessage
                class="error-message"
                name="jobLocation"
            />
          </div>
        </div>

        <!--    Start Date Field    -->
        <div class="form-field-layout">
          <label for="date" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
            Start Date
          </label>
          <div class="mt-2 sm:col-span-2 sm:mt-0 relative">
            <Datepicker
                id="startDate"
                v-model="startDate"
                name="startDate"
                :min-date="new Date()"
                class="fixed-input-icon"
                input-class-name="form-input w-full"
                menu-class-name="dp-custom-menu"
                autoApply
                :state="!errors?.startDate?.length"
                :text-input="textInputOptions"
                :enable-time-picker="false"
                placeholder="MM/DD/YYYY"
            >
              <template #input-icon> </template>
            </Datepicker>
            <SvgoCalendar class="absolute h-5 top-3 right-3" />
            <ErrorMessage
                class="error-message"
                name="startDate"
            />
          </div>
        </div>

        <!--    Employment Type Field    -->
        <div class="form-field-layout">
          <label id="employmentTypeId" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
            Employment Type
          </label>
          <div class="mt-2 sm:col-span-2 sm:mt-0">
            <div class="flex flex-col gap-4">
              <template v-for="option in employmentOptions">
                <div class="flex items-center">
                  <Field
                      v-model="employmentTypeId"
                      name="employmentTypeId"
                      type="radio"
                      :value="option.value"
                      class="cursor-pointer"
                  />
                  <label
                      :for="option.label"
                      class="ms-2 text-sm font-medium text-gray-900 cursor-pointer"
                  >{{ option.label }}</label>
                </div>
              </template>
            </div>
            <ErrorMessage
                class="error-message"
                name="employmentTypeId"
            />
          </div>
        </div>

        <!--    Experience Level Field    -->
        <div class="form-field-layout">
          <label id="experienceLevelId" for="experience" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
            Experience Level
          </label>
          <div class="mt-2 sm:col-span-2 sm:mt-0">
            <div class="flex flex-col gap-4">
              <template v-for="(experience, i) in experienceLevelOptions">
                <div class="flex items-center">
                  <BaseTooltip
                      :id="`exp-rb-${i}`"
                      :tooltip-content="experience.desc"
                      position="right"
                  >
                    <Field
                        v-model="experienceLevelId"
                        name="experienceLevelId"
                        type="radio"
                        :value="experience.value"
                        class="cursor-pointer"
                    />
                    <label
                        for="Full-time"
                        class="ms-2 me-1 text-sm font-medium text-gray-900 cursor-pointer"
                    >{{ experience.label }}</label>
                  </BaseTooltip>
                </div>
              </template>
            </div>
            <ErrorMessage
                class="error-message"
                name="experienceLevelId"
            />
          </div>
        </div>

        <!--    Compensation Type Field    -->
        <div class="compensation-field-group">
          <div class="form-field-layout">
            <label id="compensationTypeId" for="compensation" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
              Compensation Type
            </label>
            <div class="col-span-2">
              <div class="flex gap-20">
                <template v-for="option in compensationTypesOptions">
                  <div class="flex gap-3">
                    <Field
                        v-model="compensationTypeId"
                        name="compensationTypeId"
                        type="radio"
                        :value="option.value"
                        class="cursor-pointer"
                    />
                    <label
                        :for="option.label"
                        class="text-sm font-medium text-gray-900"
                    >{{ option.label }}</label>
                  </div>
                </template>
              </div>
            </div>
          </div>
          <PayRangeSelectBox
              v-if="compensationTypeId === 1"
              v-model="selectedSalaryRange"
              name="minSalaryId"
              secondary-name="maxSalaryId"
              label="Salary Range"
              :data="salaryRange"
              :data2="salaryRange"
              subLabel="(USD)"
              className="form-field-layout"
          />
          <PayRangeSelectBox
              v-else-if="compensationTypeId === 2"
              v-model="selectedHourlyRange"
              name="minHourlyId"
              secondary-name="maxHourlyId"
              label="Hourly Range"
              :data="hourlyRange"
              :data2="hourlyRange"
              subLabel="(USD)"
              className="form-field-layout"
          />
        </div>

        <!--    Job Role Field    -->
        <SelectBox
            v-model="jobRoleId"
            name="jobRoleId"
            label="Job Role"
            :data="jobRoles"
            :label-value-options="true"
            subLabel=""
            :value="values.jobRoleId"
            className="form-field-layout"
        />

        <!--    Grade Level Field    -->
        <div class="form-field-layout mb-2"  v-if="jobRoleId == 1">
          <label class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
            Grade Level
          </label>
          <div class="mt-2 sm:col-span-2 sm:mt-0">
            <multiselect
                id="gradeLevels"
                v-model="selectedGrades"
                :options="gradeLevelDropdown"
                label="label"
                track-by="value"
                :multiple="true"
                :taggable="true"
                :show-labels="false"
                :searchable="false"
                :max="4"
                class="custom-multi-select"
                placeholder="Select grades"
                @select="checkSelection"
                @Remove="checkSelection"
            >
              <template #caret>
                <div class="multiselect__select">
                  <SvgoChevronDown class="w-4 h-4" />
                </div>
              </template>
              <template #maxElements>
                <span class="error-message">
                  Maximum of 4 grades have been elements. First remove a selected option to select another.
                </span>
              </template>
            </multiselect>

            <ErrorMessage
                class="error-message"
                name="grades"
            />
          </div>
        </div>

        <!--    Subject Areas Field    -->
        <SelectBox
            v-if="jobRoleId == 1"
            v-model="subjects"
            name="subjects"
            label="Subject Area(s)"
            :data="subjectsDropdown"
            :label-value-options="true"
            subLabel=""
            :value="values.subjects"
            placeholder="Select subject"
            className="form-field-layout"
        />

        <!--    Job Description Field    -->
        <div class="form-field-layout mb-0 sm:mb-12 xl:mb-0">
          <label for="jobDescription" class="block text-sm font-semibold text-gray-700 sm:pt-1.5">
            Job Description
          </label>
          <div class="mt-2 sm:col-span-2 sm:mt-0 rounded-lg">
            <quill-editor
                id="jobDescription"
                v-model:content="jobDescription"
                name="jobDescription"
                theme="snow"
                class="min-h-[102px]"
                placeholder="Enter a description.."
                :option="options"
                contentType="html"
                @update:content="handleInput"
            />
            <ErrorMessage
                class="error-message"
                name="jobDescription"
            />
          </div>
        </div>
      </div>
    </div>

    <FormFooterButtons
        @back-btn-clicked="() => emit('moveToPrevStep')"
    />
  </form>
</template>

<style>
.job-location-input{
  @apply outline-0 focus:ring-2 focus:ring-brand-600
}
</style>
