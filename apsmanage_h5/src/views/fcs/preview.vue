<template>
  <div class="init">
    <div class="base pt-10! pb-10!">
      <CustomerQuoteForm :customer-detail="previewDetail"></CustomerQuoteForm>
    </div>
    <!--订单图表-->
    <div class="mt-12">
      <CollectEcharts :show-date-range="true" :fcs-base-id="fcsBaseId"></CollectEcharts>
    </div>
    <div class="base ui-cell ui-cell-sb height36 mt-12">
      <div class="flex">
        <div color="#FF3A35" class="pr-10">2周内</div>
        <div  class="e-gray-color">FCS准备情况:</div>
      </div>
      <div color="#1572F9" @click="goHistory">查看历史FCS 准备记录</div>
    </div>
    <!--物流催一下-->
    <Urged type-name="物流方案" :name="processInstanceDetail?.[1]?.userName" @click="changeShowReminder(1)" v-if="!isLogisticsDetail"></Urged>
    <!--物流方案-->
    <layoutModule title="物流方案" v-else>
      <template #main>
        <Logistics :detail="logisticsDetail"></Logistics>
        <HandlePeople :time="logisticsDetail?.[0]?.createdTime" :name="logisticsDetail?.[0]?.createdBy"></HandlePeople>
      </template>
    </layoutModule>
    <!--海关账册编码催一下-->
    <Urged type-name="关务准备" :name="processInstanceDetail?.[0]?.userName" @click="changeShowReminder(0)" v-if="!isCustomsDetail"></Urged>
    <!--海关账册编码-->
    <layoutModule :title="'海关账册编码  '+(customsBookInfos?.[0]?.[0]?.bookNo || '')">
      <template #main>
        <Customs v-for="(item,index) in customsBookInfos" :key="index" :table-detail="item"></Customs>
        <MaterialCode class="mt-30" v-for="(item,index) in computedCustomData" :key="index" :table-detail="item"> </MaterialCode>
        <div class="ui-cell ui-cell-sb pt-10" color="#1572F9" v-if="customData.length>2">
          <div class="height36"></div>
          <div @click="changeShowMore">详情<van-icon  :name="!showMore ? 'arrow-down' : 'arrow-up'" /></div>
        </div>
      </template>
    </layoutModule>
    <!--物控任务催一下-->
    <Urged type-name="物控任务" :name="processInstanceDetail?.[2]?.userName" @click="changeShowReminder(2)" v-if="!isMaterialDetail"></Urged>
    <layoutModule miniTitle="物控任务" v-else>
      <template #main>
        <MaterialControl :detail="materialDetail" is-detail> </MaterialControl>
        <HandlePeople :time="materialDetail.createdTime" :name="materialDetail.createdBy"></HandlePeople>
      </template>
    </layoutModule>
    <LoginInfo></LoginInfo>
    <div class="next">
      <NextButton text="补录FCS" min-text=""  @click="againInputFcs"></NextButton>
    </div>
  </div>
  <Reminder v-model:show-prompt="showReminder"  :defaultReceiverIdList="defaultReceiverIdList" :reminderType="reminderType" :processInstanceDetail="processInstanceDetail"> </Reminder>
</template>

<script setup>
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import CollectEcharts from "./components/collectEcharts2.vue"
import HandlePeople from '@components/handlePeople.vue'
import Reminder from "./components/reminder.vue"
import Urged from "./components/urged.vue"
import MaterialCode from "./components/materialCode.vue"
import MaterialControl from "./components/materialControl.vue"
import Logistics from "./components/logistics.vue"
import Customs from "./components/customs.vue"
import LoginInfo from '@components/loginInfo.vue';
import NextButton from '@components/button/nextButton.vue';
import {getHttpFcsDetailsInfo} from "@/api/business"
import useReviewDetail from "@/views/fcs/useReviewDetail";
import {findByProcessInstanceId} from "@/api/common";
import {Notify} from "vant";

let {router,route, fcsBaseId, previewDetail, isLogisticsDetail,isMaterialDetail,isCustomsDetail} = useReviewDetail({isGetWeek: false,isCompany:true})
let {processInstanceId}=route.query
let data = reactive({
  showMore:false,
  showReminder:false,
  reminderType:0,
})
let defaultReceiverIdList=ref([])
let materialDetail=reactive({})
let logisticsDetail=ref([])
let customData = ref([])
let customsBookInfos=ref([])
let processInstanceDetail=ref([])
let { showMore,showReminder,reminderType} = toRefs(data)

const computedCustomData = computed(()=>{
  if(showMore.value){
    return customData.value
  }else{
    return customData.value.filter((item,index)=>index===0 || index===1)
  }
})
const goHistory = () => {
  let {customerName,cooperateType,purchaseModel}=previewDetail
  router.push({name:'historyFcs',params:{fcsBaseId:fcsBaseId.value},query:{customerName,cooperateType,purchaseModel}})
}
/* 补录FCS */
const againInputFcs =() => {
  router.push({name:'initFcs',params:{businessId:previewDetail.businessId}})
}
const changeShowMore = () => {
  showMore.value = !showMore.value
}
const changeShowReminder = (val) => {
  if(processInstanceDetail.value.length==0) {
    return Notify(`当前不存在催一下的任务`);
  }
  showReminder.value = !showReminder.value
  reminderType.value=val
}
// 商务预览页-用fcsBaseId 查详情
watch(()=>fcsBaseId.value,(val)=>{
  if(!val) return
  getFcsDetailsInfo()
  getFindByProcessInstanceId()
})
const getFcsDetailsInfo = () => {
  getHttpFcsDetailsInfo({fcsBaseId:fcsBaseId.value}).then((res)=>{
    let {materialControl={},logisticsInfos=[],customsTaskList=[]}=res.data
    Object.assign(materialDetail,materialControl)
    logisticsDetail.value=logisticsInfos
    customsTaskList.forEach((item)=>{
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

const getFindByProcessInstanceId = () => {   name
  // sid-79C1BB16-D517-48EA-B1B7-61DE6AD4F252 关务任务 reminderType 0
  // sid-3FA06C4B-41DA-4816-AE39-A36D1B63D06C 物流任务 reminderType 1
  // sid-D8A2E492-0CB5-48BA-ABF2-AE3413699348 物控任务 reminderType 2
  if(!processInstanceId) return
  findByProcessInstanceId({
    processInstanceId:processInstanceId,
    definitionKey:['sid-79C1BB16-D517-48EA-B1B7-61DE6AD4F252','sid-3FA06C4B-41DA-4816-AE39-A36D1B63D06C','sid-D8A2E492-0CB5-48BA-ABF2-AE3413699348']
  }).then((res)=>{
    console.log(res)
    processInstanceDetail.value=res.data
  })
}
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
