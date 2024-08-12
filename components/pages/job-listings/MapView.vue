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
    markers: jobsCoordinatesList.value as JobClusterMarker[]
  }
})

const openedMarkerID = ref<string | null>(null);
function openMarker(id :string | null) {
  openedMarkerID.value = id;
}
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
            @click="openMarker(m.id)"
        >
          <GMapInfoWindow
              :closeclick="true"
              @closeclick="openMarker(null)"
              :opened="openedMarkerID === m.id"
          >
            <div class="flex flex-col gap-1">
              <h2 class="text-base font-bold">{{ m.title }}</h2>
              <div class="flex items-center gap-2">
                <SvgoBuilding class="size-4 text-brand-600" />
                <p class="text-sm">{{ m.businessName }}</p>
              </div>
              <div class="flex items-center gap-2">
                <SvgoLocationPin class="size-4 text-brand-600" />
                {{ m.location }}
              </div>
              <div class="flex justify-end items-center gap-2 mt-3 cursor-pointer group">
                <NuxtLink :to="`/jobs/${m.slug}`" class="group-hover:text-brand-600 font-medium">View Job</NuxtLink>
                <SvgoArrowNarrowUpRight class="size-2 text-brand-600" />
              </div>
            </div>
          </GMapInfoWindow>
        </GMapMarker>
      </GMapMap>
    </client-only>
  </div>
</template>

