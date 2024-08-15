<script setup lang="ts">
import {convertDateFormat} from "~/segments/utils";

defineProps<{ blog: Blog }>()
</script>

<template>
  <div class="blog-post-card grid lg:grid-cols-2 gap-5">
    <div class="blog-image rounded-2xl overflow-hidden">
      <div class="h-60 sm:h-52">
        <img :src="blog.post_photo?.url ?? '/images/others/blog-mockup.jpg'" alt="Blog Image"
              class="w-full h-full object-cover">
      </div>
    </div>
    <div class="flex flex-col gap-6">
      <div class="blog-details">
        <p class="text-sm text-brand-700 font-semibold">
          {{ blog?.category.category_name || 'General' }}
        </p>
        <NuxtLink :to="`/blog/${blog.slug}`" class="hover:text-brand-600">
          <h5 class="text-lg">
            {{ blog.title }}
          </h5>
        </NuxtLink>
        <p class="text-gray-600 line-clamp-2">
          {{ blog.post_excerpt }}
        </p>
      </div>
      <div class="author-details flex gap-3">
        <div class="w-10 h-10 rounded-full overflow-hidden">
          <img :src="blog.author?.avatar ?? '/images/others/avatar-mockup.jpg'" alt="Author Image" class="w-full h-full object-cover">
        </div>
        <div class="text-sm">
          <p class="font-semibold">
            {{ blog.author.name }}
          </p>
          <p class="text-gray-600">
            {{ convertDateFormat(blog.post_date) }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="postcss">

</style>
