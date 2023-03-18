<template>
  <div class="custom">
    <div class="base pt-10! pb-10!">
      <CustomerQuoteForm :customer-detail="previewDetail"></CustomerQuoteForm>
    </div>
    <!-- 订单图表-->
    <div class="mt-12">
      <CollectEcharts :fcs-base-id="fcsBaseId" ></CollectEcharts>
    </div>
    <layoutModule title="客户料号 VS 关务账册">
      <template #main>
        <MaterialCode class="mb-20" v-for="(item,index) in customData" :key="index" :table-detail="item"> </MaterialCode>
      </template>
    </layoutModule>
    <div v-for="(item,index) in customsBookInfos"  :key="index">
      <layoutModule :title="'海关账册编码 '+item[0].bookNo">
        <template #main>
          <Customs :table-detail="item"></Customs>
        </template>
      </layoutModule>
    </div>
    <LoginInfo></LoginInfo>
    <div class="next">
      <NextButton text="确定" min-text="通知商务经理"  @click="saveFcsCustoms" v-if="!isCustomsDetail"></NextButton>
    </div>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import CollectEcharts from "./components/collectEcharts2.vue"
import Customs from "./components/customs.vue"
import LoginInfo from '@components/loginInfo.vue';
import MaterialCode from "./components/materialCode.vue"
import NextButton from '@components/button/nextButton.vue';
import {Toast} from 'vant';
import {getHttpFcsCustoms, saveHttpFcsCustoms} from "@/api/business"
import {openLoading, closeLoading} from "@/utils/toastTips"
import {close} from "@/utils/ddApi";
import useReviewDetail from "@/views/fcs/useReviewDetail";
let {fcsTaskId,fcsBaseId,previewDetail,isCustomsDetail}=useReviewDetail({isGetWeek:false})

// customerNo:'',//客户料号
// materialNumber:'', //我司料号
// materialSeq:'',//备案成品料号
// customsTasks:[],//客户料号list
// customsBookInfos:[],//海关账册信息
// unFinishedMaterials:[], //未备案料件清单
let customData = ref([])
let customsBookInfos=ref([])


/* 发起产前准备 */
const saveFcsCustoms = () => {
  openLoading()
  saveHttpFcsCustoms(fcsTaskId)
      .then(() => {
        Toast("提交成功");
        setTimeout(close, 2000)
      }).finally(closeLoading)
}

const getFcsCustoms = () => {
  getHttpFcsCustoms({fcsTaskId}).then((res)=>{
    res.data.forEach((item)=>{
      //返回的结构很奇怪，一层套一层
      let {customerNo,materialNumber,customsTasks=[]}=item
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
onMounted(()=>{
  getFcsCustoms()
})
</script>

<style scoped lang="scss">
.custom {
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
  .border{
    width: calc(100% + 40px);
    position: relative;
    left: -20px;
    height: 13px;
    background: #F4F5FC;
    border: 0;
    margin: 15px 0 10px 0;
  }
}

</style>
