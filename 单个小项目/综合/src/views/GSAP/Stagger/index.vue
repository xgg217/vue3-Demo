<template>
  <div class="box">
    <div class="card">
      <h2>stagger from</h2>
      <ul>
        <li>
          <StaggerCmp />
        </li>
        <li>
          <Stagger2Cmp />
        </li>
        <li>
          <Stagger3Cmp />
        </li>
      </ul>
    </div>

    <div class="card">
      <h2>stagger grid</h2>
      <ul>
        <li>
          <Stagger4Cmp />
        </li>
      </ul>
    </div>

    <div class="card">
      <h2>stagger axis</h2>
      <ul>
        <li>
          <Stagger5Cmp />
        </li>
        <li>
          <Stagger6Cmp />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import StaggerCmp from "./components/StaggerCmp.vue";
import Stagger2Cmp from "./components/Stagger2Cmp.vue";
import Stagger3Cmp from "./components/Stagger3Cmp.vue";
import Stagger4Cmp from "./components/Stagger4Cmp.vue";
import Stagger5Cmp from "./components/Stagger5Cmp.vue";
import Stagger6Cmp from "./components/Stagger6Cmp.vue";
</script>

<style lang="scss" scoped>
ul {
  display: flex;
  flex-wrap: wrap;
}

.card {
  border: 1px solid rgb(158, 157, 157);
  margin-bottom: 20px;
}

.card h2 {
  margin: 20px 0;
}
</style>
