<template>
  <div class="remoteSelectInput flex-center">
    <el-select
      v-model="value"
      filterable
      remote
      v-r-readonly="[0, 0, 0, 0]"
      reserve-keyword
      placeholder="关键字搜索"
      @change="selectItem"
      :remote-method="remoteMethod"
      :loading="loading"
      ref="selectCustomer"
    >
      <el-option
        v-for="(item, index) in options"
        :key="item.id"
        :label="item.name"
        :value="index"
      />
    </el-select>
    <img src="../../assets/images/search.png" alt="">
  </div>
</template>

<script setup>
import { checkCustomer } from "@/api/business"
import throttle from "@/utils/throttle"
import { failTip } from "@/utils/toastTips"

/* 输入框搜索 */
const options = ref([])
const value = ref()
const loading = ref(false)

/* 获取客户信息 */
const getList = throttle((query) => {
  checkCustomer({searchValue: query})
    .then((res) => {
      if (res.code === 200) {
        options.value = res.data
      } else {
        failTip(res.code + ' - ' + res.msg)
      }
      loading.value = false
    })
    .catch((e) => {
      console.log(e)
      failTip(JSON.stringify(e))
      loading.value = false
    })
}, 200)

/* 远程搜索 */
const remoteMethod = (query) => {
  if (query) {
    loading.value = true
    getList(query)
  } else {
    options.value = []
  }
}

/* 返回信息 */
const emit = defineEmits(["getCustomerInfo"])
const selectItem = (value) => {
  emit("getCustomerInfo", value)
}

onMounted(() => {
  loading.value = true
  /* 产品要求默认搜索全部 */
  getList('')
})

</script>

<style lang="scss" scoped>
.remoteSelectInput{
  width: 100%;
  height: 100%;
  .el-select{
    width: 100%;
    :deep(.el-input__wrapper){
      box-shadow: unset;
      background-color: #F4F5FC;
      border-radius: 50px;
    }
  }
  img{
    position: absolute;
    right: 26px;
    width: 26px;
    height: 26px;
  }
}
</style>