<script setup lang="ts">
import HeaderNav from "@/components/HeaderNav.vue";
import DateSearch from "./cmp/DateSearch.vue";
import CarCmp from "./cmp/CarCmp.vue";

// 获取年份
const handleYear = (year: number) => {
  console.log(year);
};
</script>

<template>
  <HeaderNav title="年" />
  <DateSearch @change="handleYear" />

  <ul class="year-list">
    <li>
      <CarCmp />
    </li>
  </ul>
</template>

<style scoped>
.year-list {
  padding: 20px;
}
</style>
