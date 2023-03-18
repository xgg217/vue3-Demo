<template>
  <div class="audit">
    <detail :detail="previewDetail"></detail>
    <div class="next">
      <nextButton :text="isIPQC?'确认接收全部还板':'请接收良品板进行清尾'" min-text="" @click="submit" v-if="isEdit"></nextButton>
    </div>
  </div>
</template>

<script setup>
import Detail from "@/views/borrowPlate/components/detail.vue";
import NextButton from "@/components/button/nextButton.vue";
import useReviewDetail from "@/views/borrowPlate/useReviewDetail";
import {acceptReturn, receiveBoard} from "@/api/borrowPlate";
import {Toast} from "vant";
import {close} from "@/utils/ddApi";
import {closeLoading, openLoading} from "@/utils/toastTips";

let {previewDetail, id} = useReviewDetail()

// 废板信息
const scrapReturned = computed(() => {
  return (previewDetail?.serialNumbers || []).filter((item) => item.status === 'returned')
})

const isEdit = computed(() => {
  return scrapReturned.value?.[0]?.confirmStatus === 'unConfirm'
})


const isIPQC = computed(() => {
  return previewDetail?.type === 'IPQC'
})
const submit = () => {
  let fn = isIPQC.value ? acceptReturn : receiveBoard
  openLoading()
  fn(id).then(() => {
    Toast("提交成功");
    setTimeout(close, 2000)
  }).finally(closeLoading)
}

</script>

<style scoped lang="scss">
.audit {
  padding-bottom: 100px;

  .next {
    position: fixed;
    width: 100%;
    bottom: 0;

    .save {
      padding-top: 10px;
    }
  }
}

</style>
