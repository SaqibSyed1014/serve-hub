<script setup lang="ts">
import { computed } from 'vue';
import InstagramIcon from "assets/icons/instagram.svg";
import FacebookIcon from "assets/icons/facebook.svg";
import TwitterIcon from "~/assets/icons/twitter-x.svg";
const currentYear = computed(() => new Date().getFullYear());

const footerLinks = [
  {
    heading: 'For Organizations',
    links: [
      { label: 'Why Us', path: '/why-us-organizations' },
      { label: 'Post Job', path: '/post-a-job' },
      { label: 'Pricing', path: '/pricing' },
      { label: 'Sign Up', path: '/signup', type: 'organization' },
    ]
  },
  {
    heading: 'For Candidates',
    links: [
      { label: 'Why Us', path: '/why-us-candidates' },
      { label: 'Sign Up', path: '/signup', type: 'jobSeeker' },
      { label: 'Browse Jobs', path: '/jobs' },
    ]
  },
  {
    heading: 'Company',
    links: [
      { label: 'About Us', path: '/about-us' },
      { label: 'Blog', path: '/blog' },
      { label: 'Contact Us', path: '/contact-us' },
    ]
  },
  {
    heading: 'Popular Job Searches',
    links: [
      { label: 'Teaching Jobs', path: '' },
      { label: 'School Jobs', path: '' },
      { label: 'Match Teacher Jobs', path: '' },
      { label: 'Stem Jobs', path: '' },
    ]
  }
]

const userType = useState('userType')
const selectUserType = (type :string) => {
  if (type) userType.value = type
}
</script>

<template>
  <footer class="bg-gray-50">
    <div class="container">
      <div class="grid grid-cols-4 sm:grid-cols-4 md:grid-cols-12 max-md:gap-8 py-24">
        <div class="logo-and-text col-span-4">
          <img src="/images/logo.svg" alt="ServeHub Logo">

          <p class="max-md:pb-4 pt-8">Explore jobs and hire talent in the easiest possible way.</p>
        </div>
        <template v-for="linkSection in footerLinks">
          <div class="footer-links col-span-2 font-semibold">
            <p class="text-brand-700 text-sm">{{ linkSection.heading }}</p>
            <ul class="flex flex-col gap-3 text-gray-600 pt-4">
              <template v-for="link in linkSection.links">
                <li class="hover:text-gray-500 hover:underline cursor-pointer">
                  <NuxtLink
                      :to="link.path"
                      @click.stop="selectUserType(link?.type)"
                  >
                    {{ link.label }}
                  </NuxtLink>
                </li>
              </template>
            </ul>
          </div>
        </template>
      </div>
    </div>
    <!---
    <section class="bg-gray-25 py-12">
      <div class="container">
        <div class="content flex max-md:flex-col justify-between md:items-center gap-8">
          <div class="supporting-text">
            <p class="font-semibold text-lg text-gray-900">Join our monthly newsletter</p>
            <p class="text-gray-600 text-base">We’ll send you updates on EduJobs, new blog posts, and resources monthly. No spam.</p>
          </div>
          <form class="flex max-md:flex-col md:justify-end gap-4 w-full">
            <input type="email" placeholder="Enter your email">
            <BaseButton label="Subscribe" color="primary" class="" />
          </form>
        </div>
      </div>
    </section>
    --->
    <div class="container py-12">
      <hr class="border-b border-gray-200 mb-8">
      <div class="flex justify-between max-md:flex-col-reverse md:items-center text-gray-500 font-normal max-md:gap-6">
        <div class="flex max-md:flex-col md:items-center gap-4">
          <span class="max-md:block flex-1">
            &copy; {{ currentYear }} ServeHub.org
          </span>
          <div class="hidden md:block w-2 h-2 rounded-full bg-gray-500"/>
          <div class="flex items-center gap-4">
            <NuxtLink to="/website-terms-conditions" class="hover:underline">
              Terms and Conditions
            </NuxtLink>
            <div class="w-2 h-2 rounded-full bg-gray-500"/>
            <NuxtLink to="privacy-policy" class="hover:underline">
              Privacy Policy
            </NuxtLink>
          </div>
        </div>
        <div class="social-links flex flex-1 gap-6 md:justify-end">
          <a href="https://twitter.com/edujobsorg" target="_blank" rel="noopener noreferrer">
            <TwitterIcon class="w-6 h-6" />
          </a>
          <a href="https:/instagram.com/edujobsorg" target="_blank" rel="noopener noreferrer">
          <InstagramIcon class="w-6 h-6" />
          </a>
          <a href="https:/facebook.com/edujobs.org/" target="_blank" rel="noopener noreferrer">
          <FacebookIcon class="w-6 h-6" />
         </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped lang="postcss">

</style>
