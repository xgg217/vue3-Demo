<template>
  <el-card class="card-container">
    <template #header>
      <div class="card-header">
        <span> < 跟着上一个动画的起始位置开始 </span>
      </div>
    </template>
    <div class="PositionParameter1-content">
      <p class="red"></p>
      <p class="green"></p>
      <p class="blue"></p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

onMounted(() => {
  const tl = gsap.timeline({
    defaults: {
      x: 100,
      duration: 1,
    },
  });
  tl.to(".PositionParameter1-content .red", {}, 1)
    .to(".PositionParameter1-content .green", {}, "<")
    .to(".PositionParameter1-content .blue", {}, "<");
  // gsap.to(
  //   [
  //     ".timeline-content2 .red",
  //     ".timeline-content2 .green",
  //     ".timeline-content2 .blue",
  //   ],
  //   {
  //     x: 400, // any properties (not limited to CSS)
  //     duration: 1, // seconds
  //     stagger: {
  //       each: 0.1, // 类似于 stagger: 0.1
  //       repeat: -1, // 同时针对整体
  //       yoyo: true, // 同时针对整体
  //     },
  //   },
  // );
});
</script>

<style src="@/views/GSAP/style.css" scoped></style>
<style scoped></style>
