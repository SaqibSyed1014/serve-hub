<script setup lang="ts">
const props = defineProps<{ isSidebarVisible: boolean }>()

watch(() => props.isSidebarVisible, (val) => {
  if (val) document.body.classList.add('overflow-hidden')
  else document.body.classList.remove('overflow-hidden')
})
</script>

<template>
  <div class="fixed top-0 left-0 z-30 transform transition-all" :class="[isSidebarVisible ? 'translate-x-0' : '-translate-x-full']">
    <div class="mt-[62px] bg-white py-6 h-screen w-screen overflow-auto">
      <div class="container">
        <slot/>
      </div>
    </div>
  </div>
</template>
