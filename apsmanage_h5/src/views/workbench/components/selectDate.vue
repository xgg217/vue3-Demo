<template>
  <div>
    <el-radio-group class="selectDateWrap" v-model="checked" size="large" @change="changeSelect">
      <el-radio @click="radioClick($event, index)" class="dateRadio flex-align-center" v-for="(item, index) in typeList" :label="index" :key="item" :class="{'flexCenter': index === 1, 'flexEnd': index === 2}">{{ item }}</el-radio>
      <div class="chooseDateWrap flex" v-if="checked === 3">
        <!-- 开始时间 -->
        <div class="calendarButtonWrap flex-align-center" @click="openCalendar(0)">
          <span>{{ selectDate.startTime }}</span>
        </div>
        <div class="flex-align-center lineWrap">
          <span></span>
        </div>
        <!-- 结束时间 -->
        <div class="calendarButtonWrap flex-align-center" @click="openCalendar(1)">
          <span>{{ selectDate.endTime }}</span>
        </div>
      </div>
    </el-radio-group>
    <!-- <van-popup
      v-model:show="show"
      round
      position="bottom"
      :overlay-style="{'backgroundColor': '#2283d48'}"
      :style="{ height: 'auto' }"
    >
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :title="selectType ? '结束时间' : '开始时间'"
        :min-date="minDate"
        :max-date="maxDate"
        visible-item-count="8"
        @confirm="onConfirm"
        @cancel="show = false"
      />
    </van-popup> -->
    <van-calendar :minDate="minDate" :maxDate="maxDate" key="filtterCalendar" class="calendarWrap" color="#1572F9" v-model:show="show" type="range" @confirm="onConfirm" :poppable="true" teleport="body" />
  </div>
</template>

<script setup>
import { getYMD, getWeek, getMonth } from "@/utils/timeFormat"
const Emit = defineEmits(["update:selectTime"])
const Props = defineProps({
  selectTime: {
    type: Object
  }
})
/* 时间类型列表 */
const typeList = ["今日", "本周", "当月", "自定义"]
const checked = ref(null)
/* 日期 */
const show = ref(false)
const selectDate = reactive({
  startTime: '',
  endTime: '',
})
/* 自定义选中日期 */
// const currentDate = ref(new Date())
const minDate = new Date("2020/01/01")
const maxDate = new Date()
// const selectType = ref(0) // 0 开始 1 结束
const onConfirm = (values) => {
  const [start, end] = values
  selectDate.startTime = getYMD(start, '-')
  selectDate.endTime = getYMD(end, '-')
  castDate()
  show.value = false
}
const openCalendar = (type) => {
  // selectType.value = type
  show.value = true
}

/* 抛出时间 */
const castDate = () => {
  const date = {
    startTime: selectDate.startTime + " 00:00:00",
    endTime: selectDate.endTime + " 23:59:59",
  }
  Emit("update:selectTime", date)
}

/* 单选时间 */
const changeSelect = (value) => {
  /* 今天 */
  if (value === 0) {
    selectDate.startTime = getYMD(new Date())
    selectDate.endTime = getYMD(new Date())
    castDate()
    return
  }
  /* 本周 */
  if (value === 1) {
    const date = getWeek(new Date())
    selectDate.startTime = date.start
    selectDate.endTime = date.end
    castDate()
    return
  }
  /* 本月 */
  if (value === 2) {
    const date = getMonth(new Date())
    selectDate.startTime = date.start
    selectDate.endTime = date.end
    castDate()
  }
}
// changeSelect(0)e

/* rdioa点击 */
const radioClick = (e, index) => {
  if (e.pointerId < 0) {
    return
  }
  if (checked.value === index) {
    checked.value = null
    e.stopPropagation()
    e.preventDefault()
    const date = {
      startTime: '',
      endTime: ''
    }
    Emit("update:selectTime", date)
  }
}

watch(() => Props.selectTime, (newVal) => {
  if (newVal === null) {
    changeSelect(null)
    checked.value = null
    const date = {
      startTime: '',
      endTime: ''
    }
    Emit("update:selectTime", date)
  }
})
</script>

<style lang="scss" scoped>
  :deep(.van-picker__confirm){
    color: #1572f9;
  }
.selectDateWrap{
  justify-content: space-between;
  width: 100%;
  .dateRadio{
    width: 26%;
    margin: 5px 0 0px 0;
    height: 32px;
  }
  :deep(.el-radio.el-radio--large .el-radio__inner) {
    width: 18px;
    height: 18px;
  }
  :deep(.el-radio__input.is-checked .el-radio__inner){
    background-color: white;
  }
  :deep(.el-radio__inner::after){
    width: 10px;
    height: 10px;
    border-radius: 6px;
    background-color: #1572f9;
  }
  .chooseDateWrap{
    width: 70%;
    height: 32px;
    .calendarButtonWrap{
      width: 47%;
      height: 100%;
      border: 1px solid #F5F5F5;
      box-sizing: border-box;
      border-radius: 16px;
      position: relative;
      &>span{
        font-size: 12px;
        text-indent: 7px;
      }
      &::after{
        content: "";
        display: block;
        position: absolute;
        height: 20px;
        width: 20px;
        background: url(../../../assets/commonProcess/calendar.png);
        background-size: contain;
        right: 5px;
        top: 5px;
      }
    }
    .lineWrap{
      width: 6%;
      height: 100%;
      padding: 0 3px;
      box-sizing: border-box;
      span{
        height: 1px;
        width: 100%;
        background-color: #F5F5F5;
      }
    }
  }
}
</style>
