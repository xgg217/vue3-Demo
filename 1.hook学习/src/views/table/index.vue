<script setup lang="ts">
import { ref } from 'vue'
const data = [
  {
    row: 'X',
    data: [
      { id:1, content: 1 },
      { id:2, content: 2 },
      { id:3, content: 3 },
      { id:4, content: 4 },
    ]
  },
  {
    row: 'Y',
    data: [
      { id:5, content: 5 },
      { id:6, content: 6 },
      { id:7, content: 7 },
      { id:8, content: 8 },
    ]
  },
  {
    row: 'Z',
    data: [
      { id:9, content: 9 },
      { id:10, content: 10 },
      { id:11, content: 11 },
      { id:12, content: 12 },
    ]
  }
]
</script>

<template>
  <div>表格操作</div>

  <table border="1">
    <tr v-for="item of data">
      <td>{{ item.row }}</td>
      <td v-for="key of item.data">{{ key.content }}</td>
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
  width: 200px;
  height: 50px;
  cursor: pointer;
  box-sizing: border-box;
}

td.selected {
  background-color: orange;
}
</style>