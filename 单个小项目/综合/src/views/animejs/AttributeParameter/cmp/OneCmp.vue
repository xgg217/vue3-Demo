<template>
  <div class="box1">
    <h3>duration delay easing 属性</h3>
    <!-- <div class="square"></div> -->
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <div class="but">
      <el-button type="primary" @click="onOne">运动时间4000</el-button>
      <el-button type="primary" @click="onTwo">运动时间600</el-button>
      <el-button type="primary" @click="onThree">延迟800</el-button>
      <el-button type="primary" @click="onFour">easing：linear</el-button>
      <el-button type="primary" @click="onFive"
        >运动时间1200 + easing:easeInOutCubic</el-button
      >
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
  five: null,
  all: null,
};

const row = {
  translateY: 250,
  borderRadius: 50,
  autoplay: false,
};

const init = () => {
  animeRow.one = anime({
    targets: ".box1 ul li",
    ...row,
    duration: 4000,
    autoplay: false,
  });

  animeRow.two = anime({
    targets: ".box1 ul li",
    ...row,
    duration: 600,
    autoplay: false,
  });

  animeRow.three = anime({
    targets: ".box1 ul li",
    ...row,
    delay: 800,
    autoplay: false,
  });

  animeRow.four = anime({
    targets: ".box1 ul li",
    ...row,
    easing: "linear",
    autoplay: false,
  });

  animeRow.five = anime({
    targets: ".box1 ul li",
    ...row,
    duration: 1200,
    easing: "easeInOutCubic",
    autoplay: false,
  });
  // animeRow.bgcOrange = anime({
  //   targets: ".box1 .square",
  //   backgroundColor: row.backgroundColor,
  //   autoplay: false,
  // });
  // animeRow.radius = anime({
  //   targets: ".box1 .square",
  //   borderRadius: row.borderRadius,
  //   autoplay: false,
  // });
  // animeRow.all = anime({
  //   targets: ".box1 .square",
  //   ...row,
  //   autoplay: false,
  // });
};

// 向左移动
const onOne = () => {
  animeRow.one?.restart();
};

// 变橙色
const onTwo = () => {
  animeRow.two?.restart();
};

// 变成圆角
const onThree = () => {
  animeRow.three?.restart();
};

// 向左+变色+圆角
const onFour = () => {
  animeRow.four?.restart();
};

// 向左+变色+圆角
const onFive = () => {
  animeRow.five?.restart();
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
.box1 {
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
