<template>
  <el-form-item class="mb-0!" label-width="24vw" label="立项签核" >
    <span v-if="detail?.status===0" color="#34C606">同意</span>
    <span v-else color="#FF3A35">不同意</span>
  </el-form-item>
  <el-form-item  class="mb-0!" label-width="24vw" label="签核备注" >
    {{detail?.signatureRemark}}</el-form-item>
  <HandlePeople :time="detail?.createdTime" :name="detail?.createdBy"></HandlePeople>
</template>

<script setup>
import HandlePeople from '@components/handlePeople.vue'
const props = defineProps({
 detail: {
    default: ()=>{}
  },
})
</script>

<style scoped lang="scss">
</style>
