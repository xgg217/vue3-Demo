<template>
  <div class="box">
    <!-- <div class="centen">圆</div> -->
    <BoxListCmp :arr="myComponentsList"></BoxListCmp>
    <!-- <div class="border">运动圆</div> -->
  </div>
</template>

<script setup lang="ts">
/**
 * 动态添加元素
 * 圆周运动
 * 鼠标点击跟随运动
 */
import BoxListCmp from "@/views/animejs/cmp/BoxListCmp.vue";

const myComponentsList = shallowRef<any[]>([]);
const init = () => {
  // 导入当前所有子组件
  const modules = import.meta.glob("./cmp/*.vue", {
    eager: true,
  });

  myComponentsList.value = Object.values(modules).map(item => {
    // @ts-ignore
    return item.default;
  });
};

onMounted(() => {
  init();
});
</script>

<style scoped></style>
