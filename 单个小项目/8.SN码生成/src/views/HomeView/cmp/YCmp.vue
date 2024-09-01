<template>
  <div>
    <el-date-picker v-model="val" type="year" placeholder="请选择年份" />
    <p>{{ y }}</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
const emit = defineEmits<{
  (e: 'change', val: string): void
}>()

const val = ref('')

const y = computed(() => {
  if (!val.value) {
    emit('change', '')
    return '0'
  }
  const v = dayjs(val.value).year().toString()[3]
  // console.log(v)

  emit('change', v)
  return v
})
</script>

<style lang="scss" scoped></style>
