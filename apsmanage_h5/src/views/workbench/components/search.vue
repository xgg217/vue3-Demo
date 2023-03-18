<template>
  <div>
    <van-search  v-bind="$attrs" left-icon=""  @clear="comfirmSearch" :right-icon="getImage('search')" v-model="searchValue" :placeholder="Props.prompt" @update:model-value="changeValue" @search="comfirmSearch" :autocomplete="'off'"/>
  </div>
</template>

<script setup>
import { getImage } from '@/utils/utils'
const Props = defineProps({
  prompt: {
    type: String,
    default: "搜索"
  },
  searchValue: {
    type: String
  }
})
const Emit = defineEmits(["update:searchValue", "search"])
const searchValue = ref('')
/* 输入框变化时触发 */
const changeValue = (value) => {
  Emit("update:searchValue", value)
}
/* 确定搜索 */
const comfirmSearch = (value) => {
  Emit("search")
}

watch(() => Props.searchValue, (newVal) => {
  if (newVal === '') {
    console.log("inner:", searchValue.value)
  }
})

/* 暴露表单信息 */
defineExpose({
  searchValue
})
// onMounted(() => {
//   console.log("search:", searchValue.value)
// })
</script>

<style lang="scss" scoped>
:deep(.van-search) {
  padding: 0;
  height: 40px;
  .van-search__content{
    padding-left: 20px;
    padding-right: 10px;
  }
  .van-search__content, .van-search__field{
    height: 100%;
    border-radius: 20px;
    background-color: #F4F6F9;
    input::placeholder{
      color: #97999B;
      font-size: 14px;
    }
  }
  .van-field__right-icon .van-icon{
    font-size: 28px;
  }
}
</style>
