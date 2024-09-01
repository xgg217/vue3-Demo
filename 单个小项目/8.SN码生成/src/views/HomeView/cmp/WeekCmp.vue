<template>
  <div>
    <el-date-picker v-model="val" type="date" placeholder="请选择日期" />
    <p>第{{ year }}年{{ week }}周</p>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import dayjs from 'dayjs'
import weekOfYear from 'dayjs/plugin/weekOfYear'
dayjs.extend(weekOfYear)

const emit = defineEmits<{
  (e: 'change', val: number): void
}>()

const val = ref('')

const week = computed(() => {
  if (!val.value) return 0

  const v = dayjs(val.value).week()

  emit('change', v)

  return v
})

const year = computed(() => {
  if (!val.value) return ''

  return dayjs(val.value).format('YYYY')
})
</script>

<style scoped></style>
