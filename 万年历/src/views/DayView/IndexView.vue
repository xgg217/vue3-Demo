<script setup lang="ts">
import { Cell, CellGroup } from "vant";
import HeaderNav from "@/components/HeaderNav.vue";
import DateSearch from "./cmp/DateSearch.vue";
import { reactive } from "vue";

interface IDay {
  holiday: string; //假日
  avoid: string; //忌
  animalsYear: string; //属相
  desc: string; //假日描述
  weekday: string; //周几
  suit: string; //宜
  lunarYear: string; //纪年
  lunar: string; //农历
  yearMonth: string; //年份和月份
  date: string; //具体日期
}

const dayObj = reactive({});

const handleGetDate = (dataStr: string) => {
  console.log(dataStr);
};
</script>

<template>
  <HeaderNav title="当天信息" />
  <DateSearch @change="handleGetDate" />
  <van-cell-group>
    <van-cell title="当前年月" value="内容" />
    <van-cell title="今年属相" value="内容" />
    <van-cell title="农历年名" value="内容" />
    <van-cell title="事宜事件" value="内容" />
    <van-cell title="避免事件" value="内容" />
  </van-cell-group>
</template>

<style scoped>
.content {
  height: 20vh;
  /* border: 1px solid red; */
}
</style>
