<template>
  <div class="collect">
    <div class="ui-cell ui-cell-sb">
      <div class="height36 e-gray-color">{{title}}</div>
      <el-select class="custom-input" v-model="form.dateRange" placeholder="日期范围" v-if="showDateRange">
        <el-option :label="item.name" :value="item.value" v-for="item in dateRangeDict" :key="item.value"/>
      </el-select>
    </div>
    <div class="ui-cell ui-cell-sb filter">
      <div class="type ui-cell" >
        <div :class="{'active':type===1}" @click="changeType(1)">By周 查看</div>
        <div :class="{'active':type===2}" @click="changeType(2)">By机型 查看</div>
      </div>
      <div class="width-110">
        <el-select v-if="type===1" class="custom-input" v-model="form.model" placeholder="全部机型">
          <el-option :label="item" :value="item" v-for="item in ['全部机型',...form.modelDict]" :key="item"/>
        </el-select>
        <el-select v-else class="custom-input" v-model="form.week" placeholder="全部周">
          <el-option :label="item" :value="item" v-for="item in ['全部周',...form.weekDict]" :key="item"/>
        </el-select>
      </div>
    </div>
    <div>
      <!--By周 查看-->
      <ByWeek v-if="type===1" :detail-data="weekData"></ByWeek>
      <!--By机型 查看-->
      <ByModel v-if="type===2" :detail-data="modelData"></ByModel>
    </div>
  </div>
  <div class="down">
    <div class="ui-cell ui-cell-sb" @click="exportFcsInfo">
      <img src="@/assets/images/down.png" alt="">
      <div>下载FCS订单</div>
    </div>
  </div>
</template>

<script setup>
import {useDictStore} from "@/store";
import useReviewDetail from "../useReviewDetail";
import ByWeek from "@/components/echarts/byWeek.vue";
import ByModel from "@/components/echarts/byModel.vue";
import {openSaveFile} from "@/utils/ddApi";
import {exportHttpFcsInfo, getHttpComboBox, getHttpSummary} from "@/api/business";
let dictStore=useDictStore()
let {router,route,fcsTaskId} = useReviewDetail({isGetWeek:false,isGetDetail:false,isGetDict:false})
let {dateRangeDict} = storeToRefs(dictStore)

const props = defineProps({
  title: {
    type: String,
    default: "订单量"
  },
  showDateRange:{
    type: Boolean,
    default: false
  },
  fcsBaseId:{
    type: Number,
  }
})

let form=reactive({
  week:'全部周',
  model:'全部机型',
  type:1,
  dateRange:1,
  detail:[],
  modelDict:[],
  weekDict:[]
})
let {type,week,model,dateRange}=toRefs(form)

watch([type,dateRange,week,model], () => {
  getSummary()
})

const getSummary = () => {
  let params={
    fcsBaseId:props.fcsBaseId,
    type:form.type,
    condition:form.type==1?(form.model==="全部机型"?'':form.model):(form.week==='全部周'?'':form.week)
  }
  if(props.showDateRange){
    params.dateRange=form.dateRange
  }

  getHttpSummary(params).then((res)=>{
    form.detail=res.data
  })
  //查字典这个的type是相反的
  getHttpComboBox({...params,type:params.type==1?2:1}).then((res)=>{
    form[params.type==1?'modelDict':'weekDict']=res.data
  })
}
const changeType = (val) => {
  type.value=val
  // form.detail=[]
}
watch(()=>props.fcsBaseId,(val)=>{
  val && getSummary()
})

const weekData = computed(()=>{
  let arr=[]
  form.detail.forEach((item)=>{
    arr.push({name:item.week,value:item.orderNum})
  })
  return arr
})

const modelData = computed(()=>{
  let arr=[]
  form.detail.forEach((item)=>{
    arr.push({name:item.model,value:item.orderNum})
  })
  return arr
})

const exportFcsInfo = () => {
  //预览页下载所有数据
  let params={}
  if(route.name==='previewFcs'){
    params.fcsBaseId=props.fcsBaseId
  }else{
    params.fcsTaskId=fcsTaskId
  }
  exportHttpFcsInfo(params).then((res)=>{
    openSaveFile("FCS订单.xls", res.data)
  })
}
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
    .type{
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
