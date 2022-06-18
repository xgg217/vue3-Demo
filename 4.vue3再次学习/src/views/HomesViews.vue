<template>
  <div>homes页面</div>
  <p>{{ val }}</p>
  <button @click="handleAdd"> 点击</button>
  <button @click="handlerShow">显示/隐藏</button>
</template>

<script setup lang="ts">

import { ref } from 'vue';
const val  = ref(1);
const isBool = ref(false);
const info = ref({
  name: '',
  age: '',
});

const handleAdd = function handleAdd() {
  val.value = val.value + 1;
};

const handlerShow = function handlerShow() {
  isBool.value = !isBool.value;
};

info.value.name = '张三';



</script>

<style scoped>

</style>
