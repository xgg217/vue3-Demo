<template>
  <div>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column prop="types" label="格式" />

      <el-table-column prop="AAAA" label="AAAA">
      <template #default="{ row }">
          <el-input v-model="row.AAAA" minlength="4" maxlength="4" :show-word-limit="true" placeholder="请输入" />
        </template>
      </el-table-column>

      <el-table-column prop="A" label="A">
        <template #default="{ row }">
        <el-input v-model="row.A" minlength="1" maxlength="1" placeholder="请输入" />
        </template>
      </el-table-column>


      <!-- 表示年份的最后位如2023年用3表示 -->
      <el-table-column prop="Y" label="Y">
        <template #default="{ row }">
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
      <el-table-column prop="SSS" label="SSS" width="300">
        <template #default="{ row }">
          <SSSCmp @change="row.SSS = $event" @number="row.num = $event" />
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
import { getSNCode, getExcel } from './../utils'
import { ElMessage } from 'element-plus'
import {testValue4, testValue1} from "./../utils"

const tableData = ref<IItem[]>([
  {
    types: '',
    AAAA: '',
    A: '',
    Y: '',
    WW: '',
    L: '',
    SSS: '',
    XX: '',
    num: 1
  }
])

// 提交
const submit = () => {
  const row = tableData.value[0]

  const { AAAA, A, Y, WW, L, SSS } = row

  // AAAA 校验输入框
  {
    testValue4.lastIndex = 0;
    if (!testValue4.test(AAAA)) {
      ElMessage({
        message: 'AAAA-请输入 0-9、A-Z 组合长度为4的字符',
        type: 'warning'
      })
      return
    }
  }

  // A 校验输入框
  {
    testValue1.lastIndex = 0;
    if (!testValue1.test(A)) {
      ElMessage({
        message: 'A-请输入 0-9或A-Z',
        type: 'warning'
      })
      return
    }
  }

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

  const arr = getSNCode(tableData.value[0])
  console.log(arr)
  getExcel(arr)
}
</script>

<style scoped></style>
