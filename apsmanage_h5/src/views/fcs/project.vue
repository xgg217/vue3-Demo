<template>
  <div class="custom">
    <div class="base pt-10! pb-10!">
      <CustomerQuoteForm :customer-detail="previewDetail"></CustomerQuoteForm>
    </div>
    <!--订单图表-->
    <div class="mt-12">
      <CollectEcharts :fcsBaseId="fcsBaseId"></CollectEcharts>
    </div>
    <layoutModule title="客户料号 VS 我司料号">
      <template #main>
        <template v-for="(item,index) in projectDetail" :key="index">
          <div class="table-border w-full ">
            <PxTable :cols="tableCol" :data-source="[item]" class="w-full">
              <template #customerItemNo="{row}">
                <div>{{ row?.customerItemNo }}</div>
              </template>
              <template #fcsModel="{row}">
                <div>{{ row?.fcsModel }}</div>
              </template>
              <template #companyItemNo="{row}">
                <div>{{ row?.companyItemNo }}</div>
              </template>
            </PxTable>
          </div>
          <div class="busElInput pt-10 pb-10">
            <el-form-item  label="报价工厂" >{{dictStore.getDictValue('factory',item?.factoryId)  || '-'}}</el-form-item>
            <el-form-item  label="报价订单量" >{{item?.orderNumber  ?? '-'}}</el-form-item>
            <el-form-item  label="加工费" >{{item?.processCost  ?? '-'}}</el-form-item>
            <el-form-item  label="其它费用" >{{item?.otherCost  ?? '-'}}</el-form-item>
            <el-form-item  label="报价BOM物料数"  color="#1572F9">
              <div class="pr-10">{{item?.bomMaterialNumber ?? '-'}}</div>
              <div class="pr-10" v-if="item?.offerId" @click="toCustomerDetailInfo('2',item.offerId)">点击查看报价单详情</div>
            </el-form-item>
            <el-form-item  label="ERP BOM物料数" :style="styleColor(item)">{{item?.erpMaterialNumber  ?? '-'}}</el-form-item>
            <el-form-item  label="ERP物料所属" :style="styleColor(item)" >{{item?.materialCompany  ?? '-'}}</el-form-item>
          </div>
        </template>
      </template>
    </layoutModule>
    <LoginInfo></LoginInfo>
    <div class="next">
      <NextButton text="完成" min-text="通知产前准备"  @click="setFcsProject" v-if="!isProjectDetail" ></NextButton>
    </div>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import CollectEcharts from "./components/collectEcharts2.vue"
import LoginInfo from '@components/loginInfo.vue';
import NextButton from '@components/button/nextButton.vue';
import { Toast} from 'vant';
import {getHttpFcsProject, setHttpFcsProject} from "@/api/business"
import {openLoading, closeLoading} from "@/utils/toastTips"
import PxTable from "@/components/table/table.vue"
import {close} from "@/utils/ddApi";
import useReviewDetail from "@/views/fcs/useReviewDetail";

let {fcsTaskId,fcsBaseId,previewDetail,isProjectDetail,router,toCustomerDetailInfo,factory, dictStore}=useReviewDetail()

const tableCol=[
  {label: "客户料号", key: "customerItemNo", scope: {customRender: "customerItemNo"},},
  {label: "型号", key: "fcsModel",scope: {customRender: "fcsModel"}},
  {label: "我司料号", key: "companyItemNo", scope: {customRender: "companyItemNo"}},
]

let data = reactive({
  projectDetail:[],
})
let {projectDetail} = toRefs(data)

onMounted(()=>{
  getFcsProject()
})

const setFcsProject = () => {
  // 工程和关务交给后端做校验
  // for (let i = 0; i < projectDetail.value.length; i++) {
  //   if(!projectDetail.value[i]?.companyItemNo || !projectDetail.value[i]?.customerItemNo){
  //     return Notify(`物料不全`);
  //   }
  // }
  openLoading()
  setHttpFcsProject(fcsTaskId)
      .then((res) => {
        Toast("提交成功");
        setTimeout(close, 2000)
      }).finally(closeLoading)
}

const getFcsProject = () => {
  getHttpFcsProject({fcsTaskId}).then((res)=>{
      projectDetail.value=res.data
  })
}

const styleColor = ({materialNumberFlag=0}) => {
  return materialNumberFlag==1 ?{color:'#FF3A35'}:{}
}
</script>

<style scoped lang="scss">
.custom {
  margin-bottom: 60px;
  .base {
    background-color: white;
    padding: 0 20px 1px 20px;
  }
  .next{
    position: absolute;
    width: 100%;
    bottom: 0;
    .save{
      padding-top: 10px;
    }
  }
  :deep(.el-form-item__label){
    justify-content: flex-start;
    width: 32vw;
  }
  :deep(.el-form-item){
    margin-bottom: 0;
  }
}

</style>
