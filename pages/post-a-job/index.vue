<script setup lang="ts">
import { usePostjobStore } from "~/segments/postjobs/store";
import {
  formStepsHeaderContent,
  formStepsOptions,
} from "~/components/core/constants/post-job-form.constants";
import { pricingPlansIDs } from "~/components/core/constants/pricing.constants";
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import FormStepFour from "~/components/pages/post-job/FormStepFour.vue";

const currentStep = ref(0);
const postjobStore = usePostjobStore();
const { content,status, checkoutURL } = storeToRefs(postjobStore);
const isFormLoading = ref<boolean>(true);
const router = useRouter();

onMounted(async() => {
  isFormLoading.value = true;
  await Promise.all([
    postjobStore.fetchOrgTypes(),
    postjobStore.fetchGradeLevels(),
    postjobStore.fetchSubjects(),
    postjobStore.fetchExperienceLevels()
  ])
  isFormLoading.value = false;
});

const steps = ref(formStepsOptions);

const unwatch = watch(currentStep, (newValue: number, oldValue: number) => {
  if (oldValue === 0 && newValue === 1) {
    // Update the status of Organization Information to 'complete'
    steps.value[0].status = "complete";
    steps.value[1].status = "current";
  } else if (oldValue === 1 && newValue === 2) {
    // Update the status of Job Details to 'complete'
    steps.value[1].status = "complete";
    steps.value[2].status = "current";
  } else if (oldValue === 2 && newValue === 3) {
    // Update the status of Application Details to 'complete'
    steps.value[2].status = "complete";
    steps.value[3].status = "complete";
    unwatch(); // Stop watching for further changes
  }
});

const email = ref<string>('');
const name = ref<string>('');
let jobPostingPrice = ref<string>('$49');


// Function to handle checkout payment
async function checkout () {
  const payload :JobPaymentPayload = {
        email: formsCollectiveData.stepOne.email,
        price_id: jobPostingPrice.value === '$49' ? pricingPlansIDs[0] : pricingPlansIDs[1],
        fullName: formsCollectiveData.stepOne.fullName,
        organizationName: formsCollectiveData.stepOne.organizationName,
        organizationTypeId: formsCollectiveData.stepOne.organizationTypeId,
        jobTitle : formsCollectiveData.stepTwo.jobTitle,
    };
  await postjobStore.fetchPayment(payload)
      .then(() => {
        if (checkoutURL.value) {
          window.open(checkoutURL.value, '_blank');
        }
      })
}


// Function to handle button click
function handleButtonClick(e: number, fieldId :string) {
  currentStep.value = e;  // Update currentStep value
  nextTick(() => { // Wait for DOM update
    const destinationField = document.getElementById(fieldId);
    if (destinationField) { // Ensure element exists
      destinationField.scrollIntoView({ behavior: "smooth", block: "center" });
      destinationField.focus();
    }
  });
}

// Watch for changes in currentStep prop
watch(() => currentStep.value, (newValue: number) => {
    currentStep.value = newValue;
});

function changeStep(stepIdx: number) {
  currentStep.value = stepIdx;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const firstStep = ref(null);
const secondStep = ref(null);
const thirdStep = ref(null);
function handleStepClick(index :number) {
  if (currentStep.value === 0 && index > currentStep.value) firstStep.value.onSubmit();
  if (currentStep.value === 1 && index > currentStep.value) secondStep.value.onSubmit();
  if (currentStep.value === 2 && index > currentStep.value) thirdStep.value.onSubmit();
}

let formsCollectiveData = reactive({
  stepOne: {
    logoPath: ""
  },
  stepTwo: {
    compensationTypeId: 1,
    jobDescription: '',
    jobLocation: ''
  },
  stepThree: {}
})

function moveToNextForm(values :any, formNo :number) {
  if (formNo === 1) formsCollectiveData.stepOne = values;
  if (formNo === 2) formsCollectiveData.stepTwo = values;
  if (formNo === 3) formsCollectiveData.stepThree = values;
  currentStep.value = formNo;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

function prevStep() {
  if (currentStep.value <= 0) return;
  currentStep.value--;
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

const previewFormData = ref({
  jobTitle: '',
  orgName: '',
  employment: '',
  selectedImage: '',
  salaryStartRange: '',
  salaryEndRange: ''
})
function getStepOneField({ orgName, image }) {
  previewFormData.value.orgName = orgName;
  previewFormData.value.selectedImage = image;
}
function getStepTwoFields({ jobTitle, employment, salaryStartRange, salaryEndRange }) {
  previewFormData.value.jobTitle = jobTitle;
  previewFormData.value.employment = employment;
  previewFormData.value.salaryStartRange = salaryStartRange;
  previewFormData.value.salaryEndRange = salaryEndRange;
}

function updatePostingPrice(val :boolean) {
  if (val) jobPostingPrice.value = '$79'
  else jobPostingPrice.value = '$49'
}

let processingSaveJob = ref<boolean>(false);
async function processJobSaving() {
  processingSaveJob.value = true;
  await postjobStore.savingJobFormData({
    ...formsCollectiveData.stepOne,
    ...formsCollectiveData.stepTwo,
    ...formsCollectiveData.stepThree,
  }).then(async () => {
    await checkout();
  }).catch(() => {
    console.log('unknown error occurred');
  })
  processingSaveJob.value = false;
}
</script>

<template>
  <div class="border-t border-b border-gray-200 mb-10 lg:mb-24">
    <div class="container pt-8">
      <div class="">
        <h2 class="text-2xl lg:text-3xl font-semibold">Post a Job</h2>
        <p class="text-base font-normal">
          Your job post will be pinned to the top and highlighted in relevant
          search results for 30 days.
        </p>
        <UInput color="primary" variant="outline" placeholder="Search..." />
      </div>
      <hr class="border-b border-gray-200 mt-5" />
      <div
        class="flex flex-col md:flex-row justify-between gap-8"
      >
        <div class="hidden xl:block w-1/5 border-r border-gray-200">
          <div class="sticky right-0 top-0 w-full pt-8">
            <div class="flex flex-row justify-between gap-8">
              <nav aria-label="Progress" class="">
                <ol role="list" class="overflow-hidden pl-1 pt-1">
                  <li
                    v-for="(step, stepIdx) in steps"
                    :key="step.name"
                    :class="[
                      stepIdx !== steps.length - 1 ? 'pb-8' : '',
                      'relative flex items-center',
                    ]"
                  >
                    <template v-if="step.status === 'complete'">
                      <div
                        v-if="stepIdx !== steps.length - 1"
                        class="absolute left-[8%] top-3.5 -ml-px mt-7 h-[30%] w-0.5 bg-brand-600"
                        aria-hidden="true"
                      />
                      <div
                        class="group relative flex items-center"
                        :aria-disabled="step.status !== 'complete'"
                      >
                        <SvgoStepComp class="h-9 w-9" />
                      </div>
                    </template>
                    <template v-else-if="step.status === 'current'">
                      <div
                        v-if="stepIdx !== steps.length - 1"
                        class="absolute left-[8%] top-3.5 -ml-px mt-7 h-[30%] w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                      <div
                        class="group relative flex items-center"
                        aria-current="step"
                      >
                        <span class="bg-brand-100 rounded-full h-11 w-11 -left-1 absolute"></span>
                        <span
                          class="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-brand-600 bg-brand-600"
                        >
                          <span class="h-2.5 w-2.5 rounded-full bg-white" />
                        </span>
                      </div>
                    </template>
                    <template v-else>
                      <div
                        v-if="stepIdx !== steps.length - 1"
                        class="absolute left-[8%] top-3.5 mt-7 h-[30%] w-0.5 bg-gray-200"
                        aria-hidden="true"
                      />
                      <button
                        disabled="true"
                        class="group relative flex items-center"
                      >
                        <span class="flex h-9 items-center" aria-hidden="true">
                          <span
                            class="relative z-10 flex h-9 w-9 items-center justify-center rounded-full border-2 border-gray-200 bg-white group-hover:border-gray-400"
                          >
                            <span
                              class="h-2.5 w-2.5 rounded-full bg-gray-200"
                            />
                          </span>
                        </span>
                      </button>
                    </template>
                    <button
                        v-if="false"
                      type="submit"
                      class="flex flex-col cursor-pointer"
                      @click="currentStep !== stepIdx && handleStepClick()"
                    >
                      <span
                          class="ml-4 flex min-w-0 flex-col text-base font-semibold"
                          :class="currentStep === stepIdx ? 'text-brand-700': ' text-gray-700'"
                      >
                        {{ step.name }}
                      </span>
                    </button>
                    <button
                      v-else
                      type="button"
                      @click="
                        step.status === 'complete' || step.status === 'current'
                          ? changeStep(stepIdx)
                          : handleStepClick(stepIdx)
                      "
                      class="flex flex-col cursor-pointer"
                    >
                      <span
                          class="ml-4 flex min-w-0 flex-col text-base font-semibold"
                          :class="currentStep === stepIdx ? 'text-brand-700': ' text-gray-700'"
                      >
                        {{ step.name }}
                      </span>
                    </button>
                  </li>
                </ol>
              </nav>
            </div>
          </div>
        </div>

        <!--   Job Post Form Layout     -->
        <div class="w-full md:w-3/4 xl:w-3/5 pt-8">
          <div class="job-post-form-layout h-full">
            <div class="flex items-center justify-between">
              <template v-for="(header, i) in formStepsHeaderContent">
                <div v-if="currentStep === i">
                  <h2 class="text-lg font-semibold leading-7 text-gray-900">
                    {{ header.title }}
                  </h2>
                  <p class="mt-1 max-w-2xl text-sm leading-6 text-gray-600">
                    {{ header.text }}
                  </p>
                </div>
              </template>
              <div>
                <SvgoRing14 v-if="currentStep === 0" class="h-14 xl:hidden" />
                <SvgoRing24
                  v-else-if="currentStep === 1"
                  class="h-14 xl:hidden"
                />
                <SvgoRing34
                  v-else-if="currentStep === 2"
                  class="h-14 xl:hidden"
                />
                <SvgoRing44 v-else class="h-14 xl:hidden" />
              </div>
            </div>

            <template v-if="isFormLoading">
              <div class="container h-full">
                <div class="flex justify-center items-center h-screen md:h-full w-full">
                  <BaseSpinner size="lg" :show-loader="isFormLoading" />
                </div>
              </div>
            </template>

            <template v-else>
              <FormStepOne
                  ref="firstStep"
                  v-if="currentStep === 0"
                  :initial-form-values="formsCollectiveData.stepOne"
                  @form-data-listener="getStepOneField"
                  @handle-form-submission="moveToNextForm"
              />
              <FormStepTwo
                  ref="secondStep"
                  v-if="currentStep === 1"
                  :initial-form-values="formsCollectiveData.stepTwo"
                  @form-data-listener="getStepTwoFields"
                  @move-to-prev-step="prevStep"
                  @handle-form-submission="moveToNextForm"
              />
              <FormStepThree
                  ref="thirdStep"
                  v-if="currentStep === 2"
                  :initial-form-values="formsCollectiveData.stepThree"
                  @move-to-prev-step="prevStep"
                  @handle-form-submission="moveToNextForm"
              />
              <FormStepFour
                  v-if="currentStep === 3"
                  :form-data="formsCollectiveData"
                  :job-posting-price="jobPostingPrice"
                  :make-payment="checkout"
                  @edit-icon-clicked="handleButtonClick"
                  @move-to-prev-step="prevStep"
                  @updated-job-posting-pricing="updatePostingPrice"
              />
            </template>
          </div>
        </div>

        <div class="w-full md:w-1/4 xl:w-1/5 flex flex-col gap-4 md:pt-8">
          <OrderSummary
            :total-posting-price="jobPostingPrice"
          />
          <EnteredJobDetails
              :job-title="previewFormData.jobTitle"
              :org-name="previewFormData.orgName"
              :employment="previewFormData.employment"
              :selected-image="previewFormData.selectedImage"
              :salary-start-range="previewFormData.salaryStartRange"
              :salary-end-range="previewFormData.salaryEndRange"
          />
          <DonationMessage />

          <!--   Checkout Btn   -->
          <BaseButton
            v-if="currentStep === 3"
            :label="`Post a Job for ${jobPostingPrice}`"
            :outline="true"
            color="primary"
            full-sized
            :is-loading="processingSaveJob"
            @click="processJobSaving"
            type="button"
            :disabled="false"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">
.job-location-input{
  @apply focus:outline-0 focus:ring-2 focus:ring-blue-600 shadow-none
}
</style>
