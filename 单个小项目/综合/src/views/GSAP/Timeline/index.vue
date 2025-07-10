<template>
  <div class="box">
    <div class="card">
      <h2>时间线1</h2>
      <ul>
        <li>
          <TimelineCmp />
        </li>
      </ul>
    </div>

    <div class="card">
      <h2>时间线位置参数 positionParameter</h2>
      <ul>
        <li>
          <PositionParameter1Cmp />
        </li>
        <li>
          <PositionParameter2Cmp />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import TimelineCmp from "./components/TimelineCmp.vue";
import PositionParameter1Cmp from "./components/PositionParameter1Cmp.vue";
import PositionParameter2Cmp from "./components/PositionParameter2Cmp.vue";
</script>

<style lang="scss" scoped>
ul {
  display: flex;
}

.card {
  border: 1px solid rgb(158, 157, 157);
  margin-bottom: 20px;
}

.card h2 {
  margin: 20px 0;
}
</style>
