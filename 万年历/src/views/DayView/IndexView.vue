<script setup lang="ts">
import { Cell, CellGroup } from "vant";
import HeaderNav from "@/components/HeaderNav.vue";
import DateSearch from "./cmp/DateSearch.vue";

const handleGetDate = (dataStr: string) => {
  console.log(dataStr);
};
</script>

<template>
  <HeaderNav title="当天信息" />
  <DateSearch @change="handleGetDate" />
  <van-cell-group>
    <van-cell title="单元格" value="内容" />
    <van-cell title="单元格" value="内容" />
  </van-cell-group>
</template>

<style scoped>
.content {
  height: 20vh;
  /* border: 1px solid red; */
}
</style>
