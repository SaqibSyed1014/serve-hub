<script setup lang="ts">
import * as Yup from "yup";
import {useForm} from "vee-validate";
import {useAuthStore} from "~/segments/auth/store";

definePageMeta({
  layout: 'auth-form'
})

const authStore = useAuthStore();

const model = defineModel();
const emit = defineEmits(['proceed']);

const passwordVisibility = ref(false);
const passwordFieldIcon = computed(() => passwordVisibility.value ? 'SvgoEyeOff' : 'SvgoEye')

const initialValues = ref({
  email: "",
  password: ""
});

// validation schema
const schema = Yup.object().shape({
  email: Yup.string().email().required("Please enter your email"),
  password: Yup.string().min(6).required(),
});

const { handleSubmit, defineField, errors, meta, resetForm } = useForm({
  initialValues: initialValues.value,
  validationSchema: schema,
});

const [email, emailAttrs] = defineField("email");
const [password, passAttrs] = defineField("password");


const showLoginForm = ref<boolean>(false);

function toggleLoginForm() {
  showLoginForm.value = !showLoginForm.value;
  resetForm();
}

const canProceed = computed(() => {
  return meta.value.dirty && meta.value.valid;
});

function redirectionToApplyURL() {
  emit('proceed')
}

const processingRequest = ref<boolean>(false);
const showConfirmationMessage = ref<boolean>(false);

const processCandidateAction = handleSubmit(() =>
  new Promise(async (resolve, reject) => {
    const payload = {
      email: email.value,
      password: password.value
    }
    if (showLoginForm.value) {
      showConfirmationMessage.value = true;
      reject(false);
    }
    else {
      processingRequest.value = true;
      await authStore.candidateSignup(payload)
          .then(() => {
            reject(true);
          })
          .catch(()  => reject(false))
      processingRequest.value = false;
    }
  })
);

onUnmounted(() => {
  resetForm();
})
</script>

<template>
  <BaseModal
      v-model="model"
      width="450px"
      :title="showConfirmationMessage ? '' : (showLoginForm ? 'Sign in today!' : 'Sign up today!')"
      :ok-text="showLoginForm ? 'Sign in' : 'Create Account'"
      :ok-disabled="!canProceed"
      :loading-ok-btn="processingRequest"
      :on-cancel="() => model = false"
      :on-ok="processCandidateAction"
      :hide-ok-btn="showConfirmationMessage"
      :hide-cancel-btn="showConfirmationMessage"
      @close="redirectionToApplyURL"
  >
    <template #body>
      <template v-if="showConfirmationMessage">
        <div class="flex flex-col justify-center items-center gap-2">
          <h3 class="font-semibold text-xl">
            Account Created!
          </h3>
          <p class="pb-4">
            A confirmation email has been sent to your inbox. Please check your email to verify your account.
          </p>
          <BaseButton label="Continue to apply to this job" @click="redirectionToApplyURL" />
        </div>
      </template>
      <template v-else>
        <p class="text-sm">
        Lorem ipsum is placeholder text commonly used in the graphic, print, and publishing industries for previewing
        layouts and visual mockups.
      </p>

        <form @submit.prevent="processCandidateAction" class="flex flex-col gap-5">
          <div class="form-control">
            <label for="email" class="text-custom-secondary-700">Email</label>
            <input v-model="email" v-bind="emailAttrs" type="email" id="email" placeholder="Enter your email"
                   class="form-input" :class="{ 'has-error': errors.email }"/>
            <span class="input-error" v-if="errors.email">{{ errors.email }}</span>

          </div>
          <div class="form-control">
            <label for="password" class="text-custom-secondary-700">Password</label>
            <div class="relative">
              <div class="absolute inset-y-0 top-0 flex items-center right-3">
                <component
                    :is="passwordFieldIcon"
                    class="w-5 h-5 text-gray-600 cursor-pointer"
                    @click="passwordVisibility = !passwordVisibility"
                />
              </div>
              <input
                  v-model="password"
                  v-bind="passAttrs"
                  :type="passwordVisibility ? 'text' : 'password'"
                  id="password"
                  placeholder="Enter your password"
                  class="form-input"
                  :class="{ 'has-error': errors.password }"
              />
            </div>
            <span class="input-error" v-if="errors.password">{{ errors.password }}</span>
          </div>

          <div v-if="!showLoginForm" class="text-sm">
            Already have an account?
            <span @click="toggleLoginForm"
                  class="cursor-pointer text-brand-600 hover:text-brand-400 font-medium transition">Login</span>
          </div>
          <div v-else class="text-sm">
            Don’t have an account?
            <span @click="toggleLoginForm"
                  class="cursor-pointer text-brand-600 hover:text-brand-400 font-medium transition">Sign up</span>
          </div>
        </form>
      </template>
    </template>
  </BaseModal>
</template>
