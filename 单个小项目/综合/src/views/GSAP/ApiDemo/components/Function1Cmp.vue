<template>
  <el-card class="card-container">
    <template #header>
      <div class="card-header">
        <span>gsap.utils.toArray</span>
      </div>
    </template>
    <div class="function1-content">
      <p class="red"></p>
      <p class="green"></p>
      <p class="blue"></p>
    </div>
  </el-card>
</template>

<script setup lang="ts">
import gsap from "gsap";

// gsap.utils.checkPrefix

const tween = ref<gsap.core.Tween | null>(null);

onMounted(() => {
  const arr = gsap.utils.toArray(".function1-content p") as HTMLElement[];

  arr.forEach((item, index) => {
    gsap.to(item, {
      x: 100 + index * 50, // any properties (not limited to CSS)
      duration: 1, // seconds
      stagger: 0.1,
    });
  });
  // tween.value = gsap.to(
  //   [
  //     ".function1-content .red",
  //     ".function1-content .green",
  //     ".function1-content .blue",
  //   ],
  //   {
  //     x: 400, // any properties (not limited to CSS)
  //     duration: 1, // seconds
  //     stagger: 0.1,
  //     paused: true,
  //   },
  // );
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
