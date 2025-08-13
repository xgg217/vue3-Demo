<template>
  <div class="title3"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { dataBJ, dataSH, dataGZ } from "./consts";

const schema = [
  { name: "date", index: 0, text: "日" },
  { name: "AQIindex", index: 1, text: "AQI指数" },
  { name: "PM25", index: 2, text: "PM2.5" },
  { name: "PM10", index: 3, text: "PM10" },
  { name: "CO", index: 4, text: "一氧化碳（CO）" },
  { name: "NO2", index: 5, text: "二氧化氮（NO2）" },
  { name: "SO2", index: 6, text: "二氧化硫（SO2）" },
];

var itemStyle = {
  normal: {
    opacity: 0.8,
    shadowBlur: 10,
    shadowOffsetX: 0,
    shadowOffsetY: 0,
    shadowColor: "rgba(0, 0, 0, 0.5)",
  },
};

// let i = 0;
// function getRandom() {
//   if (i === 2) {
//     i++;
//     return 123;
//   }

//   // return randomInt(0, 1000);
//   const val = i * 60 + 100;
//   i++;
//   return val;
// }

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".title3")! as HTMLElement);

  myChart.setOption({
    legend: {
      top: 10,
      data: ["北京", "上海", "广州"],
    },

    xAxis: {
      type: "value",
      name: "日期",
    },
    yAxis: {
      type: "value",
      name: "AQI指数",
    },

    visualMap: [
      {
        left: null,
        right: 0,
        dimension: 7,
        selected: {
          严重污染: false,
          重度污染: false,
        },
        categories: [
          "严重污染",
          "重度污染",
          "中度污染",
          "轻度污染",
          "良",
          "优",
        ],
        inRange: {
          symbolSize: 30,
          symbol: {
            优: "diamond",
            "": "circle",
          },
        },
        outOfRange: {
          color: "#000",
          symbolSize: {
            优: 50,
            "": 30,
          },
          symbol: {
            优: "diamond",
            "": "circle",
          },
        },
      },
      // {
      //   left: "right",
      //   bottom: "5%",
      //   dimension: 6,
      //   min: 0,
      //   max: 50,
      //   text: ["明暗：二氧化硫"],
      // },
    ],

    series: [
      {
        name: "北京",
        type: "scatter",
        itemStyle: itemStyle,
        data: dataBJ,
      },
      {
        name: "上海",
        type: "scatter",
        itemStyle: itemStyle,
        data: dataSH,
      },
      {
        name: "广州",
        type: "scatter",
        itemStyle: itemStyle,
        data: dataGZ,
      },
    ],
  });
});
</script>

<style lang="scss" scoped>
.title3 {
  width: 100%;
  height: 800px;
}
</style>
