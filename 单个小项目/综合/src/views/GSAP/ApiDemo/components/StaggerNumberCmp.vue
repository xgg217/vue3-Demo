<template>
  <el-card class="card-container">
    <template #header>
      <div class="card-header">
        <span>Stagger Number</span>
      </div>
    </template>
    <div class="card-content">
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
    [".card-content .red", ".card-content .green", ".card-content .blue"],
    {
      x: 400, // any properties (not limited to CSS)
      duration: 1, // seconds
      stagger: 0.1,
      repeat: -1, // 同时针对整体
      yoyo: true, // 同时针对整体
    },
  );
});
</script>

<style src="@/views/GSAP/style.css" scoped></style>
<style scoped>
.red,
.green,
.blue {
  /* position: absolute;
  top: 0;
  left: 0; */
  width: 100px;
  height: 100px;
}

.red {
  background-color: red;
}

.green {
  background-color: green;
}

.blue {
  background-color: blue;
}
</style>
