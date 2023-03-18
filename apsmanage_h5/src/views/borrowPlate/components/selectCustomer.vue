<template>
  <div class="remoteSelectInput flex-center">
    <el-select
        class="custom-input"
        :remote-method="remoteMethod"
        :loading="loading"
        v-if="isShow"
        v-model="value"
        filterable
        remote
        v-r-readonly="[0, 0, 0, 0]"
        no-data-text='暂无数据'
        placeholder="输入关键字搜索"
        @change="selectItem">
      <el-option v-for="item in options" :key="item.id" :label="item.nickName" :value="item.id"/>
    </el-select>
  </div>
</template>

<script setup>
import useSelectBlur from "@/hooks/useSelectBlur";
import {getUserList} from "@/api/common";
import throttle from "@/utils/throttle";

const options = ref([])
const value = ref()
const loading = ref(false)
let {isShow} = useSelectBlur(value)

const emit = defineEmits(["getCustomerInfo"])

const remoteMethod = (query) => {
  if (query) {
    loading.value = true
    getList(query)
  } else {
    options.value = []
  }
}
const getList = throttle((query) => {
  getUserList({
    nickName: query,
    current: 1,
    pageSize: 100
  }).then((res) => {
    options.value = res.data.records.filter(item=>item.leader)
  }).finally(() => {
    loading.value = false
  })
}, 200)

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
