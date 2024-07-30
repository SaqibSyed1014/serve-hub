<script lang="ts" setup>
defineProps<{ data: any[] }>();
</script>

<template>
  <div class="pt-5 border-t border-gray-200">
    <p class="text-base font-normal leading-normal text-gray-600">
      Palo Alto Unified School District (PAUSD) is located in Palo Alto,
      California, and serves the educational needs of students in the city. Palo
      Alto is known for its proximity to major technology hubs, including
      Silicon Valley, and the district reflects a community with high academic
      expectations.
    </p>

    <br />

    <p class="text-base font-normal leading-normal text-gray-600">
      Key points about the Palo Alto Unified School District include:
    </p>

    <ol class="md:list-decimal md:pl-5">
      <li v-for="(item, index) in data" :key="index" class="pt-2.5">
        <div class="flex flex-col">
          <span class="text-base font-semibold leading-normal text-gray-600">{{
            item.title
          }}</span>
          <span class="text-base font-normal leading-normal text-gray-600">
            {{ item.desc }}
          </span>

          <br class="block md:hidden" />
        </div>
      </li>
    </ol>
  </div>
</template>
