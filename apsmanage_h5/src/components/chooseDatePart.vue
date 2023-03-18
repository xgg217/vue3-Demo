<template>
  <div class="chooseDatePart flex" @click="openCalendar">
    <div :style="{color: timePart.start === '开始时间' ? '#8994A9' : '#4A4A4A'}">{{ timePart.start }}</div>
    <span class="ml-10 mr-10"> - </span>
    <div :style="{color: timePart.end === '结束时间' ? '#8994A9' : '#4A4A4A'}">{{ timePart.end }}</div>
  </div>
  <van-calendar key="filtterCalendar" class="calendarWrap" color="#1572F9" v-model:show="show" type="range" @confirm="onConfirm" :poppable="true" teleport="body" />
</template>

<script setup>
import { getYMD } from "@/utils/timeFormat"

const Emit = defineEmits(["getPartTimes"])

const show = ref(false)
const timePart = reactive({
  start: "开始时间",
  end: "结束时间"
})
/* 展开日历 */
const openCalendar = () => {
  show.value = true
}

/* 确定选择 */
const onConfirm = (values) => {
  const [start, end] = values
  timePart.start = getYMD(start)
  timePart.end = getYMD(end)
  Emit("getPartTimes", timePart)
  show.value = false
}
</script>

<style lang="scss" scoped>
.chooseDatePart{
  height: 36px;
  background-color: white;
  line-height: 36px;
  color: $b-gray;
  &>div{
    flex: 1;
    font-size: 14px;
    height: 100%;
    background-color: #F7F8FA;
    border-radius: 2px;
    text-align: center;
    // color: $d-gray;
  }
}
</style>