<template>
  <div class="box">
    <div>ScrollTrigger滚动</div>

    <div class="scrollTrigger">
      <p class="red"></p>
      <p class="green"></p>
      <p class="blue"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// onMounted(() => {
//   const tl = gsap.timeline({
//     id: "red",
//   });

//   tl.to(".red", {
//     id: "red1",
//     x: 100,
//     duration: 2,
//   })
//     .to(".red", {
//       id: "red2",
//       zoom: 2,
//       duration: 2,
//     })
//     .to(".red", {
//       id: "red3",
//       rotate: 360,
//       duration: 2,
//     });

//   const t2 = gsap.timeline({
//     id: "green",
//   });

//   t2.to(".green", {
//     id: "green1",
//     x: 100,
//     duration: 2,
//   })
//     .to(".green", {
//       id: "green2",
//       zoom: 2,
//       duration: 2,
//     })
//     .to(".green", {
//       id: "green3",
//       rotate: 360,
//       duration: 2,
//     });

//   GSDevTools.create({ animation: tl, css: { bottom: "50px" } });
//   GSDevTools.create({ animation: t2 });
// });

onMounted(() => {
  gsap.to(".red", {
    x: 500,
    duration: 2,
    scrollTrigger: {
      trigger: ".red",
      markers: true, // 参考线
      start: "top center",
    },
    // scrollTrigger: ".red", // 目标元素进入到可视区内，动画元素执行
  });

  // const tl = gsap.timeline({
  //   scrollTrigger: ".red",
  // });

  // tl.to(".red", {
  //   x: 500,
  //   duration: 2,
  //   // scrollTrigger: {
  //   //   trigger: ".red",
  //   //   // markers: true, // 参考线
  //   //   // start: "top center",
  //   // },
  //   // scrollTrigger: ".red", // 目标元素进入到可视区内，动画元素执行
  // });

  // const boxs = gsap.utils.toArray("p")!;
  // console.log(boxs);

  // boxs.forEach(item => {
  //   gsap.to(item, {
  //     x: 500,
  //     duration: 2,
  //     scrollTrigger: item,
  //     // scroller: "aside",
  //     // pinType: "transform",
  //   });
  // });

  // gsap.to(".red", {
  //   x: 500,
  //   duration: 2,
  //   scrollTrigger: {
  //     trigger: ".red",
  //     markers: true, // 参考线
  //     // start: "top center",
  //   },
  //   // scrollTrigger: ".red", // 目标元素进入到可视区内，动画元素执行
  // });
  // gsap.to(".green", {
  //   x: 500,
  //   duration: 2,
  //   scrollTrigger: ".green",
  //   scroller: "aside",
  //   // pinType: "transform",
  // });
  // gsap.to(".blue", {
  //   x: 500,
  //   duration: 2,
  //   scrollTrigger: ".blue",
  // });
});
</script>

<style src="@/views/GSAP/style.css" scoped></style>
<style scoped>
.red,
.green,
.blue {
  margin: 500px 0;
}
</style>
