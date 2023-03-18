<template>
  <!-- 操作人-->
  <div class="flex ui-cell people">
    <div class="shrink-0">操作人</div>
    <div class="ml-5 ui-nowrap">{{ props.name }} {{ props.time }}</div>
  </div>
</template>

<script setup>

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  time: {
    type: String,
    default: ''
  },
})

const emit = defineEmits(["handleIcon"])


const handleIcon = () => {
  emit('handleIcon')
}

</script>

<style scoped lang="scss">
.people {
  font-size: 14px;
  padding: 0 20px;

  div:first-of-type {
    color: $e-gray;
  }

  div:last-of-type {
    color: $b-gray;
  }
}

</style>
