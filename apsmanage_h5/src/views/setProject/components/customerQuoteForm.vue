<template>
  <div class="customerQuoteFormWrap">
    <div class="form">
      <el-form  label-position="left"  class="busElInput" label-width="24vw">
        <el-form-item label="立项单号" v-if="!isInit">{{customerDetail?.projectNo}}</el-form-item>
        <el-form-item label="状态" v-if="!isInit">
          <span  :style="{color:customerDetail?.status==2?'#FF3A35':'#0096FF'}">{{status}}</span>
        </el-form-item>
        <el-form-item label="报价单号">
          <div class="w-full flex ui-cell-sb">
            <div class="ui-nowrap">{{customerDetail?.offerNo || ''}}</div>
            <div @click="toCustomerDetailInfo(2)" class="detail ui-nowrap" v-if="customerDetail?.offerId">
              <span style="color: #0076F6;">查看详情</span>
              <van-icon class="ml-5" name="arrow" color="#0076F6"/>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="客户">
          <div class="w-full flex ui-cell-sb">
            <div class="ui-nowrap">
              {{customerDetail?.customerName}}
            </div>
            <div @click="toCustomerDetailInfo(1)" class="detail ui-nowrap" v-if="customerDetail?.customerBaseId">
              <span style="color: #0076F6;">查看详情</span>
              <van-icon class="ml-5" name="arrow" color="#0076F6"/>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="办公地址" >
          <div class="ui-nowrap" v-if="customerDetail?.officeAddress">
            <van-icon name="location" style="margin-right: 0.1rem"/>
            {{customerDetail?.officeAddress}}</div>
        </el-form-item>
        <el-form-item label="办公/厂房">
          <span v-if="customerDetail?.officeBuild">{{customerDetail?.officeBuild==1?'自有': '租赁'}}</span>
        </el-form-item>
        <el-form-item label="员工人数">{{getDictValue('employee_num',customerDetail?.employeeNumber)}}</el-form-item>
        <el-form-item label="法定代表人">{{customerDetail?.legalPerson}}</el-form-item>
        <el-form-item label="注册资本">{{getCurrencyValue(customerDetail?.currency)}} {{customerDetail?.registeredCapital}}</el-form-item>
        <el-form-item label="合作方式">
          <span v-if="customerDetail.cooperateType">
            {{ customerDetail.cooperateType === 1 ? "客供" : "代采" }}
          </span>
        </el-form-item>
        <el-form-item label="加工工序">{{customerDetail?.ideaProcess}}</el-form-item>
        <el-form-item label="产品">{{customerDetail?.productName}}</el-form-item>
        <el-form-item label="报价工厂">{{customerDetail?.factoryName}}</el-form-item>
        <el-form-item label="结算币别">{{getCurrencyValue(customerDetail?.settlementCurrency)}}</el-form-item>
        <el-form-item label="订单量">{{customerDetail?.orderNumber	}}</el-form-item>
        <el-form-item label="加工费">{{getCurrencyValue(customerDetail?.settlementCurrency)}}{{customerDetail?.processFee}}</el-form-item>
        <el-form-item label="业务开拓人">{{customerDetail?.businessName}}</el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import {useDictStore} from "@/store";
import {setTitle} from "@/utils/ddApi";
const router = useRouter()
const route = useRoute()
const {getDictValue} = useDictStore()

const props = defineProps({
  customerDetail: {
    default: ()=>{}
  },
})

const isInit=computed(()=>{
  return route.path.includes('init')
})
let demandFormRef = ref()
let status=computed(()=>{
  let data={1:"待签核", 2:"已退回", 3:"待评审", 4:"评审中", 5:"待录入评审结果", 6:"已通过"}
  return data[props.customerDetail?.status]
})
const getCurrencyValue = (value) => {
  return getDictValue('currency',value)
}

watch(() => props.customerDetail, (val) => {
  let assemTitle=route.meta?.assemTitle
  if(assemTitle){
    setTitle(`${val?.createdBy}${assemTitle}`)
  }
  // if (val && demandFormRef.value) {
  //   console.log(val)
  //   demandFormRef.value.setViewDetail(val)
  // }
})


const toCustomerDetailInfo = (val) => {
  if(val==1){
    router.push({name: "customerDemand", params: {id:props.customerDetail?.customerBaseId}})
  }else{
    router.push({name: "preview", params: {offerId:props.customerDetail?.offerId}})
  }
}
</script>

<style scoped lang="scss">
.customerQuoteFormWrap {
  background-color: white;
  .form{
    :deep(.el-form-item) {
      margin-bottom: 0;
      height: 36px;
      line-height: 36px;
    }
  }
}
</style>
