<script setup lang="ts">
import { ref } from 'vue';

import ListCmp from './ListCmp.vue';
import type { IItem } from './../types'

const props = defineProps<{
  data: IItem[]
}>()


const leftList = ref([]) // 左侧列表所有数据
const leftSelectedList = ref([]) // 左侧列表选中数据
const rightList = ref([]) // 右侧列表所有数据
const rightSelectedList = ref([]) // 右侧列表选中数据
</script>

<template>
  <div class="warpp">
    <!-- 左侧 -->
    <ListCmp></ListCmp>

    <!-- 按钮 -->
    <div class="but">
      <button type="button">向左</button>
      <button type="button">向右</button>
    </div>

    <!-- 右侧 -->
    <ListCmp></ListCmp>

  </div>
</template>

<style lang="scss" scoped>
.warpp {
  display: flex;
  align-items: center;
  justify-content: center;
}

.but button {
  margin: 0 10px;
}
</style>