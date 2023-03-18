<template>
  <div class="back">
    <detail :detail="previewDetail"></detail>
    <div class="next">
      <nextButton text="驳回借板" min-text="" @click="show=true" v-if="isEdit"></nextButton>
    </div>
    <pxtPrompt @confirm="confirmButton" v-model:show-prompt="show" title="驳回">
      <el-input class="mt-10 mb-10 custom-input" v-model.trim="rejectReason" type="textarea" rows="3" placeholder="请输入驳回原因"/>
    </pxtPrompt>
  </div>
</template>

<script setup>
import PxtPrompt from '@/components/dialog/prompt.vue'
import Detail from "@/views/borrowPlate/components/detail.vue";
import useReviewDetail from "@/views/borrowPlate/useReviewDetail";
import {rejectBorrow} from "@/api/borrowPlate";
import {Notify, Toast} from "vant";
import {close} from "@/utils/ddApi";
import {closeLoading, openLoading} from "@/utils/toastTips";

let {previewDetail, id} = useReviewDetail()
let rejectReason = ref('')
let show = ref(false)
const isIPQC = computed(() => {
  return previewDetail?.type === 'IPQC'
})

const isEdit = computed(() => {
  // 驳回界面 如果是厂内并且状态为borrowing借板中、厂外并且状态为wait_receiver_confirm-待申请人接收则可以编辑 否则不行
 if(!isIPQC.value){
   if (previewDetail?.toWhere==='厂内验证'){
     return previewDetail?.status === 'borrowing'
   }else{
     return previewDetail?.status === 'wait_receiver'
   }
 }else{
   return previewDetail?.status === 'borrowing'
 }
})

const confirmButton = () => {
  if (!rejectReason.value) {
    return Notify(`请输入驳回原因`)
  }
  openLoading()
  rejectBorrow(id, {rejectReason: rejectReason.value}).then(() => {
    Toast("提交成功");
    show.value = false
    setTimeout(close, 2000)
  }).finally(closeLoading)
}

</script>

<style scoped lang="scss">
.back {
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
