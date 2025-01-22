<template>
  <div class="box2">
    <h3>DOM 节点或NodeList</h3>

    <ul>
      <li v-for="i in 9" :key="i"></li>
    </ul>

    <!-- <div class="but">
      <el-button type="primary" @click="onBlue">蓝色下落</el-button>
      <el-button type="primary" @click="onBlueRed">蓝色红色下落</el-button>
      <el-button type="primary" @click="onEven">偶数行下落</el-button>
      <el-button type="primary" @click="onNotRed">非红色</el-button>
    </div> -->
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.box2 {
  /* border: 1px solid red; */
  width: 100%;
  height: 100%;
  position: relative;
  top: 0;
  left: 0;
}
.box2 ul {
  position: absolute;
  top: 50px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  align-items: center;
  justify-content: center;

  li {
    width: 50px;
    height: 50px;
    /* border: 1px solid #000; */
    margin-right: 10px;
  }

  li:nth-child(3n + 1) {
    background: blue;
  }

  li:nth-child(3n + 2) {
    background: red;
  }

  li:nth-child(3n + 3) {
    background: black;
  }
}

.box2 .but {
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
