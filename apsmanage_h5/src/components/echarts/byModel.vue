<template>
  <div className="earth" >
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
    default: () => [{name:'W21', value:2811}, {name:'W22', value:28122},]
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
onMounted(() => {
  earthChart = echarts.init(earthMain.value);
  initEarth();
  window.onresize = function () {
    //自适应大小
    earthChart.resize();
  };
});

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
      right: '0%',
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
        show: false,//是否显示坐标轴刻度
      },
    },
    yAxis: {},
    series: [{
      type: 'bar',
      barWidth: 12,
      label: {
        show: true,
        position: 'top',
        color:'#4A4A4A'
      },
      data: seriesData.value
    }
    ],
  };
  earthChart.setOption(option);
}

</script>

<style lang="scss" scoped>
.earth {
  background: #ffffff;
}
</style>
