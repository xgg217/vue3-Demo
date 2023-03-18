<template>
  <div class="applicant">
    <detail :detail="previewDetail"></detail>
    <div class="next">
      <nextButton text="填写接收人信息" min-text="" @click="show=true" v-if="isEdit"></nextButton>
    </div>
    <pxtPrompt @confirm="confirmButton" v-model:show-prompt="show" title="接收信息">
      <el-form class="form custom-input" ref="ruleFormRef" :rules="rules" :model="form" hide-required-asterisk label-position="left" label-width="23vw">
        <el-form-item label="接收人姓名" prop="receiverName">
          <el-input v-model.trim="form.receiverName" placeholder="请输入接收人姓名"/>
        </el-form-item>
        <el-form-item label="接收人手机" prop="phone">
          <el-input v-model.trim="form.phone" placeholder="请输入接收人手机号"/>
        </el-form-item>
        <el-form-item label="运输车辆" prop="carNo" v-if="previewDetail?.isDispatchCar">
          <el-input v-model.trim="form.carNo" placeholder="请输入运输车牌号" maxlength="30"/>
        </el-form-item>
      </el-form>
    </pxtPrompt>
  </div>
</template>

<script setup>
import Detail from "@/views/borrowPlate/components/detail.vue";
import NextButton from "@/components/button/nextButton.vue";
import PxtPrompt from '@/components/dialog/prompt.vue'

import useReviewDetail from "@/views/borrowPlate/useReviewDetail";
import {checkPhoneNum, requiredValidate} from "@/utils/validate";
import {insertPhone} from "@/api/borrowPlate";
import {Toast} from "vant";
import {close} from "@/utils/ddApi";
import {closeLoading, openLoading} from "@/utils/toastTips";

let {previewDetail, id} = useReviewDetail()

let show = ref(false)
let ruleFormRef = ref(null)
let rules = reactive({
  phone: [{validator: checkPhoneNum, trigger: 'change'}],
  carNo: [requiredValidate('请输入车牌号')],
  receiverName: [requiredValidate('请输入接收人姓名')],
})
let form = reactive({
  phone: '',
  carNo: '',
  receiverName:''
})
const isEdit = computed(() => {
  // 申请人填写电话页面：状态为：wait_receiver待申请人接收（厂外人员） 则可以编辑，否则不行
  return previewDetail?.status === 'wait_receiver'
})
const confirmButton = () => {
  ruleFormRef.value.validate((valid, fields) => {
    if (!valid) return
    show.value = false
    openLoading()
    insertPhone(id, {...toRaw(form)}).then(() => {
      Toast("提交成功");
      setTimeout(close, 2000)
    }).finally(closeLoading)
  })
}
</script>

<style scoped lang="scss">
.applicant {
  padding-bottom: 60px;

  .form {
    margin-top: 20px;

    .code {
      position: absolute;
      left: 116px;
      top: 0px;
    }
  }

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
