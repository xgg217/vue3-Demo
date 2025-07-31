<template>
  <div class="title"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

const colors = ["#5470C6", "#91CC75", "#EE6666"];

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".title")!);
  // 绘制图表
  myChart.setOption({
    colors,
    legend: {},
    tooltip: {},

    xAxis: {
      data: ["1月", "2月", "3月", "4月"],
    },

    yAxis: {},

    // 系列列表
    series: [
      {
        name: "2014年",
        type: "bar",
        data: [2.0, 4.9, 7.0, 23.2],
      },
      {
        name: "2015年",
        type: "bar",
        data: [2.6, 5.9, 9.0, 26.4],
      },
      {
        name: "2016年",
        type: "bar",
        data: [2.0, 2.2, 3.3, 4.5],
      },
      {
        name: "2017年",
        type: "bar",
        data: [3.0, 4.2, 1.3, 6.5],
      },
    ],
  });
});
</script>

<style scoped>
.title {
  width: 100%;
  height: 500px;
}
</style>
