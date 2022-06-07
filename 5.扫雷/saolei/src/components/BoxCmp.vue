<script setup lang="ts">
import { toRef } from 'vue';
import type { BlockState } from '@/type/BlockState';
// interface Props {
//   x: number
//   y: number
// }
interface Props {
  blockState: BlockState
}

const props = defineProps<Props>();

const onClick = function onClick() {
  // console.log(x, y);
  console.log(1);
};


</script>

<template>
  <div class="box" @click="onClick">
    <!-- {{props.y}},{{props.x}} -->
    {{ props.blockState.mine ? '💣' : ((props.blockState.adjacentMines === 0) ? '' : props.blockState.adjacentMines)}}
  </div>
</template>

<style scoped>
.box {
  width: 50px;
  height: 50px;
  border: 1px solid #000;
  display: inline-block;
  cursor: pointer;
  text-align: center;
  line-height: 50px;
  /* display: flex;
  flex-wrap: wrap; */
}
</style>