<script setup lang="ts">
// import useColorMode from './useColorMode'
import { watch } from 'vue';
import useDark from './useDark'
// useColorMode()
const a = useDark()

watch(a, (val) => {
  console.log(val)
})
</script>

<template>
  <div>网站颜色 暗黑模式</div>
  <button>浅色模式</button>
  <button>暗黑模式</button>
  <div class="box">当前是{{ a === 'dark' ? '暗黑' : '浅色' }}模式</div>

</template>

<style scoped>
/* 深色模式 */
@media (prefers-color-scheme: dark) {
  .box {
    color: #000;
    background: #fff;
  }
}

/* 浅色模式 */
@media (prefers-color-scheme: light) {
  .box {
    color: #fff;
    background: #000;
  }
}
</style>