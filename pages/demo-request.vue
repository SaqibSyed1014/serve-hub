<script setup lang="ts">
onMounted(() => {
  const scriptEle = document.createElement('script');
  scriptEle.setAttribute('src','https://embed.ycb.me');
  scriptEle.setAttribute('async','true');
  scriptEle.setAttribute('data-domain','edujobs');

  const demoForm = document.getElementById('demo-request-form');
  if (demoForm) demoForm.appendChild(scriptEle);
})

const tutorialsPoints = [
    'Saving time in the application filtration process',
    'Writing comprehensive job to find and connect with the most suited applicant',
    'Managing the applications and your organization\'s data',
    'Get feedback by the job seekers in order to improve recruitment process '
]
</script>

<template>
  <section class="demo-request-page py-16">
    <div class="container pt-6">
      <div class="grid lg:grid-cols-2 gap-12">
        <div class="flex flex-col gap-8">
          <div>
            <h3 class="text-brand-600 text-sm md:text-base mb-3">Request a demo</h3>
            <h2 class="text-4xl md:text-5xl mb-6">We'd love to show you around</h2>
            <p class="md:text-xl font-normal">
              Get in touch to witness an amazing journey of promoting jobs and match with the right candidate.
            </p>
          </div>

          <!-- Image Placeholder -->
          <div class="bg-gray-200 h-64 w-64 mx-auto"></div>

          <div class="demo-tutorial-list max-sm:text-sm">
            <p>Your custom demo will include tutorials on:</p>
            <ul class="pt-4">
              <template v-for="point in tutorialsPoints">
                <li class="flex gap-5 mb-4">
                  <SvgoPointTick class="w-5 h-5 shrink-0" />
                  {{ point }}
                </li>
              </template>
            </ul>
          </div>
        </div>
        <div>
          <div id="demo-request-form"></div>
        </div>
      </div>
    </div>
  </section>
</template>
