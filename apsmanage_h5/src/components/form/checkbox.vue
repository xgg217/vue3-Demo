<template>
  <div class="checkbox">
    <el-form-item :label="props.label" :prop="props.prop">
      <el-checkbox-group v-model="newVal" @change="(v)=>emit('update:checkboxChecked',v)" size="large" text-color="#0096FF" fill="#F1F7FF">
        <el-checkbox-button v-for="item in props.checkboxList" :key="item" :label="item" class="checkbox_list">
          {{ item }}
        </el-checkbox-button>
      </el-checkbox-group>
    </el-form-item>
  </div>
</template>
<script setup name="PxtCheckbox">
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
  checkboxList: {
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
.checkbox {
  :deep(.el-form-item__label) {
    color: $e-gray;
    font-size: 14px;
    line-height: $input_height;
  }
  &_list {
    margin-right: 6px;
    margin-bottom:10px;
    height: 36px;
    border-radius: 2px 2px 2px 2px;
    line-height: 36px;
    font-size: 14px;
    :deep(.el-checkbox-button__inner) {
      background: #F7F8FA;
      border:0;
      color: $b-gray;
    }
  }

  //.more{
  //  width: 52px;
  //  height: 36px;
  //  background: #F7F8FA;
  //  border-radius: 2px;
  //  font-size: 14px;
  //  color: $b-gray;
  //  line-height: 36px;
  //  text-align: center;
  //}
}
</style>
