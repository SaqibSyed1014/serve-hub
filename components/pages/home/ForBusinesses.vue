<script setup lang="ts">
import UsersIcon from "assets/icons/users.svg";
import SearchRefractionIcon from "assets/icons/search-refraction.svg";
import AnnouncementIcon from "assets/icons/announcement.svg";
import ArrowUpRightIcon from "assets/icons/arrow-narrow-up-right.svg";
import ArrowIcon from "assets/icons/arrow-right.svg";

const cardsList = [
  {
    title: 'Get Started',
    text: 'Set up a profile that highlights your schools\'s ethos and mission. Attract potential candidates by showcasing what makes your institution unique.',
    linkText: 'Create your business profile today',
    path: '/signup',
    icon: UsersIcon
  },
  {
    title: 'Post Your Open Roles',
    text: 'Define and share the roles you\'re looking to fill, detailing key requirements and expectations to attract well-matched candidates.',
    linkText: 'Post a job today!',
    path: '/post-a-job',
    icon: SearchRefractionIcon
  },
  {
    title: 'Attract Top Talent',
    text: 'Showcase your tech, company culture, perks and benefits, and more. We\'ll help you tell your story to make sure you attract the best talent.',
    linkText: 'Showcase your business',
    path: '/signup',
    icon: AnnouncementIcon
  }
]
</script>

<template>
  <section>
    <div class="container">
      <div class="content">
        <div class="heading-and-subheading flex flex-col justify-center sm:items-center gap-3 sm:text-center">
          <p class="section-subheading">For Business</p>
          <h2 class="section-heading">
            Find out what we have for your company
          </h2>
          <p class="supporting-text">
            Search and connect with the right candidates faster and go with a seamless flow
          </p>
        </div>

        <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 pt-20">
          <template v-for="card in cardsList">
            <div class="flex flex-col gap-10 bg-gray-50 rounded-lg px-4 py-6 sm:p-6">
              <div class="flex justify-center items-center bg-brand-500 text-white rounded-xl sm:mx-auto w-14 h-14">
                <component :is="card.icon" class="w-8 h-8" />
              </div>
              <div class="flex flex-col gap-3 text-start sm:text-center">
                <h4 class="text-lg sm:text-xl md:text-2xl lg:text-3xl md:mb-4">
                  {{ card.title }}
                </h4>
                <p class="text-gray-600 md:text-lg">
                  {{ card.text }}
                </p>
                <NuxtLink :to="card.path" class="flex items-center sm:justify-center gap-3 text-brand-500 font-semibold cursor-pointer group">
                  {{ card.linkText }}
                  <ArrowIcon class="w-3 h-3 group-hover:translate-x-[8px] transition" />
                </NuxtLink>
              </div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>
