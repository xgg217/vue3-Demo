<script setup lang="ts">
import { ref,reactive, watch } from "vue";
import type { stateType, tableType, dataType } from './types'
import vTableSelect from './tableSelect'

const state = reactive<stateType>({
  dateRef: [], //
  selectedData: null, // 选中的数据
  selectedAredData: [] // 多选选中的数据
})
// const state:stateType = reactive({
//   dateRef: [],
//   selectedData: {},
//   selectedAredData: []
// })

const data:tableType[] = [
  {
    row: 'X',
    data: [
      { id:1, content: 1, selected: false },
      { id:2, content: 2, selected: false },
      { id:3, content: 3, selected: false },
      { id:4, content: 4, selected: false },
    ]
  },
  {
    row: 'Y',
    data: [
      { id:5, content: 5, selected: false },
      { id:6, content: 6, selected: false },
      { id:7, content: 7, selected: false },
      { id:8, content: 8, selected: false },
    ]
  },
  {
    row: 'Z',
    data: [
      { id:9, content: 9,  selected: false },
      { id:10, content: 10, selected: false },
      { id:11, content: 11,  selected: false },
      { id:12, content: 12, selected: false  },
    ]
  }
]

// const dateRef = ref<tableType[]>(data)
// const selectedData = ref<dataType>() // 选中的数据
// const selectedAredData = ref<dataType[]>([]) // 多选选中的数据



state.dateRef = data

// 监听单击选中事件
watch(() => state.selectedData, (val) => {
  console.log(val)
})

// 监听 多选 选中事件
watch(() => state.selectedAredData, (val) => {
  console.log(val)
})
</script>

<template>
  <div>表格操作</div>

  <table border="1" v-table-select="state">
    <tr v-for="(item, rowIndex) of state.dateRef" :key="rowIndex">
      <th>{{ item.row }}</th>
      <td
        v-for="(key, columnIndex) of item.data"
        :key="columnIndex"
        :class="{ selected: key.selected }"
        :data-row="rowIndex"
        :data-column="columnIndex"
      >{{ key.content }}</td>
    </tr>
  </table>
</template>

<style scoped>
table {
  width: 800px;
  border-collapse: collapse;
  table-layout: fixed;
  text-align: center;
}

td {
  position: relative;
  top: 0;
  left: 0;
  /* border: 1px solid #000; */
  width: 150px;
  height: 50px;
  cursor: pointer;
  box-sizing: border-box;
}

td.selected {
  background-color: orange;
}
</style>