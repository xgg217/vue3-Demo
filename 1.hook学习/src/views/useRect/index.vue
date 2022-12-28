<script setup lang="ts">
import { ref, onMounted } from 'vue';
import useRect1 from './useRect';
import { useRect } from '@vant/use';

const root = ref();

onMounted(() => {
  const rect = useRect(root.value);
  const rect1 = useRect1(root.value);
  console.log(rect);
  console.log(rect1);
});

</script>

<template>
  <div ref="root">useRect</div>
</template>

<style lang="scss" scoped>
</style>