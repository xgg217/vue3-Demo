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
  </ul>
</template>

<style lang="scss" scoped>
</style>