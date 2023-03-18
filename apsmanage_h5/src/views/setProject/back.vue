<template>
  <div class="init">
    <div class="base pt-10! pb-10!">
      <CustomerQuoteForm :customerDetail="projectInitiationDetail"></CustomerQuoteForm>
    </div>
    <!-- 核签的退回-->
    <div  v-if="!meetingLogInfo.length" >
      <div class="base busElInput remarks mt-10 pt-10! pb-10!" v-for="item in projectSignatureList" :key="item.id">
        <AuditItem :detail="item"></AuditItem>
      </div>
      <el-form-item class="base remarks busElInput mb-0!" label-width="24vw" label="未签核人员" >{{receiverName}}</el-form-item>
    </div>
    <!-- 会议的退回-->
    <template v-else>
      <div class="base busElInput remarks mt-10 pt-10!">
        <el-form-item class="mb-0!" label-width="24vw" label="立项签核" >
          <span v-if="projectSignatureList?.[0].status===0" color="#34C606">同意</span>
          <span v-else color="#FF3A35">不同意</span>
        </el-form-item>
        <div class="ui-cell ui-cell-sb" color="#1572F9">
          <div class="height36"></div>
          <div>详情<van-icon  :name="!showMore ? 'arrow-down' : 'arrow-up'" @click="changeShowMore"/></div>
        </div>
      </div>
      <template v-if="showMore">
        <div v-for="item in projectSignatureList" :key="item.id" class="mb-10">
          <div class="base busElInput remarks mt-10 pt-10!  pb-10!">
            <AuditItem :detail="item"></AuditItem>
          </div>
        </div>
      </template>
      <div class="base busElInput remarks pt-10! pb-10!" >
        <el-form-item class="mb-0!" label-width="24vw" label="立项评审" >
          <span v-if="projectMeetingRecord?.status===0" color="#34C606">通过</span>
          <span v-else color="#FF3A35">不通过</span>
        </el-form-item>
        <el-form-item  class="mb-0!" label-width="24vw" label="会议记录" >
          <div v-if="projectMeetingRecord?.remark" class="mt-20">{{projectMeetingRecord?.remark}}</div>
          <div v-else>无</div></el-form-item>
        <el-form-item  class="mb-0!" label-width="24vw" label="附件" >
          <businessFileList class="mt-30 w-full" :showDelete="false" :fileList="meetingRecordFile"></businessFileList>
        </el-form-item>
        <HandlePeople :time="projectMeetingRecord?.createdTime" :name="projectMeetingRecord?.createdBy"></HandlePeople>
      </div>
    </template>

    <div class="base busElInput custom-input mt-10 pt-18! remarks" v-if="status">
      <el-form-item label-width="24vw" label="立项备注" >
        <el-input v-model.trim="remark" type="textarea" rows="4" placeholder="" maxlength="200"/>
      </el-form-item>
    </div>
    <LoginInfo></LoginInfo>
    <div class="next" v-if="status">
      <NextButton text="确认" min-text="重新立项"  @click="returnProjInitApproved"></NextButton>
    </div>
  </div>
</template>

<script setup>
import HandlePeople from '@components/handlePeople.vue'
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import LoginInfo from '@components/loginInfo.vue';
import NextButton from '@components/button/nextButton.vue';
import BusinessFileList from '@/components/businessFileList/index.vue'
import AuditItem from './components/auditItem.vue'
import {Notify, Toast} from 'vant';
import {httpReturnProjInitApproved} from "@/api/business"
import {openLoading, closeLoading} from "@/utils/toastTips"
import {close} from "@/utils/ddApi";
import useReviewDetail from "@/views/setProject/useReviewDetail";

let {receiverName,projectInitiationDetail,projectId,projectInitiation,meetingLogInfo,meetingRecordFile,projectSignatureList,projectMeetingRecord}=useReviewDetail()
let data = reactive({
  remark:'',
  showMore:false
})

let {remark,showMore} = toRefs(data)

let status=computed(()=>{
  return projectInitiation.value.status==2
})

const changeShowMore = () => {
  showMore.value = !showMore.value
}

// 退回重新发起立项申请
const returnProjInitApproved = () => {
  if(!data.remark){
    return Notify(`请填写立项备注`)
  }
  let params = {
    id:projectId,
    remark:remark.value
  }
  openLoading()
  httpReturnProjInitApproved(params)
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
    .save{
      padding-top: 10px;
    }
  }
}

</style>
