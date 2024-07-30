<script setup lang="ts">
definePageMeta({
  layout: 'minimal'
})
</script>

<template>
  <div class="email-sent-view overflow-hidden">
    <div class="relative">
      <div class="flex flex-col items-center mx-auto px-0 pt-20 pb-24">
        <img src="/images/others/bg-lines.png" alt="Background Thin Lines"
             class="absolute top-0 md:-top-1/2 inset-x-0 mx-auto w-full max-w-3xl"/>

        <div class="flex flex-col gap-8 z-10 max-w-[360px] lg:w-full">
          <div class="flex flex-col gap-6 items-center">
            <div class="w-14 h-14 bg-white relative flex flex-col justify-center items-center rounded-xl shadow border border-gray-200">
              <SvgoKey class="w-7 h-7" />
            </div>
            <div class="flex flex-col gap-3 items-center">
              <h2 class="text-2xl md:text-3xl mb-3">
                Password reset
              </h2>
              <p class="text-center">Your password has been successfully reset. Click below to log in magically.</p>
            </div>
          </div>
          <div>
            <BaseButton label="Continue" :full-sized="true" />
          </div>
          <div class="text-center">
            <NuxtLink to="/login" class="text-sm flex gap-2.5 items-center justify-center group">
              <SvgoArrowLeft class="w-4 h-4 text-gray-600 group-hover:-translate-x-[8px] transition" />
              Back to log in
            </NuxtLink>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
