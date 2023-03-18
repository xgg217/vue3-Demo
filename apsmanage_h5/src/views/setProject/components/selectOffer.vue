<template>
  <div class="remoteSelectInput flex-center">
    <el-select class="custom-input"
               v-if="isShow"
               v-model="value"
               filterable
               remote
               v-r-readonly="[0, 0, 0, 0]"
               no-data-text='暂无数据'
               :placeholder="projectType==1?'搜索客户':'搜索报价单'"
               :remote-method="remoteMethod"
               :loading="loading"
               @change="selectItem">
      <el-option  v-for="item in options" :key="item[keys[0]]" :label="item[keys[1]]" :value="item[keys[0]]"/>
    </el-select>
  </div>
</template>

<script setup>
import {httpOfferOrCustomerList} from "@/api/business"
import useSelectBlur from "@/hooks/useSelectBlur";

const props = defineProps({
  projectType: {
    default: 1
  },
})
/* 输入框搜索 */
const options = ref([])
const value = ref()
const loading = ref(false)
let {isShow} = useSelectBlur(value)

let keys=computed(()=>{
  return props.projectType==1? ['customerBaseId','customerName']:['offerId','offerNo']
})
/* 返回信息 */
const emit = defineEmits(["getCustomerInfo"])

const remoteMethod = (query) => {
  if (query) {
    loading.value = true
    httpOfferOrCustomerList({searchValue: '', projectType: props.projectType})
        .then((res) => {
          options.value = res.data
        }).finally(() => {
      loading.value = false
    })
  }
}

const selectItem = (value) => {
  emit("getCustomerInfo", {projectType:props.projectType,id:value})
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
