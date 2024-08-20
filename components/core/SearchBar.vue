<script setup lang="ts">
import type {Coordinates} from "~/segments/common.types";

const props = defineProps<{
  queryValue?: any
  location?: string
  coordinates?: Coordinates
}>()
const emit = defineEmits(['updatedValues', 'searchedLocationModified'])

const searchedValue = ref<string>('');
const coordinates = ref<Coordinates>(props.coordinates ? props.coordinates : { lng: 0, lat: 0 });
let locationName :string = ''

watch(() => props.queryValue, (val) => {
  searchedValue.value = val.q === '*' ? '' : val.q
})

watch(() => props.location, (val) => {
  const field = document.getElementById('mapInput') as HTMLInputElement;
  if (val?.length) {
    field.value = val;
  }
})

watch(() => props.coordinates, (val) => {
  if (val) coordinates.value = val
})

onMounted(() => {
  setTimeout(() => {
    const field = document.getElementById('mapInput') as HTMLInputElement;
    field.addEventListener('keyup', function (event :KeyboardEvent) {
      if (event.key === 'Enter' && (coordinates.value.lat !== 0 && coordinates.value.lng !== 0))
        performSearch();
    })
  }, 1000);
})

function performSearch() {
  const locationField = document.getElementById('mapInput') as HTMLInputElement
  locationName = locationField.value
  emit('updatedValues', { keyword: searchedValue.value, coordinates: coordinates.value, location: locationName })
}

function setPlace(location :any) {
  coordinates.value.lat = location.geometry.location.lat();
  coordinates.value.lng = location.geometry.location.lng();
}

const enableSearching = computed(() => {
  const isSearchValueNotEmpty = searchedValue.value?.length > 0;
  const isAnyCoordinateNotNull = coordinates.value.lat !== 0 || coordinates.value.lng !== 0;
  return isSearchValueNotEmpty || isAnyCoordinateNotNull;
});


// Resets coordinates if user inputs anything in the field. The logic is to prompt user to
// select one of the suggested options offered by Google Maps api
function checkFieldInput() {
  coordinates.value.lat = 0;
  coordinates.value.lng = 0;
  locationName = '';
  emit('searchedLocationModified');
}

</script>

<template>
  <div class="search-bar">
    <div class="filter-wrapper w-full">
      <div class="flex flex-1 items-center">
        <SvgoSearch class="w-4 h-4 text-gray-400" />
        <input
            v-model="searchedValue"
            id="searchKeywordField"
            type="text"
            placeholder="Keyword, Job title..."
            class="w-full"
            @keyup.enter="performSearch"
        >
      </div>
      <hr class="hidden md:block h-3 w-px bg-gray-200 mx-2">
      <hr class="block md:hidden h-px w-[92%] mx-auto bg-gray-200">
      <div class="flex flex-1 items-center">
        <SvgoLocationPin class="w-4 h-4 text-gray-400" />
        <client-only>
          <GMapAutocomplete
              id="mapInput"
              placeholder="Anywhere"
              class="form-input w-full"
              :options="{
                  componentRestrictions: { country: 'US' },
                  strictBounds: true
              }"
              @place_changed="setPlace"
              @input="checkFieldInput"
          />
        </client-only>
      </div>
    </div>
    <div class="max-md:w-full">
      <BaseButton :disabled="!enableSearching" @click="performSearch" label="Search" color="primary" :full-sized-on-small="true"/>
    </div>
  </div>
</template>

<style lang="postcss">
.search-bar{
  @apply flex max-md:flex-col justify-center items-center gap-4
}
.search-bar .filter-wrapper{
  @apply flex max-md:flex-col items-center bg-white shadow-field overflow-hidden border border-gray-200 rounded-lg max-md:w-full px-3
}
.search-bar .filter-wrapper div{
  @apply max-md:w-full
}
.search-bar .filter-wrapper input{
  @apply focus:outline-0 focus:ring-0 shadow-none border-0 px-2 placeholder-gray-400
}
</style>
