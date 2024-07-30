<script setup lang="ts">
const prop = defineProps<{
  coordinates: number[]
}>()

const center = ref({ lat: 0, lng: 0 })

const mapOptions = computed(() => {
  const lat = prop.coordinates[0] ?? 0;
  const lng = prop.coordinates[1] ?? 0;
  center.value = { lat, lng }
  return [
    {
      position: { lat, lng },
    }
  ]
})
</script>

<template>
  <div class="org-location">
    <p v-if="!coordinates[0] && !coordinates[1]" class="font-semibold text-xl text-center">No Location found</p>
    <client-only v-else>
      <GMapMap
          :center="center"
          :zoom="12"
          style="height: 500px;"
      >
        <GMapMarker
            v-for="(m, index) in mapOptions"
            :position="m.position"
            :key="index"
            :clickable="true"
            :draggable="true"
        />
      </GMapMap>
    </client-only>
  </div>
</template>

<style scoped lang="postcss">

</style>
