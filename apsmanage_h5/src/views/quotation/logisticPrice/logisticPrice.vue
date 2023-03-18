<template>
  <div class="project">
    <CustomerQuoteForm :customerDetail="customerDetail"></CustomerQuoteForm>
    <!-- BOM详情-->
    <BomDetail class="mt-12"></BomDetail>
    <div class="project-from mt-12">
      <LogisticTable :table-detail="logisticsOfferList" @handelTable="handelTableData" :isDetail="isDetail"></LogisticTable>
    </div>
    <LoginInfo class="white-bg" height="36px"></LoginInfo>
    <NextButton text="确认" min-text="待其它岗位报价" class="mt-10 pt-10" @click="confirmButton" v-if="!isDetail"></NextButton>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "../module/customerQuoteForm.vue"
import LoginInfo from "@components/loginInfo.vue"
import NextButton from "@components/button/nextButton.vue"
import BomDetail from "../module/bomDetail.vue"
import LogisticTable from "./table.vue"
import useDict from "@/hooks/useDict";
import {getHttpLogisticsOffer, saveHttpLogisticsOffer} from "@/api/business";
import {close} from "@/utils/ddApi";
import {Notify, Toast} from "vant";
import useCustomerDetail from "@/views/quotation/module/useCustomerDetail";
import {closeLoading, openLoading} from "@/utils/toastTips";
import {useUserStore} from "@/store";

useDict()
let {customerDetail, offerId} = useCustomerDetail()

onMounted(() => {
  getHttpLogisticsOffer(offerId).then((res) => {
    //详情接口为空时，表示为新增，有数据时，根据isDetail判断是编辑还是详情状态
    if (Object.keys(res.data).length) {
      logisticsOfferList.value = JSON.parse(res.data.logisticsOffer)
    }
  })
})

let data = reactive({
  customerOfferId: offerId,
  logisticsOfferList: []
})
let {logisticsOfferList} = toRefs(data)

//详情状态
let isDetail = computed(() => {
  return customerDetail.value?.logisticsOfferFlag === 0
})
const handelTableData = (index, data) => {
  if (index >= 0) {
    logisticsOfferList.value.splice(index, 1)
  } else {
    logisticsOfferList.value.push({...data})
  }
}
const confirmButton = () => {
  if (!logisticsOfferList.value.length) {
    return Notify(`请填写完整`);
  }
  openLoading()
  saveHttpLogisticsOffer({
    ...toRaw(data)
  }).then(() => {
    Toast("提交成功");
    setTimeout(close, 2000)
  }).finally(closeLoading)
}
</script>

<style scoped lang="scss">
.project {
  &-from {
    background: #FFFFFF;
    padding: 10px 20px;
  }
}
</style>
