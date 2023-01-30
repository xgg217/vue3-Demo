<template>
  <div>homes页面</div>
</template>

<script setup lang="ts">
import { useUsersStore } from "@/store/user";
const store = useUsersStore();
console.log(store);

</script>

<style scoped>

</style>
