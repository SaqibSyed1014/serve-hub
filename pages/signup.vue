<script setup lang="ts">
import * as Yup from "yup";

import { useForm } from "vee-validate";

definePageMeta({
  layout: 'auth-form'
})

const passwordVisibility = ref(false)
const passwordFieldIcon = computed(() => passwordVisibility.value ? 'SvgoEyeOff' : 'SvgoEye')

const selectedUserType = useState('userType')

const initialValues = ref({
  userType: selectedUserType.value,
  orgName: "",
  name: "",
  email: "",
  password: ""
});

// validation schema
const schema = Yup.object().shape({
  userType: Yup.string(),
  orgName: Yup.string().when('userType', {
    is: (selectedUserType :string) => selectedUserType === 'organization',
    then: () => Yup.string().required("Please enter your organization name"),
    otherwise: () => Yup.string()
  }),
  name: Yup.string().required("Please enter your name"),
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required(),
});

const { handleSubmit, defineField, errors, meta, resetForm } = useForm({
  initialValues: initialValues.value,
  validationSchema: schema,
});

// define form fields with their attributes
const [userType] = defineField("userType");
const [orgName, orgNameAttrs] = defineField("orgName");
const [name, nameAttrs] = defineField("name");
const [email, emailAttrs] = defineField("email");
const [password, passAttrs] = defineField("password");

const canProceed = computed(() => {
  return meta.value.dirty && meta.value.valid;
});

watch(() => userType.value, (val) => {
  resetForm({
    values: { ...initialValues.value, userType: val }
  })
})

const isOrganizationSelected = computed(() => userType.value === 'organization')

const onSubmit = () => {}

// resetting the userType store to its default value
onUnmounted(() => selectedUserType.value = 'organization')
</script>

<template>
  <div class="flex flex-col justify-center gap-8 w-full pt-20 pb-28 lg:py-28">
    <NuxtLink to="/" class="max-lg:block hidden">
      <img src="/images/logo.svg" alt="EduJob Logo" />
    </NuxtLink>
    <div class="flex flex-col gap-3">
      <h1 class="font-semibold text-3xl">Sign up</h1>
      <p>Get started today and join ServeHub!</p>
    </div>
    <div class="w-full">
      <form
          @submit="onSubmit"
          class="flex flex-col gap-5 pb-6"
      >
        <div class="flex gap-12">
          <div class="flex items-center">
            <input v-model="userType" id="org-cb" type="radio" value="organization" name="user-type" class="w-4 h-4 text-brand-500 bg-gray-100 border-gray-300 focus:ring-brand-500 focus:ring-2">
            <label for="org-cb" class="ms-2 cursor-pointer">Organization</label>
          </div>
          <div class="flex items-center">
            <input v-model="userType" id="job-seeker-cb" type="radio" name="user-type" value="jobSeeker" class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600">
            <label for="job-seeker-cb" class="ms-2 cursor-pointer">Job Seeker</label>
          </div>
        </div>
        <div v-if="isOrganizationSelected" class="form-control">
          <label for="orgName">Organization Name</label>
          <input v-bind="orgNameAttrs" v-model="orgName" type="text" id="orgName" placeholder="Enter your organization name" class="form-input" :class="{ 'has-error': errors.orgName }" />
          <span class="input-error" v-if="errors.orgName">{{ errors.orgName }}</span>
        </div>
        <div class="form-control">
          <label for="name">Name</label>
          <input v-model="name" v-bind="nameAttrs" type="text" id="name" placeholder="Enter your name" class="form-input" :class="{ 'has-error': errors.name }"/>
          <span class="input-error" v-if="errors.name">{{ errors.name }}</span>
        </div>
        <div class="form-control">
          <label for="email">
            {{ isOrganizationSelected ? 'Work Email' : 'Email' }}
          </label>
          <input v-model="email" v-bind="emailAttrs" type="email" id="email" :placeholder="`Enter your${isOrganizationSelected ? ' work' : ''} email`" class="form-input" :class="{ 'has-error': errors.email }"/>
          <span class="input-error" v-if="errors.email">{{ errors.email }}</span>
        </div>
        <div class="form-control">
          <label for="password">Password</label>
          <div class="relative">
            <div class="absolute inset-y-0 top-0 flex items-center right-3">
              <component
                  :is="passwordFieldIcon"
                  class="w-5 h-5 text-gray-600 cursor-pointer"
                  @click="passwordVisibility = !passwordVisibility"
              />
            </div>
            <input v-model="password" v-bind="passAttrs" :type="passwordVisibility ? 'text' : 'password'" id="password" placeholder="Enter your password" class="form-input" :class="{ 'has-error': errors.password }"/>
          </div>
          <span class="input-error" v-if="errors.password">{{ errors.password }}</span>
        </div>
      </form>
      <div class="flex flex-col gap-4">
        <BaseButton @click="onSubmit" :disabled="!canProceed" label="Get Started" :full-sized="true"/>
      </div>
    </div>
    <p class="text-sm text-center">
      <span>Already have an account? </span>
      <NuxtLink to="/login" class="text-brand-600 font-semibold hover:text-brand-400 transition">
        Login
      </NuxtLink>
    </p>
  </div>
</template>
