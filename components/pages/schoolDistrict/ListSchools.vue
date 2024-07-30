<script lang="ts" setup>
defineProps<{ data: any[] }>();
</script>

<template>
  <div class="pt-5 border-t border-gray-200">
    <div v-if="false" class="grid gap-6">
      <div v-for="(item, index) in data" :key="index">
        <DistrictListCard :data="item" :is-school="true" />
      </div>
    </div>

    <NoRecordFound v-else name="school" />

    <div v-if="false" class="mt-6">
      <Pagination />
    </div>
  </div>
</template>
