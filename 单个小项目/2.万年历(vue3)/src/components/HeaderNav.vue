<script setup lang="ts">
import { NavBar } from "vant";
const props = defineProps({
  title: { type: String, required: true },
});
</script>

<template>
  <van-nav-bar :title="props.title" class="day-nav" />
</template>

<style scoped>
.day-nav {
  background-color: red;
}

.day-nav /deep/ .van-nav-bar__title {
  color: #fff;
  font-size: 20px;
}
</style>
