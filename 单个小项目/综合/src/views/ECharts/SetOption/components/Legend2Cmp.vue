<template>
  <div class="legend2" ref="legend2Ref"></div>
</template>

<script setup lang="ts">
import * as echarts from "echarts/core";
import {
  TitleComponent,
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  LegendComponent,
  LegendComponentOption,
} from "echarts/components";
import { PieChart, PieSeriesOption } from "echarts/charts";
import { LabelLayout } from "echarts/features";
import { CanvasRenderer } from "echarts/renderers";
import { setNameStr } from "./../utils";

echarts.use([
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  PieChart,
  CanvasRenderer,
  LabelLayout,
]);

type EChartsOption = echarts.ComposeOption<
  | TitleComponentOption
  | TooltipComponentOption
  | LegendComponentOption
  | PieSeriesOption
>;

const legend2Ref = ref(null);
const option: EChartsOption = {
  title: {
    text: "同名数量统计",
    subtext: "纯属虚构",
  },

  legend: {
    data: [],
  },

  tooltip: {
    trigger: "item",
  },

  // 系列列表
  series: [],
};

onMounted(() => {
  // 基于准备好的dom，初始化echarts实例
  var myChart = echarts.init(legend2Ref.value);

  const { nameArr, nameValArr } = setNameStr();

  // 设置默认选中前几个
  const selectedObj = {};
  {
    nameArr.forEach((item, index) => {
      if (index < 5) {
        // @ts-ignore
        selectedObj[item] = true;
      } else {
        // @ts-ignore
        selectedObj[item] = false;
      }
    });
  }
  console.log(selectedObj);

  // const selectedObj = nameArr.map(item => {})

  myChart.setOption({
    tooltip: {
      trigger: "item",
    },
    legend: {
      data: nameArr,
      type: "scroll",
      selected: selectedObj,
      // scrollDataIndex: 2,
      // pageButtonItemGap: 30,
      // pageButtonGap: 50,
      // pageButtonPosition: "start",
      pageIconColor: "red",
      pageIconInactiveColor: "blue",
    },
    series: [
      {
        type: "pie",
        radius: "50%",
        data: nameValArr,
      },
    ],
  });

  // option.series = [
  //   {
  //     name: "姓名",
  //     type: "pie",
  //     radius: "55%",
  //     center: ["40%", "50%"],
  //     data: [],
  //     emphasis: {
  //       itemStyle: {
  //         shadowBlur: 10,
  //         shadowOffsetX: 0,
  //         shadowColor: "rgba(0, 0, 0, 0.5)",
  //       },
  //     },
  //   },
  // ];
  // 绘制图表
  // myChart.setOption({
  //   title: {
  //     text: "同名数量统计",
  //     subtext: "纯属虚构",
  //   },
  //   // 图例
  //   legend: {},
  //   tooltip: {},

  //   // 系列列表
  //   series: [],
  // });
});
</script>

<style scoped>
.legend2 {
  width: 100%;
  height: 500px;
}
</style>
