<template>
  <div class="title1"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { china } from "./china";
import { randomInt } from "es-toolkit";

function getRandom() {
  return randomInt(0, 1000);
}

onMounted(() => {
  // @ts-ignore
  echarts.registerMap("china", china);

  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".title1")! as HTMLElement);

  myChart.setOption({
    visualMap: {
      // show: true,
      min: 0,
      max: 1000,
      range: [300, 800],
      calculable: true,
      // inRange: {
      //   color: ["#E0FFFF", "#00BFFF"],
      // },
      // itemWidth: 100,
      // text: ["最大值", "最小值"],
    },

    series: [
      {
        type: "map", //地图类型的图表
        mapType: "china", //地图的类型是中国地图
        roam: true, //是否开启鼠标缩放的功能
        data: [
          { name: "北京", value: getRandom() },
          { name: "天津", value: getRandom() },
          { name: "上海", value: getRandom() },
          { name: "重庆", value: getRandom() },
          { name: "河北", value: getRandom() },
          { name: "河南", value: getRandom() },
          { name: "云南", value: getRandom() },
          { name: "辽宁", value: getRandom() },
          { name: "黑龙江", value: getRandom() },
          { name: "湖南", value: getRandom() },
          { name: "安徽", value: getRandom() },
          { name: "山东", value: getRandom() },
          { name: "新疆", value: getRandom() },
          { name: "江苏", value: getRandom() },
          { name: "浙江", value: getRandom() },
          { name: "江西", value: getRandom() },
          { name: "湖北", value: getRandom() },
          { name: "广西", value: getRandom() },
          { name: "甘肃", value: getRandom() },
          { name: "山西", value: getRandom() },
          { name: "内蒙古", value: getRandom() },
          { name: "陕西", value: getRandom() },
          { name: "吉林", value: getRandom() },
          { name: "福建", value: getRandom() },
          { name: "贵州", value: getRandom() },
          { name: "广东", value: getRandom() },
          { name: "青海", value: getRandom() },
          { name: "西藏", value: getRandom() },
          { name: "四川", value: getRandom() },
          { name: "宁夏", value: getRandom() },
          { name: "海南", value: getRandom() },
          { name: "台湾", value: getRandom() },
          { name: "香港", value: getRandom() },
          { name: "澳门", value: getRandom() },
        ],
      },
    ],
  });
});
</script>

<style lang="scss" scoped>
.title1 {
  width: 100%;
  height: 800px;
}
</style>
