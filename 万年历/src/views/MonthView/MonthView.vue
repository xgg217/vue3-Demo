<script setup lang="ts">
import HeaderNav from "@/components/HeaderNav.vue";
import DateSearch from "@/views/DayView/cmp/DateSearch.vue";
import CarCmp from "./cmp/CarCmp.vue";
import { reactive } from "vue";

import dayjs from "dayjs";
import { apiPostMonth } from "@/api/request";

interface IMonth {
  year: string; // 年
  "year-month": string; //年月
  // holiday: string; //属相
  holiday_array: IDesholiday[]; // 当月近期假期
}
interface IDesholiday {
  name: string; //假日名称
  festival: string; //年月日
  desc: string; //假日描述
  rest: string; //拼假建议
  list: IDesholidayList[];
}

interface IDesholidayList {
  date: string; //具体日期
  statur: "1" | "2"; // 	1:放假,2:上班
}

const MonthObj: IMonth = reactive({
  year: "", // 年
  "year-month": "", //年月
  holiday_array: [], // 当月近期假期(
});

// 选择日期
const handleGetDate = (dataStr: string) => {
  console.log(dataStr);
};

const asyncPostMonth = (dateStr: string) => {
  apiPostMonth(dateStr)
    .then((res) => {
      console.log(res);
      const {
        holiday_array: holidayArray,
        year,
        "year-month": yearMonth,
      } = res as unknown as IMonth;

      MonthObj.holiday_array = holidayArray;
      MonthObj.year = year;
      MonthObj["year-month"] = yearMonth;
    })
    .catch((err) => {
      console.error(err);
    });
};

(() => {
  const day = dayjs().format("YYYY-M");

  asyncPostMonth(day);
})();
</script>

<template>
  <HeaderNav title="近期假期" />
  <DateSearch type="year-month" @change="handleGetDate" />

  <ul class="month-list">
    <template v-for="item of MonthObj.holiday_array" :key="item.festival">
      <li>
        <CarCmp
          :name="item.name"
          :festival="item.festival"
          :desc="item.desc"
          :rest="item.rest"
        />
      </li>
    </template>
  </ul>
</template>

<style scoped>
.month-list {
  padding: 20px;
}
</style>
