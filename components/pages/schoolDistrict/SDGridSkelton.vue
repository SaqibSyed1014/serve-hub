<script setup lang="ts"></script>

<template>
  <div>
    <div
      class="job-card flex flex-col bg-white border border-gray-200 shadow-xs rounded-xl p-5"
    >
      <div class="job-card-header">
        <div class="flex justify-between">
          <div
            class="flex place-items-center rounded-full overflow-hidden !w-12 h-12"
          >
            <Skeleton type="circle" class="w-full h-full rounded-full" />
          </div>

          <Skeleton class="w-[80%] h-12" />
        </div>
        <div class="pt-5">
          <Skeleton class="h-6 mb-2 w-1/2" />
        </div>
      </div>
      <div class="">
        <Skeleton class="h-6 mb-2 w-1/4" />
      </div>
    </div>
  </div>
</template>
