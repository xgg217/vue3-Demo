<template>
  <div class="project">
    <CustomerQuoteForm :customerDetail="customerDetail"></CustomerQuoteForm>
    <!-- BOM详情-->
    <BomDetail class="mt-12" ref="bomDetailRef"></BomDetail>
    <!-- 工程报价-->
    <ProjectTable class="project-from mt-12"  :detail="projectOffer" :type="1"></ProjectTable>
    <!-- 物流报价-->
    <LogisticTable class="project-from mt-12"  :detail="customerDetail.logisticsOffers" :type="3"></LogisticTable>
    <!-- 关务报价-->
    <CustomTable class="project-from mt-12"  :detail="customerDetail.customsOffers" :type="2"></CustomTable>
    <!-- 物料报价-->
    <MaterialTable class="project-from mt-12" :tableDetail="customerDetail?.materialOffers?.materialOfferList || []"></MaterialTable>
    <div  class="white-bg pb-5">
      <BusinessFileList class="file_list" :showDelete="false" :fileList="materialOfferOriginalFile"></BusinessFileList>
    </div>
    <!-- 加工费报价-->
    <ProcessTable class="mt-12 custom-input" :customerDetail="customerDetail" ></ProcessTable>
    <SuperAudit class="project-base mt-12" :detail="customerDetail.offerApprovalInfo"></SuperAudit>
    <QuotaNote class="project-from mt-12"  v-model:modelValue="remarks"></QuotaNote>
    <LoginInfo class="white-bg" height="36px"></LoginInfo>
    <!--底部确认按钮 -->
    <NextButton text="确认" v-if="!isCurrentDetail" min-text="发送给客人" class="pt-10 mt-12 save-confirm"  @click="saveAdjustOffer"></NextButton>
    <!-- 发送客户弹窗-->
    <SendCustomer v-model:popup-show="sendCustomerStatus" :shareTitle="shareTitle"></SendCustomer>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "../module/customerQuoteForm.vue"
import LoginInfo from "@components/loginInfo.vue"
import NextButton from "@components/button/nextButton.vue"
import BomDetail from "../module/bomDetail.vue"
import ProjectTable from "../adjustPrice/module/projectTable.vue"
import LogisticTable from "../adjustPrice/module/logisticTable.vue"
import CustomTable from "../adjustPrice/module/customTable.vue"
import MaterialTable from "../adjustPrice/module/materialTable.vue"
import BusinessFileList from '@/components/businessFileList/index.vue'
import ProcessTable from '../adjustPrice/module/processTable.vue'
import QuotaNote from './module/quotaNote.vue'
import SuperAudit from '../module/superAudit.vue'
import SendCustomer from '../module/sendCustomer.vue'
import {closeLoading, openLoading} from "@/utils/toastTips";
import useDict from "@/hooks/useDict";
import {useDictStore} from "@/store";
import useCustomerDetail from "@/views/quotation/module/useCustomerDetail";
import {getHttpProjectOffer, getHttpQuotaNote, postHttpQuotaNote, postHttpSendToCustomer} from "@/api/business";
import {Notify} from "vant";

useDict({fixture: true})
const {unit, getDictValue,offerType} = useDictStore()
let {customerDetail, offerId, getOfferOrderPreview} = useCustomerDetail()
let data = reactive({
  remarks: "",
  projectOffer: {},
  sendCustomerStatus: false,
  bomDetailRef:''

})
let { sendCustomerStatus, projectOffer, remarks,bomDetailRef} = toRefs(data)
onMounted(() => {
  //获取工程报价
  getProjectOffer()
  getQuotaNote()
})
//详情状态
let isCurrentDetail = computed(() => {
  return customerDetail.value?.status !== 6
})
let shareTitle=computed(()=>{
  return `${bomDetailRef.value?.bomDetail?.createdBy}发起的报价申请 客户${customerDetail.value?.customerName}`
})
//币种
let offerCurrency = computed(() => {
  return getDictValue('currency', customerDetail.value?.offerDetail?.offerCurrency || 1)
})

let materialOfferOriginalFile = computed(() => {
  let materialOfferOriginalFile = customerDetail.value?.materialOffers?.materialOfferOriginalFile
  return materialOfferOriginalFile?.name ? [materialOfferOriginalFile] : []
})

provide('currency', offerCurrency)
//这个isDetail，控制物料 关务等报价信息的详情
provide('isDetail', true)
provide('isCurrentDetail', isCurrentDetail)

const saveAdjustOffer = () => {

  //先保存备注，再打开发送客户客户弹窗
  if(!remarks.value){
    return Notify(`请填写备注`);
  }
  openLoading()
  postHttpQuotaNote({
    customerOfferId: offerId,
    remarks: remarks.value,
  }).then(() => {
    sendCustomerStatus.value=true
    // setTimeout(close, 2000)
  }).finally(closeLoading)
}

const getProjectOffer = () => {
  getHttpProjectOffer(offerId).then((res) => {
    projectOffer.value = res.data
  })
}
const getQuotaNote = () => {
  getHttpQuotaNote({offerId}).then((res) => {
    remarks.value = res.data?.remarks
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
}
</style>
