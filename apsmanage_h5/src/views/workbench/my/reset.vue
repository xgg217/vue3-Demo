<template>
 <div class="reset">
   <div class="custom-input form-main">
      <div>
        <label>旧密码<span>*</span></label>
        <el-input  v-model="form.oldPassword" placeholder="请输入旧密码"/>
      </div>
     <div>
       <label>新密码<span>*</span></label>
       <el-input  v-model="form.newPassword" placeholder="请输入新密码"/>
     </div>
     <div>
       <label>确认新密码<span>*</span></label>
       <el-input  v-model="form.repeatNewPassword" placeholder="请再次输入新密码"/>
     </div>
     <div class="ui-cell ui-cell-sb height36">
       <div></div>
       <div class="fz-12" color="#2972FE">忘记旧密码？</div>
     </div>
     <div class="submit">
<!--       <PxtButton width="100%" height="46px" radius="23px" :type="disabled?'disable':'blue-gradient'" @click="onSubmit">登录</PxtButton>-->
       <PxtButton width="100%" height="46px" radius="23px" type="blue-gradient" @click="onSubmit">登录</PxtButton>
     </div>
   </div>
 </div>
</template>

<script setup>
import {Notify} from "vant";
import PxtButton from "@/components/button/button.vue";

const form = reactive({
  oldPassword: '',
  repeatNewPassword: '',
  newPassword: '',
})

let disabled=computed(()=>{
  return !(form.repeatNewPassword && form.oldPassword && form.newPassword)
})
const onSubmit = (values) => {
  Notify(`密码错误`);
  console.log('submit', values);
};
</script>

<style lang="scss" scoped>
.reset{
  height: 100%;
  background: #FFFFFF;
  padding: 20px;
  box-sizing: border-box;
  .form-main{
    height: 100%;
    position: relative;
    >div{
      margin-top: 10px;
    }
    .submit{
      position: absolute;
      bottom: 20px;
      width: 100%;
    }
    :deep(.el-input__wrapper){
      height: 44px;
      background: #FFFFFF;
      border: 1px solid #F5F5F5;
      border-radius: 22px;
    }
    :deep(.el-input__inner){
      height: 44px;
      font-size: 14px;
      padding-left: 10px;
    }
    label{
      font-size: 16px;
      font-weight: 500;
      color: #28364E;
      padding-left: 20px;
      height: 36px;
      line-height: 36px;
      span{
        color: #E66363;
      }
    }
  }
}
</style>
