<script setup lang="ts">
import { jobCTAChecklist } from "~/components/core/constants/home.constants";

const userType = useState('userType');
</script>

<template>
  <section>
    <div class="container">
      <div class="flex max-md:flex-col items-center justify-between gap-16 md:gap-10 lg:gap-14">
        <div class="flex flex-col">
          <h2 class="text-3xl lg:text-5xl mb-5 md:mb-8">
            Find your desired job
          </h2>

          <ul class="flex flex-col gap-4 mb-6 md:mb-12 md:text-lg">
            <template v-for="(item, i) in jobCTAChecklist" :key="i">
              <li class="flex lg:items-center gap-3">
                <SvgoCheckMark class="size-6 text-brand-600" />
                {{ item }}
              </li>
            </template>
          </ul>

          <div>
            <BaseButton
                navigate-to="/signup"
                label="Sign up for free"
                :full-sized-on-small="true"
                @click.stop="userType = 'jobSeeker'"
                class="md:inline-block"
            />
          </div>
        </div>
        <div class="flex justify-center">
          <img src="/images/others/candidate-img-01.png" alt="Seamless Job Searching">
        </div>
      </div>
    </div>
  </section>
</template>
