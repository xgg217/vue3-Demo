<template>
  <div class="init">
    <div class="base pt-10! pb-10!">
      <CustomerQuoteForm :customerDetail="projectInitiationDetail"></CustomerQuoteForm>
    </div>
    <Remark class="mt-10" :detail="projectInitiation"></Remark>

    <div class="base busElInput remarks mt-10 pt-10!  pb-10!" v-for="item in projectSignatureList" :key="item.id">
      <AuditItem :detail="item"></AuditItem>
    </div>

    <div class="base busElInput custom-input mt-10 pt-18! remarks" v-if="auditStatus && !currentUserIsAudit">
      <el-form-item label-width="24vw" label="立项签核" >
        <el-radio-group v-model="status">
          <el-radio :key="item.value" :label="item.value" v-for="item in [ {name: '同意', value: 0}, {name: '不同意', value: 1}]">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="24vw" label="签核备注" >
        <el-input v-model.trim="signatureRemark" type="textarea" rows="4" placeholder="不同意时，必须填写" maxlength="200"/>
      </el-form-item>
    </div>
    <LoginInfo></LoginInfo>
    <div class="next">
      <!--已退回的时候显示-->
      <div class="tip ui-nowrap" v-if="backStatus">当前立项申请已被拒绝，待商务修改后，才允许再次签核</div>
      <!--代核签状态显示核签按钮-->
      <NextButton v-if="auditStatus && !currentUserIsAudit" text="确认" min-text="通知申请人"  @click="projectInitSignature"></NextButton>
    </div>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import Remark from "./components/remark.vue"
import LoginInfo from '@components/loginInfo.vue';
import NextButton from '@components/button/nextButton.vue';
import AuditItem from './components/auditItem.vue'
import {Notify, Toast} from 'vant';
import {httpProjectInitSignature} from "@/api/business"
import {openLoading, closeLoading} from "@/utils/toastTips"
import {close} from "@/utils/ddApi";
import useReviewDetail from "@/views/setProject/useReviewDetail";

let {projectInitiation,projectId,nickName,projectSignatureList,projectInitiationDetail}=useReviewDetail()
let data = reactive({
  status:0,
  signatureRemark:''
})
let {status,signatureRemark} = toRefs(data)

//2是已退回
let backStatus=computed(()=>{
  return projectInitiation.value.status==2
})
//1是待签核
let auditStatus=computed(()=>{
  return projectInitiation.value.status==1
})
//判断当前用户是不是已经核签，暂时用name判断 不考虑同名
let currentUserIsAudit=computed(()=>{
  let receiverId=projectInitiation.value.receiverId || []
  return !receiverId.some(name=>name==nickName.value)
})

/* 发起核签 */
const projectInitSignature = () => {
  if(data.status===1 && !data.signatureRemark){
    return Notify(`请填写签核备注`)
  }
  openLoading()
  httpProjectInitSignature({...data,projectId})
      .then((res) => {
        Toast("提交成功");
        setTimeout(close, 2000)
      }).finally(closeLoading)
}
</script>

<style scoped lang="scss">
.init {
  margin-bottom: 60px;
  .base {
    background-color: white;
    padding: 0 20px 1px 20px;
  }
  :deep(.el-form-item__content){
    word-break:break-all
  }
  .form{
    :deep(.el-select) {
      width: 100%;
    }
    :deep(.el-form-item) {
      margin-bottom: 0;
      height: 36px;
      line-height: 36px;
    }
    :deep(.el-radio-group) {
      display: flex;
      flex-wrap: nowrap;
      .el-radio{
        margin-right: 10px;
      }
    }
  }
  .remarks{
    :deep(.el-form-item__label) {
      justify-content: left;
    }
  }

  .next{
    position: absolute;
    width: 100%;
    bottom: 0;
    .tip{
      background: #EBF5FF;
      font-size: 14px;
      color: #0096FF;
      text-align: center;
      height: 36px;
      line-height: 36px;
    }
    .save{
      padding-top: 10px;
    }
  }
}

</style>
