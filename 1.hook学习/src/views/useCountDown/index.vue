<script setup lang="ts">
import { useCountDown } from '@vant/use';
import useCountDowns from './useCountDown';

const TIME = 23 *60 * 60 * 1000

// vant 提供的倒计时
const { current } = (() => {
   const countDown = useCountDown({
      // 倒计时 24 小时
      time: TIME,
    });

    // 开始倒计时
    countDown.start();

  return {
    current: countDown.current,
  }
})();

//  自定义倒计时
const {
  newCurrent
} = (() => {
  const countDown = useCountDowns({
    // 倒计时 24 小时
    time: TIME,
  });

  countDown.start();

  return {
    newCurrent: countDown.current
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
  </div>

  <div class="box">
    <p>自定义 提供</p>
    <span>总时间：{{ newCurrent.total }}</span>
    <span>剩余天数：{{ newCurrent.days }}</span>
    <span>剩余小时：{{ newCurrent.hours }}</span>
    <span>剩余分钟：{{ newCurrent.minutes }}</span>
    <span>剩余秒数：{{ newCurrent.seconds }}</span>
    <span>剩余毫秒：{{ newCurrent.milliseconds }}</span>
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