<script setup lang="ts">
// import { RouterView } from 'vue-router'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import ContentCmp from './views/HomeView/HomeView.vue'
</script>

<template>
  <el-config-provider :locale="zhCn">
    <ContentCmp />
  </el-config-provider>
</template>

<style scoped></style>
