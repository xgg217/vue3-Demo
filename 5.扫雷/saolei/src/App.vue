<script setup lang="ts">
import { reactive } from 'vue';
import BoxCmp from '@/components/BoxCmp.vue';
import type { BlockState } from '@/type/BlockState';

const WIDTH = 10;
const HEIGHT = 10;

/**
 * 初始化数据
 * 1. 生成雷的位置】
 * 2. 生成邻居雷的数量
 * 3. 生成揭开的位置
 */
const arr = (() => {

  const directions = [
    [-1, -1],
    [-1, 0],
    [-1, 1],
    [0, -1],
    [0, 1],
    [1, -1],
    [1, 0],
    [1, 1],
  ];

  interface IMinesObj {
    [key: string]: {
       x: number;
      y: number;
    };
  }

  // 生成10个雷
  const minesObj:IMinesObj = {};
  Array.from({ length: HEIGHT }, () => {
      let x = Math.floor(Math.random() * WIDTH);
      let y = Math.floor(Math.random() * HEIGHT);

      while (minesObj[`${x}-${y}`] !== undefined) {
        x = Math.floor(Math.random() * WIDTH);
        y = Math.floor(Math.random() * HEIGHT);
      }
      minesObj[`${x}-${y}`] = {
          x,
          y,
        };
  });

  // 初始化数据 10*10 二维数组
  const arr = Array.from({ length: HEIGHT }, (_,y) => {
    return Array.from({ length: WIDTH }, (_, x) => {
      const mine = minesObj[`${x}-${y}`] !== undefined; // 是否是雷
      
      const obj:BlockState = {
        revealed: false,
        mine,
        flagged: false,
        adjacentMines: 0,
      }
      return obj
    });
  });

  // 计算邻居雷的数量
  arr.forEach((row, y) => {
    row.forEach((item, x) => {
      // 当前是炸弹, 跳过
      if(item.mine) {
        return;
      }
      directions.forEach(([dx, dy]) => {
        const x2 = x + dx;
        const y2 = y + dy;
        // 超出边界, 跳过
        if((x2 < 0) || (x2 >= WIDTH) || (y2 < 0) || (y2 >= HEIGHT)) { return; }
        const item2 = arr[y2][x2];
        if(item2.mine) {
          item.adjacentMines += 1;
        }
      })
    })
  })
  return arr;
})();


const state = reactive(arr);

</script>

<template>
<div class="warpp">
  <template v-for="(row, index) of state" :key="index">
    <template v-for="(item, index) of row" :key="index">
      <BoxCmp :blockState="item" />
    </template>
  </template>
  </div>
</template>

<style>
@import './assets/base.css';

</style>
<style scoped>
.warpp {
  margin: 100px auto;
  border: 1px solid red;
  width: 502px;
  /* height: 502px; */
  display: flex;
  flex-wrap: wrap;
}

.boxs {
  box-sizing: border-box;
}
</style>
