<template>
  <div class="box3">
    <h3>对象</h3>

    <h2 class="scan-headline">
      Files Scanned: <span class="scan-count">0</span>
    </h2>
    <h2 class="infected-headline">
      Infected Files: <span class="infected-count">0</span>
    </h2>

    <div class="but"></div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import type { TAnimeInstance } from "@/views/animejs/types";

const obj = {
  filesScanned: 1000,
  infectedFiles: 8,
};

const row = reactive({
  filesScanned: 0,
  infectedFiles: 0,
});

const animeRow: TAnimeInstance = {
  filesScanned: null,
  infectedFiles: null,
};

const init = () => {
  animeRow.filesScanned = anime({
    targets: ".box3 .scan-count",
    translateY: 400,
    autoplay: false,
  });

  animeRow.infectedFiles = anime({
    targets: ".box3 .infected-count",
    translateY: 400,
    autoplay: false,
  });
};

// 蓝色下落
const onBlue = () => {
  animeRow.blue?.restart();
};

// 蓝色红色下落
const onBlueRed = () => {
  animeRow.blueRed?.restart();
};

// 偶数行下落
const onEven = () => {
  animeRow.even?.restart();
};

// 非红色
const onNotRed = () => {
  animeRow.notRed?.restart();
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
.box3 {
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;

  .scan-headline {
    color: cornflowerblue;
  }

  .infected-headline {
    color: red;
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
