<script setup lang="ts">
import { NavBar, ConfigProvider } from "vant";
// import { apiPostDay } from "@/api/request";

// (() => {
//   apiPostDay("2015-1-1")
//     .then((res) => {
//       console.log(res);
//       // res.data.
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// })();
</script>

<template>
  <van-nav-bar title="标题" class="day-nav" />
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
