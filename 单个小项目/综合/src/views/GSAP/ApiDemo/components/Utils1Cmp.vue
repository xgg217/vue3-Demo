<template>
  <el-card class="card-container">
    <template #header>
      <div class="card-header">
        <span>开始 暂停方法</span>
        <el-button type="primary" @click="onPlay">开始</el-button>
        <el-button type="primary" @click="onPause">暂停</el-button>
        <el-button type="primary" @click="onResume">继续播放</el-button>
        <el-button type="primary" @click="onReverse">反向播放</el-button>
      </div>
    </template>
    <div class="utils1-content">
      <p class="red"></p>
      <p class="green"></p>
      <p class="blue"></p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

const tween = ref<gsap.core.Tween | null>(null);

onMounted(() => {
  tween.value = gsap.to(
    [".utils1-content .red", ".utils1-content .green", ".utils1-content .blue"],
    {
      x: 400, // any properties (not limited to CSS)
      duration: 1, // seconds
      stagger: 0.1,
      paused: true,
    },
  );
});

// 开始
const onPlay = () => {
  tween.value?.play();
};

// 暂停
const onPause = () => {
  tween.value?.pause();
};

// 继续播放
const onResume = () => {
  tween.value?.resume();
};

// 反向播放
const onReverse = () => {
  // 反向播放
  if (!tween.value!.isActive()) {
    tween.value!.reverse();
  }
};
</script>

<style src="@/views/GSAP/style.css" scoped></style>
<style scoped></style>
