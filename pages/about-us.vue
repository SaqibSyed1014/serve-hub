<script setup lang="ts">
import {values} from "~/components/core/constants/about-us.constants";
</script>

<template>
  <div class="about-us-page">
    <section class="pb-12 pt-16 md:pt-24">
      <div class="container">
        <div class="text-center md:mb-14">
          <h2 class="text-4xl md:text-5xl mb-6">
            We’re a mission driven company
          </h2>

          <p class="md:text-xl font-normal mb-12">
            Powerful, self-serve product and growth analytics to help you convert, engage, and retain more users. Trusted by over 4,000 startups.
          </p>
        </div>

        <div class="grid md:grid-cols-2 max-md:gap-14">
          <div class="col-span-1">
            <div class="flex flex-col gap-6 md:pr-20 xl:pr-24">
              <div class="bg-brand-100 size-12 rounded-full flex items-center justify-center">
                <SvgoChats class="text-brand-500 size-6" />
              </div>
              <div>
                <h3 class="text-lg mb-2">Share team inboxes</h3>
                <p>
                  Whether you have a team of 2 or 200, our shared team inboxes keep everyone on the same page and in the loop.
                </p>
              </div>

              <ul class="flex flex-col gap-4">
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                    <span>Leverage automation to move fast</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span>Always give customers a human to chat to</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span>Automate customer support and close leads faster</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-span-1">
            <div class="rounded-[10px] overflow-hidden">
              <img src="/images/about/about-img-1.png" alt="About Section One Image">
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 max-md:gap-14 py-14 md:py-24">
          <div class="col-span-1 md:order-2">
            <div class="flex flex-col gap-6 md:pl-20 xl:pl-24">
              <div class="bg-brand-100 size-12 rounded-full flex items-center justify-center">
                <SvgoLightningFlash class="text-brand-500 size-6" />
              </div>
              <div>
                <h3 class="text-lg mb-2">Deliver instant answers</h3>
                <p>
                  An all-in-one customer service platform that helps you balance everything your customers need to be happy.
                </p>
              </div>

              <ul class="flex flex-col gap-4">
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span>Keep your customers in the loop with live chat</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span>Embed help articles right on your website</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span>Customers never have to leave the page to find an answer</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-span-1 md:order-1">
            <div class="rounded-[10px] overflow-hidden">
              <img src="/images/about/about-img-2.png" alt="About Section Two Image">
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 max-md:gap-14">
          <div class="col-span-1">
            <div class="flex flex-col gap-6 md:pr-20 xl:pr-24">
              <div class="bg-brand-100 size-12 rounded-full flex items-center justify-center">
                <SvgoReport class="text-brand-500 size-6" />
              </div>
              <div>
                <h3 class="text-lg mb-2">Manage your team with reports</h3>
                <p>
                  Measure what matters with Untitled’s easy-to-use reports. You can filter, export, and drilldown on the data in a couple clicks.
                </p>
              </div>

              <ul class="flex flex-col gap-4">
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span>Filter, export, and drilldown on the data quickly</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span>Save, schedule, and automate reports to your inbox</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span>Connect the tools you already use with 100+ integrations</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-span-1">
            <div class="rounded-[10px] overflow-hidden">
              <img src="/images/about/about-img-3.png" alt="About Section Three Image">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="container">
        <div class="text-center md:mb-14">
          <h3 class="text-brand-600 text-sm md:text-base mb-3">Our values</h3>
          <h2 class="text-4xl md:text-5xl mb-6">
            What do we value? All sorts of things! But we particularly pride ourselves on:
          </h2>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10 sm:gap-y-16">
          <template v-for="value in values">
            <div class="flex flex-col gap-5">
              <div class="border border-white-light size-12 flex items-center justify-center text-[#344054] rounded-[10px]">
                <component :is="value.icon" class="size-8"/>
              </div>
              <div class="">
                <h3 class="text-xl mb-2">{{ value.title }}</h3>
                <p class="font-normal">{{ value.description }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="postcss">

</style>
