<template>
  <div>User1</div>
  <div>{{ obj.age }}</div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';

const obj = reactive({
  name: 'xgg',
  age: 12,
});


</script>
