<script setup lang="ts">
import {convertTZDateToShortDate} from "~/segments/utils";
import {usePostjobStore} from "~/segments/postjobs/store";
import {
  compensationTypesOptions,
  employmentOptions,
  jobRolesOptions
} from "~/components/core/constants/post-job-form.constants";

const props = defineProps<{
  formData: any,
  jobPostingPrice: string,
  makePayment: () => void
}>()

const postJobStore = usePostjobStore();
const {
  orgTypesDropdown,
  experienceLevelOptions
} = storeToRefs(postJobStore);

const emit = defineEmits(['editIconClicked', 'moveToPrevStep', 'updatedJobPostingPricing']);

const orgTypeLabel = computed(() => {
  return orgTypesDropdown.value.filter((org) => org?.value == props.formData.stepOne?.organizationTypeId)[0].label
})

const employmentTypeLabel = computed(() => {
  return employmentOptions.filter((employment) => employment?.value == props.formData.stepTwo?.employmentTypeId)[0].label
})

const experienceLevelLabel = computed(() => {
  return experienceLevelOptions.value.filter((experience) => experience?.value == props.formData.stepTwo?.experienceLevelId)[0].label
})

const jobRoleLabel= computed(() => {
  return jobRolesOptions.filter((job) => job?.value == props.formData.stepTwo?.jobRoleId)[0].label
})

const compensationPreview = computed(() => {
  const stepTwoData = props.formData.stepTwo;
  const selectedCompensationTypeLabel = compensationTypesOptions.filter(compensation => compensation.value === stepTwoData.compensationTypeId)[0].label
  return selectedCompensationTypeLabel
})

let processingSaveJob = ref<boolean>(false);
async function processJobSaving() {
  processingSaveJob.value = true;
  await postJobStore.savingJobFormData({
    ...props.formData.stepOne,
    ...props.formData.stepTwo,
    ...props.formData.stepThree,
  }).then(() => {
    props.makePayment();
  }).catch(() => {
    console.log('unknown error occurred');
  });
  processingSaveJob.value = false;
}
</script>

<template>
  <div class="w-full">
    <div class="mt-5 border-b border-gray-900/10 divide-y divide-gray-900/10 border-t pb-0">
      <div class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6">
        <h4 class="text-gray-900 text-base font-semibold leading-normal">
          Organization Information
        </h4>
        <div class="preview-field-layout">
          <div class="preview-field-wrapper">
            <div class="preview-field-update">
              <p class="preview-field-heading">
                Organization Name
              </p>
              <button
                id="tooltipButton"
                type="button"
                @click="() => emit('editIconClicked', 0, 'orgName')"
              >
                <BaseTooltip id="edit-icon-1" tooltip-content="Edit" position="right">
                  <SvgoEditPensil class="edit-field-icon" />
                </BaseTooltip>
              </button>
            </div>

            <p class="preview-field-text">
              {{ formData.stepOne?.organizationName ? formData.stepOne.organizationName : "N/A" }}
            </p>
          </div>

          <div class="preview-field-wrapper">
            <div class="preview-field-update">
              <p class="preview-field-heading">
                Organization Type
              </p>
              <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 0, 'organizationTypeId')"
              >
                <BaseTooltip id="edit-icon-2" tooltip-content="Edit" position="right">
                  <SvgoEditPensil class="edit-field-icon" />
                </BaseTooltip>
              </button>
            </div>

            <p class="preview-field-text">
              {{ orgTypeLabel }}
            </p>
          </div>
        </div>

        <div class="preview-field-layout">
          <div class="preview-field-wrapper">
            <div class="preview-field-update">
              <p class="preview-field-heading">
                Your work email address
              </p>
              <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 0, 'email')"
              >
                <BaseTooltip id="edit-icon-2" tooltip-content="Edit" position="right">
                  <SvgoEditPensil class="edit-field-icon" />
                </BaseTooltip>
              </button>
            </div>

            <p class="preview-field-text">
              {{ formData.stepOne?.email ? formData.stepOne.email : "N/A" }}
            </p>
          </div>

          <div class="preview-field-wrapper">
            <div class="preview-field-update">
              <p class="preview-field-heading">
                Your full name
              </p>
              <button
                id="tooltipButton"
                type="button"
                @click="() => emit('editIconClicked', 0, 'fullName')"
              >
                <BaseTooltip id="edit-icon-3" tooltip-content="Edit" position="right">
                  <SvgoEditPensil class="edit-field-icon" />
                </BaseTooltip>
              </button>
            </div>

            <p class="preview-field-text">
              {{ formData.stepOne?.fullName ? formData.stepOne.fullName : "N/A" }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6">
        <h4 class="text-gray-900 text-base font-semibold leading-normal">
          Job Details
        </h4>
        <div class="preview-field-layout">
          <div class="preview-field-wrapper">
            <div class="preview-field-update">
              <p class="preview-field-heading">
                Job Title
              </p>
              <button
                id="tooltipButton"
                type="button"
                @click="() => emit('editIconClicked', 1, 'jobTitle')"
              >
                <BaseTooltip id="edit-icon-4" tooltip-content="Edit" position="right">
                  <SvgoEditPensil class="edit-field-icon" />
                </BaseTooltip>
              </button>
            </div>

            <p class="preview-field-text">
              {{ formData.stepTwo?.jobTitle ? formData.stepTwo.jobTitle : "N/A" }}
            </p>
          </div>

          <div
              class="preview-field-wrapper"
            >
              <div class="preview-field-update">
                <p class="preview-field-heading">
                  Start Date
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 1, 'startDate')"
                >
                  <BaseTooltip id="edit-icon-5" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="edit-field-icon" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="preview-field-text">
                {{ formData.stepTwo?.startDate ? convertTZDateToShortDate(formData.stepTwo.startDate) : "N/A" }}
              </p>
            </div>
        </div>

        <div class="preview-field-layout">
          <div class="preview-field-wrapper">
            <div class="preview-field-update">
              <p class="preview-field-heading">
                Employment Type
              </p>
              <button
                id="tooltipButton"
                type="button"
                @click="() => emit('editIconClicked', 1, 'employmentTypeId')"
              >
                <BaseTooltip id="edit-icon-6" tooltip-content="Edit" position="right">
                  <SvgoEditPensil class="edit-field-icon" />
                </BaseTooltip>
              </button>
            </div>

            <p class="preview-field-text">
              {{ employmentTypeLabel }}
            </p>
          </div>

          <div class="preview-field-wrapper">
              <div class="preview-field-update">
                <p class="preview-field-heading">
                  Experience Level
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 1, 'experienceLevelId')"
                >
                  <BaseTooltip id="edit-icon-7" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="edit-field-icon" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="preview-field-text">
                {{ experienceLevelLabel }}
              </p>
            </div>
        </div>

        <div class="preview-field-layout">
          <div class="">
            <div class="preview-field-wrapper">
              <div class="preview-field-update">
                <p class="preview-field-heading">
                  Compensation
                </p>
                <button
                    id="tooltipButton"
                    type="button"
                    @click="() => emit('editIconClicked', 1, 'compensationTypeId')"
                >
                  <BaseTooltip id="edit-icon-6" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="edit-field-icon" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="preview-field-text">
                {{ compensationPreview }}
              </p>
            </div>
          </div>

          <div class="">
            <div
                class="preview-field-wrapper"
            >
              <div class="preview-field-update">
                <p class="preview-field-heading">
                  Job Role
                </p>
                <button
                    id="tooltipButton"
                    type="button"
                    @click="() => emit('editIconClicked', 1, 'jobRoleId')"
                >
                  <BaseTooltip id="edit-icon-7" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="edit-field-icon" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="preview-field-text">
                {{ jobRoleLabel }}
              </p>
            </div>
          </div>
        </div>

        <div class="preview-field-layout">
          <div class="preview-field-wrapper">
            <div class="preview-field-update">
              <p class="preview-field-heading">
                Job Description
              </p>
              <button
                id="tooltipButton"
                type="button"
                @click="() => emit('editIconClicked', 1, 'jobDescription')"
              >
                <BaseTooltip id="edit-icon-10" tooltip-content="Edit" position="right">
                  <SvgoEditPensil class="edit-field-icon" />
                </BaseTooltip>
              </button>
            </div>
            <p
              class="preview-field-text"
              v-html="formData.stepTwo.jobDescription"
            ></p>
          </div>

          <div class="preview-field-wrapper">
            <div class="preview-field-update">
              <p class="preview-field-heading">
                Job Location
              </p>
              <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 1, 'jobLocationInput')"
              >
                <BaseTooltip id="edit-icon-10" tooltip-content="Edit" position="right">
                  <SvgoEditPensil class="edit-field-icon" />
                </BaseTooltip>
              </button>
            </div>
            <p class="preview-field-text">
              {{ formData.stepTwo?.jobLocation ? formData.stepTwo.jobLocation : "N/A" }}
            </p>
          </div>
        </div>
      </div>

      <div class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6">
        <h4 class="text-gray-900 text-base font-semibold leading-normal">
          Application Details
        </h4>
        <div class="preview-field-layout">
          <div class="">
            <div
              class="preview-field-wrapper"
            >
              <div class="preview-field-update">
                <p class="preview-field-heading">
                  Application method
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 2, 'applicationMethod')"
                >
                  <BaseTooltip id="edit-icon-11" tooltip-content="Edit" position="right">
                    <SvgoEditPensil class="edit-field-icon" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="preview-field-text">
                {{ formData.stepThree?.applicationMethod ? formData.stepThree?.applicationMethod : "N/A" }}
              </p>
            </div>
          </div>
          <div class="">
            <div class="preview-field-wrapper">
              <div class="preview-field-update">
                <p class="preview-field-heading">
                  {{ formData.stepThree?.applicationMethod ? formData.stepThree?.applicationMethod : "N/A" }}
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 2, formData.stepThree?.applicationMethod === 'Email' ? 'applyEmail' : 'applyURL')"
                >
                  <BaseTooltip id="edit-icon-12" tooltip-content="Edit">
                    <SvgoEditPensil class="edit-field-icon" />
                  </BaseTooltip>
                </button>
              </div>

              <p v-if="formData.stepThree?.applicationMethod === 'URL'" class="preview-field-text">
                {{ formData.stepThree?.applyURL ? "http://" + formData.stepThree.applyURL : "N/A" }}
              </p>
              <p v-if="formData.stepThree?.applicationMethod === 'Email'" class="preview-field-text">
                {{ formData.stepThree?.applyEmail ? formData.stepThree.applyEmail : "N/A" }}
              </p>
            </div>
          </div>
        </div>

        <div class="preview-field-layout">
          <div class="">
            <div class="preview-field-wrapper">
              <div class="preview-field-update">
                <p class="preview-field-heading">
                  Application deadline date
                </p>
                <button
                  id="tooltipButton"
                  type="button"
                  @click="() => emit('editIconClicked', 2, 'applicationDeadline')"
                >
                  <BaseTooltip id="edit-icon-13" tooltip-content="Edit">
                    <SvgoEditPensil class="edit-field-icon" />
                  </BaseTooltip>
                </button>
              </div>

              <p class="preview-field-text">
                {{ formData.stepThree?.applicationDeadline ? convertTZDateToShortDate(formData.stepThree?.applicationDeadline) : "N/A" }}
              </p>
            </div>
          </div>
        </div>
      </div>

      <FeatureJobPrompt
        @featured-selection="(val :boolean) => emit('updatedJobPostingPricing', val)"
      />

      <FormFooterButtons
        :hide-cancel-button="true"
        :hide-next-button="true"
        @back-btn-clicked="() => emit('moveToPrevStep')"
      >
        <template #checkoutBtn>
          <!--   Checkout Btn   -->
          <BaseButton
              :label="`Post Job - ${jobPostingPrice}`"
              :outline="true"
              color="primary"
              type="button"
              :disabled="false"
              :is-loading="processingSaveJob"
              @click="processJobSaving"
          />
        </template>
      </FormFooterButtons>
    </div>
  </div>
</template>

<style scoped>
.preview-field-layout{
  @apply grid sm:grid-cols-2 gap-4 w-full
}
.preview-field-wrapper{
  @apply flex-col justify-start items-start gap-2 inline-flex
}
.preview-field-update{
  @apply inline-flex items-center gap-1
}
.preview-field-heading{
  @apply text-gray-700 text-base font-semibold leading-normal
}
.edit-field-icon{
  @apply ml-0.5 h-4 text-gray-500 hover:text-brand-500 transition
}
.preview-field-text{
  @apply text-gray-600 text-base font-normal leading-normal
}
</style>
