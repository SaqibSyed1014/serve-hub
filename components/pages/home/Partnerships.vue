<script setup lang="ts">
import {useHomeStore} from "~/segments/home/store";

const homeStore = useHomeStore();

const { partnersLogo } = storeToRefs(homeStore)
</script>

<template>
  <section v-if="partnersLogo.length" class="py-24">
    <div class="container">
        <p class="section-title">
          Trusted by Businesses Nationwide
        </p>
      <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-center items-center gap-x-8 sm:gap-x-12 md:gap-x-16 gap-y-4 sm:gap-y-8">
        <template v-for="partner in partnersLogo">
          <div class="h-28 md:h-32 lg:h-40">
            <img :src="partner.logo_path" alt="Partner's Logo" class="w-full h-full object-contain">
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
