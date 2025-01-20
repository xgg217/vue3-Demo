<template>
  <div class="box">
    <div class="ml4">
      <p class="letters letters-1">Ready</p>
      <p class="letters letters-2">Set</p>
      <p class="letters letters-3">Go!</p>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";

const ml4 = {
  opacityIn: [0, 1],
  scaleIn: [0.2, 1],
  scaleOut: 3,
  durationIn: 800,
  durationOut: 600,
  delay: 500,
};

const init = () => {
  anime
    .timeline({ loop: true })
    .add({
      targets: ".ml4 .letters-1",
      opacity: ml4.opacityIn,
      scale: ml4.scaleIn,
      duration: ml4.durationOut, //
    })
    .add({
      targets: ".ml4 .letters-1",
      opacity: 0,
      scale: ml4.scaleOut,
      duration: ml4.durationOut,
      easing: "easeInExpo",
      delay: ml4.delay,
    })
    .add({
      targets: ".ml4 .letters-2",
      opacity: ml4.opacityIn,
      scale: ml4.scaleIn,
      duration: ml4.durationOut, //
    })
    .add({
      targets: ".ml4 .letters-2",
      opacity: 0,
      scale: ml4.scaleOut,
      duration: ml4.durationOut,
      easing: "easeInExpo",
      delay: ml4.delay,
    })
    .add({
      targets: ".ml4 .letters-3",
      opacity: ml4.opacityIn,
      scale: ml4.scaleIn,
      duration: ml4.durationOut, //
    })
    .add({
      targets: ".ml4 .letters-3",
      opacity: 0,
      scale: ml4.scaleOut,
      duration: ml4.durationOut,
      easing: "easeInExpo",
      delay: ml4.delay,
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
  background: #000;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}
.ml4 {
  font-weight: 900;
  font-size: 3.5em;
  display: flex;
  position: relative;
  top: 0;
  left: 0;
  /* border: 1px solid red; */
  /* width: 100%; */
}

.letters {
  opacity: 0;
  position: absolute;
  /* margin: auto; */
  top: 0;
  left: -50%;
  translate: -50% -50%;
  margin: 0;
  padding: 0;
}
</style>
