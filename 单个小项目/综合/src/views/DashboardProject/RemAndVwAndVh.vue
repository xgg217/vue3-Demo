<template>
  <div class="dashboard">
    <div class="header">数据看板</div>
    <div class="content">
      <div class="chart"></div>
      <div class="info-panel"></div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style lang="scss" scoped>
.dashboard {
  width: 100vw;
  height: 100vh;
  padding: 2vh 2vw; /* 内边距自适应 */
  background: #1a1a1a;
  display: flex;
  flex-direction: column;
}

.header {
  font-size: clamp(20px, 2.5vw, 40px); /* 动态字体大小 */
  color: white;
  margin-bottom: 3vh;
}

.content {
  flex: 1;
  display: flex;
  gap: 1.5vw; /* 间距自适应 */
}

.chart {
  width: 70vw;
  height: 80vh;
  background: #2a2a2a;
  aspect-ratio: 16/9; /* 保持 16:9 宽高比 */
}

.info-panel {
  width: 25vw;
  height: 80vh;
  background: #2a2a2a;
  overflow: auto;
}
</style>
