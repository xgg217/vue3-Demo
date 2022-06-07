<script setup lang="ts">
import { ref } from 'vue';
// import type{ Book } from '@/type/Book';
// type IBool = Book;
const isActive = ref(true);
// const error = ref(null);

const activeClass = ref('active');
// const errorClass = ref('text-danger');

// const props = defineProps<IBool>();

</script>

<template>
  <!-- <h1>{{ props.title }}</h1> -->
  <div :class="[isActive ? activeClass : '']"></div>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
