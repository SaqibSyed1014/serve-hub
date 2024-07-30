<script setup lang="ts">
definePageMeta({
  layout: 'minimal'
})
</script>

<template>
  <div class="reset-password-form">
    <div class="flex flex-col items-center mx-auto px-0 py-24">
      <img src="/images/others/bg-lines.png" alt="Background Thin Lines"
           class="absolute top-0 md:-top-1/2 inset-x-0 mx-auto w-full max-w-3xl"/>

      <div class="flex flex-col gap-8 z-10 max-w-[360px] lg:w-full">
        <div class="flex flex-col gap-6 items-center">
          <div
              class="w-14 h-14 bg-white relative flex flex-col justify-center items-center rounded-xl shadow border border-gray-200">
            <SvgoKey class="w-7 h-7"/>
          </div>
          <div class="flex flex-col gap-3 items-center">
            <h2 class="text-3xl text-center font-bold text-gray-800">Set new password</h2>
            <p class="text-black-light font-normal text-center">Your new password must be different than your last
              password.</p>
          </div>
        </div>
        <div>
          <form class="flex flex-col gap-6">
            <div class="form-control">
              <label class="font-medium mb-1.5 text-sm" for="password">Password</label>
              <input class="form-input" id="password" type="password" placeholder="Enter your password"/>
            </div>
            <div class="form-control">
              <label class="font-medium mb-1.5 text-sm" for="confirm-password">Confirm password</label>
              <input class="form-input" id="confirm-password" type="password"
                     placeholder="Enter your confirm password"/>
            </div>
            <div class="flex flex-col gap-y-1.5 text-sm font-semibold">
              <div class="flex flex-col gap-3 items-start self-stretch">
                <div class="flex gap-2 items-center self-stretch">
                  <SvgoTickDisabled class="w-5 h-5"/>
                  <span>Must be at least 6 characters</span>
                </div>
                <div class="flex gap-2 items-center self-stretch">
                  <SvgoTickDisabled class="w-5 h-5"/>
                  <span>Must contain at least one special character</span>
                </div>
              </div>
            </div>

            <BaseButton label="Reset password" :full-sized="true"/>
          </form>
        </div>
        <div class="text-center">
          <NuxtLink to="/login" class="text-sm flex gap-2.5 items-center justify-center group">
            <SvgoArrowLeft class="w-4 h-4 text-gray-600 group-hover:-translate-x-[8px] transition"/>
            Back to log in
          </NuxtLink>
        </div>
      </div>
    </div>
  </div>
</template>
