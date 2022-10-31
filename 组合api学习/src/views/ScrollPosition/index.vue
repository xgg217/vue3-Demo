<script setup lang="ts">
import useScrollPosition from './useScrollPosition'
const { scrollX, scrollY } = useScrollPosition()
</script>

<template>
  <p style="width: 3000px;height: 5000px;">
      width:3000px  height:5000px的，模拟页面滚动
    </p>
    <div style="position: fixed;top:20px;right:20px">
      <div >scrollX: {{scrollX}}</div>
      <div >scrollY: {{scrollY}}</div>
    </div>
</template>

<style lang="scss" scoped>
</style>