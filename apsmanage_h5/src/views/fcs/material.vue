<template>
  <div class="init">
    <div class="base pt-10! pb-10!">
      <CustomerQuoteForm :customer-detail="previewDetail"></CustomerQuoteForm>
    </div>
    <!--订单图表-->
    <div class="mt-12">
      <CollectEcharts :fcsBaseId="fcsBaseId"></CollectEcharts>
    </div>
    <layoutModule miniTitle="物控任务">
      <template #main>
        <MaterialControl :detail="materialDetail" ref="materialControl" :is-detail="isMaterialDetail"> </MaterialControl>
      </template>
    </layoutModule>
    <LoginInfo></LoginInfo>
    <div class="next">
      <NextButton text="确定" min-text="通知商务经理"  @click="saveFcsMaterial" v-if="!isMaterialDetail"></NextButton>
    </div>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import CollectEcharts from "./components/collectEcharts2.vue"
import MaterialControl from "./components/materialControl.vue"
import LoginInfo from '@components/loginInfo.vue';
import NextButton from '@components/button/nextButton.vue';
import {Notify, Toast} from 'vant';
import {getHttpFcsMaterial, saveHttpFcsMaterial} from "@/api/business"
import {openLoading, closeLoading} from "@/utils/toastTips"
import useReviewDetail from "@/views/fcs/useReviewDetail";
import {close} from "@/utils/ddApi";
const keys=["producePlanFlag", "capacityPlanFlag", "materialFlag", "onlineTimeFlag", "deliverTimeFlag"]
let {fcsTaskId,fcsBaseId,previewDetail,isMaterialDetail}=useReviewDetail({isGetWeek:false})
let materialDetail = reactive({
  producePlanFlag:0,
  capacityPlanFlag:0,
  materialFlag:0,
  onlineTimeFlag:0,
  deliverTimeFlag:0,
  onlineTime:'',
  deliverTime:''
})
let materialControl=ref(null)
onMounted(()=>{
  getFcsMaterial()
})

const saveFcsMaterial = () => {
  let {onlineTime,deliverTime}=materialControl.value.materialDetail
  let checkList=materialControl.value.checkList
  if(checkList.length!==5 || !onlineTime || !deliverTime){
    return Notify(`请填写完整`);
  }
  openLoading()
  let param={fcsTaskId, fcsBaseId:fcsBaseId.value, onlineTime, deliverTime}
  keys.forEach((key)=>{
    param[key]=checkList.includes(key)?0:1
  })
  saveHttpFcsMaterial(param)
      .then((res) => {
        Toast("提交成功");
        setTimeout(close, 2000)
      }).finally(closeLoading)
}

const getFcsMaterial = () => {
  getHttpFcsMaterial({fcsTaskId}).then((res)=>{
    Object.assign(materialDetail,res.data)
  })
}

</script>

<style scoped lang="scss">
.init {
  margin-bottom: 60px;
  overflow-x: hidden;
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
