<script setup lang="ts">
import {useBlogStore} from "~/segments/blogs/store";

const blogsSlider = ref(null);

const blogsStore = useBlogStore();
const { blogs } = storeToRefs(blogsStore);

const splicedBlogs = computed(() => {
  const blogsList = blogs.value;
  if (blogsList.length <= 4) return blogsList;
  else return blogsList.slice(0, 4);
})
</script>

<template>
  <section class="bg-gray-25 py-24">
    <div class="container">
      <div class="content">
        <div class="heading-and-subheading flex flex-col gap-4 pb-16">
          <h2 class="section-heading">
            Latest writings
          </h2>
          <p class="supporting-text">
            The latest news, technologies, and resources from our team.
          </p>
        </div>

        <div v-if="blogs.length" class="hidden sm:grid grid-cols-2 gap-x-8 gap-y-12 pb-16">
          <template v-for="blog in splicedBlogs">
            <BlogCard :blog="blog" />
          </template>
        </div>

        <div v-if="blogs.length" class="sm:hidden">
          <swiper-container
              ref="blogsSlider"
              :loop="true"
              :free-mode="true"
              :slides-per-view="1"
              :space-between="20"
              class="blogs-mobile-slider"
          >
            <swiper-slide v-for="blog in splicedBlogs">
              <BlogCard :blog="blog" />
            </swiper-slide>
          </swiper-container>
        </div>

        <div class="flex sm:hidden justify-between gap-8 pt-8 pb-12">
          <div @click="blogsSlider?.swiper?.slidePrev()" class="slider-nav-arrows right">
            <SvgoArrowLeft class="w-4 h-4" />
          </div>
          <div @click="blogsSlider?.swiper?.slideNext()" class="slider-nav-arrows left">
            <SvgoArrowRight class="w-4 h-4" />
          </div>
        </div>

        <div>
          <BaseButton navigate-to="/blog" label="More from the Blog" color="primary" :full-sized-on-small="true">
            <template #append-icon>
              <SvgoArrowNarrowUpRight class="w-3 h-3" />
            </template>
          </BaseButton>
        </div>
      </div>
    </div>

  </section>
</template>
