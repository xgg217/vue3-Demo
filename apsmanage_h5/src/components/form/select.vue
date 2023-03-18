<template>
  <div class="select">
    <el-form-item :label="props.label" :prop="props.prop">
      <el-select v-model="newVal"   :placeholder="placeholder" popper-class="select_group--list" :teleported="false">
        <el-option v-for="item in selectList" :key="item.value" :label="item.label" :value="item.value"/>
      </el-select>
    </el-form-item>
  </div>
</template>
<script setup name="PxtSelect">
const emit = defineEmits(["update:modelValue"])
let props = defineProps({
  label:{
    type: String,
    default: ''
  },
  prop:{
    type: String,
    default: ''
  },
  modelValue:{
    type: String,
    default: ''
  },
  placeholder:{
    type: String,
    default: '请选择'
  },
  selectList: {
    type: Array,
    default: () => [
      {
        value: 'Option1',
        label: 'Option1',
      },
      {
        value: 'Option2',
        label: 'Option2',
      },
    ]
  },
})
const newVal=computed({
  get: () => props.modelValue,
  set: (value) => {
    emit('update:modelValue',value)
  }
})
</script>

<style lang="scss" scoped>
$input_height: 36px;
.select {
  :deep(.el-form-item__label) {
    color: $e-gray;
    font-size: 14px;
    line-height: $input_height;
  }

  :deep(.el-select) {
    width: 100%;
  }
  :deep(.el-input__wrapper){
    background:$e-blue;
    box-shadow: 0 0 0 0 transparent !important;
    border-right: 0;
  }
  :deep(.el-input.is-focus .el-input__wrapper){
    box-shadow: 0 0 0 0 transparent !important;
  }
  :deep(.el-input__inner){
    height: $input_height;
    color: $b-gray;
  }
  :deep(.el-select-dropdown__item.selected){
    color: #0096FF;
    font-weight: 400;
  }
  //placeholder颜色字体修改
  :deep(.el-input__inner::placeholder) {
    color: $b-gray;
    font-size: 14px;
  }
  :deep(.el-input__inner::-webkit-input-placeholder) {
    color: $b-gray;
    font-size: 14px;
  }
}
</style>
