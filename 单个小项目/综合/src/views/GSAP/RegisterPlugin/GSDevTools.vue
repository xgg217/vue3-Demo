<template>
  <div class="box">
    <div>GSDevTools</div>

    <div class="gSDevTools">
      <p class="red"></p>
      <p class="green"></p>
      <p class="blue"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { gsap } from "gsap";
import { GSDevTools } from "gsap/GSDevTools";

gsap.registerPlugin(GSDevTools);

onMounted(() => {
  const tl = gsap.timeline({
    id: "red",
  });

  tl.to(".red", {
    id: "red1",
    x: 100,
    duration: 2,
  })
    .to(".red", {
      id: "red2",
      zoom: 2,
      duration: 2,
    })
    .to(".red", {
      id: "red3",
      rotate: 360,
      duration: 2,
    });

  const t2 = gsap.timeline({
    id: "green",
  });

  t2.to(".green", {
    id: "green1",
    x: 100,
    duration: 2,
  })
    .to(".green", {
      id: "green2",
      zoom: 2,
      duration: 2,
    })
    .to(".green", {
      id: "green3",
      rotate: 360,
      duration: 2,
    });

  GSDevTools.create({ animation: tl, css: { bottom: "50px" } });
  GSDevTools.create({ animation: t2 });
});
</script>

<style src="@/views/GSAP/style.css" scoped></style>
<style lang="scss" scoped></style>
