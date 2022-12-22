<script setup lang="ts">
import { ref } from 'vue';

import ListCmp from './ListCmp.vue';


const leftList = ref([]) // 左侧列表所有数据
const leftSelectedList = ref([]) // 左侧列表选中数据
const rightList = ref([]) // 右侧列表所有数据
const rightSelectedList = ref([]) // 右侧列表选中数据
</script>

<template>
  <div>
    <ListCmp></ListCmp>
  </div>
</template>

<style lang="scss" scoped>
</style>