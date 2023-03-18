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

    <div class="base busElInput custom-input mt-10 pt-18! remarks" v-if="status">
      <el-form-item label-width="24vw" label="会议决定">
        <el-radio-group v-model="data.status">
          <el-radio :key="item.value" :label="item.value" v-for="item in [ {name: '同意', value: 0}, {name: '不同意', value: 1}]">{{ item.name }}</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label-width="24vw" label="会议记录">
        <el-input v-model.trim="data.remark" type="textarea" rows="4" placeholder="不同意时，必须填写" maxlength="200"/>
      </el-form-item>
      <el-form-item label-width="24vw" label="" >
        <VantUpload keys="bomFileList" :filesList="meetingRecordFile"  :btnName="'上传附件'"  @getFileInfo="getCheckFileInfo"></VantUpload>
        <businessFileList class="mt-6 w-full"  :fileList="meetingRecordFile" @removeFile="removeCheckFile"></businessFileList>
      </el-form-item>
    </div>
    <LoginInfo></LoginInfo>
    <div class="next" v-if="status">
      <NextButton text="保存会议决议" min-text=""  @click="handleProjectMeetingRecord"></NextButton>
    </div>
    <Filing v-model:show-prompt="showFil" :isSend="projectInitiationDetail?.isSend" @refresh="projectInitiationReview" :offerId="projectInitiationDetail?.offerId" :projectId="projectId"></Filing>
  </div>
</template>

<script setup>
import Filing from './components/filing.vue'
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import Remark from "./components/remark.vue"
import LoginInfo from '@components/loginInfo.vue';
import NextButton from '@components/button/nextButton.vue';
import BusinessFileList from '@/components/businessFileList/index.vue'
import {Notify, Toast} from 'vant';
import {httpProjectMeetingRecord} from "@/api/business"
import {openLoading, closeLoading} from "@/utils/toastTips"
import VantUpload from "@/components/vantUpload.vue"
import useReviewDetail from "@/views/setProject/useReviewDetail";
import {close} from "@/utils/ddApi";
let {projectId,projectInitiationDetail,projectInitiation,isBusiness,meetingLogInfo,projectInitiationReview}=useReviewDetail()

let data = reactive({
  status:0,
  meetingRecordFile:[],
  remark:'',
})
let showFil=ref(false)
let {remark,meetingRecordFile} = toRefs(data)

// 是否显示建档弹窗 会议评审通过 && 客户尚未建档 && 是业务角色
let showFilStatus = computed(() => {
  return projectInitiation.value.status==6 && projectInitiationDetail.value?.customerType===2 && isBusiness.value
})

let status=computed(()=>{
  return projectInitiation.value.status==5
})

watch(()=>showFilStatus.value,(val)=>{
  showFil.value=val
})

const handleProjectMeetingRecord = () => {
  if(data.status===1 && !data.remark){
    return Notify(`请填写备注`)
  }
  let params = {
    projectId,
    ...data
  }
  openLoading()
  httpProjectMeetingRecord(params)
      .then((res) => {
        Toast("提交成功");
        if(data.status===1){
          close()
        }else{
          projectInitiationReview()
        }
      }).finally(closeLoading)
}

const getCheckFileInfo = (info) => {
  meetingRecordFile.value.push(info)
}

const removeCheckFile = (info) => {
  meetingRecordFile.value.splice(info.index, 1)
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
