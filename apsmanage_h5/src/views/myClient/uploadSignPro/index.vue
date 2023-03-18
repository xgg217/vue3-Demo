<template>
  <div class="uploadSignProWrap">
    <businessLayoutSlot mainHeight="30%" :isEdit="isEdit">
      <template v-slot:header>
        <demandForm></demandForm>  
      </template>
      <template v-slot:main>
        <uploadProtocol></uploadProtocol>
        <entryQuestions></entryQuestions>
        <offlineBridge v-if="offlineBridgeData" :offlineBridgeData="offlineBridgeData"></offlineBridge>
        <uploadSignPro ref="uploadSignProComp" @changeEditStatus="changeEditStatus"></uploadSignPro>
      </template>
      <template v-slot:footer v-if="isEdit">
        <el-button style="width: 90%;" type="primary" @click="submitForm">上传回签加工协议</el-button>
      </template>
    </businessLayoutSlot>
  </div>
</template>

<script setup>
  import businessLayoutSlot from "@/components/business/layoutSlot.vue";
  import uploadSignPro from "./uploadSignPro.vue";
  import demandForm from '../addDemand/module/demandForm.vue';
  import entryQuestions from "@/views/myClient/entryQuestions/entryQuestions.vue"
  import offlineBridge from "@/views/myClient/offlineBridge/offlineBridge.vue"
  import uploadProtocol from "../uploadProtocol/uploadProtocol.vue"

  import { useBusinessStore } from "@/store/business"

  const businessStore = useBusinessStore()
  const { businessProtocolData } = storeToRefs(businessStore)

  const uploadSignProComp = ref()
  const isEdit = ref(true)

  const offlineBridgeData = ref()

  watch(() => businessProtocolData.value, (newVal) => {
    if (newVal?.customerResultList?.length) {
      const length = newVal.customerResultList.length
      offlineBridgeData.value = newVal.customerResultList[length - 1]
    }
  })

  // if (businessProtocolData.value?.customerResultList.length) {
  //   const length = businessProtocolData.value.customerResultList.length
  //   offlineBridgeData.value = businessProtocolData.value.customerResultList[length - 1]
  // }

  const changeEditStatus = (value) => {
    isEdit.value = value
  }

  const submitForm = () => {
    uploadSignProComp.value.submitForm()
  }
</script>

<style lang="scss" scoped>
.uploadSignProWrap{
  // height: 100%;
  background-color: #F4F5FC;
}
</style>