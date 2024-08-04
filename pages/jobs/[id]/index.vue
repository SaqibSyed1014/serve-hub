<script setup lang="ts">
import { initModals } from 'flowbite'
import {useJobStore} from "~/segments/jobs/store";
import QuickSignUpModal from "~/components/pages/job-listings/QuickSignUpModal.vue";
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import {convertTZDateToShortDate} from "~/segments/utils";
const center = ref({ lat: 0, lng: 0 })

const router = useRouter();
const jobStore = useJobStore();
const { jobDetails, jobBenefits, jobFaqs } = storeToRefs(jobStore);

const route = useRoute();
const { baseURL } = usePayloadUrl();

const mapOptions = computed(() => {
  const lat = jobDetails?.value?.geo_lat ?? 0;
  const lng = jobDetails?.value?.geo_lng ?? 0;
  center.value = { lat, lng }
  return [
      {
        position: { lat, lng },
      }
    ]
})

const isJobFetching = ref<boolean>(true);

onMounted(async () => {
  initModals();
  isJobFetching.value = true;
  await jobStore.fetchJobDetails(route.params?.id as string);
  isJobFetching.value = false;
})

const showSignupModal = ref<boolean>(false)

function applyBtnAction() {
  showSignupModal.value = true
}

function redirectToURL() {
  if (jobDetails.value?.apply_url) window.open(jobDetails.value.apply_url, '_target');
  showSignupModal.value = false;
}

function copyURL() {
  const currentURL = window.location.href;
  navigator.clipboard.writeText(currentURL);
  useNuxtApp().$toast.success('Link Copied!', {
    icon: false
  });
}

function downloadJob() {
  if (jobDetails.value?.job_slug)
    window.open(`${baseURL}/job/download/${jobDetails.value.job_slug}`, '_blank')
  else {
    useNuxtApp().$toast.error('Job slug not found', {
      icon: false
    });
  }
}

function jobSharingOnX() {
  const currentJobURL = encodeURIComponent(window.location.href);
  const orgNameText = jobDetails.value?.organization_name ? ` at ${jobDetails.value.organization_name}` : '';
  const url = `https://x.com/intent/post?text=Check out this job opportunity! %0A${jobDetails.value?.job_title}${orgNameText}.%0A%0AApply now:&url=${currentJobURL}%0A%0A&hashtags=EducationJobs,k12,edtech`;
  window.open(url, '_target');
}

function jobSharingOnLinkedIn() {
  const currentJobURL = encodeURIComponent(window.location.href);
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${currentJobURL}`;
  window.open(url, '_target');
}

function jobSharingOnFacebook() {
  const currentJobURL = encodeURIComponent(window.location.href);
  const url = `https://www.facebook.com/sharer/sharer.php?u=#${currentJobURL}`;
  window.open(url, '_target');
}

function jobOrgType() {
  if (jobDetails.value?.business_type === 'Bars') return 'businesses/bars'
  else if (jobDetails.value?.business_type === 'Restaurants') return 'businesses/restaurants'
}
</script>

<template>
  <div v-if="isJobFetching" class="container">
    <div class="flex justify-center items-center h-[calc(100vh-80px)] w-full">
      <BaseSpinner size="lg" :show-loader="isJobFetching" />
    </div>
  </div>


  <div v-else-if="jobDetails">
    <section class="pt-8 pb-16">
      <div class="container">
        <div class="grid md:grid-cols-12 gap-8">
          <div class="md:col-span-9">
            <div class="flex md:justify-between mb-5">
              <div class="hidden md:flex items-center gap-3">
                <span @click="router.go(-1)">Jobs</span>
                <SvgoChevronRight class="w-4 h-4 text-gray-300" />
                <NuxtLink :to="`/${jobOrgType()}/${jobDetails.slug}`" class="text-brand-700 font-medium">
                  {{ jobDetails.organization_name }}
                </NuxtLink>
              </div>
              <span @click="router.go(-1)" class="flex items-center gap-3 group text-brand-700 font-medium cursor-pointer">
                <SvgoArrowLeft class="w-4 h-4 group-hover:-translate-x-[8px] transition" />
                Back
              </span>
            </div>

            <div class="mb-8 h-[140px] md:h-[240px] max-md:-mx-5">
              <img src="/images/others/job-main.jpg" alt="" class="w-full mx-auto h-full object-cover"/>
            </div>
            <div class="job-details md:px-8">
              <div class="job-logo-and-title -mt-20 md:-mt-14 mb-8">
                <div class="flex max-md:flex-col items-start md:justify-between md:items-end gap-4">
                  <div class="flex max-md:flex-col md:items-end gap-6">
                    <div class="w-24 h-24 shrink-0 bg-white rounded-[10px] shadow-lg p-1 flex justify-center items-center">
                      <div v-if="jobDetails.job_logo" class="border border-gray-200 rounded-[10px] overflow-hidden">
                        <img :src="jobDetails.job_logo" :alt="jobDetails.job_title" class="w-full h-full object-cover">
                      </div>

                      <SvgoBuilding v-else class="size-14" />
                    </div>

                    <div>
                      <!-- Job Title -->
                      <BaseTooltip :tooltip-content="jobDetails.job_title" id="title">
                        <h2 class="text-2xl lg:text-3xl md:text-ellipsis md:line-clamp-1">
                          {{ jobDetails.job_title }}
                        </h2>
                      </BaseTooltip>
                      <p v-if="jobDetails?.organization_name" class="text-gray-600 md:line-clamp-1">
                        {{ jobDetails?.organization_name || 'N/A' }}
                      </p>
                    </div>
                  </div>

                  <div class="flex gap-3 text-gray-700">
                    <BaseTooltip tooltip-content="Download job description as PDF">
                      <div
                          @click="downloadJob"
                          class="option-box">
                        <span>
                          <SvgoDownload class="w-6 h-6" />
                        </span>
                      </div>
                    </BaseTooltip>

                    <div
                        class="option-box">
                      <span>
                        <SvgoBookmark class="w-6 h-6" />
                      </span>
                    </div>

                    <div
                        @click="copyURL"
                        class="option-box"
                    >
                      <span>
                        <SvgoClipboard class="w-6 h-6" />
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Job Insights -->
              <div class="job-insights">
                <h3 class="section-heading">Insights</h3>
                <hr>
                <div class="details grid grid-cols-2 md:grid-cols-3 gap-6 max-md:pb-6">
                  <div>
                    <p class="font-medium text-sm">Location</p>
                    <div class="text-gray-600 flex items-center gap-2">
                      <SvgoLocationPin class="w-4 h-4" />
                      {{ jobDetails?.job_location || 'N/A' }}
                    </div>
                  </div>

                  <div>
                    <p class="font-medium text-sm">Pay Range</p>
                    <div class="text-gray-600 flex items-center gap-2">
                      <SvgoCurrencyDollar class="w-4 h-4"/>
                      {{
                        (jobDetails.min_salary && jobDetails.max_salary) || (jobDetails.min_hourly && jobDetails.max_hourly)
                            ? (jobDetails.min_salary && jobDetails.max_salary
                                    ? `$${jobDetails.min_salary.toLocaleString()} - $${jobDetails.max_salary.toLocaleString()} Salary`
                                    : `$${jobDetails.min_hourly.toLocaleString()} - $${jobDetails.max_hourly.toLocaleString()} Hourly`
                            )
                            : 'N/A'
                      }}
                    </div>
                  </div>

                  <div>
                    <p class="font-medium text-sm">Employment type</p>
                    <div class="text-gray-600 flex items-center gap-2">
                      <SvgoClock class="w-4 h-4"/>
                      {{ jobDetails?.employment_type || 'N/A' }}
                    </div>
                  </div>

                  <div>
                    <p class="font-medium text-sm">Deadline</p>
                    <div class="text-gray-600 flex items-center gap-2">
                      <SvgoClock class="w-4 h-4"/>
                      {{ jobDetails?.application_deadline || 'N/A' }}
                    </div>
                  </div>

                  <div>
                    <p class="font-medium text-sm">Job role</p>
                    <div class="text-gray-600 flex items-center gap-2">
                      <SvgoClock class="w-4 h-4"/>
                      {{ jobDetails?.job_role || 'N/A' }}
                    </div>
                  </div>

                  <div>
                    <p class="font-medium text-sm">Shift Type</p>
                    <div class="text-gray-600 flex items-center gap-2">
                      <SvgoClock class="w-4 h-4"/>
                      {{ jobDetails?.shift_type || 'N/A' }}
                    </div>
                  </div>
                </div>

                <div class="md:hidden">
                  <BaseButton @click="applyBtnAction" label="Apply Now" :full-sized="true"/>
                </div>
              </div>

              <hr/>

              <!-- Job Description -->
              <div class="job-content mb-5">
                <div v-html="jobDetails.job_description"></div>
              </div>


              <!-- Job FAQs -->
              <template v-if="jobFaqs.length">
                <hr>

                <h3 class="section-heading">FAQs</h3>
                <hr>
                <div class="flex flex-col gap-4">
                  <template v-for="faq in jobFaqs">
                    <AccordionCollapse :item="faq" />
                  </template>
                </div>
              </template>

              <hr class="hidden">

              <!-- Current Job's Prev/Next Job -->
              <div class="hidden justify-between">
                <BaseButton color="gray" :outline="true" label="Previous Job" />
                <BaseButton label="Next Job" />
              </div>
            </div>
          </div>
          <div class="md:col-span-3">
            <div class="flex flex-col gap-4">
              <div class="side-rounded-cards">
                <div
                    class="flex items-center justify-center border border-[#EAECF0] bg-gray-100 rounded-full w-12 h-12 mb-5">
                  <SvgoAnnouncement class="w-6 h-6 text-gray-600"/>
                </div>
                <h2 class="mb-2">Interested in this job?</h2>
                <p class="text-gray-600 text-sm mb-3">Don’t miss the chance. Apply now here.</p>
                <p v-if="jobDetails?.internal_job_code?.length" class="text-gray-600 text-sm mb-5">
                  Job code: {{  jobDetails?.internal_job_code }}
                </p>
                <BaseButton @click="applyBtnAction" label="Apply Now" :full-sized="true" />
              </div>

              <!-- Job Benefits -->
              <template v-if="jobBenefits.length">
                <div class="side-rounded-cards">
                  <h2 class="mb-2">Benefits</h2>
                  <p class="text-gray-600 text-sm mb-3">
                    Following benefits are offered along wih basic salary package
                  </p>

                  <ul class="flex flex-col gap-4 text-sm text-gray-600">
                    <template v-for="benefit in jobBenefits">
                      <li class="flex gap-2">
                        <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                             viewBox="0 0 28 28" fill="none">
                          <rect width="28" height="28" rx="14" fill="#C2D4FD"/>
                          <path fill-rule="evenodd" clip-rule="evenodd"
                                d="M19.9476 8.62193L11.5943 16.6836L9.37763 14.3153C8.9693 13.9303 8.32763 13.9069 7.86096 14.2336C7.40596 14.5719 7.27763 15.1669 7.55763 15.6453L10.1826 19.9153C10.4393 20.3119 10.8826 20.5569 11.3843 20.5569C11.8626 20.5569 12.3176 20.3119 12.5743 19.9153C12.9943 19.3669 21.0093 9.81193 21.0093 9.81193C22.0593 8.7386 20.7876 7.7936 19.9476 8.61027V8.62193Z"
                                fill="#3669E4"/>
                        </svg>
                        <div>
                          <span class="font-medium text-base text-gray-700">{{ benefit.benefit_name }}</span>
                          <p class="text-sm">{{ benefit.benefit_description }}</p>
                        </div>
                      </li>
                    </template>

                    <li class="flex gap-2">
                      <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                           viewBox="0 0 28 28" fill="none">
                        <rect width="28" height="28" rx="14" fill="#C2D4FD"/>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M19.9476 8.62193L11.5943 16.6836L9.37763 14.3153C8.9693 13.9303 8.32763 13.9069 7.86096 14.2336C7.40596 14.5719 7.27763 15.1669 7.55763 15.6453L10.1826 19.9153C10.4393 20.3119 10.8826 20.5569 11.3843 20.5569C11.8626 20.5569 12.3176 20.3119 12.5743 19.9153C12.9943 19.3669 21.0093 9.81193 21.0093 9.81193C22.0593 8.7386 20.7876 7.7936 19.9476 8.61027V8.62193Z"
                              fill="#3669E4"/>
                      </svg>

                      <div>
                        <span class="font-medium text-base text-gray-700">Dental Benefit</span>
                        <p class="text-sm">Following benefits are offered along wih basic salary package</p>
                      </div>
                    </li>

                    <li class="flex gap-2">
                      <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
                           viewBox="0 0 28 28" fill="none">
                        <rect width="28" height="28" rx="14" fill="#C2D4FD"/>
                        <path fill-rule="evenodd" clip-rule="evenodd"
                              d="M19.9476 8.62193L11.5943 16.6836L9.37763 14.3153C8.9693 13.9303 8.32763 13.9069 7.86096 14.2336C7.40596 14.5719 7.27763 15.1669 7.55763 15.6453L10.1826 19.9153C10.4393 20.3119 10.8826 20.5569 11.3843 20.5569C11.8626 20.5569 12.3176 20.3119 12.5743 19.9153C12.9943 19.3669 21.0093 9.81193 21.0093 9.81193C22.0593 8.7386 20.7876 7.7936 19.9476 8.61027V8.62193Z"
                              fill="#3669E4"/>
                      </svg>

                      <div>
                        <span class="font-medium text-base text-gray-700">Gym membership</span>
                        <p class="text-sm">Following benefits are offered along wih basic salary package</p>
                      </div>
                    </li>
                  </ul>

                </div>
              </template>

              <!-- Job Location -->
              <template v-if="jobDetails?.geo_lat && jobDetails?.geo_lng">
                <div class="side-rounded-cards">
                  <h2 class="mb-2">Pin location</h2>
                  <p class="text-gray-600 text-sm mb-5">Find on map where this job is located</p>

                  <div class="job-location">
                    <client-only>
                      <GMapMap
                          :center="center"
                          :zoom="12"
                          style="height: 500px;"
                      >
                        <GMapMarker
                            v-for="(m, index) in mapOptions"
                            :position="m.position"
                            :key="index"
                            :clickable="true"
                            :draggable="true"
                        />
                      </GMapMap>
                    </client-only>
                  </div>
                </div>
              </template>

              <!-- Job Meta Info -->
              <div class="side-rounded-cards">
                <h2 class="mb-2">Published on</h2>
                <p class="text-gray-600 text-sm mb-5">{{ jobDetails?.date_posted }}</p>

                <h2 class="mb-5">Share this job</h2>
                <div class="flex gap-6">
                  <SvgoTwitterX @click="jobSharingOnX" class="w-6 h-6 cursor-pointer" />
                  <SvgoLinkedin @click="jobSharingOnLinkedIn" class="w-6 h-6 cursor-pointer" />
                  <SvgoFacebook @click="jobSharingOnFacebook" class="w-6 h-6 cursor-pointer" />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="hidden justify-between">
          <BaseButton color="gray" :outline="true" label="Previous Job" />
          <BaseButton label="Next Job" />
        </div>

        <hr>

        <div class="max-md:hidden md:px-8 md:pt-4">
          <BaseButton @click="applyBtnAction" label="Apply Now" />
        </div>
      </div>
    </section>


    <JobCTA />

    <QuickSignUpModal v-model="showSignupModal" @proceed="redirectToURL" />

    <JobPostingJSONLD :job-data="jobDetails" />
  </div>
</template>

<style scoped lang="postcss">
hr {
  @apply border-t border-gray-200 my-5
}

.option-box {
  @apply flex items-center cursor-pointer gap-1 py-2.5 px-3 text-sm border border-gray-300 rounded-lg hover:bg-brand-600 hover:text-white hover:border-brand-600 transition
}

.section-heading {
  @apply text-lg
}
.job-content :deep(ul) {
  @apply list-disc ml-6 mb-4
}
.job-content :deep(p) {
  @apply mb-2
}
.job-content :deep(a) {
  word-break: break-word;
}
.side-rounded-cards {
  @apply w-full bg-white border border-[#EAECF0] rounded-2xl p-4
}
</style>
