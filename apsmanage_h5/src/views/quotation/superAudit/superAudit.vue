<template>
  <div class="project">
    <CustomerQuoteForm :customerDetail="customerDetail"></CustomerQuoteForm>
    <!-- BOM详情-->
    <BomDetail class="mt-12"></BomDetail>
    <!-- 工程报价-->
    <ProjectTable class="project-from mt-12" @openBackPrice="openBackPrice" :detail="projectOffer" :type="1"></ProjectTable>
    <!-- 物流报价-->
    <LogisticTable class="project-from mt-12" @openBackPrice="openBackPrice" :detail="customerDetail.logisticsOffers" :type="3"></LogisticTable>
    <!-- 关务报价-->
    <CustomTable class="project-from mt-12" @openBackPrice="openBackPrice" :detail="customerDetail.customsOffers" :type="2"></CustomTable>
    <!-- 物料报价-->
    <MaterialTable class="project-from mt-12" :tableDetail="customerDetail?.materialOffers?.materialOfferList || []"></MaterialTable>
    <div  class="white-bg pb-5">
      <BusinessFileList class="file_list" :showDelete="false" :fileList="materialOfferOriginalFile"></BusinessFileList>
    </div>
    <!-- 加工费报价-->
    <ProcessTable class="mt-12 custom-input" :customerDetail="customerDetail" ></ProcessTable>
    <Audit class="project-from mt-12" v-model:modelValue="remarks"></Audit>
    <LoginInfo class="white-bg" height="36px"></LoginInfo>
    <!--底部确认按钮 -->
    <div class="ui-cell save-btn mt-12" v-if="!isCurrentDetail">
      <NextButton text="退回重新报价" min-text="" class="pt-10 save-preview" @click="openBackPrice(5)"></NextButton>
      <NextButton text="通过" min-text="回复外发部" class="pt-10 save-confirm"  @click="handleSuperApproval"></NextButton>
    </div>
    <!--退回报价弹窗-->
    <BackPrice :type="backPrice.type" :id="backPrice.id" v-model:show="backPrice.status" @handelBack="handelBack" :offerType="customOfferType"></BackPrice>
    <!-- 发送客户弹窗-->
    <SendCustomer v-model:popup-show="sendCustomerStatus"></SendCustomer>
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
import Audit from './module/audit.vue'
import BackPrice from '../adjustPrice/module/backPrice.vue'
import SendCustomer from '../module/sendCustomer.vue'
import useDict from "@/hooks/useDict";
import {useDictStore} from "@/store";
import useCustomerDetail from "@/views/quotation/module/useCustomerDetail";
import {getHttpProjectOffer, getHttpQuotaNote, postHttpSuperApproval} from "@/api/business";
import {Toast} from "vant";
import {close} from "@/utils/ddApi";
import {closeLoading, openLoading} from "@/utils/toastTips";
useDict({fixture: true})
const {unit, getDictValue,offerType} = useDictStore()

let {customerDetail, offerId, getOfferOrderPreview,isGuest} = useCustomerDetail()
let data = reactive({
  backPrice: {
    status: false,
    type: 1,
    id: undefined
  },
  remarks:'',
  projectOffer: {},
  sendCustomerStatus: false,
})

let {backPrice, sendCustomerStatus, projectOffer, remarks} = toRefs(data)
onMounted(() => {
  //获取工程报价
  getProjectOffer()
  getQuotaNote()
})
const getQuotaNote = () => {
  getHttpQuotaNote({offerId}).then((res) => {
    remarks.value = res.data?.remarks
  })
}
const customOfferType = computed(()=>{
  if(isGuest.value){
    return offerType.filter(({value})=>value!==4 )
  }else{
    return offerType
  }
})
//详情状态
let isCurrentDetail = computed(() => {
  return customerDetail.value?.status !== 5
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

const openBackPrice = (type, id) => {
  backPrice.value.type = type
  backPrice.value.status = true
  backPrice.value.id = id
}

const handleSuperApproval = () => {
  openLoading()
  postHttpSuperApproval({
    offerId,
    remark: remarks.value,
    approvalResult:0,
  }).then(() => {
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
