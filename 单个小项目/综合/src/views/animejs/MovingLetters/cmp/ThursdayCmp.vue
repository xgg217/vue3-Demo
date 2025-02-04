<template>
  <div class="box">
    <div class="ml1">
      <div class="text-wrapper">
        <span class="line line1"></span>
        <!-- <span class="letters">THURSDAY</span> -->
        <div class="letters">
          <div v-for="(i, index) in 'THURSDAY'" :key="index" class="letter">
            {{ i }}
          </div>
        </div>
        <span class="line line2"></span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import anime from "animejs";

const init = () => {
  anime
    .timeline({ loop: true })
    .add({
      targets: ".ml1 .letter",
      scale: [0.3, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 600,
      delay: (el, i) => 70 * (i + 1),
    })
    .add({
      targets: ".ml1 .line",
      scaleX: [0, 1],
      opacity: [0.5, 1],
      easing: "easeOutExpo",
      duration: 700,
      offset: "-=875",
      delay: (el, i, l) => 80 * (l - i),
    })
    .add({
      targets: ".ml1",
      opacity: 0,
      duration: 1000,
      easing: "easeOutExpo",
      delay: 1000,
    });
};

onMounted(() => {
  init();
});
</script>

<style scoped>
.box {
  background: #9ba5b5;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.ml1 {
  font-weight: 900;
  font-size: 3.5em;
}

.letters {
  display: flex;
  align-items: center;
}

.ml1 .letter {
  display: block;
  line-height: 1em;
}

.ml1 .text-wrapper {
  position: relative;
  display: inline-block;
  padding-top: 0.1em;
  padding-right: 0.05em;
  padding-bottom: 0.15em;
}

.ml1 .line {
  opacity: 0;
  position: absolute;
  left: 0;
  height: 3px;
  width: 100%;
  background-color: #fff;
  transform-origin: 0 0;
}

.ml1 .line1 {
  top: 0;
}
.ml1 .line2 {
  bottom: 0;
}
</style>
