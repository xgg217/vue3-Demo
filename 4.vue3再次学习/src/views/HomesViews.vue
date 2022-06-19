<template>
  <div>homes页面</div>
  <p>{{ val }}</p>
  <!-- <button @click="handleAdd"> 点击</button>
  <button @click="handlerShow">显示/隐藏</button> -->
</template>

<script setup lang="ts">

import { ref, toRef, reactive } from 'vue';
const val  = ref(1);
// const isBool = ref(false);
const info = reactive({
  name: '小刚刚',
  age: 12,
});

const ageRef = toRef(info, 'age');

// 更改该 ref 会更新源属性
ageRef.value = 13;
console.log(info.age); // 13
// 一同更新了info的age属性
console.log(info.age); // 13

// 更改源属性也会更新该 ref
info.age = 18;
console.log(ageRef.value); // 18










</script>

<style scoped>

</style>
