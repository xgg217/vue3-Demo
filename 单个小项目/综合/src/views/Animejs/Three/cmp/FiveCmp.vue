<template>
  <div class="box5">
    <h3>5播放选项</h3>
    <ul>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
      <li></li>
    </ul>

    <div class="but">
      <el-slider
        style="width: 80%; margin-right: 10px"
        v-model="value1"
        :step="10"
        show-stops
        @change="onSlider"
      />
      <el-button type="primary" @click="onOne">开始</el-button>
      <el-button type="primary" @click="onTwo">暂停</el-button>
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import type { TAnimeInstance } from "@/views/Animejs/types";
// import type { Arrayable } from "element-plus";

const animeRow: TAnimeInstance = {
  one: null,
};

const value1 = ref(0);

const init = () => {
  animeRow.one = anime({
    targets: ".box5 ul li",
    translateY: 250,
    borderRadius: "50%",
    duration: 4000,
    easing: "linear",
    autoplay: false,
  });
};

// 延迟升序
const onOne = () => {
  animeRow.one?.play();
};

// 延迟降序
const onTwo = () => {
  animeRow.one?.pause();
};

// 控制动画进度
const onSlider = (val: any) => {
  // console.log(val);
  animeRow.one?.seek(((val as number) / 100) * animeRow.one?.duration);
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
.box5 {
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
