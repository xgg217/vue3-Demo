<script setup lang="ts">
import { ref, watch, computed } from 'vue';

import ListCmp from './ListCmp.vue';
import type { IItem } from './../types'
const emit = defineEmits<{
  (event: 'change', args: IItem[]): void
}>()

const props = defineProps<{
  data: IItem[]
}>()


const leftList = ref<IItem[]>([]) // 左侧列表所有数据
const rightList = ref<IItem[]>([]) // 右侧列表所有数据

watch(() => props.data, (val) => {
  leftList.value = val.map((item) => {
    return {
      ...item,
      checked: false
    }
  })
}, { immediate: true })

// 左侧是否选中
const isLeft = computed(() => {
  return leftList.value.filter(item => item.checked).length === 0
})

// 右侧是否选中
const isRight = computed(() => {
  return rightList.value.filter(item => item.checked).length === 0
})

// 向右 添加
const hanldeAddRight = () => {
  const arr = leftList.value.filter(item => item.checked)
  rightList.value = [...rightList.value, ...arr].map(item => {
    return {
      ...item,
      checked: false
    }
  })
  leftList.value = leftList.value.filter(item => !item.checked)

  emit('change', rightList.value)
}

// 向左 添加
const hanldeAddLeft = () => {
  const arr = rightList.value.filter(item => item.checked)
  leftList.value = [...leftList.value, ...arr].map(item => {
    return {
      ...item,
      checked: false
    }
  })
  rightList.value = rightList.value.filter(item => !item.checked)

  emit('change', rightList.value)
}

</script>

<template>
  <div class="warpp">
    <!-- 左侧 -->
    <ListCmp :data="leftList"></ListCmp>

    <!-- 按钮 -->
    <div class="but">
      <button type="button" :disabled="isRight" @click="hanldeAddLeft">向左</button>
      <button type="button" :disabled="isLeft" @click="hanldeAddRight">向右</button>
    </div>

    <!-- 右侧 -->
    <ListCmp :data="rightList"></ListCmp>

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