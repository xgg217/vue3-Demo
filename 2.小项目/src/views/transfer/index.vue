<script setup lang="ts">
import { ref } from 'vue'
import type { IItem } from './types'
import TransferCmp from './components/TransferCmp.vue'

const generateData = () => {
  const data: IItem[] = []
  for (let i = 1; i <= 15; i++) {
    const obj: IItem  = {
      key: i,
      label: `Option ${i}`,
      disabled: i % 4 === 0,
      checked: false
    }
    data.push(obj)
  }
  return data
}

const data = ref<IItem[]>(generateData())
const value = ref([])




</script>

<template>
  <TransferCmp :data="data" />
</template>

<style lang="scss" scoped>
</style>