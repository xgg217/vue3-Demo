<template>
  <div class="box1">
    <h3>指定属性值</h3>
    <!-- <div class="square"></div> -->
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <div class="but">
      <el-button type="primary" @click="onOne">延迟升序</el-button>
      <el-button type="primary" @click="onTwo">延迟降序</el-button>
      <el-button type="primary" @click="onThree">运动时间升序</el-button>
      <el-button type="primary" @click="onFour">运动时间降序</el-button>
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

const init = () => {
  animeRow.one = anime({
    targets: ".box1 ul li",
    translateY: 250,
    autoplay: false,
    delay: function (target, index) {
      return index * 200;
    },
  });

  animeRow.two = anime({
    targets: ".box1 ul li",
    translateY: 250,
    autoplay: false,
    delay: function (target, index, targetCount) {
      return (targetCount - index) * 200;
    },
  });

  animeRow.three = anime({
    targets: ".box1 ul li",
    translateY: 250,
    autoplay: false,
    duration: function (target, index) {
      return 1000 + index * 800;
    },
  });

  animeRow.four = anime({
    targets: ".box1 ul li",
    translateY: 250,
    autoplay: false,
    duration: function (target, index, targetCount) {
      return 1000 + (targetCount - index) * 800;
    },
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
}
</style>
