<template>
  <div>User1</div>
  <div>{{ obj.age }}</div>
  <p ref="root"></p>
</template>

<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue';

const obj = reactive({
  name: 'xgg',
  age: 12,
});

const root = ref(null);

onMounted(() => {
  console.log(root.value);
});


</script>
