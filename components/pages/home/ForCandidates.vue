<script setup lang="ts">
import ArrowIcon from "assets/icons/arrow-right.svg";

const selectedTab = ref(0)
</script>

<template>
  <section class="py-24">
    <div class="container">
      <div class="content">
        <div class="heading-and-subheading flex flex-col gap-3">
          <p class="section-subheading">For Candidates</p>
          <h2 class="section-heading">A refreshing job search experience</h2>
        </div>

        <div class="grid md:grid-cols-2 gap-16 process-steps pt-16">
          <div>
            <div :class="[ selectedTab === 0 ? 'border-brand-600' : 'border-gray-100' ]" @click="selectedTab = 0" class="border-l-4 px-6 py-4 cursor-pointer">
              <h4 class="font-semibold text-lg">
                Seamlessly Discover Your Next Opportunity
              </h4>
              <p class="text-gray-600 pt-1 pb-5">
                Dive into a user-friendly, modern job search experience with ServeHub. Uncover new openings effortlessly, where clarity meets convenience, guiding
                you to your ideal educational role."
              </p>

              <button class="flex items-center gap-3 text-brand-700 font-semibold group">
                Explore
                <ArrowIcon class="w-3 h-3 group-hover:translate-x-[8px] transition" />
              </button>
            </div>
            <div :class="[ selectedTab === 1 ? 'border-brand-600' : 'border-gray-100' ]" @click="selectedTab = 1" class="border-l-4 px-6 py-4 cursor-pointer">
              <h4 class="font-semibold text-lg">
                Exceptional Support on Your Job Journey
              </h4>
              <p class="text-gray-600 pt-1 pb-5">
                We're more than just a platform; we're your career partner. Our dedicated team is committed to assisting you in pinpointing the perfect position that aligns
                with your career aspirations and timing.
              </p>

              <NuxtLink to="/jobs" class="flex items-center gap-3 text-brand-700 font-semibold group">
                Apply Now
                <ArrowIcon class="w-3 h-3 group-hover:translate-x-[8px] transition" />
              </NuxtLink>
            </div>
            <div :class="[ selectedTab === 2 ? 'border-brand-600' : 'border-gray-100' ]" @click="selectedTab = 2" class="border-l-4 px-6 py-4 cursor-pointer">
              <h4 class="font-semibold text-lg">
                Empower Your Career Choices with Data
              </h4>
              <p class="text-gray-600 pt-1 pb-5">
                Gain exclusive access to insights on salary trends, comprehensive career resources, and valuable industry data, all designed to inform and enhance your career trajectory.
              </p>

              <NuxtLink to="/signup" class="flex items-center gap-3 text-brand-700 font-semibold group">
                Sign Up
                <ArrowIcon class="w-3 h-3 group-hover:translate-x-[8px] transition" />
              </NuxtLink>
            </div>
          </div>
          <div>
            <img src="/images/others/cards.png" alt="PNG image">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
