<template>
  <div class="urged ui-cell ui-cell-sb mt-12">
    <div class="ui-cell">
      <div  class="pr-20 shrink-0 e-gray-color">{{typeName}}</div>
      <div  class="ui-nowrap width-190 b-gray-color">{{name}}尚未完成报价</div>
    </div>
    <div class="flex ui-cell shrink-0">
      <div class="mr-5" color="#1572F9">{{ text }}</div>
      <slot>
        <van-icon name="arrow" color="#1572F9"/>
      </slot>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  typeName: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    default: ''
  },
  text: {
    type: String,
    default: '催一下'
  },
})
</script>

<style scoped>
.urged{
  height: 36px;
  padding: 10px 20px;
  background: #fff;
  font-size: 14px;
}
</style>
