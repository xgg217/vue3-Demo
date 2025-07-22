<template>
  <div class="title"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".title")!);
  // 绘制图表
  myChart.setOption({
    // 图例
    legend: {
      data: ["1号销量", "2号销量", "3号销量"],
    },
    tooltip: {},

    // x 轴 配置
    xAxis: [
      {
        data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      },
      {
        data: ["衬衫2", "羊毛衫2", "雪纺衫2", "裤子2", "高跟鞋2", "袜子2"],
      },
      {
        data: ["衬衫3", "羊毛衫3", "雪纺衫3", "裤子3", "高跟鞋3", "袜子3"],
        offset: -50,
      },
    ],

    // y 轴 配置
    yAxis: {},

    // 系列列表
    series: [
      {
        // name: "1号销量",
        type: "bar", // 图标的类型
        data: [5, 7, 36, 11, 14, 25], // 图标的数据
        // data: [
        //   ["1997/10/1", 199],
        //   ["1997/10/2", 299],
        //   ["1997/10/3", 399],
        //   ["1997/10/4", 499],
        //   ["1997/10/5", 599],
        //   ["1997/10/6", 699],
        // ],
      },
      // {
      //   name: "2号销量",
      //   type: "bar", // 图标的类型
      //   data: [5, 20, 36, 10, 10, 20], // 图标的数据
      // },
      // {
      //   name: "3号销量",
      //   type: "bar", // 图标的类型
      //   data: [5, 20, 36, 10, 10, 20], // 图标的数据
      // },
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
