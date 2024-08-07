<script setup lang="ts">
import * as Yup from "yup";
import { useForm } from "vee-validate";
import {useHomeStore} from "~/segments/home/store";

const homeStore = useHomeStore();

let formData = ref<ContactFormPayload>({
  fullName: '',
  email: '',
  phoneNumber: '',
  message: '',
  privacyConsent: false
})

const formLoader = ref<boolean>(false);

// validation schema
const schema = Yup.object().shape({
  fullName: Yup.string(),
  email: Yup.string().email().required("Email is required"),
  phoneNumber: Yup.string(),
  message: Yup.string().required("Message is required"),
  privacyConsent: Yup.boolean().oneOf([true], "You must accept the privacy policy")
});

const { handleSubmit, defineField, errors, meta } = useForm({
  initialValues: formData.value,
  validationSchema: schema,
});

const [fullName, fullNameAttrs] = defineField("fullName");
const [email, emailAttrs] = defineField("email");
const [phoneNumber, phoneNumberAttrs] = defineField("phoneNumber");
const [message, messageAttrs] = defineField("message");
const [privacyConsent, privacyConsentAttrs] = defineField("privacyConsent");

const onSubmit = handleSubmit(async (values) => {
  formLoader.value = true;
  await homeStore.sendClientMessage(values);
  formLoader.value = false;
});

</script>

<template>
  <form @submit.prevent="onSubmit" class="space-y-6">
      <div class="form-control">
        <TextInput
            v-model="fullName"
            v-bind="fullNameAttrs"
            name="fullName"
            type="text"
            label="Name"
            placeholder="Enter Full Name"
        />
      </div>

    <div class="form-control">
      <TextInput
          v-model="email"
          v-bind="emailAttrs"
          name="email"
          type="email"
          label="Email"
          placeholder="Enter Email"
      />
    </div>
    <div class="form-control">
      <TextInput
          v-model="phoneNumber"
          v-bind="phoneNumberAttrs"
          name="phoneNumber"
          type="text"
          label="Phone number"
          placeholder="+1 (555) 000-0000"
      />
    </div>
    <div class="form-control">
      <TextInput
          v-model="message"
          v-bind="messageAttrs"
          name="message"
          type="text"
          label="Message"
          placeholder="Leave us a message..."
      />
    </div>
    <div class="col-span-2">
      <label for="contact-checkbox" class="text-black-light font-normal inline-flex items-start sm:items-center gap-3">
        <input v-model="privacyConsent" v-bind="privacyConsentAttrs" type="checkbox" class="form-checkbox" id="contact-checkbox" />
        <span>By checking this box, I consent to the <NuxtLink to="/privacy-policy" class="underline hover:no-underline">privacy policy</NuxtLink>.</span>
      </label>
      <p class="error-message" v-if="errors.privacyConsent">{{ errors.privacyConsent }}</p>
    </div>

    <BaseButton type="submit" label="Send message" :full-sized="true" :is-loading="formLoader" />
  </form>
</template>
