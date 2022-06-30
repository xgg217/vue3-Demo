<template>
  <div>homes页面111</div>
  <!-- <p>{{ val }}</p> -->
  <!-- <button @click="handleAdd"> 点击</button>
  <button @click="handlerShow">显示/隐藏</button> -->
  <!-- <p>{{ text }}</p>
  <input v-model="text"> -->

  <!-- <p>{{ val }}</p> -->
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed, watchEffect } from 'vue';

const count = ref(0);
const obj = reactive({ a:' 张三' });

setTimeout(() => {
  count.value++;
}, 2000);

setTimeout(() => {
  obj.a = '李四';
}, 2000);

watch(() => {return [count.value, obj.a]; }, ([newCount, newName],[oldCount, oldName]) => {
  console.log(newCount, newName);
  console.log(oldCount, oldName);
});


</script>

<style scoped>

</style>
