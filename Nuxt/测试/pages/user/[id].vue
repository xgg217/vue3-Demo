<template>
  <div>
    <h1>用户详情页</h1>
    <p>当前用户id为：{{ id }}</p>
  </div>
</template>

<script setup>
const route = useRoute();
const id = route.params.id;
</script>
