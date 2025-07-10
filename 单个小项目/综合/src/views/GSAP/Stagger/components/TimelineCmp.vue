<template>
  <el-card class="card-container">
    <template #header>
      <div class="card-header">
        <span>时间线</span>
      </div>
    </template>
    <div class="timeline-content2">
      <p class="red"></p>
      <p class="green"></p>
      <p class="blue"></p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

onMounted(() => {
  const tl = gsap.timeline();
  tl.to(".timeline-content2 .red", {
    x: 100,
    duration: 2,
  });
  tl.to(".timeline-content2 .green", {
    x: 50,
    duration: 2,
  }).to(".timeline-content2 .blue", {
    x: 200,
    duration: 2,
  });
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
