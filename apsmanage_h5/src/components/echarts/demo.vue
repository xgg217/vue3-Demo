<template>
  <div className="earth" ref="earth">
    <div id="main" ref="earthMain"></div>
  </div>
</template>

<script setup>

const {proxy} = getCurrentInstance();
let echarts = proxy.$echarts;
let earth = ref(null);
let earthMain = ref(null);
let earthChart;
onMounted(() => {
  earthChart = echarts.init(earthMain.value);
  initEarth();
  window.onresize = function() {
    //自适应大小
    earthChart.resize();
  };
});

const initEarth = () => {
  let option = {
    title: {
      text: ''
    },
    tooltip: {},
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
    },
    yAxis: {},
    series: [
      {
        name: '销量',
        type: 'bar',
        data: [5, 20, 36, 10, 10, 20]
      }
    ]
  };
  earthChart.setOption(option);
}

</script>

<style lang="scss" scoped>
.earth {
  background: #ffffff;
  max-height: 300px;
  > div {
    width: 100%;
    height: 300px;
  }
}
</style>
