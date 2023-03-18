<template>
  <div class="flex ui-cell" @click="handleIcon">
    <van-icon name="add" color="#1572F9" size="24px"/>
    <div class="ml-5 fz-14" color="#0076F6">{{ text }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '新增'
  },
})

const emit = defineEmits(["handleIcon"])

const handleIcon = () => {
  emit('handleIcon')
}
</script>

<style scoped lang="scss">
:deep(.el-form-item__label) {
  height: 30PX;
  line-height: 30PX;
}

:deep(.el-select) {
  width: 100%;
}

:deep(.el-form-item__label) {
  font-size: 14px;
  font-weight: 400;
  color: $e-gray;
}

:deep(.el-input__wrapper) {
  height: 30PX;
  background: #F4F5FC;
  border-radius: 2px;
  box-shadow: none;
}

:deep(.el-input__wrapper:hover) {
  box-shadow: none;
}

.form {
  margin-top: 32PX;
}
</style>
