<template>
  <div className="earth">
    <div id="main" ref="earthMain" style="width: 100%; height: 300px"></div>
  </div>
</template>

<script setup>

const {proxy} = getCurrentInstance();
let xAxisData=ref([])
let seriesData=ref([])
let echarts = proxy.$echarts;
let earthMain = ref(null);
let earthChart;

const props = defineProps({
  detailData: {
    type: Array,
    default: () => [
      {
        name:'W21',
        value:2811
      },
      {
        name:'W22',
        value:28122
      },
    ]
  },
})

watch(()=>props.detailData,(value)=>{
  initEarth(value)
})

const formatData = (value) => {
  if(value){
    let xData=[],sData=[];
    value.forEach((item)=>{
      xData.push(item.name)
      sData.push(item.value)
    })
    xAxisData.value=xData
    seriesData.value=sData
  }
}

const initEarth = () => {
  formatData(props.detailData)
  let option = {
    backgroundColor: "#FFFFFF",
    color: '#1572F9',
    tooltip: {
      confine: true,
    },
    grid: {
      left: '0%',
      right: '-10%',
      bottom: '10%',
      top: '10%',
      containLabel: true,
    },
    xAxis: {
      type: 'category',
      data: xAxisData.value,
      axisLine: {
        lineStyle: {
          color: '#EEEFEF',
          type: 'dashed', // dotted 虚线
        },
      },
      axisLabel: {
        fontSize: 12,
        color: '#A2A2A2',
        interval: 0,
        formatter: function (value) {
          //x轴的文字改为竖版显示
          return value.split("").join("\n");
        }
      },
      axisTick: {
        show: false,
      },
    },
    yAxis: [{

      type: 'value',
      min: 0,
      minInterval: 1,
      splitArea: {
        show: false,
      },
      axisLine: {
        show: false,
      },
      axisTick: {
        show: false,
      },
      splitLine: {
        lineStyle: {
          color: '#EEEFEF',
          type: 'dashed',
        },
      },
      axisLabel: {
        fontSize: 12,
        color: '#A2A2A2',
        fontFamily: 'Bebas',
      },
    }, {
      show:false,
    }],
    series: [{
      type: 'bar',
      barWidth: 12,
      data: seriesData.value
    }, {
      type: 'line',
      yAxisIndex: 1, // 使用的 y 轴的 index，在单个图表实例中存在多个 y轴的时候有用
      smooth: false, // 平滑曲线显示
      symbol: 'circle', // 标记的图形为实心圆
      symbolSize: 10, // 标记的大小
      itemStyle: {
        color: '#FF8B00',
        borderColor: '#fff', // 圆点透明 边框
        borderWidth: 1,
      },
      data:seriesData.value
    },
    ],
  };
  earthChart.setOption(option);
}
onMounted(() => {
  earthChart = echarts.init(earthMain.value);
  initEarth();
  window.onresize = function () {
    //自适应大小
    earthChart.resize();
  };
});
</script>

<style lang="scss" scoped>
.earth {
  background: #ffffff;
}
</style>
