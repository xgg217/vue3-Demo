<template>
  <div class="confirm">
    <detail :detail="previewDetail"></detail>
    <div class="next">
      <nextButton text="确认接收还板" min-text="" @click="show=true" v-if="isEdit"></nextButton>
    </div>
    <pxtPrompt @confirm="confirmButton" v-model:show-prompt="show" title="确认接收">
      <el-form class="form custom-input" ref="ruleFormRef" :rules="rules" :model="form" label-position="left" label-width="16vw" hide-required-asterisk>
        <el-form-item label="手机号" prop="phone">
          <el-input v-model.trim="form.phone" placeholder="请输入接收人手机号"/>
        </el-form-item>
        <el-form-item label="验证码" prop="verificationCode">
          <el-input v-model.trim="form.verificationCode" placeholder="请输入验证码"/>
          <div class="code">
            <div v-if="showSetMsg" color="#2972FE" @click="handleCountdown">发送验证码</div>
            <div v-else>{{ countdown + '秒后重试' }}</div>
          </div>
        </el-form-item>
      </el-form>
    </pxtPrompt>
  </div>
</template>

<script setup>
import Detail from "@/views/borrowPlate/components/customerConfirmDetail.vue";
import NextButton from "@/components/button/nextButton.vue";
import PxtPrompt from '@/components/dialog/prompt.vue'
import {Toast} from "vant";
import validate, {checkPhoneNum, requiredValidate} from "@/utils/validate";
import {getBoardDetail, recipientConfirm, sendVerifyCode} from "@/api/borrowPlate";
import {closeLoading, openLoading} from "@/utils/toastTips";

const route = useRoute()
const {id} = route.params
let ruleFormRef = ref(null)
let previewDetail = reactive({})
let rules = reactive({
  phone: [{validator: checkPhoneNum, trigger: 'change'}],
  verificationCode: [requiredValidate('请填写验证码')],
})
let form = reactive({
  phone: '',
  verificationCode: '',
})
let data = reactive({
  showSetMsg: true,
  countdown: 60,
  show: false
})
let {show, countdown, showSetMsg} = toRefs(data)
const isEdit = computed(() => {
  // 接收人确认接收借板：状态为：wait_receiver_confirm-待接收人确认借板（厂外人员）则可以编辑，否则不行
  return previewDetail?.status === 'wait_receiver_confirm'
})
let validatePhone = computed(() => {
  return validate.telnumber0.test(form.phone)
})

const confirmButton = () => {

  ruleFormRef.value.validate((valid, fields) => {
    if (!valid) return
    openLoading()
    recipientConfirm({...toRaw(form), id}).then(() => {
      Toast("提交成功");
      data.show = false
      setTimeout(getDetail, 1000)
    }).finally(closeLoading)
  })
}

const handleCountdown = () => {
  data.showSetMsg = false
  if (data.countdown !== 60 || !validatePhone.value) {
    data.showSetMsg = true
    return
  }
  let time
  sendVerifyCode({phone: form.phone}).then(() => {
    Toast("发送成功");
    time = setInterval(() => {
      data.countdown--;
      if (data.countdown <= 0) {
        data.countdown = 60;
        data.showSetMsg = true
        clearInterval(time)
        time = null
      }
    }, 1000)
  })
}

const getDetail = () => {
  getBoardDetail({id}).then((res) => {
    Object.assign(previewDetail, res.data)
  })
}
onMounted(() => {
  getDetail()
})
</script>

<style scoped lang="scss">
.confirm {
  padding-bottom: 60px;

  .form {
    margin-top: 20px;

    .code {
      position: absolute;
      left: 110px;
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
