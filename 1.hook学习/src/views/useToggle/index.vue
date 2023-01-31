<script setup lang="ts">
import useToggle from "./useToggle";

const [state, toggle] = useToggle();

console.log(state.value);


toggle(true);
console.log(state.value); // -> true

toggle(false);
console.log(state.value); // -> false

toggle();
console.log(state.value); // -> true
</script>

<template>
  <div>useToggle</div>
</template>

<style lang="scss" scoped>
</style>