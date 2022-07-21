<script setup lang="ts">
import { ActionSheet, DatetimePicker } from "vant";
// import type { DatetimePickerInstance } from 'vant';
import { ref } from "vue";

const show = ref(true);
const currentDate = ref(new Date(2021, 0, 17));
// const currentTime = ref(["12", "00"]);

// 确定选择日期
const handleConfirm = (value: Date) => {
  console.log(value);
};

// 格式化
const formatter = (type: string, val: string) => {
  // console.log(type);
  // console.log(typeof val);
  if (type === "year") {
    return `${val}年`;
  }
  if (type === "month") {
    return `${Number(val)}月`;
  }

  if (type === "day") {
    return `${Number(val)}日`;
  }
  return val;
};
</script>

<template>
  <div class="search">
    <p></p>
  </div>

  <van-action-sheet v-model:show="show">
    <div class="content">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :formatter="formatter"
        title="选择年月日"
        @confirm="handleConfirm"
      />
    </div>
  </van-action-sheet>
</template>

<style scoped>
.search {
  width: 100vw;
  height: 40px;
  border: 1px solid red;
  padding: 5px 10px;
}

.search p {
  border: 1px solid #666;
  border-radius: 5px;
  height: 100%;
}

.content {
  height: 40vh;
  border: 1px solid red;
}
</style>
