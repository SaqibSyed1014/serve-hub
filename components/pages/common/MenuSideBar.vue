<script setup lang="ts">
import type { MenuLinksType } from "~/segments/common.types";

const props = defineProps<{
  menuLinks: MenuLinksType[],
  isSidebarVisible: boolean,
  businessTypesMenuLinks: { label :string, business_type_slug :string }[]
}>()

watch(() => props.isSidebarVisible, (val :boolean) => {
  if (!val) showSubLinksMenu.value = false  // resets submenu to its default position on sidebar closing
})

const emits = defineEmits(['toggleSidebar'])

const showSubLinksMenu = ref<boolean>(false);
const currentSubMenuList = ref<{ label: string, path: string }[]>([])

function navigateSubMenuView(subLinks :{ label: string, path: string }[]) {
  showSubLinksMenu.value = true;
  currentSubMenuList.value = subLinks;
}

function returnToMainMenu() {
  showSubLinksMenu.value = false;
  currentSubMenuList.value = []
}
</script>

<template>
  <SideBarWrapper
      :is-sidebar-visible="isSidebarVisible"
  >
    <nav class="relative">
      <transition name="menu-slide">
        <div v-if="!showSubLinksMenu">
          <ul class="font-semibold pb-6 translate-x-0">
            <template v-for="link in menuLinks">
              <li class="py-3">
                <NuxtLink
                    v-if="link.type === 'link'"
                    :to="link.path" @click.stop="emits('toggleSidebar')"
                >{{ link.label }}
                </NuxtLink>
                <template v-else>
                  <div @click="navigateSubMenuView(link?.subLinks!)" class="flex justify-between items-center">
                    {{ link.label }}
                    <SvgoChevronRight class="w-5 h-5 text-brand-900"/>
                  </div>
                </template>
              </li>
            </template>
          </ul>

          <div class="cta-btns flex flex-col sm:hidden gap-3 pt-6">
            <BaseButton navigate-to="/post-a-job" label="Post a Job" color="primary" full-sized
                        @click.stop="emits('toggleSidebar')"/>

            <BaseButton navigate-to="/login" label="Log in" :plane="true" full-sized
                        @click.stop="emits('toggleSidebar')"/>

            <BaseButton navigate-to="/signup" label="Sign up" :outline="true" full-sized
                        @click.stop="emits('toggleSidebar')"/>
          </div>
        </div>
      </transition>

      <transition name="sub-menu-slide">
        <div v-if="showSubLinksMenu" class="absolute top-0 left-0 right-0 bottom-0 pb-6 translate-x-0">
          <div @click="returnToMainMenu" class="flex items-center gap-2 -ml-1 font-medium mb-3">
            <SvgoChevronLeft class="w-5 h-5 text-brand-900"/>
            <span>Back</span>
          </div>
          <ul class="font-semibold">
            <template v-for="businessType in businessTypesMenuLinks">
              <li class="py-3">
                <NuxtLink
                    :to="`/${businessType.business_type_slug}`"
                    @click.stop="emits('toggleSidebar')"
                >{{ businessType.label }}
                </NuxtLink>
              </li>
            </template>
          </ul>

          <div class="py-6">
            <BaseButton full-sized-on-small navigate-to="/signup" label="Create a Business Account"/>
          </div>
        </div>
      </transition>
    </nav>
  </SideBarWrapper>
</template>

<style>
.sub-menu-slide-enter-active,
.sub-menu-slide-leave-active,
.menu-slide-enter-active,
.menu-slide-leave-active{
  transition: all 0.2s ease;
}
.menu-slide-enter-from,
.menu-slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
.sub-menu-slide-enter-from,
.sub-menu-slide-leave-to {
  transform: translateX(100%);
  opacity: 0;
}
</style>
