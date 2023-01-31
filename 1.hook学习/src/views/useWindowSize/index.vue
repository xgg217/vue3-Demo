<script setup lang="ts">
import { watch } from 'vue';
import { useWindowSize } from '@vant/use';
import newUseWindowSize from './useWindowSize';

(function () {
  const { width, height } = useWindowSize();
  console.log(width.value); // -> 窗口宽度
  console.log(height.value); // -> 窗口高度

  watch([width, height], () => {
    console.log('window resized');
    console.log(width.value, height.value);
  });
})();

(function () {
  const { width, height } = newUseWindowSize();
  console.log(width.value); // -> 窗口宽度
  console.log(height.value); // -> 窗口高度

  watch([width, height], () => {
    console.group('window resized 自己');
    console.log(width.value, height.value);
    console.groupEnd()
  });


})();
</script>

<template>
  <div>useWindowSize</div>

</template>

<style lang="scss" scoped>
</style>