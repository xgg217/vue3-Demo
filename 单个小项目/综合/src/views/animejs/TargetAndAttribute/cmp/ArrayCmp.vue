<template>
  <div class="box4">
    <h3>数组</h3>

    <ul>
      <li class="square blue"></li>
      <li class="square red"></li>
      <li class="square" id="box4special"></li>
      <li class="square blue"></li>
      <li class="square red"></li>
      <li class="square black"></li>
      <li class="square blue"></li>
      <li class="square red"></li>
      <li class="square black"></li>
    </ul>

    <div class="but">
      <el-button type="primary" @click="onNotBlack">非黑色下落</el-button>
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import type { TAnimeInstance } from "@/views/animejs/types";

const animeRow: TAnimeInstance = {
  notBlack: null,
};

const init = () => {
  animeRow.notBlack = anime({
    targets: [
      document.querySelectorAll(".box4 .blue"),
      ".box4 .red, #box4special",
    ],
    translateY: 400,
    autoplay: false,
  });
};

// 非黑色下落下落
const onNotBlack = () => {
  animeRow.notBlack?.restart();
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
.box4 {
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
}
.box4 ul {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  li {
    width: 50px;
    height: 50px;
    /* border: 1px solid #000; */
    margin-right: 10px;
  }

  .blue {
    background: blue;
  }

  .red {
    background: red;
  }

  .black {
    background: black;
  }

  #box4special {
    background: orange;
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
