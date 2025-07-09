<template>
  <div class="box">
    <div class="card">
      <h2>Stagger</h2>
      <ul>
        <li>
          <StaggerNumberCmp />
        </li>
        <li>
          <StaggerObjectCmp />
        </li>
      </ul>
    </div>

    <div class="card">
      <h2>控制方法</h2>
      <ul>
        <li>
          <Function1Cmp />
        </li>
        <!-- <li>
          <StaggerObjectCmp />
        </li> -->
      </ul>
    </div>

    <div class="card">
      <h2>使用工具方法</h2>
      <ul>
        <li>
          <Function1Cmp />
        </li>
        <!-- <li>
          <StaggerObjectCmp />
        </li> -->
      </ul>
    </div>

    <div class="card">
      <h2>时间线</h2>
      <ul>
        <li>
          <TimelineCmp />
        </li>
        <!-- <li>
          <StaggerObjectCmp />
        </li> -->
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import StaggerNumberCmp from "./components/StaggerNumberCmp.vue";
import StaggerObjectCmp from "./components/StaggerObjectCmp.vue";
import Function1Cmp from "./components/Function1Cmp.vue";
import TimelineCmp from "./components/TimelineCmp.vue";
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
