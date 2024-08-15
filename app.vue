<script setup lang="ts">
import { useHomeStore } from "~/segments/home/store";

const nuxtApp = useNuxtApp();
const homeStore = useHomeStore();

nuxtApp.hook("page:finish", () => {
  window.scrollTo(0, 0); // emphasize scroll to top on route change
})

useState('userType', () => 'organization') // setting visitor as organization user

const { host } = useRequestURL();

if (host?.includes('servehub.io')) {
  useHead([
    {
      children: `window.$crisp=[];window.CRISP_WEBSITE_ID="9294fd27-8592-41bf-a6c9-ec44aa6d0905";(function(){d=document;s=d.createElement("script");s.src="https://client.crisp.chat/l.js";s.async=1;d.getElementsByTagName("head")[0].appendChild(s);})();`,
      type: "text/javascript",
    }
  ])
}

useHead({
  script: [
    {
      src: 'https://www.googletagmanager.com/gtag/js?id=G-6S59LVT28G',
      async: true,
    },
    {
      children: `
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        gtag('js', new Date());

        gtag('config', 'G-6S59LVT28G');
      `,
    },
    {
      children: `
        (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid:1582803,hjsv:6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
            })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');`
    }
  ]
});

const route = useRoute();

watch(() => route.path, async (val) => {
  let metaData;
  if (val === '/') metaData = await homeStore.fetchSEOData('/');
  else {
    const routeName = val.split('/');
    metaData = await homeStore.fetchSEOData(routeName[1]);
  }
  assignPageMetaInfo(metaData)
}, { immediate: true });

function assignPageMetaInfo(metaData :MetaData) {
  useSeoMeta({
    title: () => metaData.metaTitle,
    description: () => metaData.metaDescription
  })
}
</script>

<template>
  <Html lang="en-US">
    <Body
        class="bg-gray-25 text-gray-900 antialiased transition-colors duration-300"
    >
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </Body>
  </Html>
</template>

