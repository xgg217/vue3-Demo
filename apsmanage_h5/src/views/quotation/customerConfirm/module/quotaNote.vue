<template>
  <div>
    <div class="height36 e-gray-color">报价备注(客户报价单显示)</div>
    <div  class="fz-14 ml-60 b-gray-color">
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
