<template>
  <div class="box1">
    <h3>CSS 转换</h3>
    <div class="square"></div>

    <div class="but">
      <el-button type="primary" @click="onLeft">向左移动</el-button>
      <el-button type="primary" @click="onBGCOrange">变橙色</el-button>
      <el-button type="primary" @click="onRadius">变成圆角</el-button>
      <el-button type="primary" @click="onAll">向左+变色+圆角</el-button>
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import type { TAnimeInstance } from "@/views/Animejs/types";

const animeRow: TAnimeInstance = {
  left: null,
  bgcOrange: null,
  radius: null,
  all: null,
};

const row = {
  translateX: 400,
  backgroundColor: "#ffa500",
  borderRadius: "50%",
};

const init = () => {
  animeRow.left = anime({
    targets: ".box1 .square",
    translateX: row.translateX,
    autoplay: false,
  });
  animeRow.bgcOrange = anime({
    targets: ".box1 .square",
    backgroundColor: row.backgroundColor,
    autoplay: false,
  });
  animeRow.radius = anime({
    targets: ".box1 .square",
    borderRadius: row.borderRadius,
    autoplay: false,
  });
  animeRow.all = anime({
    targets: ".box1 .square",
    ...row,
    autoplay: false,
  });
};

// 向左移动
const onLeft = () => {
  animeRow.left?.restart();
};

// 变橙色
const onBGCOrange = () => {
  animeRow.bgcOrange?.restart();
};

// 变成圆角
const onRadius = () => {
  animeRow.radius?.restart();
};

// 向左+变色+圆角
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

<style scoped>
.box1 {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 50px 0 0 50px;
  box-sizing: border-box;
}
.box1 .square {
  width: 150px;
  height: 150px;
  background-color: blue;
}

.box1 .but {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
