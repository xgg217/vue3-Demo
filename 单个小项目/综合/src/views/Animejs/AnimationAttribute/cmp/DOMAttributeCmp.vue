<template>
  <div class="box3">
    <h3>DOM 属性</h3>
    <p>
      进度条
      <progress value="0" max="100"></progress>
    </p>

    <div class="but">
      <el-button type="primary" @click="onProgress">进度条</el-button>
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import type { TAnimeInstance } from "@/views/Animejs/types";

const animeRow: TAnimeInstance = {
  all: null,
};

const val = ref(0);

const init = () => {
  animeRow.all = anime({
    targets: ".box3 progress",
    value: 100,
    easing: "linear",
    autoplay: false,
  });
};

const onProgress = () => {
  animeRow.all?.restart();
};

// 重置
const onReset = () => {
  Object.values(animeRow).forEach(item => item?.seek(0));
};

onMounted(() => {
  init();
});
</script>

<style scoped></style>
