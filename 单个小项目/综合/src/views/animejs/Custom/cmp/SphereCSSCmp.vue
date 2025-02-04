<template>
  <div class="box1">
    <h3>纯CSS</h3>
    <div class="sphere"></div>
    <div class="tips"></div>

    <div class="but">
      <el-button type="primary" @click="onStart">开始</el-button>
      <el-button type="primary" @click="onReset">重置</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";
import type { TAnimeInstance } from "@/views/animejs/types";

const animeRow: TAnimeInstance = {
  sphere: null,
};

// 中心点
const centerX = ref(0);
const centerY = ref(0);

const init = () => {
  // 定义旋转中心点（页面绝对坐标）
  // const centerX = 391 + 150;
  // const centerY = ;

  const box1 = document.querySelector(".box1")! as HTMLElement;

  // 获取矩形中心点
  {
    centerX.value = box1.offsetLeft + box1.clientWidth / 2;
    centerY.value = box1.offsetTop + box1.clientHeight / 2;
    console.log(centerX.value, centerY.value);
  }

  const sphereDom = document.querySelector(".sphere")! as HTMLElement;
  const tipsDom = document.querySelector(".tips")! as HTMLElement;

  // 获取元素位置
  const rect = sphereDom.getBoundingClientRect();
  const elementLeft = rect.left - box1.offsetLeft;
  const elementTop = rect.top;
  console.log(elementLeft, elementTop);

  // box1.addEventListener("click", (e: MouseEvent) => {
  //   const { clientX, clientY } = e;
  //   // console.log(e);
  // });

  // box1.clientWidth
  // console.log(box1.clientWidth, box1.clientHeight);

  // console.log(sphereDom.offsetParent);
  // console.log(sphereDom.offsetLeft, sphereDom.offsetTop);
  // console.log(tipsDom.offsetLeft, tipsDom.offsetTop);

  // // // 获取元素位置
  // const rect = sphereDom.getBoundingClientRect();
  // const elementLeft = rect.left;
  // const elementTop = rect.top;
  // console.log(elementLeft, elementTop);

  // // 计算相对于元素左上角的偏移
  // const offsetX = centerX - elementLeft;
  // const offsetY = centerY - elementTop;

  // const sphere = anime.timeline({
  //   targets: ".box1 .sphere",
  //   // translateX: 50,
  //   // translateY: 50,
  //   autoplay: false,
  //   transformOrigin: `${offsetX}px ${offsetY}px`, // 设置旋转中心
  //   rotate: "1turn", // 旋转360度
  //   loop: true,
  //   // rotateY: "360deg",
  //   duration: 5000,
  //   easing: "easeInOutSine",
  //   // perspective: 1000,
  // });

  // animeRow.sphere = sphere;
};

// 开始
const onStart = () => {
  animeRow.sphere?.restart();
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
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;

  .sphere,
  .tips {
    position: absolute;
  }

  .sphere {
    width: 100px;
    height: 100px;
    background-color: red;
    border-radius: 50%;
    top: 100px;
    left: 100px;
    transform: translate(-50%, -50%);
    /* transform-origin: -50% -50%; */
  }

  .tips {
    width: 300px;
    height: 300px;
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border: 1px solid #000;
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
