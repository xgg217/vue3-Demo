<template>
  <el-table :data="tableData" style="width: 100%" border>
    <el-table-column prop="types" label="格式" />
    <el-table-column prop="AAAA" label="AAAA" />
    <el-table-column prop="A" label="A" />
    <el-table-column prop="Y" label="Y" />
    <el-table-column prop="WW" label="WW" />
    <el-table-column prop="L" label="L" />
    <el-table-column prop="SSS" label="SSS" width="300" />
    <el-table-column prop="XX" label="XX" />
  </el-table>
</template>

<script setup lang="ts">
import type { IItem } from './../types'

const tableData: IItem[] = [
  {
    types: '表示的函数',
    AAAA: '4位SKU固定码从"A000"o"ZZZZ"详见料号对照表SKUIndicator栏',
    A: '1位Supplier site固定码;料号对照表位如2023年用3Supplier site栏',
    Y: '表示年份的最后位如2023年用3表示',
    WW: '表示雨位自然周别，如45表示45周',
    L: '1位工单批号,36进制,同一周内从"0"to"9"，"A"to"Z"',
    SSS: '3位Counter流水码36进制，每个单位递增一个计数，以"001"to"ZZZ"',
    XX: '2位heck digit校验码由系统自动产生，有 "0"to"9"，"A"to"Z" 组成',
    num: 1
  },
  {
    types: '示例',
    AAAA: 'A7RZ',
    A: 'J',
    Y: '3',
    WW: '45',
    L: '0',
    SSS: '001',
    XX: 'ES',
    num: 1
  }
]
</script>

<style scoped></style>
