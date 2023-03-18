<template>
  <div class="remoteSelectInput flex-center">
    <el-select class="custom-input" v-if="isShow" v-model="value" filterable v-r-readonly="[0, 0, 0, 0]" no-data-text='暂无数据' placeholder="输入客户名搜索" @change="selectItem">
      <el-option v-for="item in options" :key="item.businessId" :label="item.customerName" :value="item.businessId"/>
    </el-select>
  </div>
</template>

<script setup>
import {getHttpProjectAdoptCustomer} from "@/api/business"
import useSelectBlur from "@/hooks/useSelectBlur";
let route=useRoute()
let {businessId} = route.params

/* 输入框搜索 */
const options = ref([])
const value = ref()
let {isShow} = useSelectBlur(value)

/* 返回信息 */
const emit = defineEmits(["getCustomerInfo"])
onMounted(() => {
  getHttpProjectAdoptCustomer()
      .then((res) => {
        businessId=Number(businessId)
        options.value = res.data
        if(businessId){
          value.value=businessId
          selectItem(businessId)
        }
      })
})
const selectItem = (value) => {
  let data=options.value.filter((item)=>item.businessId==value)[0]
  emit("getCustomerInfo", data)
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
