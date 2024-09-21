<script setup lang="ts">
import { ref, onMounted } from 'vue'
import dayjs from 'dayjs'

import ListCmp from './cmp/ListCmp.vue'

const value1 = ref('')

// 初始化
onMounted(() => {
  value1.value = dayjs().format('YYYY-MM')
})
</script>

<template>
  <main>
    <el-date-picker v-model="value1" type="month" placeholder="请选择" value-format="YYYY-MM" />

    <ListCmp style="margin-top: 20px" :day="value1" />
  </main>
</template>

<style scoped>
main {
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>
