<template>
  <div class="remoteSelectInput flex-center">
    <el-select class="custom-input" v-if="isShow" v-model="value" filterable v-r-readonly="[0, 0, 0, 0]" no-data-text='暂无数据' placeholder="输入关键字搜索" @change="selectItem">
      <el-option v-for="item in options" :key="item.id" :label="item.name" :value="item.id"/>
    </el-select>
  </div>
</template>

<script setup>
import {getHttpQualifyList} from "@/api/business"
import useSelectBlur from "@/hooks/useSelectBlur";

const props = defineProps({
  cooperateType: {
    default: 3
  },
})
/* 输入框搜索 */
const options = ref([])
const value = ref()
let {isShow} = useSelectBlur(value)

/* 返回信息 */
const emit = defineEmits(["getCustomerInfo"])
onMounted(() => {
  getHttpQualifyList({searchValue: '', cooperateType: props.cooperateType})
      .then((res) => {
        options.value = res.data
      })
})
const selectItem = (value) => {
  emit("getCustomerInfo", value)
}
</script>

<style lang="scss" scoped>
.remoteSelectInput {
  width: 100%;
  //height: 100%;

  .el-select {
    width: 100%;

    :deep(.el-input__wrapper) {
      height: 34px;
    }
  }
}
</style>
