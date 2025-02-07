<template>
  <div class="box4">
    <h3>stagger 属性</h3>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <div class="but">
      <el-button type="primary" @click="onOne">延迟200</el-button>
      <el-button type="primary" @click="onTwo">从右到左延迟200</el-button>
      <el-button type="primary" @click="onThree"
        >第一个运动时间800ms，后续叠加</el-button
      >
      <el-button type="primary" @click="onFour"
        >从右到左第一个运动时间800ms，后续叠加</el-button
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
};

const init = () => {
  animeRow.one = anime({
    targets: ".box4 ul li",
    translateY: 250,
    autoplay: false,
    delay: anime.stagger(200),
  });

  animeRow.two = anime({
    targets: ".box4 ul li",
    translateY: 250,
    autoplay: false,
    delay: anime.stagger(200, { direction: "reverse" }),
  });

  animeRow.three = anime({
    targets: ".box4 ul li",
    translateY: 250,
    autoplay: false,
    duration: anime.stagger(1000, { start: 800 }),
  });

  animeRow.four = anime({
    targets: ".box4 ul li",
    translateY: 250,
    autoplay: false,
    duration: anime.stagger(1000, { start: 800, direction: "reverse" }),
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
.box4 {
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
