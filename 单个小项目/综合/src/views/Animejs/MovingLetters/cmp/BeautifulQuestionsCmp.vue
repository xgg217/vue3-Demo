<template>
  <div class="box">
    <div class="ml6">
      <p v-for="(i, index) in arr" :key="index" class="letter">{{ i }}</p>
      <!-- <p class="letters letters-1">Ready</p>
      <p class="letters letters-2">Set</p>
      <p class="letters letters-3">Go!</p> -->
    </div>
  </div>
</template>

<script setup lang="ts">
const str = "Beautiful  Questions";
const arr = shallowRef<string[]>([]);
const init = () => {
  arr.value = str.split("").map(item => {
    if (item === " ") {
      return "&nbsp;";
    }
    return item;
  });
};

onMounted(() => {
  // init();
});
</script>

<style scoped>
.box {
  background: #c1605c;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #fff;
}

.ml6 {
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 900;
  font-size: 3.5em;
}
</style>
