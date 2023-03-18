<template>
  <div >
    <div class="height36 e-gray-color">审批备注</div>
    <div  class="fz-14 b-gray-color">
      <div v-if="isDetail">{{newVal}}</div>
      <el-input v-model="newVal" type="textarea" rows="6" placeholder="备注" v-else/>
    </div>
  </div>
</template>

<script setup>
const isDetail = inject('isCurrentDetail')
const emit = defineEmits(["update:modelValue"])
let props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
})

const newVal = computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue', value)
  }
})
</script>

<style scoped lang="scss">
:deep(.el-textarea__inner){
  background-color:#F6F6FB;
  border: unset;
  box-shadow: unset;
}
</style>
