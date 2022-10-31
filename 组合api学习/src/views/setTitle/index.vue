<script setup lang="ts">
import { ref } from 'vue'
import useTitle from "./useTitle";
let index = 0
const handleSetTitle = () => {
  index++
  const val = '修改网页标题' + index
  titleRef.value = val
}
const titleRef = useTitle('首页')
</script>

<template>
  <div>修改网页标题</div>
  <button @click="handleSetTitle">修改</button>

</template>

<style scoped>
</style>