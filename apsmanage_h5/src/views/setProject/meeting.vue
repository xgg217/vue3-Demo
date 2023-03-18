<template>
  <div class="init">
    <div class="base pt-10! pb-10!">
      <CustomerQuoteForm :customerDetail="projectInitiationDetail"></CustomerQuoteForm>
    </div>
    <Remark class="mt-10" :detail="projectInitiation"></Remark>
    <div class="base busElInput remarks mt-10 pt-10!  pb-10!" v-for="item in projectSignatureList" :key="item.id">
      <AuditItem :detail="item"></AuditItem>
    </div>
    <LoginInfo></LoginInfo>
    <div class="next" v-if="status">
      <NextButton text="下一步" min-text="预约审批会议"  @click="createdConf"></NextButton>
    </div>
  </div>
</template>

<script setup>
import HandlePeople from '@components/handlePeople.vue'
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import Remark from "./components/remark.vue"
import LoginInfo from '@components/loginInfo.vue';
import NextButton from '@components/button/nextButton.vue';
import AuditItem from './components/auditItem.vue'
import { createdConference} from "@/utils/ddApi";
import useReviewDetail from "@/views/setProject/useReviewDetail";
import {setProjectPersonList} from '@/constant/attendMeetingPerson'
let {projectId,nickName,createdBy,projectInitiationDetail,projectInitiation,projectSignatureList}=useReviewDetail()

const createdConf = () => {
  const title = `${nickName.value} 邀请你参加 客户 ${createdBy.value}的立项评审会议 PX01(${projectId}-3)`
  createdConference(title,{start:2,end:2.5,attendMeetingPerson:[...setProjectPersonList]})
}

let status=computed(()=>{
  return projectInitiation.value.status==3
})

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
