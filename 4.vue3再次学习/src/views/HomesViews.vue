<template>
  <div>homes页面</div>
  <!-- <p>{{ val }}</p> -->
  <!-- <button @click="handleAdd"> 点击</button>
  <button @click="handlerShow">显示/隐藏</button> -->
  <!-- <p>{{ text }}</p>
  <input v-model="text"> -->

  <!-- <p>{{ val }}</p> -->
</template>

<script setup lang="ts">
import { ref, computed, watchEffect } from 'vue';


const count = ref(0);
const stop = watchEffect(() => {
  console.log(count.value);
});

setTimeout(() => {
  count.value++;
}, 1000);

setTimeout(() => {
  stop();
}, 3000);

setTimeout(() => {
  count.value++;
}, 6000);










</script>

<style scoped>

</style>
