<template>
  <div class="meetingInputWrap">
    <businessLayoutSlot mainHeight="30%" :isEdit="isEdit">
      <template v-slot:header>
        <demandForm></demandForm>  
      </template>
      <template v-slot:main>
        <!-- <div v-for="item in meetingInfoList" :key="item.id">
          <meetingInput v-if="item.meetingResult || item.meetingResult === 0" :meetingInfoData="item"></meetingInput>
          <meetingInput v-else ref="meetingInputComp" @changeEditStatus="changeEditStatus" :meetingInfoData="item"></meetingInput>
        </div> -->
        <meetingInput v-if="meetingInfoData" ref="meetingInputComp" @changeEditStatus="changeEditStatus" :meetingInfoData="meetingInfoData"></meetingInput>
      </template>
      <template v-slot:footer v-if="isEdit">
        <el-button style="width: 90%;" type="primary" @click="saveMeetingRecord">保存会议记录</el-button>
      </template>
    </businessLayoutSlot>
  </div>
</template>

<script setup>
  import businessLayoutSlot from "@/components/business/layoutSlot.vue";
  import meetingInput from "./meetingInput.vue";
  import demandForm from '../addDemand/module/demandForm.vue';
  import { useBusinessStore } from "@/store/business"

  const businessStore = useBusinessStore()
  const { businessData } = storeToRefs(businessStore)

  const meetingInputComp = ref()
  const isEdit = ref(true)

  const meetingInfoList = ref([])

  const meetingInfoData = ref()

  const changeEditStatus = (value) => {
    isEdit.value = value
  }

  const setPage = (data) => {
    if (data?.meetingLog.length) {
      meetingInfoData.value = data.meetingLog[0]
      if (meetingInfoData?.value.meetingResult || meetingInfoData?.value.meetingResult === 0) {
        changeEditStatus(false)
      }
      meetingInfoList.value = data.meetingLog.reverse()
    }
    
  }

  watch(() => businessData.value, (newVal) => {
    setPage(newVal)
  })

  const saveMeetingRecord = () => {
    meetingInputComp.value.saveMeetingRecord()
  }
</script>

<style lang="scss" scoped>
.meetingInputWrap{
  height: 100%;
  background-color: #F4F5FC;
}
</style>