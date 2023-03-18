<template>
  <div class="init">
    <div class="base pt-10! pb-10!">
      <CustomerQuoteForm :customer-detail="previewDetail"></CustomerQuoteForm>
    </div>
    <!--    订单图表-->
    <div class="mt-12">
      <CollectEcharts show-date-range :fcs-base-id="fcsBaseId"></CollectEcharts>
    </div>
    <!--状态-->
    <div class="mt-12">
      <div class="base busElInput  mt-10 pt-10!  pb-10!">
        <el-form-item  label="FCS任务时间：" prop="remarks">{{createdTime}}</el-form-item>
        <el-form-item  label="发起人：" prop="remarks">{{createdBy}}</el-form-item>
        <el-form-item  label="任务状态：" prop="remarks">{{statusDict[taskStatus]}}</el-form-item>
      </div>
    </div>
    <!--物流方案-->
    <layoutModule title="物流方案">
      <template #main>
        <Logistics :detail="logisticsDetail"></Logistics>
        <HandlePeople :time="logisticsDetail?.[0]?.createdTime" :name="logisticsDetail?.[0]?.createdBy"></HandlePeople>
      </template>
    </layoutModule>
    <!--海关账册编码-->
    <layoutModule :title="'海关账册编码  '+(customsBookInfos?.[0]?.[0]?.bookNo || '')">
      <template #main>
        <Customs v-for="(item,index) in customsBookInfos" :key="index" :table-detail="item"></Customs>
        <MaterialCode class="mt-30" v-for="(item,index) in computedCustomData" :key="index" :table-detail="item"> </MaterialCode>
        <div class="ui-cell ui-cell-sb pt-10" color="#1572F9" v-if="customData.length>2">
          <div class="height36"></div>
          <div>详情<van-icon  :name="!showMore ? 'arrow-down' : 'arrow-up'" @click="changeShowMore"/></div>
        </div>
      </template>
    </layoutModule>
    <!--物控任务催一下-->
    <layoutModule miniTitle="物控任务" >
      <template #main>
        <MaterialControl :detail="materialDetail" is-detail> </MaterialControl>
        <HandlePeople :time="materialDetail.createdTime" :name="materialDetail.createdBy"></HandlePeople>
      </template>
    </layoutModule>
    <LoginInfo></LoginInfo>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import CollectEcharts from "./components/collectEcharts2.vue"
import HandlePeople from '@components/handlePeople.vue'
import MaterialCode from "./components/materialCode.vue"
import MaterialControl from "./components/materialControl.vue"
import Logistics from "./components/logistics.vue"
import Customs from "./components/customs.vue"
import LoginInfo from '@components/loginInfo.vue';
import {getHttpFcsCustoms, getHttpFcsLogistics, getHttpFcsMaterial} from "@/api/business"
import useReviewDetail from "@/views/fcs/useReviewDetail";
let {router,route,fcsTaskId,statusDict, fcsBaseId, previewDetail} = useReviewDetail({isGetWeek: false})
const {createdBy,taskStatus,createdTime} = route.query
let showMore=ref(false)
let materialDetail=reactive({})
let logisticsDetail=ref([])
let customData = ref([])
let customsBookInfos=ref([])

const computedCustomData = computed(()=>{
  if(showMore.value){
    return customData.value
  }else{
    return customData.value.filter((item,index)=>index===0 || index===1)
  }
})

const changeShowMore = () => {
  showMore.value = !showMore.value
}

//物控任务
const getFcsMaterial = () => {
  getHttpFcsMaterial({fcsTaskId}).then((res)=>{
    Object.assign(materialDetail,res.data)
  })
}
// 物流方案
const getFcsLogistics = () => {
  getHttpFcsLogistics({fcsTaskId}).then((res) => {
    logisticsDetail.value =res.data
  })
}
//关务任务
const getFcsCustoms = () => {
  getHttpFcsCustoms({fcsTaskId}).then((res)=>{
    res.data.forEach((item)=>{
      //返回的结构很奇怪，一层套一层
      let {customerNo,materialNumber,customsTasks}=item
      //customsTasks居然是个数组，但是ui和原型 都是单条的
      let {company='',bookNumber='',bookName='',manualType='',materialSeq='',unFinishedMaterials='',startTime='',endTime=''}=customsTasks?.[0] || {}
      if(item?.customsBookInfos && item?.customsBookInfos.length){
        customsBookInfos.value.push(item.customsBookInfos)
      }
      customData.value.push({
        //料号这里需要放在一个数组给table渲染
        table:[{customerNo, materialNumber, materialSeq:item.materialSeq}],
        company,
        bookNumber,
        bookName,
        manualType,
        materialSeq,
        unFinishedMaterials,
        startTime,
        endTime,
        unFinishedMaterialsArr:item.unFinishedMaterials || []
      })
    })
  })
}
// 商务预览历史详情页-用fcsTaskId 查详情
onMounted(()=>{
  getFcsMaterial()
  getFcsLogistics()
  getFcsCustoms()
})

</script>

<style scoped lang="scss">
.init {
  margin-bottom: 60px;
  .base {
    background-color: white;
    padding: 0 20px 1px 20px;
  }
  .next{
    position: absolute;
    width: 100%;
    bottom: 0;
    .save{
      padding-top: 10px;
    }
  }
  :deep(.el-form-item__label){
    justify-content: flex-start;
    width: 30vw;
  }
  :deep(.el-form-item){
    margin-bottom: 0;
  }
}

</style>
