<template>
  <div>homes页面</div>
</template>

<script setup lang="ts">
import { useTodoListStore } from '@/store/todoList'
import { ref, reactive } from 'vue';
const a = ref(1);
const b = reactive({ count: 0 })

const todoListStore = useTodoListStore()
console.log(todoListStore);
console.log(a.value);
console.log(b);

</script>

<style scoped>

</style>
