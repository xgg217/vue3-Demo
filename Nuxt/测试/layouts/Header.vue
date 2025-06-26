<template>
  <div class="header">
    <UHeader>
      <template #title>
        <p>后台管理系统</p>
      </template>

      <UNavigationMenu :items="items" />

      <template #right>
        <UColorModeButton />
      </template>
    </UHeader>
  </div>
</template>

<script setup lang="ts">
import type { NavigationMenuItem } from "@nuxt/ui";

const route = useRoute();

const items = computed<NavigationMenuItem[]>(() => [
  {
    label: "首页",
    to: "/",
    active: route.path.startsWith("/"),
  },
  {
    label: "关于",
    to: "/about",
    active: route.path.startsWith("/about"),
  },
  // {
  //   label: "Roadmap",
  //   to: "/roadmap",
  // },
  // {
  //   label: "Figma",
  //   to: "https://www.figma.com/community/file/1288455405058138934",
  //   target: "_blank",
  // },
  // {
  //   label: "Releases",
  //   to: "https://github.com/nuxt/ui/releases",
  //   target: "_blank",
  // },
]);
</script>

<style lang="scss" scoped></style>
