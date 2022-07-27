<script setup lang="ts">
import { ref } from "vue";
import { ActionSheet, DatetimePicker } from "vant";
import dayjs from "dayjs";

const show = ref(false);
const currentDate = ref(new Date(2021, 0, 17));

interface Props {
  type: "date" | "year-month"; // 日期类型 年月日 | 年月
}
// eslint-disable-next-line vue/no-setup-props-destructure
const { type = "date" } = defineProps<Props>();

// 确定选择日期
const handleConfirm = (value: Date) => {
  if (type === "date") {
    emit("change", dayjs(value).format("YYYY-M-D"));
  } else {
    emit("change", dayjs(value).format("YYYY-M"));
  }

  show.value = false;
};

// 基于类型
const emit = defineEmits<{
  (e: "change", dateStr: string): void;
}>();
</script>

<template>
  <div class="search">
    <p @click="show = true"></p>
  </div>

  <van-action-sheet v-model:show="show">
    <div class="content">
      <van-datetime-picker
        v-model="currentDate"
        :type="type"
        title="选择年月日"
        @confirm="handleConfirm"
      />
    </div>
  </van-action-sheet>
</template>

<style scoped>
.search {
  /* width: 100vw; */
  height: 40px;
  border: 1px solid blue;
  padding: 5px 10px;
  box-sizing: border-box;
}

.search p {
  border: 1px solid #666;
  border-radius: 5px;
  height: 100%;
}

.content {
  height: 40vh;
  /* border: 1px solid red; */
}
</style>
