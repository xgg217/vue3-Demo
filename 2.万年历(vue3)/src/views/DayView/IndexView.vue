<script setup lang="ts">
import { Cell, CellGroup } from "vant";
import HeaderNav from "@/components/HeaderNav.vue";
import DateSearch from "./cmp/DateSearch.vue";
import { reactive } from "vue";

import dayjs from "dayjs";
import { apiPostDay } from "@/api/request";

interface IDay {
  holiday: string; //假日
  avoid: string; //忌
  animalsYear: string; //属相
  desc: string; //假日描述
  weekday: string; //周几
  suit: string; //宜
  lunarYear: string; //纪年
  lunar: string; //农历
  // yearMonth: string; //年份和月份
  date: string; //具体日期
}

const dayObj: IDay = reactive({
  date: "", //具体日期
  lunar: "", //农历
  weekday: "", //周几
  holiday: "", //假日
  animalsYear: "", //属相
  lunarYear: "", //纪年
  suit: "", //宜
  avoid: "", //忌
  desc: "", //假日描述
  // yearMonth: "", //年份和月份
});

// 选择日期
const handleGetDate = (dataStr: string) => {
  console.log(dataStr);
};

const asyncPostDay = (dateStr: string) => {
  apiPostDay(dateStr)
    .then((res) => {
      console.log(res);
      const {
        animalsYear,
        avoid,
        date,
        desc,
        holiday,
        lunar,
        lunarYear,
        suit,
        weekday,
      } = res as unknown as IDay;
      dayObj.date = date;
      dayObj.lunar = lunar;
      dayObj.weekday = weekday;
      dayObj.holiday = holiday;
      dayObj.animalsYear = animalsYear;
      dayObj.lunarYear = lunarYear;
      dayObj.suit = suit;
      dayObj.avoid = avoid;
      dayObj.desc = desc;
    })
    .catch((err) => {
      console.error(err);
    });
};

// 初始化日期
(function () {
  const day = dayjs().format("YYYY-M-D");

  asyncPostDay(day);
})();
</script>

<template>
  <HeaderNav title="当天信息" />
  <DateSearch type="date" @change="handleGetDate" />
  <van-cell-group>
    <van-cell title="具体日期" :value="dayObj.date" />
    <van-cell title="农历" :value="dayObj.lunar" />
    <van-cell title="星期" :value="dayObj.weekday" />
    <van-cell title="假日" :value="dayObj.holiday" />
    <van-cell title="假日说明" :value="dayObj.desc" />
    <van-cell title="今年属相" :value="dayObj.animalsYear" />
    <van-cell title="农历年名" :value="dayObj.lunarYear" />
    <van-cell title="事宜事件" :value="dayObj.suit" />
    <van-cell title="避免事件" :value="dayObj.avoid" />
  </van-cell-group>
</template>

<style scoped>
.content {
  height: 20vh;
  /* border: 1px solid red; */
}
</style>
