<script setup lang="ts">
console.log(1);
</script>

<template>
  <button>
    <span>Default</span>
  </button>
</template>

<style>
button {
  line-height: 1;
  height: 32px;
  white-space: nowrap;
  cursor: pointer;
  text-align: center;
  box-sizing: border-box;
  transition: 0.1s;
  padding: 8px 15px;
  background-color: #fff;
  border-radius: 4px;
  border: 1px solid #d9d9d9;
  color: rgb(96, 98, 102);
  font-size: 14px;
}
button span {
  display: inline-flex;
  align-items: center;
}
</style>
