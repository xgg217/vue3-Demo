<template>
  <div color="#FA8603" class="fz-14">
    <van-icon name="info" size="14"/>
    {{ text }}
  </div>
</template>

<script setup>

const props = defineProps({
  text: {
    type: String,
    default: '已退回，待重新报价'
  },
})

</script>
