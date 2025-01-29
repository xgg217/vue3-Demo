<template>
  <div class="box1">
    <div class="square"></div>

    <div class="but">
      <el-button type="primary" @click="onBlue">蓝色下落</el-button>
      <!-- <el-button type="primary" @click="onBlueRed">蓝色红色下落</el-button>
      <el-button type="primary" @click="onEven">偶数行下落</el-button>
      <el-button type="primary" @click="onNotRed">非红下落</el-button>
      <el-button type="primary" @click="onReset">重置</el-button> -->
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.box1 {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /* border: 1px solid red; */
  padding: 50px 0 0 50px;
}
.box1 .square {
  width: 150px;
  height: 150px;
  background-color: blue;
}

.box1 .but {
  position: absolute;
  bottom: 50px;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
