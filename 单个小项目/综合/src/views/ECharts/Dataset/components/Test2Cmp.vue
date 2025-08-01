<template>
  <div class="title2"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".title2")!);
  // 绘制图表
  myChart.setOption({
    legend: {},
    tooltip: {},

    xAxis: {
      // data: ["1月", "2月", "3月", "4月"],
      type: "category",
    },

    dataset: {
      // source: [
      //   // ["product", "2014", "2015", "2016", "2017"],
      //   // ["1月", 43.3, 85.8, 93.7],
      //   // ["2月", 83.1, 73.4, 55.1],
      //   // ["3月", 86.4, 65.2, 82.5],
      //   // ["4月", 72.4, 53.9, 39.1],
      //   // { product: "1月", 2014: 43.3, 2015: 85.8, 2016: 93.7 },
      //   // { product: "2月", 2014: 83.1, 2015: 73.4, 2016: 55.1 },
      //   // { product: "3月", 2014: 86.4, 2015: 65.2, 2016: 82.5 },
      //   // { product: "4月", 2014: 72.4, 2015: 53.9, 2016: 39.1 },

      // ],
      source: {
        product: ["1月", "2月", "3月", "4月"],
        "2014": [43.3, 83.1, 86.4, 72.4],
        "2015": [85.8, 73.4, 65.2, 53.9],
        "2016": [93.7, 55.1, 82.5, 39.1],
      },

      dimensions: ["product", "2014", "2015", "2016"],
    },

    yAxis: {},

    // 系列列表
    series: [
      {
        // name: "2014年",
        type: "bar",
        // data: [2.0, 4.9, 7.0, 23.2],
      },
      {
        // name: "2015年",
        type: "bar",
        // data: [2.6, 5.9, 9.0, 26.4],
      },
      {
        // name: "2016年",
        type: "bar",
        // data: [2.0, 2.2, 3.3, 4.5],
      },
      {
        // name: "2017年",
        type: "bar",
        // data: [3.0, 4.2, 1.3, 6.5],
      },
    ],
  });
});
</script>

<style scoped>
.title2 {
  width: 100%;
  height: 500px;
}
</style>
