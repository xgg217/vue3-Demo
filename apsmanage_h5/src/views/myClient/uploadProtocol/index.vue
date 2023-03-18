<template>
  <div class="uploadProtocolWrap">
    <businessLayoutSlot mainHeight="30%" :isEdit="isEdit">
      <template v-slot:header>
        <demandForm></demandForm>  
      </template>
      <template v-slot:main>
        <uploadProtocol ref="uploadProtocolComp" @changeEditStatus="changeEditStatus"></uploadProtocol>
      </template>
      <template v-slot:footer v-if="isEdit">
        <el-button style="width: 90%;" type="primary" @click="submit"><span class="fz-16" style="margin-right: 4vw">分发 </span><span class="fz-12">初版加工协议</span></el-button>
      </template>
    </businessLayoutSlot>
  </div>
</template>

<script setup>
  import businessLayoutSlot from "@/components/business/layoutSlot.vue";
  import uploadProtocol from "./uploadProtocol.vue";
  import demandForm from '../addDemand/module/demandForm.vue';

  const uploadProtocolComp = ref()
  const isEdit = ref(true)

  const changeEditStatus = (value) => {
    isEdit.value = value
  }

  const submit = () => {
    uploadProtocolComp.value.submit()
  }
</script>

<style lang="scss" scoped>
.uploadProtocolWrap{
  // height: 100%;
  background-color: #F4F5FC;
}
</style>