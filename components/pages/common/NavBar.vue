<script setup lang="ts">
import HamburgerIcon from "~/assets/icons/hamburger.svg";
import XCloseIcon from "~/assets/icons/x-close.svg";
import OrganizationsMegaMenu from "~/components/pages/common/OrganizationsMegaMenu.vue";
import type {MenuLinksType} from "~/segments/common.types";
import {useHomeStore} from "~/segments/home/store";
import {reloadActiveRouteOnClick} from "~/segments/utils";

const homeStore = useHomeStore();

const menuLinks : MenuLinksType[] = [
  {
    label: "Jobs",
    path: "/jobs",
    type: 'link'
  },
  {
    label: "Businesses",
    type: 'megaMenu',
    subLinks: [
      {
        label: "Restaurants",
        path: "/restaurants",
      },
      {
        label: "Hotels & Resorts",
        path: "/charter-schools",
      },
      {
        label: "Bars",
        path: "/bars",
      },
    ]
  },
  {
    label: "Pricing",
    path: "/pricing",
    type: 'link'
  },
  {
    label: "Our Blog",
    path: "/blog",
    type: 'link'
  },
  {
    label: "Request a Demo",
    path: "/demo-request",
    type: 'link'
  },
];

let toggleSideBar = ref(false);

function togglingSidebarVisibility() {
  toggleSideBar.value = !toggleSideBar.value;
  if (toggleSideBar.value) {
    document.body.classList.add("overflow-hidden");
  } else {
    document.body.classList.remove("overflow-hidden");
  }
}

const orgsFetching = ref(false);
onMounted(async () => {
  orgsFetching.value = true;
  await homeStore.fetchFeaturedOrganizations();
  orgsFetching.value = false;
})

const router = useRouter();
</script>

<template>
  <header class="max-md:sticky bg-gray-25 top-0 w-full z-[500]">
    <div class="container mx-auto flex items-center justify-between bg-transparent py-4 relative z-40">
      <div class="content flex items-center justify-between gap-7 xl:gap-10">
        <div class="logo shrink-0">
          <NuxtLink to="/">
            <img src="/images/logo.svg" alt="ServeHub Logo" />
          </NuxtLink>
        </div>
        <!-- Menu Links -->
        <nav class="shrink-0 hidden lg:block">
          <ul
            class="flex gap-5 xl:gap-8 flex-nowrap items-center font-medium text-gray-600"
          >
            <template v-for="link in menuLinks">
              <li>
                <NuxtLink v-if="link.type === 'link'" :to="link.path" @click.native.prevent="reloadActiveRouteOnClick(link.path, router)" class="hover:text-brand-500 transition">{{ link.label }}</NuxtLink>
                <MegaMenu v-else-if="link.type === 'megaMenu'" :label="link.label">
                  <OrganizationsMegaMenu v-if="link.subLinks?.length" :sub-links="link.subLinks" :loading="orgsFetching" />
                </MegaMenu>
              </li>
            </template>
          </ul>
        </nav>
      </div>

      <div class="flex items-center gap-3">
        <!--  CTA Btns  -->
        <div class="nav-actions hidden sm:flex shrink-0 gap-2 xl:gap-3">
          <BaseButton label="Log in" color="plain" navigate-to="/login"/>

          <BaseButton
              label="Sign up"
              color="gray"
              :outline="true"
              navigate-to="/signup"
          />

          <BaseButton
              label="Post a Job"
              color="primary"
              navigate-to="/post-a-job"
          />
        </div>

        <!--  Hamburger Icon    -->
        <div class="block lg:hidden">
          <HamburgerIcon
              v-if="!toggleSideBar"
              class=" w-6 h-6"
              @click="togglingSidebarVisibility"
          />
          <XCloseIcon
              v-else
              class="w-4 h-4"
              @click="togglingSidebarVisibility"
          />
        </div>
      </div>
    </div>

    <MenuSideBar
      :is-sidebar-visible="toggleSideBar"
      :menu-links="menuLinks"
      @toggle-sidebar="toggleSideBar = false"
    />
  </header>
</template>

<style>
header nav ul li .router-link-active {
  color: theme("colors.brand.600");
  font-weight: 600;
}
</style>
