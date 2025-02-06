<template>
  <div class="box3">
    <h3>动画参数： loop循环次数+动画方向+溜溜球效果</h3>

    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <div class="but">
      <el-button type="primary" @click="onOne">循环4次</el-button>
      <el-button type="primary" @click="onTwo">反方向循环4次</el-button>
      <!-- <el-button type="primary" @click="onThree">溜溜球效果</el-button> -->
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
};

const init = () => {
  animeRow.one = anime({
    targets: ".box3 ul li",
    translateY: 250,
    autoplay: false,
    loop: 4,
    easing: "easeInSine",
    delay: function (target, index) {
      return index * 200;
    },
  });

  animeRow.two = anime({
    targets: ".box3 ul li",
    translateY: 250,
    delay: function (target, index) {
      return index * 200;
    },
    loop: 4,
    easing: "easeInSine",
    direction: "reverse",
    autoplay: false,
  });

  animeRow.three = anime({
    targets: ".box3 ul li",
    translateY: 250,
    delay: function (target, index) {
      return index * 200;
    },
    loop: 4,
    easing: "easeInSine",
    direction: "alternate",
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
    }
  }
}
</style>
