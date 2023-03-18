<template>
  <div class="project">
    <CustomerQuoteForm :customerDetail="customerDetail"></CustomerQuoteForm>
    <!-- BOM详情-->
    <BomDetail class="mt-12" ref="bomDetailRef"></BomDetail>
    <!-- 工程报价-->
    <ProjectTable class="project-from mt-12" @openBackPrice="openBackPrice" :detail="projectOffer" :type="1"></ProjectTable>
    <!-- 物流报价-->
    <LogisticTable class="project-from mt-12" @openBackPrice="openBackPrice" :detail="customerDetail.logisticsOffers" :type="3"></LogisticTable>
    <!-- 关务报价-->
    <CustomTable class="project-from mt-12" @openBackPrice="openBackPrice" :detail="customerDetail.customsOffers" :type="2"></CustomTable>
    <!-- 物料报价-->
    <MaterialTable class="project-from mt-12" :tableDetail="customerDetail?.materialOffers?.materialOfferList || []"></MaterialTable>
    <Usd :detail="offerSummary">
      <div class="file">
        <BusinessFileList class="file_list" :showDelete="false" :fileList="materialOfferOriginalFile"></BusinessFileList>
        <RightIcon class="justify-end" text="退回  重新报价" @click="openBackPrice(4)" v-if="!isDetail && !isGuest"></RightIcon>
      </div>
    </Usd>
    <!-- 加工费报价-->
    <ProcessTable class="mt-12 custom-input" :customerDetail="customerDetail" ref="processTableRef"></ProcessTable>
    <QuotaNote class="project-from mt-12" v-model:modelValue="remarks"></QuotaNote>
    <LoginInfo class="white-bg" height="36px"></LoginInfo>
    <!--底部确认按钮-->
    <div class="ui-cell save-btn mt-12" v-if="!isDetail">
      <NextButton text="多项报价退回" min-text="" class="pt-10 save-preview" @click="openBackPrice(5)"></NextButton>
      <NextButton text="确认" min-text="发起审批" class="pt-10 save-confirm" v-if="processFeeProfitRate<25" @click="saveAdjustOffer"></NextButton>
      <NextButton text="确认" min-text="待客户确认" @click="handleSendCustomer" class="pt-10 save-confirm" v-else></NextButton>
    </div>
    <!--退回报价弹窗-->
    <BackPrice :type="backPrice.type" :id="backPrice.id" v-model:show="backPrice.status" @handelBack="handelBack" :offerType="customAdjustOfferType"></BackPrice>
    <!-- 发送客户弹窗-->
    <SendCustomer v-model:popup-show="sendCustomerStatus" :shareTitle="shareTitle"></SendCustomer>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "../module/customerQuoteForm.vue"
import LoginInfo from "@components/loginInfo.vue"
import NextButton from "@components/button/nextButton.vue"
import BomDetail from "../module/bomDetail.vue"
import ProjectTable from "./module/projectTable.vue"
import LogisticTable from "./module/logisticTable.vue"
import CustomTable from "./module/customTable.vue"
import MaterialTable from "./module/materialTable.vue"
import Usd from "../materialPrice/module/usd.vue"
import BusinessFileList from '@/components/businessFileList/index.vue'
import RightIcon from '@components/rightIcon.vue'
import ProcessTable from './module/processTable.vue'
import QuotaNote from './module/quotaNote.vue'
import BackPrice from './module/backPrice.vue'
import SendCustomer from '../module/sendCustomer.vue'
import useDict from "@/hooks/useDict";
import {useDictStore} from "@/store";
import useCustomerDetail from "@/views/quotation/module/useCustomerDetail";
import {postHttpConfirmApproval, getHttpProjectOffer, postHttpQuotaNote, postHttpSendToCustomer} from "@/api/business";
import {Notify, Toast} from "vant";
import {close} from "@/utils/ddApi";
import {closeLoading, openLoading} from "@/utils/toastTips";
const router = useRouter()
useDict({fixture: true})
const {unit, getDictValue,adjustOfferType} = useDictStore()
let {customerDetail, offerId,isGuest, getOfferOrderPreview} = useCustomerDetail()
let data = reactive({
  bomDetailRef:'',
  sendCustomerStatus:false,
  backPrice: {
    status: false,
    type: 1,
    id: undefined
  },

  remarks: " 1.此报价是A料原厂原包料，不包含非原装物料报价，非原装物料产能的维修及重测等费用由甲方承担。\n" +
          " 2.甲方提供所有物料需卷装，管装物料乙方收取代编带费用，0.031USD/PCS（0.2元/PCS）。\n" +
          " 3.领料每张工单只领一次物料，大于一次需加收物流费用。\n" +
          " 4.非乙方制程问题的直通率没有达到99%，需加收甲方维修费用（参考各类产品维修单价）。\n" +
          " 5. 单张工单0.3%不良品需要甲方允收结单。\n" +
          " 6.打样及小于1000PCS订单的RC料包含二三极管物料每节料带至少50CM且每种物料除5%损耗外多给出20颗以上物料备损。\n" +
          " 7.正常量产工单客户需提供物料0.3%的物料损耗。\n" +
          " 8.DOA 1个月。\n" +
          " 9.RMA有出厂标示产品按乙方维修成本向甲方收维修费用。\n" +
          " 10.DOA及RMA回来外观受损不在保固期范围内（如需要维修另行报价）。\n" +
          " 11.如由乙方提供工治具，则工治具费用全额由客户承担，在量产时收取。",
  projectOffer: {},
  processTableRef: ''
})

let {backPrice, projectOffer, processTableRef, remarks,bomDetailRef,sendCustomerStatus} = toRefs(data)
onMounted(() => {
  //获取工程报价
  getProjectOffer()
})
const customAdjustOfferType = computed(()=>{
  if(isGuest.value){
    return adjustOfferType.filter(({value})=>value!==4 )
  }else{
    return adjustOfferType
  }
})
let processFeeProfitRate = computed(() => {
  return processTableRef.value?.processFeeProfitRate
})
//详情状态
let isDetail = computed(() => {
  return customerDetail.value?.status !== 4
})
//币种
let offerCurrency = computed(() => {
  return getDictValue('currency', customerDetail.value?.offerDetail?.offerCurrency || 1)
})
let shareTitle=computed(()=>{
  return `${bomDetailRef.value?.bomDetail?.createdBy}发起的报价申请 客户${customerDetail.value?.customerName}`
})
let offerSummary = computed(() => {
  return customerDetail.value?.materialOffers?.offerSummary || {}
})
let materialOfferOriginalFile = computed(() => {
  let materialOfferOriginalFile = customerDetail.value?.materialOffers?.materialOfferOriginalFile
  return materialOfferOriginalFile?.name ? [materialOfferOriginalFile] : []
})

provide('currency', offerCurrency)
provide('isDetail', isDetail)


const openBackPrice = (type, id) => {
  backPrice.value.type = type
  backPrice.value.status = true
  backPrice.value.id = id
}
//发给客户
const handleSendCustomer = () => {

  //保存备注
  if(!remarks.value){
    return Notify(`请填写备注`);
  }
  openLoading()
  postHttpQuotaNote({customerOfferId: offerId, remarks: remarks.value})
  postHttpSendToCustomer(offerId).then(() => {
    getOfferOrderPreview()
    sendCustomerStatus.value=true

    // setTimeout(()=>{
    //   router.push({name: "customerConfirm", params: {offerId}})
    // }, 1000)
  }).finally(closeLoading)
}
// 发起审批
const saveAdjustOffer = () => {
  openLoading()
  postHttpQuotaNote({customerOfferId: offerId, remarks: remarks.value})
  postHttpConfirmApproval(offerId).then(() => {
    Toast("提交成功");
    setTimeout(close, 2000)
  }).finally(closeLoading)
}

//退回报价
const handelBack = () => {
  getOfferOrderPreview()
}
const getProjectOffer = () => {
  getHttpProjectOffer(offerId).then((res) => {
    projectOffer.value = res.data
  })
}

</script>

<style scoped lang="scss">
.project {
  &-from {
    background: #FFFFFF;
    padding: 10px 20px;
  }

  .file {
    margin-top: 10px;
    border-top: 1px solid #EBF1F7;

    &_list {
      padding-top: 10px;
      width: 239px;
      margin: 0 auto;
    }
  }

  .save-btn {
    :deep(.save:first-of-type) > div {
      margin-right: 5px;
      background: #E8F3FF;
      color: #1572F9;
    }

    :deep(.save:last-of-type) > div {
      margin-left: 5px;
    }
  }
}
</style>
