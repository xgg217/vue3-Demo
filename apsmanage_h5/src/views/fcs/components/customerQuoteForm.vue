<template>
  <div class="customerQuoteFormWrap">
    <div class="form">
      <el-form  ref="customerRef1" label-position="left"  class="busElInput" label-width="24vw">
        <slot>
          <el-form-item label="客户" prop="customerId">
            <div class="ui-cell ui-cell-sb" v-if="!isInit">
              <div class="width-160!" >{{customerDetail?.customerName}}</div>
              <div @click="toCustomerDetailInfo(customerDetail.businessType,customerDetail.businessId)" class="ui-nowrap width-80 shrink-0 ml-10">
                <span style="color: #0076F6;">查看详情</span>
                <van-icon class="ml-5" name="arrow" color="#0076F6"/>
              </div>
            </div>
          </el-form-item>
        </slot>
        <el-form-item label="办公地点">
          <div class="ui-nowrap" v-if="customerDetail?.officeAddress">
            <van-icon name="location" style="margin-right: 0.1rem"/>
            {{customerDetail?.officeAddress}}</div>
        </el-form-item>
        <el-form-item label="办公/厂房"><span v-if="customerDetail?.officeBuild">{{customerDetail?.officeBuild==1?'自有': '租赁'}}</span></el-form-item>
        <el-form-item label="员工人数">{{customerDetail?.employeeNumber}}</el-form-item>
        <el-form-item label="法定代表人">{{customerDetail?.legalPerson}}</el-form-item>
        <el-form-item label="注册资本">
          {{dictStore.getDictValue('currency',customerDetail?.employeeNumber)}} {{customerDetail?.registeredCapital}}</el-form-item>
        <el-form-item label="合作方式">
           <span v-if="customerDetail.cooperateType">
             {{coopTypeList[customerDetail.cooperateType - 1]}} {{customerDetail.cooperateType == 3 ? '' : customerDetail.purchaseModel == 2 ? '代采' : '客供'}}
          </span>
        </el-form-item>
        <el-form-item label="加工工序">{{customerDetail?.ideaProcess}}</el-form-item>
<!--        <el-form-item label="产品">{{customerDetail?.productName}}</el-form-item>-->
        <el-form-item label="结算币别">{{dictStore.getDictValue('currency',customerDetail?.settlementCurrency)}}</el-form-item>
        <el-form-item label="订单量">{{customerDetail?.orderNumber	}}</el-form-item>
        <el-form-item label="业务开拓人">{{customerDetail?.createdBy}}</el-form-item>
      </el-form>
    </div>
    <div class="border"></div>
    <slot name="map"></slot>
    <div class="form pt-10" v-if="!isInit">
      <el-form  label-position="left"  class="busElInput" label-width="24vw">
        <el-form-item label="发货地点" >
          <div class="more address">
            <van-icon name="location" color="#1572F9;" class="mr-1" /> {{ customerDetail.deliverAddrs}}
          </div>
        </el-form-item>
        <el-form-item label="收货地点" >
          <div class="more address">
            <van-icon name="location" color="#1572F9;" class="mr-1" /> {{ customerDetail.receiptAddrs}}
          </div>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import useReviewDetail from "@/views/fcs/useReviewDetail";
let {toCustomerDetailInfo,route} = useReviewDetail({isGetWeek:false,isGetDetail:false,isGetDict:false})
import {useDictStore} from "@/store";
let dictStore= useDictStore()
let {coopTypeList}=storeToRefs(dictStore)
const props = defineProps({
  customerDetail: {
    default: ()=>{}
  },
})

const isInit=computed(()=>{
  return route.path.includes('init')
})
</script>

<style scoped lang="scss">
.customerQuoteFormWrap {
  z-index: 1;
  background-color: white;
  .form{
    :deep(.el-form-item) {
      margin-bottom: 0;
      height: 36px;
      line-height: 36px;
    }
  }
  .border{
    width: calc(100% + 40px);
    position: relative;
    left: -20px;
    height: 13px;
    background: #F4F5FC;
    border: 0;
  }
  .address{
    border-radius: 2px;
    width: 100%;
    color: #1572F9;
    box-sizing: border-box;
  }
}
</style>
