<script setup lang="ts">
import { Tabbar, TabbarItem } from "vant";
</script>

<template>
  <RouterView />

  <van-tabbar route>
    <van-tabbar-item replace to="/" icon="home-o">当天</van-tabbar-item>
    <van-tabbar-item replace to="/month" icon="search">近期</van-tabbar-item>
    <van-tabbar-item replace to="/year" icon="friends-o">当年</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped></style>
