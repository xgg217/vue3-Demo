<template>
  <!-- 操作人-->
  <div class="handle">{{ name || userStore?.nickName }} {{ time || getYMDHM(new Date()) }}</div>
</template>

<script setup>
import {getYMDHM} from "@/utils/timeFormat";
import {useUserStore} from "@/store";

let userStore = useUserStore()
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
.handle {
  color: #8994A9;
  font-size: 12px;
  text-align: right;
  height: 36px;
  line-height: 36px;
}

</style>
