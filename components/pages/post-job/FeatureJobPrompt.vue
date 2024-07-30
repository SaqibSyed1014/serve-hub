<script setup lang="ts">
const emit = defineEmits(['featuredSelection'])
</script>

<template>
  <div
      class="flex-col justify-start items-start inline-flex w-full gap-6 py-4 md:py-6"
  >
    <h4 class="text-gray-900 text-base font-semibold leading-normal">
      Upgrade
    </h4>
    <div class="grid sm:grid-cols-2 gap-4 w-full">
      <div class="justify-start items-start gap-8 inline-flex">
        <div class="flex-col justify-start items-start gap-2 inline-flex">
          <p class="text-gray-700 text-base font-semibold leading-normal">
            Feature your Job
          </p>
        </div>
      </div>
      <div class="flex flex-row gap-3 items-start">
        <div class="flex items-center">
          <div class="flex items-center mb-4">
            <input
                type="checkbox"
                class="form-checkbox"
                id="featuredCB"
                :checked="false"
                @change="($event) => emit('featuredSelection', $event.target.checked)"
            />
          </div>
        </div>
        <div class="max-w-[303px]">
          <h3 class="text-gray-700 text-base font-medium">
            For only $30 make Featured jobs offer these benefits:
          </h3>

          <h2 class="mb-2.5 text-base font-normal text-gray-600">
            Featured jobs offer these benefits:
          </h2>
          <ol
              class="space-y-1 text-gray-600 list-decimal list-inside"
          >
            <li>
              <span class="font-normal text-gray-600">
                Show on our home page
              </span>
            </li>

            <li>
              <span class="font-normal text-gray-600">
                Appear higher in the search results
              </span>
            </li>
            <li>
              <span class="font-normal text-gray-600">
                Are styled visually to stand out
              </span>
            </li>
          </ol>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
