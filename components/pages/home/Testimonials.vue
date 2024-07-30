<script setup lang="ts">
import ArrowUpRightIcon from '~/assets/icons/arrow-narrow-up-right.svg'
import TestimonialCard from "~/components/core/TestimonialCard.vue";
import ArrowRightIcon from "assets/icons/arrow-right.svg";
import ArrowLeftIcon from "assets/icons/arrow-left.svg";

const testimonialsList = [
  {
    reviewerImage: 'olivia.png',
    reviewerName: 'Olivia Rhye',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
        'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'david.png',
    reviewerName: 'Pheonix Baker',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
        'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.',
        'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'lana.png',
    reviewerName: 'Lana Stiener',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'demi.png',
    reviewerName: 'Demi Wilkinson',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.',
      'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'andi.png',
    reviewerName: 'Andi Lane',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  }
  ,{
    reviewerImage: 'natalie.png',
    reviewerName: 'Natalie Crag',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.',
        'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'demi.png',
    reviewerName: 'Demi Wilkinson',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.',
      'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'andi.png',
    reviewerName: 'Andi Lane',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
  {
    reviewerImage: 'olivia.png',
    reviewerName: 'Olivia Rhye',
    reviewerEmail: 'olivia@untitledui.com',
    review: [
      'Whether you want to build a team of 2 or 200, ServeHub provides best options to everyone keeping the process easy and simple.'
    ],
    reviewDate: '23 April 2023',
    reviewTime: '8:13 AM',
    ratings: 0
  },
]

const testimonialSlider = ref(null)
const testimonialMobileSlider = ref(null)

const sliderBreakpoints = {
  320: {
    slidesPerView: 1,
    'grid.rows': 1,
    // 'grid.columns': 1
  },
  640: {
    slidesPerView: 3,
    'grid.rows': 4,
    // 'grid.columns': 3
  }
}
</script>

<template>
  <section class="py-24">
    <div class="container">
      <div class="content">
        <div class="heading-and-supporting-content flex max-md:flex-col justify-between md:items-center gap-5 pb-16">
          <div class="heading-and-subheading flex flex-col gap-3">
            <p class="section-subheading">Testimonials</p>
            <h2 class="section-heading">Trusted by the Education Community</h2>
            <p class="supporting-text">See what candidates and hiring teams at organizations are saying</p>
          </div>
          <div>
            <BaseButton navigate-to="/jobs" label="Search Jobs" color="primary">
              <template #append-icon>
                <ArrowUpRightIcon class="w-3 h-3" />
              </template>
            </BaseButton>
          </div>
        </div>

        <swiper-container
            ref="testimonialSlider"
            :loop="true"
            :space-between="32"
            :slides-per-view="3"
            :grid-rows="2"
            grid-fill="row"
            class="testimonial-slider hidden md:block"
        >
          <swiper-slide v-for="testimonial in testimonialsList">
            <TestimonialCard :testimonial="testimonial" />
          </swiper-slide>
        </swiper-container>

        <swiper-container
            ref="testimonialMobileSlider"
            :loop="true"
            :space-between="32"
            :slides-per-view="1"
            class="testimonial-mobile-slider block md:hidden"
        >
          <swiper-slide v-for="testimonial in testimonialsList">
            <TestimonialCard :testimonial="testimonial" />
          </swiper-slide>
        </swiper-container>

        <div class="hidden md:flex gap-8 pt-8">
          <div @click="testimonialSlider?.swiper?.slidePrev()" class="slider-nav-arrows right">
            <ArrowLeftIcon class="w-4 h-4" />
          </div>
          <div @click="testimonialSlider?.swiper?.slideNext()" class="slider-nav-arrows left">
            <ArrowRightIcon class="w-4 h-4" />
          </div>
        </div>

        <div class="flex md:hidden justify-between gap-8 pt-8">
          <div @click="testimonialMobileSlider?.swiper?.slidePrev()" class="slider-nav-arrows right">
            <ArrowLeftIcon class="w-4 h-4" />
          </div>
          <div @click="testimonialMobileSlider?.swiper?.slideNext()" class="slider-nav-arrows left">
            <ArrowRightIcon class="w-4 h-4" />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
