<template>
  <div>homes页面</div>
  <!-- <p>{{ val }}</p> -->
  <!-- <button @click="handleAdd"> 点击</button>
  <button @click="handlerShow">显示/隐藏</button> -->
  <p>{{ text }}</p>
  <input v-model="text">
</template>

<script setup lang="ts">
import { useDebouncedRef } from './useDebouncedRef';

const text = useDebouncedRef('xgg', 300);







</script>

<style scoped>

</style>
