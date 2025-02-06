<template>
  <div class="box3">
    <h3>对象</h3>

    <h2 class="scan-headline">
      Files Scanned: <span class="scan-count">{{ endObj.filesScanned }}</span>
    </h2>
    <h2 class="infected-headline">
      Infected Files:
      <span class="infected-count">{{ endObj.infectedFiles }}</span>
    </h2>

    <div class="but">
      <el-button type="primary" @click="onStart">开始</el-button>
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";

const endObj = reactive({
  filesScanned: 0,
  infectedFiles: 0,
});

const startObj = { filesScanned: 0, infectedFiles: 0 };
const animeRow = ref<anime.AnimeInstance | null>(null);

const init = () => {
  animeRow.value = anime({
    targets: startObj,
    filesScanned: 1000,
    infectedFiles: 8,
    autoplay: false,
    round: 1,
    easing: "linear",
    duration: 1500,
    update: function () {
      Object.assign(endObj, { ...startObj });
    },
  });
};

// 蓝色下落
const onStart = () => {
  animeRow.value?.restart();
};

// 重置
const onReset = () => {
  animeRow.value?.seek(0);
};

onMounted(() => {
  init();
});
</script>

<style scoped src="@/views/Animejs/style.css"></style>
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
