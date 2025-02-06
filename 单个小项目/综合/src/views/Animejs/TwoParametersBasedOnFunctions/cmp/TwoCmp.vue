<template>
  <div class="box2">
    <h3>easing 属性</h3>
    <!-- <div class="square"></div> -->
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <div class="but">
      <el-button type="primary" @click="onOne">easeIn</el-button>
      <el-button type="primary" @click="onTwo"> easeOut</el-button>
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import type { TAnimeInstance } from "@/views/Animejs/types";

const easeInValues = [
  "easeInQuad",
  "easeInCubic",
  "easeInQuart",
  "easeInQuint",
  "easeInSine",
  "easeInExpo",
  "easeInCirc",
  "easeInBack",
  "easeInElastic",
];

const easeOutValues = [
  "easeOutQuad",
  "easeOutCubic",
  "easeOutQuart",
  "easeOutQuint",
  "easeOutSine",
  "easeOutExpo",
  "easeOutCirc",
  "easeOutBack",
  "easeOutElastic",
];

const animeRow: TAnimeInstance = {
  one: null,
  two: null,
};

const init = () => {
  animeRow.one = anime({
    targets: ".box2 ul li",
    translateY: 250,
    duration: 2000,
    //@ts-ignore
    easing: (target, index) => {
      return easeInValues[index];
    },
    autoplay: false,
  });

  animeRow.two = anime({
    targets: ".box2 ul li",
    translateY: 250,
    duration: 2000,
    //@ts-ignore
    easing: (target, index) => {
      return easeInValues[index];
    },
    autoplay: false,
  });
};

// 向左+变色+圆角
const onOne = () => {
  animeRow.one?.restart();
};

// 向左+变色+圆角
const onTwo = () => {
  animeRow.two?.restart();
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
.box2 {
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
}
</style>
