<template>
  <div class="customer">
    <el-form label-width="24vw" label-position="left" class="busElInput">
      <el-form-item label="办公地点">
        <div class="more">
          <van-icon name="location" style="margin-right: 0.1rem"/>
          {{ customerDetail.officeAddress }}
        </div>
      </el-form-item>
      <el-form-item label="报价币别">
        <div class="flex-align-center">
          {{currencyList[customerDetail.offerCurrency - 1]?.label}}
          <div v-if="customerDetail.offerCurrency!=1">
            <van-icon class="ml-20" name="warning" color="#FA8603"/>
            <span class="fz-12" style="color: #FA8603;">所有报价请按此币别的金额维护</span>
          </div>
        </div>
      </el-form-item>
      <el-form-item label="合作方式">
        {{ customerDetail.purchaseModel === 1 ? "客供" : "代采" }}
      </el-form-item>
      <el-form-item label="产品">
        {{ customerDetail.productName }}
      </el-form-item>
      <el-form-item label="加工工序">
        {{ customerDetail.ideaProcess }}
      </el-form-item>
      <el-form-item label="物料损耗">
        <div v-for="item in customerDetail.lossRate.split(',')" :key="item[0]" style="width: 100%" class="flex">
          {{ item.split(':')[0] }}料 <span class="ml-10"></span> {{ item.split(':')[1] }}
        </div>
      </el-form-item>
    </el-form>
    <div @click="toCustomerDetailInfo" class="detail">
      <span style="color: #0076F6;">客户详情</span>
      <van-icon class="ml-5" name="arrow" color="#0076F6"/>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  customerDetail: {
    type: Object,
    default: () => {
      return {}
    }
  },
})

console.log(props)

/* 币别获取 */
const currencyList = window.currencyList

/* 跳转客户详情 */
const router = useRouter()
const toCustomerDetailInfo = () => {
  router.push({name: "customerInfoPreview", params: {id: props.customerDetail.customerBaseId}})
}

</script>

<style lang="scss" scoped>
.customer {
  position: relative;
}

.detail {
  position: absolute;
  right: 20px;
  bottom: 19px;
}
:deep(.el-form-item){
  margin-bottom: 10px;
}
</style>
