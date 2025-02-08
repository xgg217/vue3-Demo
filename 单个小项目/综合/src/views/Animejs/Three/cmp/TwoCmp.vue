<template>
  <div class="box2">
    <h3>指定属性值</h3>
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

const init = () => {
  animeRow.one = anime({
    targets: ".box2 ul li",
    translateY: (el: HTMLLIElement, i: number) => {
      return 50 + i * 50;
    },
    autoplay: false,
  });

  animeRow.two = anime({
    targets: ".box2 ul li",
    scale: (el: HTMLLIElement, i: number) => {
      return Math.random() * 0.8 + i / 10;
    },
    autoplay: false,
  });

  animeRow.three = anime({
    targets: ".box2 ul li",
    rotate: (el: HTMLLIElement, i: number) => {
      return anime.random(-180, 180);
    },
    autoplay: false,
  });

  animeRow.four = anime({
    targets: ".box2 ul li",
    borderRadius: function (el: HTMLLIElement) {
      return 20 + (Math.random() * el.offsetWidth) / 4;
    },
    autoplay: false,
  });
  animeRow.all = anime({
    targets: ".box2 ul li",
    translateY: (el: HTMLLIElement, i: number) => {
      return 50 + i * 50;
    },
    scale: (el: HTMLLIElement, i: number) => {
      return Math.random() * 0.8 + i / 10;
    },
    rotate: (el: HTMLLIElement, i: number) => {
      return anime.random(-180, 180);
    },
    borderRadius: function (el: HTMLLIElement) {
      return 20 + (Math.random() * el.offsetWidth) / 4;
    },
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
      border: 8px solid orange;
    }
  }
}
</style>
