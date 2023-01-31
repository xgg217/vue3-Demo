<script setup lang="ts">
import { RouterLink } from "vue-router";
</script>

<template>
  <ul>
    <li>
      <RouterLink to="/useRect">useRect 获取元素的大小及其相对于视口的位置，等价于 Element.getBoundingClientRect</RouterLink>
    </li>
    <li>
      <RouterLink to="/useCountDown">useCountDown 提供倒计时管理能力</RouterLink>
    </li>
    <li>
      <RouterLink to="/useToggle">useToggle 用于在 true 和 false 之间进行切换。</RouterLink>
    </li>
    <li>
      <RouterLink to="/useWindowSize">useWindowSize 获取浏览器窗口的视口宽度和高度，并在窗口大小变化时自动更新。</RouterLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
</style>