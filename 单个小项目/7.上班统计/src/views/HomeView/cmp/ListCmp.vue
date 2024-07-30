<script setup lang="ts">
import { ref, computed, shallowRef, watch } from 'vue'
import dayjs from 'dayjs'
import { getDateLen } from './../utils'
import type { IItem } from './../types'

const tem: IItem = {
  day: 0,
  xwS: '', // 下午
  xwE: '', // 下午
  wsS: '', // 晚上
  wsE: '', // 晚上
  swS: '', // 上午
  swE: '' // 上午
}

const tableData = ref<IItem[]>([])

const props = defineProps<{
  // list: IItem[]
  day: string
}>()

watch(
  () => props.day,
  (val) => {
    if (val === '') {
      tableData.value = []
    }

    // console.log(Date.now())
    // const day = dayjs(val).daysInMonth()
    // // const day = 10
    // console.log(day)

    // const arr: IItem[] = []
    // let index = 0
    // while (arr.length < day) {
    //   index = index + 1
    //   // const obj = JSON.parse(JSON.stringify(tem))
    //   arr.push({ ...tem, day: index })
    // }
    // console.log(Date.now())

    tableData.value = [
      {
        ...tem,
        day: 1
      }
    ]
  }
)

const add = () => {
  tableData.value.push({
    ...tem,
    day: 1
  })
}
</script>

<template>
  <div>
    <el-button type="primary" @click="add">新增一行</el-button>
    <el-table :data="tableData" border stripe>
      <el-table-column prop="day" label="日" width="120" sortable>
        <template #default="{ row }">
          <el-select v-model="row.day" style="width: 80px">
            <el-option v-for="item in 31" :key="item" :label="item" :value="item" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="下午" label="下午" width="300">
        <template #default="{ row }">
          <el-time-select
            v-model="row.xwS"
            style="width: 120px"
            max-time="16:30"
            placeholder="开始"
            start="11:00"
            step="00:15"
            end="16:00"
          />
          <el-time-select
            v-model="row.xwE"
            style="width: 120px"
            max-time="16:30"
            placeholder="结束"
            start="11:00"
            step="00:15"
            end="16:00"
          />
        </template>
      </el-table-column>
      <el-table-column prop="晚上" label="晚上" width="300">
        <template #default="{ row }">
          <el-time-select
            v-model="row.wsS"
            style="width: 120px"
            max-time="24:30"
            placeholder="开始"
            start="16:00"
            step="00:15"
            end="24:00"
          />
          <el-time-select
            v-model="row.wsE"
            style="width: 120px"
            max-time="24:30"
            placeholder="开始"
            start="16:00"
            step="00:15"
            end="24:00"
          />
        </template>
      </el-table-column>
      <el-table-column prop="上午" label="上午" width="300">
        <template #default="{ row }">
          <el-time-select
            v-model="row.swS"
            style="width: 120px"
            max-time="11:30"
            placeholder="开始"
            start="00:00"
            step="00:15"
            end="11:00"
          />
          <el-time-select
            v-model="row.swE"
            style="width: 120px"
            max-time="11:30"
            placeholder="结束"
            start="00:00"
            step="00:15"
            end="11:00"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column label="时长" width="400">
        <template #default="{ row }">
          <span>{{ getDateLen(row.xw, row.ws, row.sw) }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="上午" label="统计" width="400"> </el-table-column>
    </el-table>
  </div>
</template>

<style scoped></style>
