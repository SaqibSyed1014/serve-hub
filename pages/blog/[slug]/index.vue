<script setup lang="ts">
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import {convertDateFormat} from "~/segments/utils";

import {useBlogStore} from "~/segments/blogs/store";

const showSpinner = ref<boolean>(true);

const { params } = useRoute();
const blogsStore = useBlogStore();

const { blogDetails, blogs } = storeToRefs(blogsStore);

onMounted(async () => {
  if (!blogs.value.length) await blogsStore.fetchBlogs({
    currentPage: 1,
    itemsPerPage: 9,
    totalPages: 0
  }, '', '');
  await blogsStore.fetchBlogDetails(params.slug as string)
      .then(() => showSpinner.value = false);
})

function copyURL() {
  const currentURL = window.location.href;
  navigator.clipboard.writeText(currentURL);
  useNuxtApp().$toast.success('Link Copied!', {
    icon: false
  });
}
function postSharingOnX() {
  const currentPostURL = encodeURIComponent(window.location.href);
  const postTitle = blogDetails.value?.title || '';
  const url = `https://x.com/intent/tweet?text=${encodeURIComponent(`Check out this blog post: ${postTitle}`)}&url=${currentPostURL}`;
  window.open(url, '_target');
}
function postSharingOnFacebook() {
  const currentPostURL = encodeURIComponent(window.location.href);
  const postTitle = blogDetails.value?.title || '';
  const url = `https://www.facebook.com/sharer/sharer.php?u=${currentPostURL}&quote=${encodeURIComponent(`Check out this blog post: ${postTitle}`)}`;
  window.open(url, '_target');
}
function postSharingOnLinkedIn() {
  const currentPostURL = encodeURIComponent(window.location.href);
  const postTitle = blogDetails.value?.title || '';
  const url = `https://www.linkedin.com/sharing/share-offsite/?url=${currentPostURL}&title=${encodeURIComponent(postTitle)}`;
  window.open(url, '_target');
}
</script>

<template>
  <template v-if="showSpinner">
    <div class="container">
      <div class="flex justify-center items-center h-[calc(100vh-80px)] w-full">
        <BaseSpinner size="lg" :show-loader="showSpinner" />
      </div>
    </div>
  </template>
  <template v-else>
    <div v-if="blogDetails" class="blog-detail-view py-16">
        <section class="">
          <div class="container md:px-8">
            <div class="w-full max-w-3xl mb-16">
            <span
                class="bg-[#F9F5FF] rounded-full p-1 pr-2.5 border border-[#E9D7FE] text-xs text-brand-600 inline-flex items-center gap-2 mb-4">
                <span class="bg-white rounded-full py-0.5 px-2 border border-[#E9D7FE]">
                  {{ blogDetails?.category?.category_name || 'General' }}
                </span>
              {{ blogDetails.reading_time }}
            </span>
              <h2 class="text-3xl md:text-4xl md:leading-[1.2] mb-6">
                {{ blogDetails.title }}
              </h2>
              <p class="text-black-light text-lg md:text-xl font-normal">
                {{ blogDetails.post_excerpt }}
              </p>
            </div>
            <div>
              <div v-if="blogDetails?.post_photo" class="overflow-hidden mb-8 w-full lg:w-[65%] h-[250px] md:h-[450px] rounded-lg md:rounded-xl">
                <img :src="blogDetails.post_photo?.url" :alt="`${blogDetails.title} Cover Photo`" class="h-full w-full object-cover"/>
              </div>
              <div class="flex items-center gap-24">
                <div class="flex gap-12">
                  <div class="text-lg font-medium">
                    <span class="text-brand-600 text-sm mb-3 block">Written by</span>
                    {{ blogDetails?.author.name }}
                  </div>
                  <div class="text-lg font-medium">
                    <span class="text-brand-600 text-sm mb-3 block">Published on</span>
                    {{ convertDateFormat(blogDetails?.post_date) }}
                  </div>
                </div>
                <div class="hidden md:flex gap-3">
                  <div
                      @click="copyURL"
                      class="flex items-center gap-2 py-2.5 px-3 cursor-pointer text-sm border border-[#D0D5DD] rounded-lg hover:bg-brand-600 hover:text-white hover:border-primary transition"
                  >
                    <SvgoClipboard class="w-5 h-5" />
                    Copy link
                  </div>
                 
                  <div
                     class="w-10 h-10 flex items-center justify-center text-[#98A2B3] border border-[#D0D5DD] rounded-lg hover:bg-brand-600 hover:text-white hover:border-primary transition">
                     <SvgoTwitterX @click="postSharingOnX" class="w-6 h-6 cursor-pointer" />
                  </div>
                  <div
                     class="w-10 h-10 flex items-center justify-center text-[#98A2B3] border border-[#D0D5DD] rounded-lg hover:bg-brand-600 hover:text-white hover:border-primary transition">
                     <SvgoFacebook @click="postSharingOnFacebook" class="w-6 h-6 cursor-pointer" />
                  </div>
                  <div
                     class="w-10 h-10 flex items-center justify-center text-[#98A2B3] border border-[#D0D5DD] rounded-lg hover:bg-brand-600 hover:text-white hover:border-primary transition">
                     <SvgoLinkedin @click="postSharingOnLinkedIn" class="w-6 h-6 cursor-pointer" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="py-0">
          <div class="container md:px-8">
            <div class="grid md:grid-cols-6 gap-4 xl:gap-24 pb-16 border-b border-[#EAECF0]">
              <div class="md:col-span-4 flex-1">
                <div class="blog-content" v-html="blogDetails?.post_content"></div>
              </div>
              <div class="md:col-span-2 w-full md:max-w-72 xl:max-w-sm">
                <div class="sticky top-20 z-[1] bg-[#F9FAFB] border border-[#EAECF0] rounded-2xl p-4 xl:px-8 xl:py-10">
                  <div class="flex items-center justify-center border border-[#EAECF0] rounded-xl w-14 h-14 mb-8">
                    <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 28 28" fill="none">
                      <path
                          d="M12.2494 15.75L24.4994 3.49996M12.3982 16.1327L15.4644 24.017C15.7345 24.7116 15.8695 25.0589 16.0641 25.1603C16.2328 25.2482 16.4338 25.2483 16.6026 25.1606C16.7973 25.0594 16.9328 24.7123 17.2037 24.0181L24.8924 4.31569C25.137 3.68898 25.2593 3.37562 25.1924 3.17539C25.1343 3.0015 24.9979 2.86504 24.824 2.80695C24.6237 2.74005 24.3104 2.86234 23.6837 3.10691L3.9813 10.7956C3.28705 11.0666 2.93992 11.202 2.83876 11.3968C2.75106 11.5656 2.75118 11.7665 2.83908 11.9352C2.94047 12.1298 3.28775 12.2649 3.98232 12.535L11.8667 15.6011C12.0076 15.6559 12.0781 15.6834 12.1375 15.7257C12.1901 15.7632 12.2361 15.8092 12.2737 15.8619C12.316 15.9212 12.3434 15.9917 12.3982 16.1327Z"
                          stroke="#344054" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                    </svg>
                  </div>
                  <h2 class="text-2xl mb-2">Weekly Newsletter</h2>
                  <p class="font-normal text-black-light mb-8">Stay ahead in your job search with curated job opportunities, valuable resources, tips, and insightful blog posts delivered to your inbox weekly.</p>
                  <form class="w-full mx-auto max-w-md text-left">
                    <div class="flex flex-col items-start gap-4">
                      <div class="w-full">
                        <input type="email" name="email" id="email" placeholder="Enter your email"
                               class="form-input w-full">
                        <p class="font-normal text-sm mt-1.5 text-black-light">Read about our <NuxtLink to="/privacy-policy" class="underline hover:no-underline">privacy policy</NuxtLink>.</p>
                      </div>
                      <BaseButton label="Subscribe" :full-sized="true">Subscribe</BaseButton>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section class="py-16 md:py-24">
          <div class="container md:px-8">
            <div class="flex flex-col lg:flex-row gap-12 md:gap-16">
              <div class="flex-none w-full lg:w-80 2xl:w-[400px]">
                <p class="text-brand-600 mb-3">Latest</p>
                <h2 class="text-3xl md:text-4xl mb-5">From the blog</h2>
                <p class="md:text-lg text-black-light sm:mb-8 font-normal">The latest industry news, interviews,
                  technologies, and resources.</p>
                <BaseButton navigate-to="/blog" label="View all posts" class="hidden sm:inline-flex"/>
              </div>
              <div class="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-8">
                <template v-for="blog in blogs.slice(1, 3)">
                  <div class="">
                    <div class="mb-5">
                      <img :src="blog.post_photo?.url ?? '/images/others/blog-mockup.jpg'" :alt="`${blog.title} Cover Photo`"
                           class="w-full h-[240px] rounded-lg object-cover">
                    </div>
                    <span
                        class="bg-[#F9F5FF] rounded-full p-1 pr-2.5 border border-[#E9D7FE] text-xs text-brand-600 inline-flex items-center gap-2 mb-4">
                    <span class="bg-white rounded-full py-0.5 px-2 border border-[#E9D7FE]">
                      {{ blog?.category?.category_name || 'General' }}
                    </span>
                    {{ blog.reading_time }}
                </span>
                    <h3 class="mb-2">
                      <NuxtLink :to="`/blog/${blog.slug}`"
                                class="flex justify-between items-center gap-2 text-2xl hover:text-brand-600">
                        <div class="line-clamp-2">{{ blog.title }}</div>
                        <span class="shrink-0">
                            <SvgoArrowNarrowUpRight class="w-4 h-4"/>
                        </span>
                      </NuxtLink>
                    </h3>
                    <p class="line-clamp-2 font-normal mb-6">
                      {{ blog.post_excerpt  }}
                    </p>
                    <div class="flex gap-3">
                      <div class="overflow-hidden rounded-full w-12 h-12 shrink-0">
                        <img :src="blog.author?.avatar ?? '/images/others/avatar-mockup.jpg'" alt="" class="w-full h-full object-cover object-top">
                      </div>
                      <div class="">
                        <h4>{{ blog.author.name }}</h4>
                        <p class="text-black-light font-normal">{{ convertDateFormat(blog.post_date) }}</p>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
          </div>
        </section>
    </div>
  </template>
</template>

<style scoped>
.blog-content :deep(h2) {
  @apply text-2xl md:text-3xl mb-4 mt-10 first:mt-0
}
.blog-content :deep(h3) {
  @apply text-xl md:text-xl mb-1 mt-5
}
.blog-content :deep(p) {
  @apply md:text-lg font-normal my-5 first:mt-0 last:mb-0
}
.blog-content :deep(ul) {
  @apply ml-6 list-disc mb-4 md:text-lg
}
</style>
