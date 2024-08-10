<script setup lang="ts">
import {useJobStore} from "~/segments/jobs/store";
import {storeToRefs} from "pinia";

const jobStore = useJobStore();
const { jobsCoordinatesList } = storeToRefs(jobStore);

const props = defineProps<{
  searchedCoordinates: number[]
}>()

const center = ref({ lat: 0, lng: 0 })

const mapOptions = computed(() => {
  const lat = props.searchedCoordinates[0] ?? 0;
  const lng = props.searchedCoordinates[1] ?? 0;
  center.value = { lat, lng }
  return {
    markers: jobsCoordinatesList.value
  }
})
</script>

<template>
  <div class="jobs-map-view">
    <client-only>
      <GMapMap
          :center="center"
          :zoom="10"
          style="height: 600px;"
      >
        <GMapMarker
            v-for="(m, index) in mapOptions.markers"
            :position="m.position"
            :key="index"
            :clickable="true"
            :draggable="true"
        />
      </GMapMap>
    </client-only>
  </div>
</template>

