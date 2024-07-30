<script setup lang="ts">
import {useHomeStore} from "~/segments/home/store";
import {reloadActiveRouteOnClick} from "~/segments/utils";

defineProps<{
  subLinks: { label: string, path: string }[],
  loading: boolean
}>()

const homeStore = useHomeStore();
const { featuredOrganizations } = storeToRefs(homeStore);

function orgModuleType(org :FeaturedOrganizations) {
  if (org.charter === 'Y') return 'charter-schools'
  else if (org.type === 'district') return 'school-districts'
  else if (org.type === 'college') return 'colleges'
}

const router = useRouter();
</script>

<template>
  <div class="org-menu-wrapper w-[800px]">
    <div class="grid grid-cols-12">
      <div class="col-span-4">
        <h4 class="text-brand-600 text-lg font-semibold mb-4">Business Types</h4>
        <ul class="flex flex-col gap-4">
          <template v-for="orgLink in subLinks">
            <li>
              <NuxtLink
                  :to="orgLink.path"
                  @click.native.prevent="reloadActiveRouteOnClick(orgLink.path, router)"
                  class="hover:text-brand-500 transition"
              >
                {{ orgLink.label }}
              </NuxtLink>
            </li>
          </template>
        </ul>
      </div>
      <div class="col-span-8">
        <h4 class="text-brand-600 text-lg font-semibold mb-4">Businesses</h4>
        <div v-if="loading" class="flex justify-center pt-6">
          <BaseSpinner :show-loader="loading" size="sm"/>
        </div>
        <div v-else class="grid grid-cols-2 gap-x-4">
          <template v-for="(org, i) in featuredOrganizations">
            <NuxtLink
                :to="`/${orgModuleType(org)}/${org.slug}`"
                class="flex items-center justify-between rounded-lg py-3 px-2 hover:bg-gray-200 transition cursor-pointer"
            >
              <div class="flex items-center gap-3">
                <div v-if="org.logo_path.length" class="rounded-full overflow-hidden w-8 h-8 shrink-0">
                  <img :src="org.logo_path" alt="" class="w-full h-full object-cover">
                </div>
                <SvgoBuilding v-else class="size-6 shrink-0 "/>

                <BaseTooltip :tooltip-content="org.name" :id="`orgName-${i}`">
                  <p class="text-sm shrink-0 line-clamp-1 w-[140px]">{{ org.name }}</p>
                </BaseTooltip>
              </div>
              <div class="border border-gray-300 shadow-xs rounded-md shrink-0 text-sm px-1">
                {{ org.number_jobs }}
              </div>
            </NuxtLink>
          </template>
        </div>
      </div>
    </div>

    <hr class="my-4">

    <div class="text-end">
      <BaseButton navigate-to="/signup" label="Create an Organization Account" />
    </div>
  </div>
</template>
