<template>
  <div>homes页面</div>
</template>

<script setup lang="ts">
import { useTodoListStore } from '@/store/todoList'

const todoListStore = useTodoListStore()
console.log(todoListStore);

</script>

<style scoped>

</style>
