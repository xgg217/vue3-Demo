<template>
  <div class="login">
    <div class="form">
      <div class="form-tab">
        <div @click="tabActive='code'" :class="{'form-tab_active':tabActive==='code'}">验证码登录</div>
        <div @click="tabActive='passwd'" :class="{'form-tab_active':tabActive==='passwd'}">密码登录</div>
      </div>
      <van-form @submit="onSubmit" class="form-main">
        <div>
          <label>手机号<span>*</span></label>
          <van-field :class="{focus:focusStatus[0]}" @focus="()=>{focus([true,false,false])}" @blur="blur" v-model="phone" name="phone" autocomplete="new-password" placeholder="请输入手机号" maxlength="11" type="number"/>
        </div>
        <div v-if="tabActive==='code'">
          <label>验证码<span>*</span></label>
          <van-field v-model="code" :class="{focus:focusStatus[1]}" name="code" placeholder="请输入验证码" maxlength="6" @focus="()=>{focus([false,true,false])}" @blur="blur">
            <template #extra>
              <div v-if="data.showSetMsg" color="#2972FE"  @click="handleCountdown">发送验证码</div>
              <div v-else>{{ countdown + '秒后重试'}}</div>
            </template>
          </van-field>
        </div>
        <div v-if="tabActive==='passwd'">
          <label>密码<span>*</span></label>
          <van-field v-model="password" :class="{focus:focusStatus[2]}" @focus="()=>{focus([false,false,true])}" @blur="blur" type="password" name="password" placeholder="请输入密码" maxlength="20"/>
        </div>
        <div v-if="tabActive==='passwd'" class="ui-cell ui-cell-sb">
          <el-checkbox v-model="keepPassword" label="记住密码" size="small"/>
          <div class="fz-12" color="#2972FE">忘记密码？</div>
        </div>
        <div class="submit">
          <PxtButton width="100%" height="46px" radius="23px" :type="disabled?'disable':'blue-gradient'" @click="onSubmit">登录</PxtButton>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script setup>
import validate from '@/utils/validate'
import {useUserStore,useSystemStore} from "@/store";
import PxtButton from "@/components/button/button.vue";
import {getVerificationCode, verificationCodeLogin} from "@/api/login";
import {Toast} from "vant";
import {closeLoading, openLoading} from "@/utils/toastTips";
import {getYMDHM} from "@/utils/timeFormat";
import sesstionStorage from "@/utils/sessionStorage"
import usePermission from "@/hooks/usePermission";
let {isApp,browserEnv}=storeToRefs(useSystemStore())
let userStore = useUserStore()
let {getPermission}=usePermission()

let router = useRouter()
let data = reactive({
  tabActive: 'code',
  phone: '',
  password: '',
  code: '',
  countdown: 60,
  keepPassword: '',
  //解决安卓输入框不上推兼容性
  bottom:0,
  showSetMsg:true
})
let focusStatus=ref([false,false,false])
let {tabActive, phone, password, code, countdown, keepPassword,bottom} = toRefs(data)
let validatePhone = computed(() => {
  return validate.telnumber0.test(phone.value)
})
let disabled = computed(() => {
  if (tabActive.value === 'code') {
    return !(validatePhone.value && code.value.length)
  } else {
    return !(validatePhone.value && password.value.left > 10)
  }
})
const onSubmit = async (values) => {
  if (disabled.value) return
  openLoading()
  //登陆-获取用户信息
  verificationCodeLogin({phone: phone.value, code: code.value}).then(async (res) => {
    await userStore.asyncUpdateUserInfo({
      ...res.data,
      loginTime: getYMDHM(new Date())
    })
    await getPermission()
    let fullpath = sesstionStorage.get("beforePath")
    if (fullpath) {
      router.replace(fullpath)
    } else {
      router.replace({name: 'workbench'})
    }
  }).finally(closeLoading)
};

const handleCountdown = () => {
  data.showSetMsg=false
  if (countdown.value !== 60 || !validatePhone.value) {
    data.showSetMsg=true
    return
  }
  let time
  getVerificationCode(phone.value).then(() => {
    Toast("发送成功");
    time = setInterval(() => {
      countdown.value--;
      if (countdown.value <= 0) {
        countdown.value = 60;
        data.showSetMsg=true
        clearInterval(time)
        time = null
      }
    }, 1000)
  })
}

const blur = () => {
  focusStatus.value=[false,false,false]
  if (isApp.value && browserEnv.value==='android') {
    bottom.value=0
  }
}
const focus = (value) => {
  focusStatus.value=value
  if (isApp.value && browserEnv.value==='android') {
    bottom.value='200px'
  }
}
</script>

<style lang="scss" scoped>
.login {
  background: url("../../assets/images/loginBg.png") no-repeat;
  height: 100%;
  background-size: 100% 502px;
  position: relative;
  .form {
    width: 100%;
    height: 434px;
    overflow: hidden;
    position: absolute;
    bottom: v-bind(bottom);
    background: #FFFFFF;
    box-sizing: border-box;
    border-radius: 30px 30px 0 0;
    padding: 26px 20px 30px 20px;

    &-tab {
      position: relative;
      box-sizing: border-box;
      width: 335px;
      height: 44px;
      background: #FCFCFC;
      border: 1px solid #F5F5F5;
      margin: 0 auto;
      display: flex;
      border-radius: 30px;
      justify-content: center;
      align-items: center;
      color: #A7A9B7;
      font-size: 14px;
      font-weight: 500;

      div {
        width: 162px;
        height: 36px;
        line-height: 36px;
        border-radius: 25px 25px 25px 25px;
        text-align: center;
      }

      &_active {
        width: 160px;
        height: 36px;
        background: #FFFFFF;
        box-shadow: 0 3px 6px 1px rgba(212, 227, 255, 0.16);
        color: #1B2124;
      }

      .right {
        left: 166px;
      }
    }

    &-main {
      margin-top: 30px;
      height: 100%;
      position: relative;

      .submit {
        position: absolute;
        bottom: 70px;
        width: 100%;
      }

      label {
        font-size: 16px;
        font-weight: 500;
        color: #28364E;
        padding-left: 20px;
        span {
          color: #E66363;
        }
      }
      .focus{
        border-color: #2972FE !important;
      }
      :deep(.van-field) {
        width: 335px;
        height: 44px;
        background: #FFFFFF;
        border-radius: 30px;
        border: 1px solid #F5F5F5;
        margin: 7px 0 15px 0;
      }

      :deep(.el-checkbox__label) {
        color: #8D9092;
        font-size: 12px;

      }

    }
  }
}

</style>
