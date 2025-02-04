<template>
  <div class="box2">
    <h3>同时改变多个属性 属性</h3>
    <!-- <div class="square"></div> -->
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <div class="but">
      <el-button type="primary" @click="onStart">开始</el-button>
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import type { TAnimeInstance } from "@/views/Animejs/types";

const animeRow: TAnimeInstance = {
  start: null,
};

const init = () => {
  animeRow.start = anime({
    targets: ".box2 ul li",
    translateY: {
      value: 250,
    },
    rotate: {
      value: "2.125turn",
    },
    backgroundColor: {
      value: "rgb(255,0,0)",
      duration: 400,
      delay: 1500,
      easing: "linear",
    },
    autoplay: false,
    duration: 1500,
  });
};

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
      margin-right: 50px;
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
