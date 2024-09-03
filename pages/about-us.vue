<script setup lang="ts">
import {values} from "~/components/core/constants/about-us.constants";
</script>

<template>
  <div class="about-us-page">
    <section class="pb-12 pt-16 md:pt-24">
      <div class="container">
        <div class="text-center md:mb-14">
          <h2 class="text-4xl md:text-5xl mb-6">
            Connecting Hospitality Talent with Opportunity
          </h2>

          <p class="md:text-xl font-normal mb-12">
            Empowering businesses and professionals in the hospitality industry to thrive together.
          </p>
        </div>

        <div class="grid md:grid-cols-2 max-md:gap-14">
          <div class="col-span-1">
            <div class="flex flex-col gap-6 md:pr-20 xl:pr-24">
              <div class="bg-brand-100 size-12 rounded-full flex items-center justify-center">
                <SvgoChats class="text-brand-500 size-6" />
              </div>
              <div>
                <h3 class="text-lg mb-2">Our Mission &mdash; Bridging the Gap in Hospitality</h3>
                <p class="mb-3">
                  At ServeHub, we understand the dynamic nature of the hospitality industry. Whether you're a bustling restaurant seeking skilled staff or a dedicated chef looking for your 
                  next opportunity, our mission is to connect you with the right match.
                </p>
                <p>We believe in  the power of human connection and strive to create a seamless experience for both
                  employers and job seekers.
                </p>
              </div>
              <ul class="flex flex-col gap-4">
                <li class="flex items-center gap-3">
                    <span class="shrink-0 ">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span><strong>Tailored Matches:</strong> We utilize advanced algorithms to connect businesses with candidates who align perfectly with their needs and culture.</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span><strong>Industry Expertise:</strong> Our deep understanding of the hospitality sector ensures we provide relevant and timely opportunities for all.</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span><strong>Seamless Experience:</strong> Our user-friendly platform simplifies the hiring process, making it efficient and effective for both parties.</span>
                </li>
              </ul>
          
            </div>
          </div>
          <div class="col-span-1">
            <div class="rounded-[10px] overflow-hidden">
              <img src="https://assets.servehub.io/images/about-us-bridging-the-gap.png" alt="About Section One Image">
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 max-md:gap-14 py-14 md:py-24">
          <div class="col-span-1 md:order-2">
            <div class="flex flex-col gap-6 md:pl-20 xl:pl-24">
              <div class="bg-brand-100 size-12 rounded-full flex items-center justify-center">
                <SvgoLightningFlash class="text-brand-500 size-6" />
              </div>
              <div>
                <h3 class="text-lg mb-2">Our Commitment &mdash; Supporting Your Journey</h3>
                <p>
                  We are committed to supporting the growth and success of hospitality businesses and professionals. Our platform is designed with empathy and understanding, offering tools 
                  and resources to help you navigate the job market with confidence. From personalized job alerts to insightful industry trends, we are here to guide you every step of the way.
                </p>
              </div>

              <ul class="flex flex-col gap-4">
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span><strong>Personalized Support:</strong> Receive guidance and resources tailored to your unique career or hiring goals.</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span><strong>Insightful Resources:</strong> Access a wealth of information, from industry trends to career advice, designed to empower your decisions.</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span><strong>Continuous Improvement:</strong> We are dedicated to evolving our services based on feedback to better serve our community.</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-span-1 md:order-1">
            <div class="rounded-[10px] overflow-hidden">
              <img src="/images/about/about-img-2.png" alt="About Section Two Image">
            </div>
          </div>
        </div>

        <div class="grid md:grid-cols-2 max-md:gap-14">
          <div class="col-span-1">
            <div class="flex flex-col gap-6 md:pr-20 xl:pr-24">
              <div class="bg-brand-100 size-12 rounded-full flex items-center justify-center">
                <SvgoReport class="text-brand-500 size-6" />
              </div>
              <div>
                <h3 class="text-lg mb-2">Our Community &mdash; Building a Thriving Hospitality Network</h3>
                <p class="mb-3">
                  Join a vibrant community of hospitality professionals and businesses dedicated to excellence. At ServeHub we celebrate the diversity and passion that 
                  drive this industry. By fostering connections and sharing knowledge, we aim to elevate the standards of hospitality and create a brighter future for all involved. 
                </p>
                <p>
                  This content is crafted to resonate with both hospitality businesses and job seekers, emphasizing connection, support, and community. It conveys a professional yet 
                  personal tone, welcoming all stakeholders to be part of the platform.
                </p>
              </div>

              <ul class="flex flex-col gap-4">
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span><strong>Diverse Network:</strong> Connect with a wide range of professionals and businesses, enhancing your opportunities and insights.</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span><strong>Shared Knowledge:</strong> Engage in a community that values learning and growth, fostering a culture of excellence.</span>
                </li>
                <li class="flex items-center gap-3">
                    <span class="shrink-0">
                      <SvgoCheckMark class="w-5 h-5 text-brand-500" />
                    </span>
                  <span><strong>Celebrating Success:</strong> We highlight and celebrate the achievements of our members, inspiring others to reach their potential.</span>
                </li>
              </ul>
            </div>
          </div>
          <div class="col-span-1">
            <div class="rounded-[10px] overflow-hidden">
              <img src="/images/about/about-img-3.png" alt="About Section Three Image">
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="py-16 md:py-24">
      <div class="container">
        <div class="text-center md:mb-14">
          <h3 class="text-brand-600 text-sm md:text-base mb-3">Our values</h3>
          <h2 class="text-4xl md:text-5xl mb-6">
            Guiding Principles for Success
          </h2>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-x-3 gap-y-10 sm:gap-y-16">
          <template v-for="value in values">
            <div class="flex flex-col gap-5">
              <div class="border border-white-light size-12 flex items-center justify-center text-[#344054] rounded-[10px]">
                <component :is="value.icon" class="size-8"/>
              </div>
              <div class="">
                <h3 class="text-xl mb-2">{{ value.title }}</h3>
                <p class="font-normal">{{ value.description }}</p>
              </div>
            </div>
          </template>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped lang="postcss">

</style>
