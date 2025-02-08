<template>
  <div class="box3">
    <h3>关键帧</h3>
    <!-- <div class="square"></div> -->
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>
    <div class="but">
      <el-button type="primary" @click="onOne">阶梯下落</el-button>
      <el-button type="primary" @click="onTwo">有序放大缩小随机</el-button>
      <el-button type="primary" @click="onThree">随机旋转</el-button>
      <el-button type="primary" @click="onFour">变圆角</el-button>
      <el-button type="primary" @click="onAll">all</el-button>
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import type { TAnimeInstance } from "@/views/Animejs/types";

const animeRow: TAnimeInstance = {
  one: null,
  two: null,
  three: null,
  four: null,
  all: null,
};

const obj = {
  translateY: [
    { value: 100, duration: 500 },
    { value: "+=100", duration: 1000, delay: 1000 },
    { value: "+=100", duration: 1000, delay: 1000 },
    { value: 40, duration: 500, delay: 1000 },
  ],
  scale: [
    { value: 1.1, duration: 500 },
    { value: 0.5, duration: 1000, delay: 1000 },
    { value: 1, duration: 500, delay: 1000 },
  ],
  rotate: [
    { value: 60, duration: 500 },
    { value: -60, duration: 1000, delay: 1000 },
    { value: 75, duration: 500, delay: 1000 },
  ],
  borderRadius: [
    { value: 10, duration: 500 },
    { value: 50, duration: 1000, delay: 1000 },
    { value: 25, duration: 500, delay: 1000 },
  ],
} as const;

const init = () => {
  animeRow.one = anime({
    targets: ".box3 ul li",
    translateY: obj.translateY,
    autoplay: false,
  });

  animeRow.two = anime({
    targets: ".box3 ul li",
    scale: obj.scale,
    autoplay: false,
  });

  animeRow.three = anime({
    targets: ".box3 ul li",
    rotate: obj.rotate,
    autoplay: false,
  });

  animeRow.four = anime({
    targets: ".box3 ul li",
    borderRadius: obj.borderRadius,
    autoplay: false,
  });
  animeRow.all = anime({
    targets: ".box3 ul li",
    translateY: obj.translateY,
    scale: obj.scale,
    rotate: obj.rotate,
    borderRadius: obj.borderRadius,
    autoplay: false,
  });
};

// 延迟升序
const onOne = () => {
  animeRow.one?.restart();
};

// 延迟降序
const onTwo = () => {
  animeRow.two?.restart();
};

// 运动时间升序
const onThree = () => {
  animeRow.three?.restart();
};

// 运动时间降序
const onFour = () => {
  animeRow.four?.restart();
};

// 运动时间降序
const onAll = () => {
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

<style scoped src="@/views/Animejs/style.css"></style>
<style scoped>
.box3 {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 50px 0 0 50px;
  box-sizing: border-box;

  ul {
    position: absolute;
    top: 100px;
    left: 50px;
    /* border: 1px solid #000; */
    display: flex;

    li {
      width: 80px;
      height: 80px;
      background-color: black;
      margin-right: 10px;
      border: 8px solid orange;
    }
  }
}
</style>
