<script setup lang="ts">

</script>

<template>
  <section class="pt-11 pb-24">
    <div class="container">
      <div class="grid md:grid-cols-2">
        <div class="hidden md:block form-side-overlay bg-[url('/images/others/business.jpg')] bg-cover bg-[70%] relative">
          <div class="absolute top-0 bg-gradient-to-tr from-brand-800 to-brand-600 h-full w-full opacity-80"></div>
          <div class="relative z-10 py-36 2xl:py-40 px-8">
            <div class="container flex items-center">
              <div class="text-white">
                <h3 class="text-5xl 2xl:text-7xl">
                  Start turning your ideas into reality.
                </h3>
                <p class="text-xl text-brand-200 pt-6 pb-12">
                  Create a free account and get full access to all features for 30-days. No credit card needed. Trusted
                  by over 4,000 professionals.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-center">
          <div class="md:pl-12 py-16">
            <h3 class="text-4xl pb-5">
              Create an Account
            </h3>
            <p class="text-xl text-gray-600">
              Be a part of our 10k+ member’s community
            </p>
            <form class="grid md:grid-cols-2 gap-x-8 gap-y-6 pt-12">
              <div>
                <label for="firstName">First Name</label>
                <input
                    type="text"
                    placeholder="First Name"
                >
              </div>
              <div>
                <label for="lastName">Last Name</label>
                <input
                    type="text"
                    placeholder="Last Name"
                >
              </div>
              <div class="md:col-span-2">
                <label for="email">Email</label>
                <input
                    type="email"
                    placeholder="you@company.com"
                >
              </div>
              <div class="md:col-span-2">
                <label for="email">Email</label>
                <input
                    type="text"
                    placeholder="+1 (555) 000-0000"
                >
              </div>
              <div class="md:col-span-2">
                <div class="flex gap-2 items-center">
                  <div class="shrink-0">
                    <input id="policyCB" type="checkbox" value="">
                  </div>
                  <label for="policyCB" class="text-base text-gray-600 inline-block !pb-0">
                    You agree to our friendly <span class="underline cursor-pointer hover:no-underline">privacy policy</span>.
                  </label>
                </div>
              </div>

              <div class="md:col-span-2">
                <BaseButton label="Sign Up" color="primary" :full-sized="true" />
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">
form label{
  @apply block pb-1.5 text-sm text-gray-700
}
form input:not(input[type=checkbox]){
  @apply w-full
}
</style>
