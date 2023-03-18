<template>
  <div v-if="!isDetail">
    <div class="height36 e-gray-color">报价备注(客户报价单显示)</div>
    <div  class="fz-14 ml-60 b-gray-color">
      <el-input v-model.trim="newVal" type="textarea" rows="12" placeholder="备注"/>
      <!--      <div v-else>{{newVal}}</div>-->
    </div>
  </div>
</template>

<script setup>
import useCommon from "@/views/quotation/adjustPrice/module/useCommon";

const {currency, isDetail, offerId} = useCommon()
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
