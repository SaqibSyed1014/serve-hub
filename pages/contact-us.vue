<script setup lang="ts">
const center = { lat: 38.1000, lng: -122.5000 }
const mapOptions = {
  markers: [
    {
      position: {
        lat: 38.1074, lng: -122.5697
      }
    }
  ]
}
</script>

<template>
  <div class="">
    <section class="py-16 md:py-24">
      <div class="container md:px-8">
        <h3 class="text-brand-600 text-sm md:text-base mb-3">Contact us</h3>
        <h2 class="text-4xl md:text-5xl mb-6">We’d love to hear from you</h2>
        <p class="text-black-light md:text-xl font-normal">Reach out anytime &mdash; we’re ready to assist.</p>
      </div>
    </section>
    <section class="pb-16 md:pb-24">
      <div class="container md:px-8">
        <div class="grid md:grid-cols-3 gap-6">
          <div class="bg-gray-100 rounded-xl p-6">
            <div class="bg-brand-600 rounded-[10px] flex items-center justify-center text-white w-12 h-12 mb-12 md:mb-16">
              <SvgoHappyFace class="w-6 h-6" />
            </div>
            <h2 class="mb-2 text-lg md:text-xl">Chat with us</h2>
            <p class="text-black-light font-normal">If you prefer chat, we're got you covered.</p>
            <a href="#" onclick="Beacon('open')" class="text-brand-600 mt-4 md:mt-5 inline-flex font-semibold">Click to chat</a>
          </div>
          <div class="bg-gray-100 rounded-xl p-6">
            <div class="bg-brand-600 rounded-[10px] flex items-center justify-center text-white w-12 h-12 mb-12 md:mb-16">
              <SvgoChats class="w-6 h-6" />
            </div>
            <p class="mb-2 text-lg md:text-xl font-semibold">Contact support</p>
            <p class="text-black-light font-normal">We’re here to help.</p>
            <a href="mailto:hello@servehub.io" class="text-brand-600 hover:underline mt-4 md:mt-5 inline-flex font-semibold">hello@servehub.io</a>
          </div>
          <div class="bg-gray-100 rounded-xl p-6">
            <div class="bg-brand-600 rounded-[10px] flex items-center justify-center text-white w-12 h-12 mb-12 md:mb-16">
              <SvgoPhone class="w-6 h-6" />
            </div>
            <p class="mb-2 text-lg md:text-xl font-semibold">Call us</p>
            <p class="text-black-light font-normal">Mon-Fri from 9am to 5pm.</p>
            <a href="tel:+12132228363" class="text-brand-600 hover:underline mt-4 md:mt-5 inline-flex font-semibold">+1 (213) 222-8363</a>
          </div>
        </div>
      </div>
    </section>
    <!--
    <section class="py-16 md:py-24 bg-white-dark">
      <div class="container md:px-8">
        <div class="grid md:grid-cols-2 gap-7 mb-16 md:mb-24">
          <div class="">
            <h3 class="text-brand-600 text-sm md:text-base mb-3">Contact us</h3>
            <h2 class="text-3xl md:text-4xl mb-6">Our location</h2>
            <p class="text-black-light md:text-xl font-normal block sm:hidden">Come visit our friendly team at one of our offices.</p>
          </div>
          <div class="flex items-center gap-4">
            <div class="bg-brand-600 rounded-[10px] flex items-center justify-center text-white w-12 h-12">
              <SvgoLocationPin class="w-6 h-6" />
            </div>
            <h4 class="text-lg md:text-xl">Novato, CA</h4>
          </div>
        </div>
        <div class="lg:px-20">
          <client-only>
            <GMapMap
                :center="center"
                :zoom="12"
                style="height: 500px;"
            >
                <GMapMarker
                    v-for="(m, index) in mapOptions.markers"
                    :position="m.position"
                    :key="index"
                    :clickable="true"
                    :draggable="true"
                />
            </GMapMap>
          </client-only>
        </div>
      </div>
    </section>
  -->
    <section class="py-16 md:py-24">
      <div class="container md:px-8">
        <div class="mx-auto w-full max-w-lg">
          <div class="text-center mb-12 md:mb-16">
            <h3 class="text-brand-600 text-sm md:text-base mb-3">Contact us</h3>
            <h2 class="text-3xl md:text-4xl mb-5">How can we assist?</h2>
            <p class="text-black-light md:text-xl font-normal">Complete the form below and we'll be in touch.</p>
          </div>

          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>
