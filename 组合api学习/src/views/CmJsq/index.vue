<script setup lang="ts">
import useCounter from "./useCounter";
const { counter, doubleCounter, increment, decrement  } = useCounter()
</script>

<template>
  <!--1.计数器案例  -->
  <div>当前计数: {{counter}}</div>
  <div>当前计数*2: {{doubleCounter}}</div>
  <button @click="increment">+1</button>
  <button @click="decrement">-1</button>
</template>

<style scoped>
</style>