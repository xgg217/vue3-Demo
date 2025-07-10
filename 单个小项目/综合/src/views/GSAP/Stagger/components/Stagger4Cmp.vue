<template>
  <el-card class="card-container">
    <template #header>
      <div class="card-header">
        <span> grid </span>
      </div>
    </template>
    <div class="stagger4-content">
      <p class="red"></p>
      <p class="green"></p>
      <p class="blue"></p>

      <p class="red"></p>
      <p class="green"></p>
      <p class="blue"></p>

      <p class="red"></p>
      <p class="green"></p>
      <p class="blue"></p>

      <p class="red"></p>
      <p class="green"></p>
      <p class="blue"></p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

onMounted(() => {
  gsap.to(".stagger4-content p", {
    x: 200,
    delay: 2,
    duration: 2,
    stagger: {
      amount: 2,
      grid: [4, 3],
      from: "center",
    },
  });
  // const tl = gsap.timeline({
  //   defaults: {
  //     x: 100,
  //     duration: 1,
  //   },
  //   stagger: {
  //     from: "end", // start end
  //   },
  // });
  // tl.to(".stagger1-content ", {})
  //   .to(".stagger1-content .green", {})
  //   .to(".stagger1-content .blue", {});
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
<style scoped>
.stagger4-content {
  width: 320px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
