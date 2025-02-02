<template>
  <div class="box">
    <div class="centen">圆</div>
    <!-- <div class="border">运动圆</div> -->
  </div>
</template>

<script setup lang="ts">
/**
 * 动态添加元素
 * 圆周运动
 * 鼠标点击跟随运动
 */
</script>

<style scoped>
.box {
  border: 1px solid #000;
}

.box div {
  /* position: absolute;
  top: 50%; */
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: space-between;

  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: red;
  text-align: center;
  line-height: 100px;
  color: #fff;
}

/* .centen {
  left: 50%;
} */

/* .border {
  left
} */
</style>
