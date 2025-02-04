<template>
  <div class="box2">
    <h3>DOM 节点或NodeList</h3>

    <ul>
      <li class="blue"></li>
      <li class="red"></li>
      <li class="orange"></li>
      <li class="blue"></li>
      <li class="red"></li>
      <li class="black"></li>
      <li class="blue"></li>
      <li class="red"></li>
      <li class="black"></li>
    </ul>

    <div class="but">
      <el-button type="primary" @click="onOrange">黄色下落</el-button>
      <el-button type="primary" @click="onFirst">第一个下落</el-button>
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import type { TAnimeInstance } from "@/views/Animejs/types";

const animeRow: TAnimeInstance = {
  orange: null,
  first: null,
  // redBlue: null,
  // even: null,
  // notRed: null,
};

const init = () => {
  animeRow.orange = anime({
    targets: document.querySelectorAll(".box2 li.orange"),
    translateY: 400,
    autoplay: false,
  });

  animeRow.first = anime({
    targets: document.querySelectorAll(".box2 li")[0],
    translateY: 400,
    autoplay: false,
  });
};

// 黄色下落
const onOrange = () => {
  animeRow.orange?.restart();
};

// 第一个下落
const onFirst = () => {
  animeRow.first?.restart();
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
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
}
.box2 ul {
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

  li.blue {
    background: blue;
  }

  li.red {
    background: red;
  }

  li.orange {
    background: orange;
  }

  li.black {
    background: black;
  }
}

.box2 .but {
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
