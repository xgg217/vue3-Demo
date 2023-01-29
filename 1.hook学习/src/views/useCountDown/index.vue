<script setup lang="ts">
import { useCountDown } from '@vant/use';
import useCountDowns from './useCountDown';

const TIME = 23 *60 * 60 * 1000

// vant 提供的倒计时
const {
  current,
  handleCStop,
  handleCReset,
} = (() => {
  const countDown = useCountDown({
    // 倒计时 24 小时
    time: TIME,
  });

  // 开始倒计时
  countDown.start();

  // 暂停计时
  const handleCStop = () => {
    countDown.pause()
  }

  // 重置计时
  const handleCReset = () => {
    countDown.reset()
  }

  return {
    current: countDown.current,
    handleCStop,
    handleCReset
  }
})();

//  自定义倒计时
const {
  newCurrent,
  handleReset,
  handleStop,
} = (() => {
  const newCurrent = useCountDowns({
    // 倒计时 24 小时
    time: TIME,
  });

  newCurrent.start();

   // 暂停计时
   const handleStop = () => {
    newCurrent.pause()
  }

  // 重置计时
  const handleReset = () => {
    newCurrent.reset()
  }

  return {
    newCurrent: newCurrent.current,
    handleReset,
    handleStop,

  }

})();
</script>

<template>
  <div>提供倒计时管理能力</div>
  <div class="box">
    <p>vant 提供</p>
    <span>总时间：{{ current.total }}</span>
    <span>剩余天数：{{ current.days }}</span>
    <span>剩余小时：{{ current.hours }}</span>
    <span>剩余分钟：{{ current.minutes }}</span>
    <span>剩余秒数：{{ current.seconds }}</span>
    <span>剩余毫秒：{{ current.milliseconds }}</span>
    <button @click="handleCStop">暂停</button>
    <button @click="handleCReset">重置</button>
  </div>

  <div class="box">
    <p>自定义 提供</p>
    <span>总时间：{{ newCurrent.total }}</span>
    <span>剩余天数：{{ newCurrent.days }}</span>
    <span>剩余小时：{{ newCurrent.hours }}</span>
    <span>剩余分钟：{{ newCurrent.minutes }}</span>
    <span>剩余秒数：{{ newCurrent.seconds }}</span>
    <span>剩余毫秒：{{ newCurrent.milliseconds }}</span>
    <button @click="handleStop">暂停</button>
    <button @click="handleReset">重置</button>
  </div>
</template>

<style lang="scss" scoped>
.box {
  border: 1px solid #000;
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
}
</style>