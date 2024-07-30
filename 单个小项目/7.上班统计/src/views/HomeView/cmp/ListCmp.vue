<script setup lang="ts">
import { ElMessage } from 'element-plus'
import { ref, shallowRef, watch } from 'vue'
import dayjs from 'dayjs'
import { getDateLen,getTitle } from './../utils'
import type { IItem } from './../types'
import RowCmp from "./RowCmp.vue"
import Big from 'big.js'

const props = defineProps<{
  // list: IItem[]
  day: string
}>()

const sumVal = ref(0);

const tem: IItem = {
  day: 0,
  xwS: '', // 下午
  xwE: '', // 下午
  wsS: '', // 晚上
  wsE: '', // 晚上
  // swS: '', // 上午
  // swE: '', // 上午
  tj: 0
}

const tableData = shallowRef<IItem[]>([])



watch(
  () => props.day,
  (val) => {
    if (val === '') {
      tableData.value = []
    }

    // console.log(Date.now())
    const day = dayjs(val).daysInMonth()
    // // const day = 10
    // console.log(day)

    const arr: IItem[] = []
    let index = 0
    while (arr.length < day) {
      index = index + 1
      arr.push({ ...tem, day: index })
    }

    tableData.value = arr
  }
)

// 统计
const onTongji = () => {
  let sum = Big(0);
  const arr = tableData.value.map(item => {
    const {xwS,xwE,wsS,wsE} = item;
    const tj = getDateLen([xwS,xwE], [wsS,wsE]);

    sum = sum.plus(Big(tj));
    return {
      ...item,
      tj
    }
  });

  sumVal.value = sum.toNumber();

  tableData.value = arr;

  ElMessage({
    message: '统计完成',
    type: 'success',
  })
}


</script>

<template>
  <div >
    <el-button type="primary" @click="onTongji">统计</el-button>
    <div class="box">
    <el-table :data="tableData" border stripe>
      <el-table-column prop="day" label="日" width="120">
        <!-- <template #default="{ row }">
          <el-select v-model="row.day" style="width: 80px">
            <el-option v-for="item in 31" :key="item" :label="item" :value="item" />
          </el-select>
        </template> -->
      </el-table-column>
      <el-table-column prop="下午" label="下午" width="300">
        <template #default="{ row }">
          <el-time-select
            v-model="row.xwS"
            style="width: 120px"
            max-time="16:30"
            placeholder="开始"
            start="11:00"
            step="00:30"
            end="16:00"
          />
          <el-time-select
            v-model="row.xwE"
            style="width: 120px"
            max-time="16:30"
            placeholder="结束"
            start="11:00"
            step="00:30"
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
            step="00:30"
            end="24:00"
          />
          <el-time-select
            v-model="row.wsE"
            style="width: 120px"
            max-time="24:30"
            placeholder="开始"
            start="16:00"
            step="00:30"
            end="24:00"
          />
        </template>
      </el-table-column>
      <!-- <el-table-column prop="上午" label="上午" width="300">
        <template #default="{ row }">
          <el-time-select
            v-model="row.swS"
            style="width: 120px"
            max-time="11:30"
            placeholder="开始"
            start="00:00"
            step="00:30"
            end="11:00"
          />
          <el-time-select
            v-model="row.swE"
            style="width: 120px"
            max-time="11:30"
            placeholder="结束"
            start="00:00"
            step="00:30"
            end="11:00"
          />
        </template>
      </el-table-column> -->
      <!-- <el-table-column label="时长" width="400">
        <template #default="{ row }">
          <span>{{ getDateLen(row.xw, row.ws, row.sw) }}</span>
        </template>
      </el-table-column> -->
      <el-table-column prop="tj" label="统计" width="100"> </el-table-column>
    </el-table>

    <div>

      <RowCmp :day="props.day" :tableData="tableData" :sumVal="sumVal" />
    </div>
  </div>
  </div>
</template>

<style scoped>
.box {
  display: flex;
}
</style>
