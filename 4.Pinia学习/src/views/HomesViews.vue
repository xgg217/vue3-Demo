<template>
  <div>homes页面</div>
  <p>姓名：{{ name }}</p>
  <p>年龄：{{ age }}</p>
  <p>性别：{{ sex }}</p>
  <p>新年龄：{{ store.getAddAge }}</p>
  <p>1新年龄：{{ store.getNameAndAge }}</p>
  <button @click="handleAgeAdd">测试</button>
  <button @click="handleReset">重置</button>
  <button @click="handleBatchUpdate">批量更新</button>
  <p>--------------------------</p>
  <child />
</template>

<script setup lang="ts">
import { ref } from "vue";
import { storeToRefs } from 'pinia';
import child from "./child.vue";
import { useUsersStore } from "@/store/user";
const store = useUsersStore();
// const name = ref<string>(store.name);
// const age = ref<number>(store.age);
// const sex = ref<string>(store.sex);
const { name, age, sex } = storeToRefs(store);
console.log(store);

const handleAgeAdd = () => {
  store.age = age.value + 1;
  console.log(store);
};

const handleReset = () => {
  store.$reset();
  console.log(store);
};

// 批量更新
const handleBatchUpdate = () => {
  // store.$patch({
  //     // name: "张三",
  //     age: 100111,
  //     // sex: "女",
  //   });
  store.$patch((store) => {
    store.age = 123;
  })
}

</script>

<style scoped>

</style>
