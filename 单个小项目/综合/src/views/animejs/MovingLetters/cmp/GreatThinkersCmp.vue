<template>
  <div class="box">
    <div class="ml3">
      <div v-for="(i, index) in `Great Thinkers`" :key="index" class="letter">
        {{ i }}
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
      targets: ".ml3 .letter",
      // scale: [0, 1],
      opacity: [0, 1],
      // translateZ: 0,
      easing: "easeOutExpo",
      duration: 2250,
      delay: (el, i) => 150 * (i + 1),
    })
    .add({
      targets: ".ml3",
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
  background: #224a54;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.ml3 {
  font-weight: 900;
  font-size: 3.5em;
  display: flex;
}
</style>
