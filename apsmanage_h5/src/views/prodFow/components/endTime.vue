<template>
  <div class="time ui-cell">
    <img src="@/assets/images/time.png" alt="">
    <span>截止时间： {{time || getYMDHM(new Date())}}</span>
  </div>
</template>

<script setup>
import {getYMDHM} from "@/utils/timeFormat";
const props = defineProps({
  time: String
})

</script>

<style scoped lang="scss">
.time {
  width: 100%;
  height: 44px;
  background: #FFF8EF;
  padding: 0 22px;
  font-size: 14px;
  color: #FA9821;
  box-sizing: border-box;

  img {
    height: 24px;
    margin-right: 8px;
  }
}
</style>
