<script setup lang="ts">
import { useBlogStore } from "~/segments/blogs/store";
import BaseSpinner from "~/components/core/BaseSpinner.vue";
import type { PaginationInfo } from "~/segments/common.types";
import { scrollToTop } from "~/segments/utils";

const blogsStore = useBlogStore();
const { blogs, categoriesDropdown, pagination } = storeToRefs(blogsStore);

const showPageLoader = ref<boolean>(true);
const showBlogsLoader = ref<boolean>(false);

const pageInfo = ref<PaginationInfo>({
  currentPage: 1,
  itemsPerPage: 9,
  totalPages: 0
});

onMounted(async () => {
  showPageLoader.value = true;
  await blogsStore.fetchBlogs(pageInfo.value);
  await blogsStore.fetchBlogsCategories();
  pageInfo.value.totalPages = pagination.value.pageCount;
  showPageLoader.value = false;
})

async function fetchingBlogs(resetToDefaultPage = false) {
  firstBlog.value = undefined;
  if (resetToDefaultPage) pageInfo.value.currentPage = 1;
  showBlogsLoader.value = true;
  await blogsStore.fetchBlogs(pageInfo.value, searchedBlog.value, selectedCategory.value);
  pageInfo.value.totalPages = pagination.value.pageCount;
  showBlogsLoader.value = false;
}

function paginateBlogs(page: number | "prev" | "next") {
  if (page === "prev") pageInfo.value.currentPage--;
  else if (page === "next") pageInfo.value.currentPage++;
  else pageInfo.value.currentPage = page;
  scrollToTop();
  fetchingBlogs();
}

const searchedBlog = ref<string>('');
const searchedCategory = ref<string>('');
const selectedCategory = ref<string>('View All');

const filteredCategories = computed(() => {
  return categoriesDropdown.value.filter(category => category.label.toLowerCase().includes(searchedCategory.value.toLowerCase())) || [];
})

const handleSearchInput = _debounce(() => {
  fetchingBlogs(true);
}, 500);

const firstBlog = ref<Blog>();
const splitBlogs = computed(() => {
  let allBlogs = toRaw(blogs.value);
  if (window.innerWidth >= 1024 && allBlogs.length > 1) firstBlog.value = allBlogs.shift();
  return allBlogs;
})

watch(() => selectedCategory.value, async (val :string) => {
  showBlogsLoader.value = true;
  pageInfo.value.currentPage = 1;
  await blogsStore.fetchBlogs(pageInfo.value, searchedBlog.value, encodeURIComponent(val));
  pageInfo.value.totalPages = pagination.value.pageCount;
  showBlogsLoader.value = false;
})
</script>

<template>
  <template v-if="showPageLoader">
    <div class="container">
      <div class="flex justify-center items-center h-[calc(100vh-80px)] w-full">
        <BaseSpinner size="lg" :show-loader="showPageLoader" />
      </div>
    </div>
  </template>
  <template v-else>
    <div class="blog-listing-page">
      <section class="pb-12 pt-16 md:pt-24">
        <div class="container">
          <div class="text-left md:mb-14">
            <h3 class="text-brand-600 text-sm md:text-base mb-3">Our blog</h3>
            <h2 class="text-4xl md:text-5xl mb-6">Resources and insights</h2>
            <p class="md:text-xl font-normal mb-12">
              The latest industry news, interviews, technologies, and resources.
            </p>
          </div>

          <!--    Blogs Search Bar on Large Devices      -->
          <div class="search-input-prepended hidden lg:block">
            <SvgoSearchIcon
                class="search-prepend-icon"
                aria-hidden="true"
            />
            <input
                v-model="searchedBlog"
                id="searchBlog"
                class="search-input md:!w-[45%]"
                placeholder="Search Blogs"
                type="search"
                @input="handleSearchInput"
            />
          </div>
        </div>
      </section>

      <section>
        <div class="container">
          <div class="flex max-lg:flex-col items-stretch gap-16">
            <!--   Blog Categories Dropdown and Search bar for Smaller and Medium Devices   -->
            <div class="flex flex-col gap-8 lg:hidden">
              <form class="w-full block">
                <label class="sr-only">Select Category</label>
                <select v-model="selectedCategory" id="categoriesDropdown"
                        class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                  <template v-for="category in filteredCategories">
                    <option :value="category.label">{{ category.label }}</option>
                  </template>
                </select>
              </form>

              <div class="search-input-prepended">
                <SvgoSearchIcon
                    class="search-prepend-icon"
                    aria-hidden="true"
                />
                <input
                    v-model="searchedBlog"
                    id="searchBlog"
                    class="search-input lg:!w-[45%]"
                    placeholder="Search Blogs"
                    type="search"
                    @input="handleSearchInput"
                />
              </div>
            </div>

            <!--   Blog Posts List    -->
            <div class="w-full lg:grow">
              <template v-if="showBlogsLoader">
                <div class="flex justify-center items-center max-md:h-[70vh] w-full">
                  <BaseSpinner size="lg" :show-loader="showBlogsLoader" />
                </div>
              </template>
              <div v-else-if="splitBlogs.length" class="grid lg:grid-cols-2 gap-12 pb-16">
                <template v-if="firstBlog">
                  <div class="flex justify-around max-xl:flex-col gap-8 lg:col-span-2">
                    <div class="overflow-hidden md:h-[320px] md:grow shrink-0 rounded-lg">
                      <img :src="firstBlog.post_photo?.url ?? '/images/others/blog-mockup.jpg'" :alt="`${firstBlog.title} Cover Photo`"
                           class="w-full h-full object-cover">
                    </div>
                    <div class="flex flex-col xl:w-[350px]">
                      <div class="flex flex-col gap-2 mb-6">
                        <div>
                        <span
                            class="bg-gray-50 rounded-full p-1 pr-2.5 border border-brand-200 text-xs text-brand-600 inline-flex items-center gap-2 mb-4">
                          <span
                              class="h-[22px] flex items-center justify-center bg-white rounded-full py-0.5 px-2 border border-brand-200 leading-[18px]">
                            {{ firstBlog?.category.category_name || 'General' }}
                          </span>
                          {{ firstBlog.reading_time }}
                        </span>
                        </div>
                        <h3>
                          <NuxtLink :to="`/blog/${firstBlog.slug}`"
                                    class="flex items-center justify-between gap-3 text-3xl font-semibold hover:text-brand-600">
                            {{ firstBlog.title }}
                          </NuxtLink>
                        </h3>
                        <p class="text-black-light font-normal">{{ firstBlog.post_excerpt }}</p>
                      </div>

                      <div class="flex items-center gap-3">
                        <div class="h-10 w-10 rounded-full overflow-hidden">
                          <img :src="firstBlog?.author?.avatar || '/images/people/olivia.png'"
                               :alt="firstBlog.author.name">
                        </div>
                        <div class="flex flex-col text-sm">
                          <h6 class="font-semibold">{{ firstBlog.author.name }}</h6>
                          <p>{{ firstBlog.post_date }}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </template>

                <template v-for="blog in splitBlogs">
                    <div v-if="blogs.length" class="flex flex-col justify-around">
                      <div class="overflow-hidden mb-5 h-60 rounded-lg">
                        <img :src="blog.post_photo?.url ?? '/images/others/blog-mockup.jpg'" :alt="`${blog.title} Cover Photo`"
                             class="w-full h-full object-cover">
                      </div>
                      <div class="flex flex-col gap-2 mb-6">
                        <div>
                          <span class="bg-gray-50 rounded-full p-1 pr-2.5 border border-brand-200 text-xs text-brand-600 inline-flex items-center gap-2 mb-4">
                            <span
                                class="h-[22px] flex items-center justify-center bg-white rounded-full py-0.5 px-2 border border-brand-200 leading-[18px]">
                              {{ blog?.category?.category_name || 'General' }}
                            </span>
                            {{ blog.reading_time }}
                          </span>
                        </div>
                        <h3>
                          <NuxtLink :to="`/blog/${blog.slug}`"
                                    class="flex items-center justify-between gap-3 text-lg hover:text-brand-600">
                            <div class="line-clamp-2">{{ blog.title }}</div>
                            <span class="shrink-0">
                          <SvgoArrowNarrowUpRight class="w-4 h-4"/>
                        </span>
                          </NuxtLink>
                        </h3>
                        <p class="font-normal line-clamp-2">{{ blog.post_excerpt }}</p>
                      </div>
                      <div class="flex items-center gap-3">
                        <div class="h-10 w-10 rounded-full overflow-hidden">
                          <img :src="blog?.author?.avatar || '/images/people/olivia.png'" :alt="blog.author.name">
                        </div>
                        <div class="flex flex-col text-sm">
                          <h6 class="font-semibold">{{ blog.author.name }}</h6>
                          <p>{{ blog.post_date }}</p>
                        </div>
                      </div>
                    </div>
                  </template>
              </div>
              <div v-else class="text-center font-semibold text-lg lg:text-2xl mx-auto pb-10">
                <p>No Blogs are found</p>
              </div>
            </div>

            <!--   Blog Categories List   -->
            <div class="hidden lg:flex w-[280px] shrink-0 flex-col gap-8">
              <div class="search-input-prepended">
                <SvgoSearchIcon
                    class="search-prepend-icon"
                    aria-hidden="true"
                />
                <input
                    v-model="searchedCategory"
                    id="searchCategory"
                    class="search-input"
                    placeholder="Search"
                    type="search"
                    name="search"
                />
              </div>

              <div class="flex flex-col grow gap-5">
                <h4 class="text-brand-700 font-semibold text-sm font-inter">Blog categories</h4>

                <ul class="flex flex-col gap-2">
                  <li
                      v-for="category in filteredCategories"
                      class="category-option"
                      :class="{ 'active': selectedCategory == category.label }"
                      @click="selectedCategory = category.label"
                  >
                    {{ category.label }}
                  </li>
                </ul>
              </div>
            </div>
          </div>


          <template v-if="pageInfo.totalPages !== 0">
            <hr class="mb-5">

            <CustomPagination
                :current-page="pageInfo.currentPage"
                :total-pages="pageInfo.totalPages"
                @paginate="paginateBlogs"
            />
          </template>
        </div>
      </section>
    </div>
  </template>
</template>

<style scoped>
.category-option{
  @apply py-[.35rem] px-3 rounded-md text-gray-500 font-semibold cursor-pointer hover:text-gray-700 hover:bg-gray-50 transition
}
.category-option.active{
  @apply text-gray-700 bg-gray-50
}
</style>

