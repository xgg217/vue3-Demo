<script setup lang="ts">
import { ref } from "vue";
import { Picker } from "vant";

// 自定义事件
const emit = defineEmits<{
  (e: "change", dateNum: number): void;
}>();

const show = ref(false);

// 获取年份列表
const columns = (() => {
  const arr = [];
  const year = new Date().getFullYear();
  const statrYear = 2010;
  let i = 0;
  while (statrYear + i <= year) {
    arr.push(statrYear + i);
    i++;
  }
  return arr;
})();

// 确定按钮点击事件
const onConfirm = (value: number) => {
  console.log(`当前值: ${value}`);
  show.value = false;
  emit("change", value);
};

const onCancel = () => {
  console.log("取消");
  show.value = false;
};
</script>

<template>
  <div class="search">
    <p @click="show = true"></p>
  </div>

  <van-action-sheet v-model:show="show">
    <div class="content">
      <van-picker
        title="标题"
        :columns="columns"
        @confirm="onConfirm"
        @cancel="onCancel"
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
