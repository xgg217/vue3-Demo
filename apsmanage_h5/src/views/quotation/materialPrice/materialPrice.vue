<template>
  <div class="project">
    <CustomerQuoteForm :customerDetail="customerDetail"></CustomerQuoteForm>
    <!-- BOM详情-->
    <BomDetail class="mt-12"></BomDetail>
    <!--没有报价物料-->
    <NoQuotaTable class="mt-12 project-from" :isDetail="isDetail" :materialDict="materialDict"  v-if="from.nonOfferMaterial.length"
                  :table-detail="from.nonOfferMaterial" ></NoQuotaTable>
    <!--仅一份报价物料-->
    <OneQuotaTable  class="mt-12 project-from" :isDetail="isDetail" @back="getMaterialOfferSummaryDetail" :table-detail="from.onlyOneOfferMaterial"
                   v-if="from.onlyOneOfferMaterial.length" @openQuoteInfoPrompt="openQuoteInfoPrompt"></OneQuotaTable>
    <!--有“多笔”报价物料，系统默认取最低价报价-->
    <MoreQuotaTable  class="mt-12 project-from" :isDetail="isDetail" :table-detail="from.multipleOfferMaterial"
                    v-if="from.multipleOfferMaterial.length" @openQuoteInfoPrompt="openQuoteInfoPrompt"></MoreQuotaTable>
    <!--usd-->
    <Usd class="mt-12" :detail="from.offerSummaryDTO"></Usd>
    <!--报价结果-->
    <QuoteResult class="mt-12" :detail="errorDetail" v-if="errorDetail.length"></QuoteResult>
    <PxtPrompt @confirm="errorPrompt=false" title="报价失败！" v-model:show-prompt="errorPrompt">
      <div class="fz-14 pt-20 pb-20 pl-30 pr-30 e-gray-color">
        <div v-for="(item,index) in errorDetail" :key="index">{{ item }}</div>
      </div>
    </PxtPrompt>
    <LoginInfo class="white-bg " height="46px"></LoginInfo>
    <div class="ui-cell save-btn mt-12" v-if="!isDetail">
      <NextButton text="预览" min-text="报价汇总.xls" class="pt-10 save-preview" @click="saveFileToDD(from.offerSummaryFile)"></NextButton>
      <NextButton text="确认" min-text="待其它岗位报价" class="pt-10 save-confirm" @click="otherOffer"></NextButton>
    </div>
    <QuoteInfo v-model:popupShow="quoteInfoPrompt" :quoteInfoData="quoteInfoData" :quoteIndex="quoteInfoIndex" @changeOffer="changeOffer"></QuoteInfo>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "../module/customerQuoteForm.vue"
import LoginInfo from "@components/loginInfo.vue"
import NextButton from "@components/button/nextButton.vue"
import BomDetail from "../module/bomDetail.vue"
import NoQuotaTable from "./module/noQuotaTable.vue"
import MoreQuotaTable from "./module/moreQuotaTable.vue"
import OneQuotaTable from "./module/oneQuotaTable.vue"
import Usd from "./module/usd.vue"
import QuoteResult from "./module/quoteResult.vue"
import PxtPrompt from '@/components/dialog/prompt.vue'
import {close, openSaveFile} from "@/utils/ddApi";
import {getHttpMaterialOffer, getHttpMaterialOfferSummaryDetail, getHttpUpdateSelectMaterialOffer} from "@/api/business";
import {getDeviceOSType} from "@/utils/utils";
import useDict from "@/hooks/useDict";
import useCustomerDetail from "@/views/quotation/module/useCustomerDetail";
import {closeLoading, openLoading} from "@/utils/toastTips";
import QuoteInfo from './module/quoteInfo.vue'
import {Toast} from "vant";
import {useDictStore} from "@/store";
let {customerDetail, offerId} = useCustomerDetail()
useDict({source: true, offerId})
const {getDictValue} = useDictStore()
onMounted(() => {
  getMaterialOfferSummaryDetail()
})

let data = reactive({
  page: 1,
  // 弹窗状态
  errorPrompt: false,
  errorDetail: [],
  quoteInfoPrompt: false,
  quoteInfoIndex: 0,
  quoteInfoType:'one',
  from: {
    customerOffer: {}, //报价信息
    multipleOfferMaterial: [],//有多笔报价物料
    nonOfferMaterial: [],//没有报价物料
    offerSummaryDTO: [], //报价汇总
    offerSummaryFile: {}, //报价汇总文件
    onlyOneOfferMaterial: {} //仅一份报价物料
  }
})
let {errorPrompt, page, from, errorDetail,quoteInfoIndex,quoteInfoPrompt,quoteInfoType} = toRefs(data)

let materialDict = computed(() => {
  let obj = {};
  return from.value.nonOfferMaterial.reduce((preVal, curVal) => {
    //过滤掉重复的
    if (!obj[curVal.materialName]) {
      obj[curVal.materialName] = preVal.push({
        name: curVal.materialName,
        value: curVal.materialName
      })
    }
    return preVal
  }, [])
})
let quoteInfoData=computed(()=>{
  if(quoteInfoType==='one'){
    return from.value?.onlyOneOfferMaterial.length ? [from.value.onlyOneOfferMaterial[quoteInfoIndex.value]] : []
  }else {
    return from.value?.multipleOfferMaterial?.[quoteInfoIndex.value]?.materialOfferList || []
  }
})
//详情状态
let isDetail = computed(() => {
  return customerDetail.value?.materialOfferFlag === 0
})

/* 报价预览 */
const saveFileToDD = (info) => {
  openSaveFile(info.name, info.url)
}
const getMaterialOfferSummaryDetail = () => {
  getHttpMaterialOfferSummaryDetail(offerId).then((res) => {
    from.value = res.data
  })
}
//确认 待其他岗位报价
const otherOffer = () => {
  openLoading()
  getHttpMaterialOffer({
    customerOfferId: offerId
  }).then(() => {
    Toast("提交成功");
    setTimeout(close, 2000)
  }).catch((err) => {
    errorDetail.value = Array.isArray(err) ? err : [err]
    errorPrompt.value = true
  }).finally(closeLoading)
}

const openQuoteInfoPrompt = (index,type) => {
  quoteInfoPrompt.value = !quoteInfoPrompt.value
  quoteInfoIndex.value = index
  quoteInfoType.value=type
}

const changeOffer= (index) => {
  from.value.multipleOfferMaterial[quoteInfoIndex.value].materialOfferList.forEach((item, idx) => {
    item.isSelected = (index === idx ? 0 : 1)
  })
  getHttpUpdateSelectMaterialOffer({materialOfferList: from.value.multipleOfferMaterial[quoteInfoIndex.value].materialOfferList}).then(() => {
    Toast("调整成功");
    getMaterialOfferSummaryDetail()
  })
}
//币种
let offerCurrency = computed(() => {
  return getDictValue('currency', customerDetail.value?.offerDetail?.offerCurrency || 1)
})
provide('currency', offerCurrency)
// const loadMore = () => {
//   page.value = page.value + 1
//   // 加载更多
// }
// watch(() => page.value, () => {
//   console.log('page',page.value)
// })
</script>

<style scoped lang="scss">
.project {
  &-from {
    background: #FFFFFF;
    padding: 10px 20px;
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
