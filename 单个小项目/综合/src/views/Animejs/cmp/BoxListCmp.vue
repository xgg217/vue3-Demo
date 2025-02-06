<template>
  <div class="card">
    <ul v-if="props.arr.length !== 0">
      <li v-for="item in props.arr" :key="item">
        <component :is="item" />
      </li>
    </ul>
    <el-empty class="empty" v-else description="暂无组件" />
  </div>
</template>

<script setup lang="ts">
const props = defineProps<{ arr: any[] }>();
</script>

<style scoped>
.card {
  width: 100%;
  display: flex;
  flex-wrap: wrap;

  ul {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
  }

  li {
    width: 50%;
    box-sizing: border-box;
    border: 1px solid #000;
    height: 700px;
  }

  .empty {
    margin: 100px auto;
  }
}
</style>
