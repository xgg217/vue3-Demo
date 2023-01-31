<template>
  <h1>我是child组件</h1>
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>性别：{{ sex }}</p>

</template>
<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useUsersStore } from "@/store/user";
const store = useUsersStore();
const { name, age, sex } = storeToRefs(store);
</script>