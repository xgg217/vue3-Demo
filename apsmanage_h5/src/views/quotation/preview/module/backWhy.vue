<template>
  <div class="flex fz-14">
    <div class="e-gray-color" style="width: 24vw;">退回原因</div>
    <div class="b-gray-color">
      <div>{{text1}}</div>
      <div>{{text2}}</div>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  text1: {
    type: String,
    default: ''
  },
  text2: {
    type: String,
    default: ''
  },
})

</script>
