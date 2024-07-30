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
                <svg class="shrink-0" xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 28 28" fill="none">
                  <rect width="28" height="28" rx="14" fill="#C2D4FD"/>
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M19.9476 8.62193L11.5943 16.6836L9.37763 14.3153C8.9693 13.9303 8.32763 13.9069 7.86096 14.2336C7.40596 14.5719 7.27763 15.1669 7.55763 15.6453L10.1826 19.9153C10.4393 20.3119 10.8826 20.5569 11.3843 20.5569C11.8626 20.5569 12.3176 20.3119 12.5743 19.9153C12.9943 19.3669 21.0093 9.81193 21.0093 9.81193C22.0593 8.7386 20.7876 7.7936 19.9476 8.61027V8.62193Z" fill="#3669E4"/>
                </svg>
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
