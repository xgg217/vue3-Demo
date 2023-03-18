<template>
  <div class="listStatusWrap flex-align-center" :style="{color: Props.info.color, backgroundColor: Props.info.bgColor}">
    {{ Props.info.label }}
  </div>
</template>

<script setup>
const Props = defineProps({
  info: {
    type: Object,
    default: () => {return {label: "空状态", color: "#5C94FF", bgColor: "#DEE9FF"}}
  }
})
</script>

<style lang="scss" scoped>
.listStatusWrap{
  height: 16px;
  // line-height: 16px;
  border-radius: 2px;
  padding: 0 8px;
  font-size: 10px;
}
</style>