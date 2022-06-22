<template>
  <div>homes页面</div>
  <!-- <p>{{ val }}</p> -->
  <!-- <button @click="handleAdd"> 点击</button>
  <button @click="handlerShow">显示/隐藏</button> -->
  <!-- <p>{{ text }}</p>
  <input v-model="text"> -->

  <p>{{ val }}</p>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
const text = ref('hello');

const val = computed(() => {
  return 'xiaom' +  text.value;
});








</script>

<style scoped>

</style>
