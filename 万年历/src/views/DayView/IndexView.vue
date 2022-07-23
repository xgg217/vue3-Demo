<script setup lang="ts">
import HeaderNav from "@/components/HeaderNav.vue";
import DateSearch from "./cmp/DateSearch.vue";

const handleGetDate = (dataStr: string) => {
  console.log(dataStr);
};
</script>

<template>
  <HeaderNav title="当天信息" />
  <DateSearch @change="handleGetDate" />
</template>

<style scoped>
.content {
  height: 20vh;
  border: 1px solid red;
}
</style>
