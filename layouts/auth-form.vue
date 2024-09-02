<script setup lang="ts">
import { register } from 'swiper/element/bundle';
register();

const reviewList = [
  {
    reviewerName: 'Carlos Mendez',
    reviewerPost: 'Line Cook, New York City',
    text: 'ServeHub helped me find a great job where I can grow my skills in the kitchen. The process was simple and the job recommendations were spot on!',
    image: 'carlos.png',
    rating: 5
  },
  {
    reviewerName: 'Emily Thompson',
    reviewerPost: 'Bartender, Los Angeles',
    text: 'Thanks to ServeHub, I landed my dream job at a top bar in the city. The personalized job alerts kept me informed of the best openings.',
    image: 'emily.png',
    rating: 4
  },
  {
    reviewerName: 'Jamal Harris',
    reviewerPost: 'Server, Chicago',
    text: 'ServeHub made my job search easy and stress-free. I found a position that perfectly matches my experience and schedule.',
    image: 'jamal.png',
    rating: 5
  },
  {
    reviewerName: 'Sophia Nguyen',
    reviewerPost: 'Dishwasher, Miami',
    text: 'Finding a job through ServeHub was a breeze. The platform is modern and intuitive, and I got hired quickly at a great restaurant.',
    image: 'sophia.png',
    rating: 4
  },
];


const authReviewSlider = ref(null)

const date = new Date()
</script>

<template>
  <div class="auth-form-layout w-full h-screen flex">
    <div class="flex h-screen justify-between flex-col pl-8 py-8 w-full items-center max-lg:hidden bg-gray-50">
      <NuxtLink to="/" class="flex items-center gap-2.5 w-full">
        <img src="/images/logo.svg" alt="ServeHub Logo" />
      </NuxtLink>

      <div class="flex flex-col max-w-[560px] gap-8 justify-center items-center">
        <div class="flex flex-col items-center gap-8 my-8 justify-center max-lg:hidden relative">
          <swiper-container
              ref="authReviewSlider"
              :loop="true"
              :space-between="20"
              slides-per-view="auto"
              :auto-resize="false"
              :autoplay-delay="3000"
              :autoplay-disable-on-interaction="false"
              :speed="400"
              class="reviews-slider z-20 max-w-[560px] mx-auto"
              :pagination="true"
              :pagination-clickable="true"
          >
            <swiper-slide v-for="(review, i) in reviewList" :key="i" class="mb-12">
              <div class="flex justify-center gap-2 mb-4">
                <template v-for="(rating) in 5">
                  <SvgoRatingStar
                      class="w-4 h-4"
                      :class="[review.rating > rating - 1 ? 'text-warning-400' : 'text-gray-400']"
                  />
                </template>
              </div>
              <h2 class="text-center font-normal text-2xl px-6 mx-auto mb-3">
                {{ review.text }}
              </h2>
              <div class="flex flex-col justify-center items-center gap-y-4">
                <img :src="`/images/people/${review.image}`" alt="Avatar" class="rounded-full h-20 w-20"/>
                <div class="text-center">
                  <p class="font-semibold text-custom-primary-900">{{ review.reviewerName }}</p>
                  <p class="text-custom-tertiary-600">{{ review.reviewerPost }}</p>
                </div>
              </div>
            </swiper-slide>
          </swiper-container>
          <div class="flex justify-between items-center w-full absolute z-20 bottom-2 text-3xl">
            <div class="cursor-pointer" @click="authReviewSlider?.swiper?.slidePrev()">
              ‹
            </div>
            <div class="cursor-pointer" @click="authReviewSlider?.swiper?.slideNext()">
              ›
            </div>
          </div>
        </div>
      </div>

      <p class="text-left w-full">
        © ServeHub {{ date.getFullYear() }}
      </p>
    </div>


    <div class="w-full h-screen flex justify-center bg-white overflow-y-auto">
      <div class="max-w-[400px] px-5 w-full gap-8 flex flex-col items-center">
        <div class="w-full h-full">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>
