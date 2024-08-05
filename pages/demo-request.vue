<script setup lang="ts">
onMounted(() => {
  const scriptEle = document.createElement('script');
  scriptEle.setAttribute('src','https://embed.ycb.me');
  scriptEle.setAttribute('async','true');
  scriptEle.setAttribute('data-domain','servehub');

  const demoForm = document.getElementById('demo-request-form');
  if (demoForm) demoForm.appendChild(scriptEle);
})

const tutorialsPoints = [
  'Attract top-tier talent to your establishment',
  'Streamline your hiring process and save valuable time',
  'Expand your reach to a wider pool of qualified candidates',
  'Learn how ServeHub will partner with you to understand your hiring needs'
]
</script>

<template>
  <section class="demo-request-page py-16">
    <div class="container pt-6">
      <div class="grid lg:grid-cols-2 gap-12">
        <div class="flex flex-col gap-8">
          <div>
            <h3 class="text-brand-600 text-sm md:text-base mb-3">Request a demo</h3>
            <h2 class="text-4xl md:text-5xl mb-6">Discover the Future of Hospitality Hiring</h2>
            <p class="md:text-xl font-normal">
              Unlock the potential of your hospitality business with our cutting-edge job board platform. See firsthand how we can transform your recruitment process and help you build a stellar team.
            </p>
          </div>

          <div class="demo-tutorial-list max-sm:text-sm">
            <p>ServeHub can help you:</p>
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
