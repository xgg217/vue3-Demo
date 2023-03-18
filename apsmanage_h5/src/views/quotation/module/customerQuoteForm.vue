<template>
  <div class="pd-20 pt-8 pb-8 customerQuoteFormWrap">
    <DemandForm ref="demandFormRef">
      <template v-slot:quotaState>
        <el-form-item label="报价单号">
          {{ customerDetail?.offerNo }}
        </el-form-item>
        <el-form-item label="当前状态">
          <div color="#0096FF">{{ status }}</div>
        </el-form-item>
        <el-form-item label="客户">
          <div class="w-full flex ui-cell-sb">
            <div class="ui-nowrap">
              {{ customerDetail?.customerName }}
            </div>
            <div @click="toCustomerDetailInfo" class="detail ui-nowrap" v-if="customerDetail?.customerType!=2">
              <span style="color: #0076F6;">查看客户详情</span>
              <van-icon class="ml-5" name="arrow" color="#0076F6"/>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="办公地址">
          <div class="more">
            <van-icon name="location" style="margin-right: 0.1rem"/>
            {{ customerDetail?.officeAddress }}
          </div>
        </el-form-item>
      </template>
      <template v-slot:quotaInfo>
        <el-form-item label="报价工厂">
          {{ getDictValue('factory', customerDetail?.factoryId) }}
        </el-form-item>
        <el-form-item label="机型">
          {{ customerDetail?.materialCode }}
        </el-form-item>
        <el-form-item label="订单量">
          {{ customerDetail?.orderNumber }}
        </el-form-item>
        <el-form-item label="备注声明">
          {{ customerDetail?.remarks }}
        </el-form-item>
      </template>
    </DemandForm>
  </div>
</template>

<script setup>
import DemandForm from "../module/demandForm.vue"
import {useDictStore} from "@/store";

const router = useRouter()
const {getDictValue} = useDictStore()

const props = defineProps({
  customerDetail: {
    type: Object,
    default: () => {
    }
  },
})
let demandFormRef = ref()

watch(() => props.customerDetail, (val) => {
  if (val && demandFormRef.value) {
    demandFormRef.value.setViewDetail(val.offerDetail)
  }
})

let status = computed(() => {
  return ['待上传我司BOM', '待检查BOM', '待收集报价', '待调整报价', '已调整待审批', '待客户确认','客户已确认'][props.customerDetail?.status - 1]
})

const toCustomerDetailInfo = () => {
  router.push({name: "customerDemand", params: {id: props.customerDetail?.customerBaseId}})
}
</script>

<style scoped lang="scss">
.customerQuoteFormWrap {
  background-color: white;
}
</style>
