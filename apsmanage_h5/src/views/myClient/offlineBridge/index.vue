<template>
  <div class="offlineBridgeWrap">
    <businessLayoutSlot mainHeight="30%" :isEdit="isEdit">
      <template v-slot:header>
        <demandForm></demandForm>  
      </template>
      <template v-slot:main>
        <uploadProtocol></uploadProtocol>
        <entryQuestions></entryQuestions>
        <div v-for="item in offlineBridgeInfoList" :key="item.id">
          <offlineBridge :offlineBridgeData="item"></offlineBridge>
        </div>
        <offlineBridge v-if="state === 12" ref="offlineBridgeComp" @changeEditStatus="changeEditStatus" @changeStatus="changeStatus"></offlineBridge>
      </template>
      <template v-slot:footer v-if="isEdit">
        <el-button v-if="!isStatus" style="width: 90%;" type="primary" @click="submitForm"><span class="fz-16" style="margin-right: 4vw">确认</span><span class="fz-12">待回签加工协议</span></el-button>
        <el-button v-else style="width: 90%;" type="primary" @click="reappraise"><span class="fz-16" style="margin-right: 4vw">确认</span><span class="fz-12">重新评估</span></el-button>
      </template>
    </businessLayoutSlot>
  </div>
</template>

<script setup>
  import businessLayoutSlot from "@/components/business/layoutSlot.vue";
  import offlineBridge from "./offlineBridge.vue";
  import demandForm from '../addDemand/module/demandForm.vue';
  import entryQuestions from "@/views/myClient/entryQuestions/entryQuestions.vue"
  import uploadProtocol from "../uploadProtocol/uploadProtocol.vue"
  import { useBusinessStore } from "@/store/business"

  const businessStore = useBusinessStore()
  const { state, businessProtocolData } = storeToRefs(businessStore)

  const offlineBridgeInfoList = ref([])

  watch(() => businessProtocolData.value, (newVal) => {
    if (newVal?.customerResultList.length) {
      offlineBridgeInfoList.value = newVal.customerResultList
    }
  })

  watch(() => state.value, (newVal) => {
    if (newVal != 12) {
      isEdit.value = false
    }
  })

  if (businessProtocolData.value?.customerResultList.length) {
    offlineBridgeInfoList.value = businessProtocolData.value.customerResultList
  }

  const offlineBridgeComp = ref()
  const isEdit = ref(true)
  const isStatus = ref(false)

  if (state.value && state.value != 12) {
    isEdit.value = false
  }

  const changeEditStatus = (value) => {
    console.log(value)
    isEdit.value = value
  }

  const changeStatus = (value) => {
    isStatus.value = value
  }

  const submitForm = () => {
    offlineBridgeComp.value.submitForm()
  }

  const reappraise = () => {
    offlineBridgeComp.value.reappraise()
  }
</script>

<style lang="scss" scoped>
.offlineBridgeWrap{
  // height: 100%;
  background-color: #F4F5FC;
}
</style>