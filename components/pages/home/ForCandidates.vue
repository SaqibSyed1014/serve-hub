<script setup lang="ts">
import { candidatesTabsContent } from "~/components/core/constants/home.constants";

let hoveredTab = ref<number>(0);
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
            <template v-for="(tab, index) in candidatesTabsContent" :key="index">
              <NuxtLink :to="tab.btnLink" :class="[ hoveredTab === index ? 'border-brand-600' : 'border-gray-100' ]"
                   @mouseover="hoveredTab = index"
                   class="block border-l-4 group px-6 py-4 cursor-pointer"
              >
                <h4 class="font-semibold text-lg">
                  {{ tab.title }}
                </h4>
                <p class="text-gray-600 pt-1 pb-5">
                  {{ tab.text }}
                </p>

                <button type="button" class="flex items-center gap-3 text-brand-700 font-semibold">
                  {{ tab.btnLabel }}
                  <SvgoArrowRight class="w-3 h-3 group-hover:translate-x-[8px] transition"/>
                </button>
              </NuxtLink>
            </template>
          </div>
          <div class="max-md:hidden">
            <img :src="candidatesTabsContent[hoveredTab].image" :alt="candidatesTabsContent[hoveredTab].imageAlt">
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
