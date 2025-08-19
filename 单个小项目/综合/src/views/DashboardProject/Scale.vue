<template>
  <div id="design-container">
    <div class="dashboard-item"></div>
  </div>
</template>

<script setup lang="ts">
function adjustScale() {
  const designWidth = 1920;
  const designHeight = 1080;
  const container = document.getElementById("design-container")!;

  // 获取当前视口尺寸
  const currentWidth = window.innerWidth;
  const currentHeight = window.innerHeight;

  // 计算缩放比例（取最小值保证内容完整）
  const scale = Math.min(
    currentWidth / designWidth,
    currentHeight / designHeight,
  );

  // 计算垂直居中补偿量
  const offsetY = (currentHeight - designHeight * scale) / (2 * scale);
  // 计算水平居中补偿量
  const offsetX = (currentWidth - designWidth * scale) / (2 * scale);

  // 计算居中
  // container.style.left = (currentWidth - designWidth * scale) / 2 + "px";
  // container.style.top = (currentHeight - designHeight * scale) / 2 + "px";

  // 应用变换：先缩放 -> 后平移
  container.style.transform = `
          scale(${scale})
          translate(${offsetX}px, ${offsetY}px)
        `;
}

onMounted(() => {
  // 初始化与响应式
  adjustScale();
  window.addEventListener("resize", adjustScale);
});

onBeforeMount(() => {
  window.removeEventListener("resize", adjustScale);
});
</script>

<style lang="scss" scoped>
#design-container {
  width: 1920px;
  height: 1080px;
  position: fixed;
  transform-origin: 0 0; /* 依然保持左上角基准点 */
  background: #f0f0f0;
}
.dashboard-item {
  width: 500px;
  height: 300px;
  background: #3498db;
  position: absolute;
  left: 200px;
  top: 150px;
}
</style>
