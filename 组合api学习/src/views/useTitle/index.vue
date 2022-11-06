<script setup lang="ts">
import { ref } from 'vue';
// import useTitle from './useTitle';
const myTitle = ref('')
const title = ref('')
</script>

<template>
  <div class="aaa c">
    <input type="text" v-model="myTitle">
    <div>----------VueUse库------</div>
    <input type="text" v-model="title">
  </div>
</template>

<style scoped>

.aaa {
  color: red;
}

.c {
  font-size: 20px;
}
</style>