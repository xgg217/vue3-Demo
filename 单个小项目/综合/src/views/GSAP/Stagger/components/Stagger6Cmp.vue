<template>
  <el-card class="card-container">
    <template #header>
      <div class="card-header">
        <span> stagger axis y </span>
      </div>
    </template>
    <div class="stagger6-content">
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
  gsap.to(".stagger6-content p", {
    x: 200,
    delay: 2,
    duration: 1.2,
    stagger: {
      amount: 1,
      grid: [4, 3],
      from: "center",
      axis: "y",
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
.stagger6-content {
  width: 320px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
