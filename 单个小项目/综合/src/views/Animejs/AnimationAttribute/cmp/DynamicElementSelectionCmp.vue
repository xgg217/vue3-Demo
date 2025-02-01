<template>
  <div class="box4">
    <h3>动态元素选择</h3>

    <p class="title" v-html="content"></p>

    <div class="but">
      <el-button type="primary" @click="onProgress">开始</el-button>
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import type { TAnimeInstance } from "@/views/Animejs/types";

const animeRow: TAnimeInstance = {
  all: null,
};

const content = ref("Have a Great Day Ahead");

const init = () => {
  animeRow.all = anime({
    targets: ".box4 .title span",
    opacity: 1,
    translateY: 100,
    delay: anime.stagger(1000),
    // autoplay: false,
  });
};

const onProgress = () => {
  animeRow.all?.restart();
};

// 重置
const onReset = () => {
  Object.values(animeRow).forEach(item => item?.seek(0));
};

onMounted(() => {
  content.value = content.value.replace(/(\w+)/g, "<span>$&</span>");
  init();
});
</script>

<style scoped>
.box4 {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 50px 0 0 50px;
  box-sizing: border-box;
  /* border: 1px solid red; */

  .title {
    text-transform: uppercase;
    font-weight: 900;
    font-size: 4rem;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 2rem;
    /* color: white; */
    /* border: 1px solid #000; */
    width: 80%;
    height: 80%;
  }
  p.title span {
    opacity: 0;
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
