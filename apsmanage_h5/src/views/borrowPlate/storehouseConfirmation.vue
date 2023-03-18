<template>
  <div class="audit">
    <detail :detail="previewDetail"></detail>
    <div class="next">
      <nextButton text="确认接收报废板" min-text="" @click="submit" v-if="isEdit"></nextButton>
    </div>
  </div>
</template>

<script setup>
import Detail from "@/views/borrowPlate/components/detail.vue";
import NextButton from "@/components/button/nextButton.vue";
import useReviewDetail from "@/views/borrowPlate/useReviewDetail";
import {receiveScrapBoard} from "@/api/borrowPlate";
import {close} from "@/utils/ddApi";
import {Toast} from "vant";
import {closeLoading, openLoading} from "@/utils/toastTips";

let {previewDetail, id} = useReviewDetail()

// 废板信息
const scrapReturned = computed(() => {
  return (previewDetail?.serialNumbers || []).filter((item) => item.status === 'scrapReturned')
})

const isEdit = computed(() => {
  return scrapReturned.value?.[0]?.confirmStatus === 'unConfirm'
})

const submit = () => {
  openLoading()
  receiveScrapBoard(id).then(() => {
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
