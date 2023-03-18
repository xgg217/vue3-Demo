<template>
  <div class="privewComp">
    <businessLayoutSlot mainHeight="30%" :isEdit="false">
      <template v-slot:header>
        <demandForm></demandForm>  
      </template>
      <template v-slot:main>
        <div v-for="(item, index) in meetingInfoList" :key="item.id">
          <meetingInput :meetingInfoData="item" :index="index"></meetingInput>
        </div>
        <div v-for="(item, index) in checkInfoList" :key="item.id">
          <leaderCheck :checkInfoData="item" :index="index"></leaderCheck>
        </div>
        
        <uploadProtocol></uploadProtocol>
        <entryQuestions></entryQuestions>
        <div v-for="item in offlineBridgeInfoList" :key="item.id">
          <offlineBridge :offlineBridgeData="item"></offlineBridge>
        </div>
        <uploadSignPro></uploadSignPro>
      </template>
    </businessLayoutSlot>
  </div>
</template>

<script setup>
  import businessLayoutSlot from "@/components/business/layoutSlot.vue";
  import demandForm from '@/views/myClient/addDemand/module/demandForm.vue';
  import meetingInput from "@/views/myClient/meetingInput/meetingInput.vue"
  import leaderCheck from "@/views/myClient/leaderCheck/leaderCheck.vue"
  import uploadProtocol from "@/views/myClient/uploadProtocol/uploadProtocol.vue"
  import entryQuestions from "@/views/myClient/entryQuestions/entryQuestions.vue"
  import offlineBridge from "@/views/myClient/offlineBridge/offlineBridge.vue"
  import uploadSignPro from "@/views/myClient/uploadSignPro/uploadSignPro.vue"
  import { useBusinessStore } from "@/store/business"

  const businessStore = useBusinessStore()
  const { state, businessData, businessProtocolData } = storeToRefs(businessStore)

  const meetingInfoList = ref([])
  const checkInfoList = ref([])
  const offlineBridgeInfoList = ref([])

  watch(() => businessData.value, (newVal) => {
    if (newVal?.meetingLog?.length) {
      meetingInfoList.value = newVal.meetingLog.reverse()
    }
    if (newVal?.approvalLog?.length) {
      checkInfoList.value = newVal.approvalLog.reverse()
    }
  })

  watch(() => businessProtocolData.value, (newVal) => {
    if (newVal?.customerResultList?.length) {
      offlineBridgeInfoList.value = newVal.customerResultList
    }
  })

  if (businessData.value?.meetingLog) {
    meetingInfoList.value = businessData.value.meetingLog.reverse()
  }

  if (businessData.value?.approvalLog?.length) {
    checkInfoList.value = businessData.value.approvalLog.reverse()
  }

  if (businessProtocolData.value?.customerResultList?.length) {
    offlineBridgeInfoList.value = businessProtocolData.value.customerResultList
  }

</script>

<style lang="scss" scoped>
</style>