<template>
  <div class="box">
    <div class="card">
      <h2>stagger</h2>
      <ul>
        <li>
          <StaggerCmp />
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup lang="ts">
import StaggerCmp from "./components/StaggerCmp.vue";
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
