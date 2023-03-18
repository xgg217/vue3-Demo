<template>
  <div class="remark busElInput">
    <el-form-item class="mb-0!" label-width="24vw" label="立项备注">
      <div v-if="detail?.remark" class="mt-20">{{detail?.remark }}</div>
      <div v-else>无</div>
    </el-form-item>
    <HandlePeople :name="detail?.createdBy" :time="detail?.createdTime"></HandlePeople>
  </div>
</template>

<script setup>
import HandlePeople from '@components/handlePeople.vue'
const props = defineProps({
 detail: {
    default: ()=>{

    }
  },
})
</script>

<style scoped lang="scss">
.remark {
  background-color: white;
  padding: 10px 20px;
  box-sizing: border-box;
  :deep(.el-form-item__content){
       //margin-top: 30px;
  }
  :deep(.el-form-item__label) {
    justify-content: left;
  }
}

</style>
