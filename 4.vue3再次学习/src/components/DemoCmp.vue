<script setup lang="ts">
import { ref, reactive, onMounted, onBeforeUnmount } from 'vue';
const val  = ref(1);

const handleAdd = function handleAdd() {
  val.value = val.value + 1;
};

/**
 * 鼠标事件
 */
const { point } = (() => {
  interface IPoint {
    x: number
    y: number
  }
  const point = reactive<IPoint>({
    x:0,
    y: 0,
  });



  const f1 = (event:MouseEvent) => {
    point.x = event.pageX;
    point.y = event.pageY;
    console.log(12121);

  };

  onMounted(() => {

    window.addEventListener('click', f1);
  });

  onBeforeUnmount(() => {
    console.log('触发');

    window.removeEventListener('click', f1);
  });

  return {
    point,
  };
})();

</script>

<template>
  <hr>

  <h2>鼠标坐标x:{{ point.x }}y: {{ point.y }}</h2>
</template>



<style scoped>

</style>
