<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <main>
    <ul>
      <li>
        <RouterLink to="/useTitle">修改网页标题useTitle</RouterLink>
      </li>
      <li>
        <RouterLink to="/useClipboard">使用粘贴板useClipboard</RouterLink>
      </li>
      <li>
        <RouterLink to="/useClipboard">暗黑模式useColorMode</RouterLink>
      </li>
    </ul>
  </main>
</template>
