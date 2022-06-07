<script setup lang="ts">
import { reactive } from 'vue';


import HelloWorld from '@/components/HelloWorld.vue';
// interface Book {
//   title: string
//   year?: number
// }

// const book = reactive<Book>({ title: 'Vue 3 指引' });

// This starter template is using Vue 3 <script setup> SFCs
// Check out https://v3.vuejs.org/api/sfc-script-setup.html#sfc-script-setup
</script>


<template>
  <!-- <router-link to="/" class="router-link-exact-active">index</router-link>
  <router-link to="/user/myuser">user</router-link> -->
  <!-- <router-view />
  <p>{{ book.title }}</p> -->
  <HelloWorld foo="xgg" />
</template>



<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
  height: 100%;
}
</style>

