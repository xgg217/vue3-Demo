<template>
  <div>
    <Test1Cmp />
  </div>
</template>

<script setup lang="ts">
import Test1Cmp from "./components/Test1Cmp.vue";
import { sampleSize } from "es-toolkit";

console.log(sampleSize([1, 2, 3], 2));
</script>

<style lang="scss" scoped></style>
