<template>
  <el-select
    v-model="value"
    placeholder="请选择"
    size="large"
    @change="emit('change', $event + '')"
  >
    <el-option v-for="item in NUM_LETTER" :key="item" :label="item" :value="item" />
  </el-select>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { NUM_LETTER } from './../utils'

const emit = defineEmits<{
  (e: 'change', val: string): void
}>()

const value = ref('')
</script>

<style lang="scss" scoped></style>
