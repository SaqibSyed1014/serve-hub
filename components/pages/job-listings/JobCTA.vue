<script setup lang="ts">
const checkList = [
    'Find jobs and hire talent globally without any hustle',
    'Streamline the hiring and onboarding process',
    'Make your skills stand out beyond a resume'
]

const userType = useState('userType')
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
            <template v-for="item in checkList">
              <li class="flex lg:items-center gap-3">
                <SvgoCheckMark class="size-8 text-brand-600" />
                {{ item }}
              </li>
            </template>
          </ul>

          <div>
            <BaseButton navigate-to="/signup" label="Sign up for free" :full-sized-on-small="true" @click.stop="userType = 'jobSeeker'" class="md:inline-block" />
          </div>
        </div>
        <div class="flex justify-center">
          <img src="/images/others/cards.png" alt="">
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped lang="postcss">

</style>
