<template>
  <ul>
    <li v-for="item in props.arr" :key="item">
      <component :is="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
const props = defineProps<{ arr: any[] }>();
</script>

<style scoped>
ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

li {
  width: 50%;
  box-sizing: border-box;
  border: 1px solid #000;
  height: 700px;
}
</style>
