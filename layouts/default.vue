<template>
  <div>
    <NavBar></NavBar>
    <slot />
    <CTABanner></CTABanner>
    <Footer></Footer>
  </div>
</template>
<script setup lang="ts">
import Footer from "~/components/pages/common/Footer.vue";
import CTABanner from "~/components/pages/common/CTABanner.vue";
</script>
