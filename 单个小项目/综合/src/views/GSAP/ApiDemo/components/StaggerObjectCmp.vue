<template>
  <el-card class="card-container">
    <template #header>
      <div class="card-header">
        <span>Stagger Object</span>
      </div>
    </template>
    <div class="card-content2">
      <p class="red"></p>
      <p class="green"></p>
      <p class="blue"></p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import { gsap } from "gsap";

onMounted(() => {
  gsap.to(
    [".card-content2 .red", ".card-content2 .green", ".card-content2 .blue"],
    {
      x: 400, // any properties (not limited to CSS)
      duration: 1, // seconds
      stagger: {
        each: 0.1, // 类似于 stagger: 0.1
        repeat: -1, // 同时针对整体
        yoyo: true, // 同时针对整体
      },
    },
  );
});
</script>

<style src="@/views/GSAP/style.css" scoped></style>
<style scoped></style>
