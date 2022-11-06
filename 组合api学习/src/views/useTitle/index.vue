<script setup lang="ts">
// import { useTitle } from '@vueuse/core'
import myuseTitle from './useTitle'
import { ref } from 'vue';
// import useTitle from './useTitle';
const myTitle = myuseTitle('')

// const title = useTitle('111')
</script>

<template>
  <div class="aaa c">
    <input type="text" v-model="myTitle">
    <div>----------VueUse库------</div>
    <!-- <input type="text" v-model="title"> -->
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