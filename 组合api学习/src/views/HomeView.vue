<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <main>
    <ul>
      <li>
        <RouterLink to="/OpJsq">计数器传统方式</RouterLink>
      </li>
      <li>
        <RouterLink to="/CmJsq">计数器组合API</RouterLink>
      </li>
      <li>
        <RouterLink to="/setTitle">修改网页标题</RouterLink>
      </li>
      <li>
        <RouterLink to="/ScrollPosition">监听页面滚动位置</RouterLink>
      </li>
    </ul>
  </main>
</template>
