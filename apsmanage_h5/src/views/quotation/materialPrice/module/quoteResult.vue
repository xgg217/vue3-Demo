<template>
  <div class="result">
    <div class="result-title">报价结果</div>
    <div class="result-main">
      <div v-for="(item,index) in detail" :key="index">
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script setup>
let props = defineProps({
  detail: {
    type: Array,
    default: () => []
  },
})
</script>

<style scoped lang="scss">
.result {
  background: #FFFFFF;
  padding: 18px 20px 0 20px;
  font-size: 14px;
  font-weight: 500;

  &-title {
    color: $e-gray;
    margin-bottom: 5px;
  }

  &-main {
    color: $b-gray;
  }

}
</style>
