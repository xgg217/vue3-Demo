<template>
  <div class="title"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { random, round } from "lodash-es";

type TItem = [number, number, number][];

const data1: TItem = [];
const data2: TItem = [];
const data3: TItem = [];

onMounted(() => {
  {
    for (let i = 0; i < 500; i++) {
      {
        const val1 = round(random(0, 15, true), 3);
        const val2 = round(random(0, 10, true), 3);
        const val3 = round(random(0.1, 1.9), 3);
        data1.push([val1, val2, val3]);
      }
      {
        const val1 = round(random(0, 15, true), 3);
        const val2 = round(random(0, 10, true), 3);
        const val3 = round(random(0.1, 1.9), 3);
        data2.push([val1, val2, val3]);
      }

      {
        const val1 = round(random(0, 15, true), 3);
        const val2 = round(random(0, 10, true), 3);
        const val3 = round(random(0.1, 1.9), 3);
        data3.push([val1, val2, val3]);
      }
    }
    // console.log(data1, data2, data3);
  }

  // 基于准备好的dom，初始化echarts实例
  const myChart = echarts.init(document.querySelector(".title")!);

  myChart.setOption({
    legend: {},
    xAxis: {},
    yAxis: {},
    dataZoom: [
      // 控制x轴
      {
        type: "inside",
      },

      // 控制y轴
      {
        type: "inside",
        yAxisIndex: [0],
      },
    ],
    series: [
      {
        name: "1号销量",
        type: "scatter",
        data: data1,
        symbolSize: function (data: any) {
          // return Math.sqrt(data[1]) * 10;
          return data[2] * 20;
        },
      },
      {
        name: "2号销量",
        type: "scatter",
        data: data2,
      },
      {
        name: "3号销量",
        type: "scatter",
        data: data3,
      },
    ],
  });
});
</script>

<style lang="scss" scoped>
.title {
  width: 100%;
  height: 500px;
}
</style>
