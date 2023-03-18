<template>
  <div class="project">
    <CustomerQuoteForm :customerDetail="customerDetail"></CustomerQuoteForm>
    <!--BOM详情-->
    <BomDetail class="mt-12"></BomDetail>
    <div class="project-from mt-12">
      <CustomTable :table-detail="customsOfferList" @handelTable="handelTableData" :isDetail="isDetail"></CustomTable>
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
import CustomTable from "./table.vue"
import useDict from "@/hooks/useDict";
import {getHttpCustomsOffer, saveHttpCustomsOffer} from "@/api/business";
import {close} from "@/utils/ddApi";
import {Notify, Toast} from "vant";
import useCustomerDetail from "@/views/quotation/module/useCustomerDetail";
import {useUserStore} from "@/store";
import {closeLoading, openLoading} from "@/utils/toastTips";
useDict()
let {customerDetail, offerId} = useCustomerDetail()

let route = useRoute()
onMounted(() => {
  getHttpCustomsOffer(offerId).then((res) => {
    if (Object.keys(res.data).length) {
      customsOfferList.value = JSON.parse(res.data.customsOffer)
    }
  })
})
let data = reactive({
  customerOfferId: offerId,
  customsOfferList: []
})
let {customsOfferList} = toRefs(data)

//被打回状态
let isDetail = computed(() => {
  // 等于0时，为已报价状态，不允许修改，只允许查看
  // 等于1时，表示没有报价或已经打回报价，为编辑状态
  return customerDetail.value?.customsOfferFlag === 0
})
const handelTableData = (index, data) => {
  if (index >= 0) {
    customsOfferList.value.splice(index, 1)
  } else {
    customsOfferList.value.push({...data})
  }
}
const confirmButton = () => {
  if (!customsOfferList.value.length) {
    return Notify(`请填写完整`);
  }
  openLoading()
  saveHttpCustomsOffer({
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
