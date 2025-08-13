<template>
  <div class="title2"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts";
import { china } from "./china";

// let i = 0;
// function getRandom() {
//   if (i === 2) {
//     i++;
//     return 123;
//   }

//   // return randomInt(0, 1000);
//   const val = i * 60 + 100;
//   i++;
//   return val;
// }

const arr = (() => {
  const list = [
    { name: "北京", value: 0 },
    { name: "天津", value: 0 },
    { name: "上海", value: 0 },
    { name: "重庆", value: 0 },
    { name: "河北", value: 0 },
    { name: "河南", value: 0 },
    { name: "云南", value: 0 },
    { name: "辽宁", value: 0 },
    { name: "黑龙江", value: 0 },
    { name: "湖南", value: 0 },
    { name: "安徽", value: 0 },
    { name: "山东", value: 0 },
    { name: "新疆", value: 0 },
    { name: "江苏", value: 0 },
    { name: "浙江", value: 0 },
    { name: "江西", value: 0 },
    { name: "湖北", value: 0 },
    { name: "广西", value: 0 },
    { name: "甘肃", value: 0 },
    { name: "山西", value: 0 },
    { name: "内蒙古", value: 0 },
    { name: "陕西", value: 0 },
    { name: "吉林", value: 0 },
    { name: "福建", value: 0 },
    { name: "贵州", value: 0 },
    { name: "广东", value: 0 },
    { name: "青海", value: 0 },
    { name: "西藏", value: 0 },
    { name: "四川", value: 0 },
    { name: "宁夏", value: 0 },
    { name: "海南", value: 0 },
    { name: "台湾", value: 0 },
    { name: "香港", value: 0 },
    { name: "澳门", value: 0 },
  ];

  const arr = list.map((item, index) => {
    let val = 0;

    if (index === 1) {
      val = 123;
    } else {
      val = index * 60 + 100;
    }

    return {
      ...item,
      value: val,
    };
  });

  return arr;
})();
console.log(arr);

onMounted(() => {
  // @ts-ignore
  echarts.registerMap("china", china);

  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(document.querySelector(".title2")! as HTMLElement);

  myChart.setOption({
    visualMap: {
      type: "piecewise",
      min: 0,
      max: 1000,
      splitNumber: 4,
      // show: true,
      // pieces: [
      //   //   { min: 1500 }, // 不指定 max，表示 max 为无限大（Infinity）。
      //   //   { min: 900, max: 1500 },
      //   //   { min: 310, max: 1000 },
      //   //   { min: 200, max: 300 },
      //   //   { min: 10, max: 200, label: "10 到 200（自定义label）" },
      //   //   { value: 123, label: "123（自定义特殊颜色）", color: "grey" }, // 表示 value 等于 123 的情况。
      //   //   { max: 5 }, // 不指定 min，表示 min 为无限大（-Infinity）。
      //   // { gt: 1500 }, // (1500, Infinity]
      //   // { gt: 900, lte: 1500 }, // (900, 1500]
      //   // { gt: 310, lte: 1000 }, // (310, 1000]
      //   // { gt: 200, lte: 300 }, // (200, 300]
      //   // { gt: 10, lte: 200, label: "10 到 200（自定义label）" }, // (10, 200]
      //   // { value: 123, label: "123（自定义特殊颜色）", color: "grey" }, // [123, 123]
      //   // { lt: 5 }, // (-Infinity, 5)
      // ],
      // range: [300, 800],
      // inRange: {
      //   color: ["pink"],
      // },

      // outOfRange: {
      //   color: ["green"],
      // },
      // itemWidth: 100,
      // text: ["最大值", "最小值"],
    },

    series: [
      {
        type: "map", //地图类型的图表
        mapType: "china", //地图的类型是中国地图
        roam: true, //是否开启鼠标缩放的功能
        data: arr,
      },
    ],
  });
});
</script>

<style lang="scss" scoped>
.title2 {
  width: 100%;
  height: 800px;
}
</style>
