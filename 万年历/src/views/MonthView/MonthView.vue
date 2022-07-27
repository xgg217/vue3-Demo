<script setup lang="ts">
import HeaderNav from "@/components/HeaderNav.vue";
import DateSearch from "@/views/DayView/cmp/DateSearch.vue";
import CarCmp from "./cmp/CarCmp.vue";

// 选择日期
const handleGetDate = (dataStr: string) => {
  console.log(dataStr);
};
</script>

<template>
  <HeaderNav title="近期假期" />
  <DateSearch type="year-month" @change="handleGetDate" />

  <ul class="month-list">
    <li><CarCmp /></li>
  </ul>
</template>

<style scoped>
.month-list {
  padding: 20px;
}
</style>
