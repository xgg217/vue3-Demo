<template>
  <div class="bottomTips flex">
    <img src="../../../assets/images/taskTips.png">
    <span>
      {{ Props.tips }}
    </span>
  </div>
</template>

<script setup>
const Props = defineProps({
  tips: {
    type: String,
    default: '提示'
  }
})
</script>

<style lang="scss" scoped>
  .bottomTips{
    height: 42px;
    background-color: #EBF5FF;
    padding: 0px 16px;
    box-sizing: border-box;
    font-size: 14px;
    color: $b-blue;
    line-height: 42px;
    img{
      width: 32px;
      height: 32px;
      margin-top: 2px;
    }
  }
</style>