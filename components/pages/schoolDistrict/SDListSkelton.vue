<script setup lang="ts"></script>

<template>
  <div>
    <div
      class="job-card flex w-full justify-between items-start bg-white border border-gray-200 shadow-xs rounded-xl p-5"
    >
      <div class="job-card-header w-3/4">
        <div class="flex">
          <div
            class="flex place-items-center rounded-full overflow-hidden !w-12 h-12"
          >
            <Skeleton type="circle" class="w-full h-full rounded-full" />
          </div>

          <div class="flex flex-col w-full ml-3">
            <Skeleton class="w-3/4 h-6" />
            <div class="flex gap-3">
              <Skeleton class="h-6 mb-2 w-1/6 mt-1.5" />
<!--              <Skeleton class="h-6 mb-2 w-1/5 mt-1.5" />-->
<!--              <Skeleton class="h-6 mb-2 w-1/5 mt-1.5" />-->
            </div>
          </div>
        </div>
      </div>
      <div
        class="job-post-footer flex items-end justify-end gap-5 font-medium text-gray-600 w-1/4"
      >
        <Skeleton class="w-1/2 h-6 shrink-0" />
      </div>
    </div>
  </div>
</template>
