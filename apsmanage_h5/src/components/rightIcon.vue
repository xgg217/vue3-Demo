<template>
  <div class="flex ui-cell height36" @click="handleIcon">
    <div class="mr-5 fz-14" color="#1572F9">{{ text }}</div>
    <slot>
      <van-icon name="arrow" color="#1572F9"/>
    </slot>
  </div>
</template>

<script setup>
const props = defineProps({
  text: {
    type: String,
    default: '催一下'
  },
})

const emit = defineEmits(["handleIcon"])
const handleIcon = () => {
  emit('handleIcon')
}
</script>

<style scoped lang="scss">
.height36 {
  background: #FFFFFF;
}
</style>
