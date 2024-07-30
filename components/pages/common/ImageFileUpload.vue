<script setup lang="ts">
// Define the props types
const props = defineProps<{
  label: string;
  subLabel: string;
  uploadedImage: string;
  handleImageUpload: (event: Event) => void;
}>();
</script>

<template>
  <div class="sm:grid sm:grid-cols-3 sm:items-center sm:gap-4 sm:py-6">
    <label
      for="username"
      class="block text-sm font-semibold text-gray-700 sm:pt-1.5"
    >
      {{ props?.label }}
      <br />
      <span class="w-[228px] text-gray-600 text-sm font-normal leading-normal">
        {{ props?.subLabel }}
      </span>
    </label>
    <div class="mt-2 sm:col-span-2 sm:mt-0">
      <div class="flex flex-col md:flex-row items-start gap-x-5">
        <div class="shrink-0">
          <img
            :src="props?.uploadedImage"
            v-if="props?.uploadedImage"
            class="size-12 rounded-full object-cover"
          />
          <SvgoUpload v-else class="size-12" />
        </div>
        <div class="mt-2 sm:mt-0 w-full">
          <div
            class="flex w-full justify-center rounded-lg border border-gray-200 px-6 py-3.5"
          >
            <div class="text-center flex flex-col justify-center items-center">
              <SvgoFileUpload class="h-10 w-10" />
              <div class="mt-4 flex text-sm leading-6 text-center justify-center items-center text-gray-600">
                <label
                  for="file-upload"
                  class="relative cursor-pointer rounded-md bg-white font-semibold text-brand-600 transition focus-within:outline-none hover:text-brand-400"
                >
                  <span>Upload a file</span>
                  <input
                    id="file-upload"
                    name="file-upload"
                    type="file"
                    class="sr-only"
                    @change="props?.handleImageUpload"
                    accept="image/*"
                  />
                </label>
                <p class="pl-1">or drag and drop</p>
              </div>
              <p class="text-xs leading-5 text-gray-600">
                SVG, PNG, JPG or GIF (max. 800x400px)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
