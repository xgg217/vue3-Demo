<template>
  <div>
    <div>
      <LCmp @change="value1 = $event" style="width: 90px" />
      <LCmp @change="value2 = $event" style="width: 90px" />
      <LCmp @change="value3 = $event" style="width: 90px" />
    </div>

    <div>
      需要生成的数量
      <el-input-number v-model="num" :min="1" :step="200" @change="handleChange" :precision="0" />
    </div>

    <span v-show="false">{{ sss }}</span>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import LCmp from './LCmp.vue'

const emit = defineEmits<{
  (e: 'change', val: string): void
  (e: 'number', val: number): void
}>()

const value1 = ref('')
const value2 = ref('')
const value3 = ref('')

const sss = computed(() => {
  const v = `${value1.value}${value2.value}${value3.value}`
  emit('change', v)
  return v
})

const num = ref(1)

const handleChange = (value: number) => {
  console.log(value)
  emit('number', value)
}
</script>

<style lang="scss" scoped></style>
