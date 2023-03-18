<template>
  <div class="init">
    <div class="base pt-10! pb-10!">
      <CustomerQuoteForm :customerDetail="projectInitiationDetail"></CustomerQuoteForm>
    </div>
    <Remark class="mt-10" :detail="projectInitiation"></Remark>
    <div class="base busElInput remarks mt-10 pt-10! pb-10!" v-if="meetingLogInfo?.[0]">
      <el-form-item class="mb-0!" label-width="24vw" label="会议时间">{{meetingLogInfo[0]?.meetingTime}}</el-form-item>
      <el-form-item  class="mb-0!" label-width="24vw" label="参与人">{{meetingLogInfo[0]?.players}}</el-form-item>
    </div>
    <el-form-item class="base remarks busElInput mt-10! pt-10!" label-width="24vw" label="未签核人员">{{receiverName || '无'}}</el-form-item>

    <div class="base busElInput custom-input mt-10 pt-18! remarks" v-if="Object.keys(projectMeetingRecord).length">
      <el-form-item class="mb-0!" label-width="24vw" label="会议决定" >
        <span v-if="projectMeetingRecord?.status===0" color="#34C606">通过</span>
        <span v-else color="#FF3A35">不通过</span>
      </el-form-item>
      <el-form-item class="mb-0!" label-width="24vw" label="会议记录" >
        <div v-if="projectMeetingRecord?.remark" class="mt-20">{{projectMeetingRecord?.remark}}</div>
        <div v-else>无</div>
      </el-form-item>
      <el-form-item class="mb-0!" label-width="24vw" label="" >
        <businessFileList class="mt-6 w-full"  :fileList="meetingRecordFile" :show-delete="false"></businessFileList>
      </el-form-item>
    </div>
    <LoginInfo></LoginInfo>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import Remark from "./components/remark.vue"
import LoginInfo from '@components/loginInfo.vue';
import BusinessFileList from '@/components/businessFileList/index.vue'
import useReviewDetail from "@/views/setProject/useReviewDetail";
let {receiverName,projectInitiationDetail,projectMeetingRecord,projectInitiation,meetingRecordFile,meetingLogInfo}=useReviewDetail()
</script>

<style scoped lang="scss">
.init {
  margin-bottom: 60px;
  .base {
    background-color: white;
    padding: 0 20px 10px 20px;
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
