<template>
  <div class="box">
    <div class="ml2">
      <div v-for="(i, index) in 'Sunny mornings'" :key="index" class="letter">
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
      targets: ".ml2 .letter",
      scale: [4, 1],
      opacity: [0, 1],
      translateZ: 0,
      easing: "easeOutExpo",
      duration: 600,
      delay: (el, i) => 70 * (i + 1),
    })
    .add({
      targets: ".ml2",
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
  background: #e8c3b9;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.ml2 {
  font-weight: 900;
  font-size: 3.5em;
  display: flex;
}
</style>
