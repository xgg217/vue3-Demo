<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="types" label="格式" />
      <el-table-column prop="AAAA" label="AAAA" />
      <el-table-column prop="A" label="A" />

      <!-- 表示年份的最后位如2023年用3表示 -->
      <el-table-column prop="Y" label="Y">
        <template #default="{ row }">
          <!-- <el-date-picker v-model="row.Y" type="year" placeholder="请选择年份" /> -->
          <YCmp @change="row.Y = $event" />
        </template>
      </el-table-column>

      <!-- 表示雨位自然周别，如45表示45周 -->
      <el-table-column prop="WW" label="WW">
        <template #default="{ row }">
          <WeekCmp @change="row.WW = $event" />
        </template>
      </el-table-column>

      <el-table-column prop="L" label="L">
        <template #default="{ row }">
          <LCmp @change="row.L = $event" />
          <!-- <el-input-number v-model="row.L" :min="1" :max="10" @change="handleChange" /> -->
        </template>
      </el-table-column>
      <el-table-column prop="SSS" label="SSS">
        <template #default="{ row }">
          <SSSCmp @change="row.SSS = $event" />
        </template>
      </el-table-column>
      <el-table-column prop="XX" label="XX" />
    </el-table>
    <el-button type="primary" @click="submit">提交</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { IItem } from './../types'
import YCmp from './YCmp.vue'
import WeekCmp from './WeekCmp.vue'
import LCmp from './LCmp.vue'
import SSSCmp from './SSSCmp.vue'

const tableData = ref<IItem[]>([
  {
    types: '',
    AAAA: 'A7RZ',
    A: 'J',
    Y: '',
    WW: '',
    L: '',
    SSS: '',
    XX: ''
  }
])

// 提交
const submit = () => {
  const row = tableData.value[0]

  const { Y, WW, L, SSS } = row

  if (!Y) {
    ElMessage({
      message: 'Y-年份不可为空',
      type: 'warning'
    })
    return
  }

  if (!WW) {
    ElMessage({
      message: 'WW-请选择第几周',
      type: 'warning'
    })
    return
  }

  if (!L) {
    ElMessage({
      message: 'L-请选择工单批号',
      type: 'warning'
    })
    return
  }

  console.log(SSS)

  if (SSS.length <= 2) {
    ElMessage({
      message: 'L-请选择流水码',
      type: 'warning'
    })
    return
  }
}
</script>

<style scoped></style>
