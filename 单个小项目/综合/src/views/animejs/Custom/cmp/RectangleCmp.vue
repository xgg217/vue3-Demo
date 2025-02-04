<template>
  <div class="box3">
    <h3>沿着矩形轨迹运动</h3>
    <div class="box">
      <div
        class="sphere3"
        :style="{ transform: `translateX(${row.x}px) translateY(${row.y}px)` }"
      ></div>
    </div>

    <div class="but">
      <el-button type="primary" @click="onStart">开始</el-button>
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import type { TAnimeInstance } from "@/views/animejs/types";

const animeRow: TAnimeInstance = {
  start: null,
};

const row = reactive({
  x: 0,
  y: 0,
  // angle: [0, ]
});

const init = () => {
  animeRow.start = anime
    .timeline({
      targets: row,
      autoplay: false,
      easing: "linear",
      delay: 0,
      duration: 1000,
      round: 1,
      // direction: "alternate",
      loop: true,
      // update: function () {
      //   console.log(row);

      //   x.value = row.x;
      //   y.value = row.y;
      // },
    })
    .add({
      x: 0,
      y: 0,
    })
    .add({
      x: 100,
      y: 0,
    })
    .add({
      x: 100,
      y: 100,
    })
    .add({
      x: 0,
      y: 100,
    })
    .add({
      x: 0,
      y: 0,
    });

  // animeRow.start.update = function (anim) {
  //   console.log(anim);

  //   // update.value++;
  //   // progress.value = Math.round(anim.progress)
  // };
};

// 开始
const onStart = () => {
  animeRow.start?.restart();
};

// 重置
const onReset = () => {
  Object.values(animeRow).forEach(item => item?.seek(0));
};

onMounted(() => {
  init();
});
</script>

<style scoped>
.box3 {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 50px 0 0 50px;
  box-sizing: border-box;
  border: 1px solid red;

  .box {
    width: 300px;
    height: 300px;
    border: 1px solid #000;
    position: relative;
    top: 0;
    left: 0;
    margin: 100px auto 0 auto;
    /* border-radius: 50%; */

    .sphere3 {
      position: absolute;
      width: 100px;
      height: 100px;
      background-color: red;
      border-radius: 50%;
      top: 50px;
      left: 50px;
      transform: translate(-50%, -50%);
    }
  }

  .but {
    position: absolute;
    bottom: 50px;
    left: 50%;
    transform: translateX(-50%);
    width: 100%;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
}
</style>
