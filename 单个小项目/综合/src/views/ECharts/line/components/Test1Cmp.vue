<template>
  <div class="title1"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { data } from "./data";

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".title1")! as HTMLElement);
  // 绘制图表
  myChart.setOption({
    legend: {},
    tooltip: {
      trigger: "axis",
    },

    xAxis: {
      // data: ["1月", "2月", "3月", "4月"],
      data: data.map(item => item[0]),
      type: "category",
    },

    dataset: {
      source: [["product", "年份"], ...data],
    },

    yAxis: {},

    visualMap: {
      pieces: [
        {
          gt: 0,
          lte: 50,
          color: "#93CE07",
        },
        {
          gt: 50,
          lte: 100,
          color: "#FBDB0F",
        },
        {
          gt: 100,
          lte: 150,
          color: "#FC7D02",
        },
        {
          gt: 150,
          lte: 200,
          color: "#FD0100",
        },
        {
          gt: 200,
          lte: 300,
          color: "#AA069F",
        },
        {
          gt: 300,
          color: "#AC3B2A",
        },
      ],

      outOfRange: {
        color: "#999",
      },
    },

    dataZoom: [
      {
        type: "inside",
        start: 0,
        end: 10,
      },
      {
        type: "slider",
        start: 0,
        end: 10,
      },
    ],

    // 系列列表
    series: [
      {
        // name: "2014年",
        type: "line",
        // data: [2.0, 4.9, 7.0, 23.2],
      },
    ],
  });
});
</script>

<style scoped>
.title1 {
  width: 100%;
  height: 500px;
}
</style>
