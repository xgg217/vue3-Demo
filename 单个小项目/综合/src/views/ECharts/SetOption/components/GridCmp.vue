<template>
  <div class="grid"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".grid")!);
  // 绘制图表
  myChart.setOption({
    grid: {
      show: true,
    },

    // x 轴 配置
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      splitLine: {
        show: false, // 坐标轴上的刻度线不显示
      },
      axisLine: {
        show: false,
      },
    },

    // y 轴 配置
    yAxis: {
      splitLine: {
        show: false, // 坐标轴上的刻度线不显示
      },
      axisLine: {
        show: false,
      },
    },

    // 系列列表
    series: [
      {
        name: "1号销量",
        type: "bar", // 图标的类型
        data: [5, 20, 36, 10, 10, 20], // 图标的数据
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
.grid {
  width: 100%;
  height: 500px;
}
</style>
