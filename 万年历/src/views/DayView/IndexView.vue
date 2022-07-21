<script setup lang="ts">
import HeaderNav from "@/components/HeaderNav.vue";
import DateSearch from "./cmp/DateSearch.vue";
</script>

<template>
  <HeaderNav title="当天信息" />
  <DateSearch></DateSearch>
</template>

<style scoped>
.content {
  height: 20vh;
  border: 1px solid red;
}
</style>
