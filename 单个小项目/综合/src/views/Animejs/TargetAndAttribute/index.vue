<template>
  <div class="box">
    <BoxListCmp :arr="myComponentsList"></BoxListCmp>
  </div>
</template>

<script setup lang="ts">
import BoxListCmp from "@/views/Animejs/cmp/BoxListCmp.vue";

const myComponentsList = shallowRef<any[]>([]);
const init = () => {
  // 导入当前所有子组件
  const modules = import.meta.glob(
    "@/views/animejs/TargetAndAttribute/cmp/*.vue",
    {
      eager: true,
    },
  );

  myComponentsList.value = Object.values(modules).map(item => {
    // @ts-ignore
    return item.default;
  });
};

onMounted(() => {
  init();
});
</script>

<style scoped>
ul {
  width: 100%;
  display: flex;
  flex-wrap: wrap;
}

li {
  width: 50%;
  box-sizing: border-box;
  border: 1px solid #000;
  height: 700px;
}
</style>
