<template>
  <div class="title3"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".title3")! as HTMLElement);
  // 绘制图表
  myChart.setOption({
    legend: {},
    tooltip: {},

    xAxis: [
      {
        type: "category",
        gridIndex: 0,
      },
      {
        type: "category",
        gridIndex: 1,
      },
    ],

    dataset: {
      source: [
        ["product", "2014", "2015", "2016"], // 维度名称
        ["1月", 43.3, 85.8, 93.7],
        ["2月", 83.1, 73.4, 55.1],
        ["3月", 86.4, 65.2, 82.5],
        ["4月", 72.4, 53.9, 39.1],
      ],
    },
    yAxis: [{ gridIndex: 0 }, { gridIndex: 1 }],

    grid: [{ bottom: "55%" }, { top: "55%" }],

    // 系列列表
    series: [
      {
        type: "bar",
        seriesLayoutBy: "column",
      },
      {
        type: "bar",
        seriesLayoutBy: "column",
      },
      {
        type: "bar",
        seriesLayoutBy: "column",
      },
      {
        type: "bar",
        seriesLayoutBy: "column",
      },
    ],
  });
});
</script>

<style scoped>
.title3 {
  width: 100%;
  height: 500px;
}
</style>
