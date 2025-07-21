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
    title: {
      text: "ECharts 柱状图示例换行",
      textStyle: {
        color: "blue",
        textBorderColor: "red",
        textBorderWidth: 2,
      },
      subtext: "副标题",
      itemGap: 20,
    },
    // 图例
    legend: {
      data: ["1号销量", "2号销量", "3号销量"],
    },
    tooltip: {},

    // x 轴 配置
    xAxis: {
      data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
      type: "category",
      // min: "dataMin",
      // max: "dataMax",
      name: "种类",
      // nameLocation: "start",
    },

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
