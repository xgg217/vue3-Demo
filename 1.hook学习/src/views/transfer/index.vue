<script setup lang="ts">
import { ref } from 'vue'
import type { IItem } from './types'

const generateData = () => {
  const data: Option[] = []
  for (let i = 1; i <= 15; i++) {
    data.push({
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
    })
  }
  return data
}

const data = ref<IItem[]>(generateData())
const value = ref([])



import TransferCmp from './components/TransferCmp.vue'
</script>

<template>
  <TransferCmp :data="data" />
</template>

<style lang="scss" scoped>
</style>