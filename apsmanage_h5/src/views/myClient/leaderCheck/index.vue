<template>
  <div class="leaderCheck">
    <businessLayoutSlot mainHeight="30%" :isEdit="isEdit">
      <template v-slot:header>
        <demandForm></demandForm>
      </template>
      
      <template v-slot:main>
        <!-- <div v-for="(item, index) in meetingInfoList" :key="item.id">
          <meetingInput v-if="index == meetingInfoList.length - 1" :meetingInfoData="item" :index="index"></meetingInput>
        </div> -->
        <!-- <div v-for="(item, index) in checkInfoList" :key="item.id">
          <leaderCheck :checkInfoData="item" :index="index"></leaderCheck>
        </div> -->
        <meetingInput v-if="meetingInfoList.length" :meetingInfoData="meetingInfoList[meetingInfoList.length - 1]"></meetingInput>
        <leaderCheck v-if="state > 5 && checkInfoList.length" ref="leaderCheckComp" :checkInfoData="checkInfoList[checkInfoList.length - 1]"></leaderCheck>
        <leaderCheck v-if="state == 5" ref="leaderCheckComp" @changeEditStatus="changeEditStatus"></leaderCheck>
      </template>
      <template v-slot:footer v-if="isEdit">
        <el-button style="width: 42%" @click="saveFileToDD" type="primary" plain>下载业务需求表</el-button>
        <el-button style="width: 42%" v-if="isEdit && state == 5" type="primary" @click="aveApprovalResult">保存审批结果</el-button>
      </template>
    </businessLayoutSlot>
  </div>
</template>

<script setup>
  import businessLayoutSlot from "@/components/business/layoutSlot.vue";
  import meetingInput from "../meetingInput/meetingInput.vue";
  import demandForm from '../addDemand/module/demandForm.vue';
  import leaderCheck from "./leaderCheck.vue"
  import { useBusinessStore } from "@/store/business"

  const businessStore = useBusinessStore()
  const { state, businessData } = storeToRefs(businessStore)

  const leaderCheckComp = ref()
  const isEdit = ref(true)

  const meetingInfoList = ref([])
  const checkInfoList = ref([])

  watch(() => businessData.value, (newVal) => {
    if (newVal?.meetingLog.length) {
      meetingInfoList.value = newVal.meetingLog.reverse()
    }
    if (newVal?.approvalLog?.length) {
      checkInfoList.value = newVal.approvalLog.reverse()
    }
  })

  // if (businessData.value?.meetingLog.length) {
  //   meetingInfoList.value = businessData.value.meetingLog.reverse()
  // }

  // if (businessData.value?.approvalLog?.length) {
  //   checkInfoList.value = businessData.value.approvalLog.reverse()
  // }

  const changeEditStatus = (value) => {
    isEdit.value = value
  }

  const saveFileToDD = () => {
    console.log(leaderCheckComp)
    leaderCheckComp.value.saveFileToDD()
  }
  const aveApprovalResult = () => {
    leaderCheckComp.value.aveApprovalResult()
  }
</script>

<style lang="scss" scoped>
.leaderCheck{
  height: 100%;
}
</style>