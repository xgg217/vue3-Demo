<template>
  <ul class="moving">
    <li v-for="item in myComponentsList" :key="item">
      <component :is="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
const myComponentsList = shallowRef<any[]>([]);

const init = () => {
  // 导入当前所有子组件
  const modules = import.meta.glob("@/views/animejs/MovingLetters/cmp/*.vue", {
    eager: true,
  });
  // console.log(modules);

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
ul.moving {
  border: 1px solid #000;
  /* display: grid; */
  width: calc(100vw - var(--nav));
  height: 100%;
  display: flex;
  /* flex-direction: column; */
  flex-wrap: wrap;
  border: 1px solid #000;
  padding: 0;
  margin: 0;
}

li {
  list-style: none;
  height: 500px;
  width: 50%;
  /* border: 1px solid #000; */
}
</style>
