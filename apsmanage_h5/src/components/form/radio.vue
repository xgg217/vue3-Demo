<template>
  <div class="radio">
    <el-form-item :label="props.label" :prop="props.prop">
      <el-radio-group v-model="newVal"  text-color="#0096FF" fill="#F1F7FF">
        <el-radio-button v-for="item in props.radioList" :key="item" :label="item" class="radio_list">
          {{ item }}
        </el-radio-button>
      </el-radio-group>
    </el-form-item>
  </div>
</template>
<script setup name="PxtRadio">
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
  radioList: {
    type: Array,
    default: () => ['test1', 'test2', 'test3', 'test4']
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
.radio {
  :deep(.el-form-item__label) {
    color: $e-gray;
    font-size: 14px;
    line-height: $input_height;
  }
  display: flex;
  &_list {
    margin-right: 6px;
    margin-bottom: 10px;
    height: 36px;
    border-radius: 2px 2px 2px 2px;
    line-height: 36px;
    font-size: 14px;

    :deep(.el-radio-button__inner) {
      background: #F7F8FA;
      border: 0;
      color: $b-gray;
    }
  }
}
</style>
