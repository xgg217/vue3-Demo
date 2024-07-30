
<script setup lang="ts">
import { ref, computed } from 'vue'
import Big from 'big.js'
import type { IItem } from './../types'
import { getDateLen,getTitle } from './../utils'

const props = defineProps<{
  // list: IItem[]
  day: string,
  /** 统计 */
  sumVal:number // 统计
  tableData: IItem[]
}>()

const textarea2 = ref('')// 提示文字
// const sumVal = ref(0);

const dayStr = computed(() => {
  const {day} = props;
  if(!day) { return '' }

  const arr = day.split('-');
  return `${arr[0]}年${arr[1]}月`
})

const sum = computed(() => {
  const {sumVal} = props;
  if(!sumVal) { return 0 }

  return new Big(sumVal).times(Big(20)).toNumber();
});

// 生成文字
const getText = () => {
  const arr:string[] = getTitle(props.tableData);
  // console.log(arr);
  textarea2.value = arr.join('\n')

}
</script>

<template>
  <div>
    <el-input
      v-model="textarea2"
      style="width: 440px;"
      :rows="30"
      type="textarea"
      placeholder="Please input"
      />
      <el-button type="primary" @click="getText">生成文字</el-button>
      <p>{{ dayStr }} 共计 {{ props.sumVal }}小时 * 20元/小时 = {{ sum }}元</p>
  </div>
</template>


<style lang="scss" scoped>
</style>