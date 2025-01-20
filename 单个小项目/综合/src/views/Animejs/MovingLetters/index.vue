<template>
  <ul class="moving">
    <li v-for="item in myComponents" :key="item">
      <component :is="item" />
    </li>
  </ul>
</template>

<script setup lang="ts">
const myComponents = shallowRef<any>({});

const init = () => {
  // 导入当前所有子组件
  const modules = import.meta.glob("@/views/animejs/MovingLetters/cmp/*.vue", {
    eager: true,
  });
  // console.log(modules);

  myComponents.value = Object.values(modules).map(item => {
    // @ts-ignore
    return item.default;
  });

  // for (const path in modules) {
  //   const componentName = path.replace(/^\.\/(.*)\.vue$/, "$1");
  //   // console.log(name, component);
  //   // console.log(componentName);
  //   // console.log(modules.default);
  //   // @ts-ignore
  //   myComponents[componentName] = modules[path].default;
  // }

  console.log(myComponents);
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
