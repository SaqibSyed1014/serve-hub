<template>
  <div class="cta-banner">
    <div class="container">
      <div class="banner relative bg-brand-800 rounded-2xl overflow-hidden py-10 md:py-16 px-6 md:px-12">
        <div class="flex max-md:flex-col justify-between relative gap-8 z-20">
          <div class="heading-and-subheading flex flex-col gap-4 md:gap-2">
            <h4 class="text-3xl text-white font-semibold">
              Hire Top Talent Effortlessly
            </h4>
            <p class="text-brand-200 text-lg pb-3">
              Discover how our platform can streamline your hiring process and connect you with the top talent.
            </p>
          </div>
          <div class="shrink-0">
            <BaseButton label="Request a Demo" navigate-to="/demo-request" color="primary" :full-sized-on-small="true" />
          </div>
        </div>

        <div class="dashed-ring first-ring"></div>
        <div class="dashed-ring second-ring"></div>
        <div class="dashed-ring third-ring"></div>
        <div class="dashed-ring forth-ring"></div>
      </div>
    </div>
  </div>
</template>
