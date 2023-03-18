<template>
  <div class="collect">
    <div class="ui-cell">
      <div  class="height36 e-gray-color">汇总</div>
    </div>
    <div class="ui-cell ui-cell-sb filter">
      <div class="tab ui-cell" >
        <div :class="{'active':tab===0}" @click="changeTab(0)">By周 查看</div>
        <div :class="{'active':tab===1}" @click="changeTab(1)">By机型 查看</div>
      </div>
      <div class="width-110">
        <el-select v-if="tab===0" class="custom-input" v-model="form.model" placeholder="全部机型">
          <el-option :label="item" :value="item" v-for="item in ['全部机型',...modelDict]" :key="item"/>
        </el-select>
        <el-select v-else class="custom-input" v-model="form.week" placeholder="全部周">
          <el-option :label="item" :value="item" v-for="item in ['全部周',...weekDict]" :key="item"/>
        </el-select>
      </div>
    </div>
    <div>
      <!--By周 查看-->
      <ByWeek v-if="tab===0" :detail-data="weekData"></ByWeek>
      <!--By机型 查看-->
      <ByModel v-if="tab===1" :detail-data="modelData"></ByModel>
    </div>
  </div>
</template>

<script setup>
import ByWeek from "@/components/echarts/byWeek.vue";
import ByModel from "@/components/echarts/byModel.vue";

const props = defineProps({
  detail:{
    type: Array,
    default: ()=>[]
  }
})
let form=reactive({
  week:'全部周',
  model:'全部机型',
  tab:0
})
let {tab,week,model}=toRefs(form)

const changeTab = (val) => {
  tab.value=val
}
//筛选机型字典
const modelDict = computed(()=>{
  return props.detail.map(item=>item.fcsModel)
})
// 筛选周别字典
const weekDict = computed(()=>{
  let set=new Set()
  props.detail.forEach(({fcsWeekDetailsList=[]})=>{
    fcsWeekDetailsList.forEach(({produceWeek})=>{
      set.add(produceWeek)
    })
  })
  return [...set]
})

const weekData = computed(()=>{
  let map=new Map()
  let ret=[]
  //整理一个输出要的格式
  weekDict.value.forEach(item=>map.set(item,0))
  let filterData=props.detail.filter((item)=>{
    if(model.value=='全部机型'){
      return item
    }else{
      return item.fcsModel==model.value
    }
  })
  filterData.forEach(({fcsWeekDetailsList})=>{
    fcsWeekDetailsList.forEach(({produceWeek,orderNumber})=>{
      let number=map.get(produceWeek)
      map.set(produceWeek,number+Number(orderNumber))
    })
  })
  for (const mapElement of map) {
    ret.push({name:mapElement[0], value:mapElement[1]})
  }
  return ret
})

const modelData = computed(key=>{
  let map=new Map()
  let ret=[]
  //整理格式
  props.detail.forEach(({fcsModel})=>map.set(fcsModel,0))
  props.detail.forEach(({fcsModel,fcsWeekDetailsList})=>{
    let filterData=fcsWeekDetailsList.filter((item)=>{
      if(week.value=='全部周'){
        return item
      }else{
        return item.produceWeek==week.value
      }
    })
    filterData.forEach(({orderNumber})=>{
      let number=map.get(fcsModel)
      map.set(fcsModel,number+Number(orderNumber))
    })
  })
  for (const mapElement of map) {
    ret.push({name:mapElement[0], value:mapElement[1]})
  }
  return ret
})

</script>

<style scoped lang="scss">
.collect{
  box-sizing: border-box;
  width: 100%;
  height: 369px;
  background: #FFFFFF;
  padding: 10px 20px 0 20px;
  font-size: 14px;
  .filter{
    margin-top: 10px;
    .tab{
      width: 192px;
      box-sizing: border-box;
      height: 32px;
      background: #FFFFFF;
      opacity: 1;
      border: 1px solid #1572F9;
      div{
        width: 95px;
        height: 32px;
        line-height: 32px;
        text-align: center;
        color: #1572F9;
      }
      .active{
        background: #1572F9;
        color: #ffffff;
      }
    }
  }
}
.down{
  height: 50px;
  width: 100%;
  box-sizing: border-box;
  background: #ffffff;
  padding: 0 20px;
  >div{
    box-sizing: border-box;
    padding: 0 17px;
    width: 140px;
    height: 36px;
    background: #F1F7FF;
    border-radius: 2px;
    color: #0096FF;
    img{
      width: 17px;
    }
  }
}
</style>
