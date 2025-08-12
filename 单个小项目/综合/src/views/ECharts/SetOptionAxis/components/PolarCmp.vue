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
    polar: {
      indicator: [
        { name: "得分" },
        { name: "篮板" },
        { name: "助攻" },
        { name: "盖帽" },
        { name: "抢断" },
      ],
    },

    // 系列列表
    series: [
      {
        // name: "1号销量",
        type: "radar",
        data: [
          {
            name: "湖人",
            value: [5, 7, 36, 11, 14],
          },
        ],
      },
      {
        // name: "1号销量",
        type: "radar",
        data: [
          {
            name: "湖人",
            value: [5, 7, 36, 11, 14],
          },
          {
            name: "火箭",
            value: [6, 7, 8, 9, 10],
          },
        ],
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
