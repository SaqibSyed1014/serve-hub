<script setup lang="ts">
defineProps<{
  hideBackButton?: boolean,
  hideCancelButton?: boolean,
  hideNextButton?: boolean
}>();

const emit = defineEmits(['backBtnClicked', 'nextBtnClicked']);

const router = useRouter();
</script>

<template>
  <!--    Form Buttons        -->
  <div
      class="flex flex-col md:flex-row items-end justify-between gap-3 mt-4 md:mt-0"
  >
    <div class="w-full md:w-fit">
      <BaseButton
          v-if="!hideBackButton"
          label="Back"
          color="brand"
          type="button"
          class="md:mt-5 md:mb-8 w-full"
          :disabled="false"
          @click="() => emit('backBtnClicked')"
      />
    </div>
    <div
        class="flex flex-col md:flex-row justify-end gap-3 md:pt-5 md:pb-8 w-full md:w-fit"
    >
      <BaseButton
          v-if="!hideCancelButton"
          type="button"
          label="Cancel"
          color="gray"
          :disabled="false"
          :outline="true"
          class="order-2 md:order-1"
          @click="() => router.back()"
      />

      <BaseButton
          v-if="!hideNextButton"
          label="Next"
          color="primary"
          type="submit"
          :disabled="false"
          class="order-1 md:order-2"
          @click="() => emit('nextBtnClicked')"
      />

      <slot name="checkoutBtn" />
    </div>
  </div>
</template>
