<template>
  <div class="box">
    <div class="ml5">
      <p class="line line1"></p>
      <p class="letters letters-text">Signal</p>
      <p class="letters ampersand">&amp;</p>
      <p class="letters letters-text">Noise</p>
      <p class="line line2"></p>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";

const init = () => {
  anime
    .timeline({ loop: true })
    .add({
      targets: ".ml5 .line",
      opacity: 1,
      width: [0, 500],
      translateX: "-50%",
      easing: "easeInOutExpo",
      duration: 700,
    })
    .add({
      targets: ".ml5 .line",
      easing: "easeOutExpo",
      duration: 500,
      // @ts-ignore
      translateY: (el, i) => {
        return i === 0 ? -40 : 40;
      },
    })
    .add({
      targets: ".ml5 .ampersand",
      easing: "easeOutExpo",
      opacity: [0, 1],
      // scaleY: [0.5, 1],
      duration: 600,
      // offset: "-=600",
    })
    .add({
      targets: ".ml5 .letters-text",
      easing: "easeOutExpo",
      opacity: [0, 1],
      // left: [0, -150],
      duration: 600,
      // @ts-ignore
      left: (el, i) => (i === 0 ? 150 : -150),
    })
    .add({
      targets: ".ml4",
      opacity: 0,
      duration: 500,
      delay: 500,
    });
};

onMounted(() => {
  init();
});
</script>

<style scoped>
.box {
  background-color: #fff;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.ml5 {
  position: relative;
  top: 0;
  left: 0;
  font-weight: 300;
  font-size: 4.5em;
  color: #402d2d;
  /* border: 1px solid red; */
}

.line {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 500px;
  height: 5px;
  background-color: #402d2d;
  /* transform-origin: 0 0;
  transform: rotate(90deg); */
}

p {
  margin: 0;
  padding: 0;
}

.letters {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 1;
  /* display: flex;
  align-items: center;
  justify-content: center;
  width: 500px;
  height: 100px; */
  /* border: 1px solid red; */
}
</style>
