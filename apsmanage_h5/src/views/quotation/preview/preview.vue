<template>
  <div class="project">
    <CustomerQuoteForm :customerDetail="customerDetail"></CustomerQuoteForm>
    <BomDetail class="mt-12" title="BOM修改记录" isPreview ref="bomDetailRef">
    </BomDetail>
    <!--工程报价-->
    <div class="project-base mt-12">
      <ProjectTable :detail="projectOffer"></ProjectTable>
      <div class="flex ui-cell-sb height36" v-if="!projectOffer?.createdBy">
        <div class="flex">
          <div class="mr-20 e-gray-color">工程报价</div>
          <div class="flex"><div class="no-price ui-nowrap">{{defaultReceiverIdString(1)}}</div>尚未完成报价</div>
        </div>
        <RightIcon text="催一下"  @click="handleHurry(1)"></RightIcon>
      </div>
      <HistoryProjectTable v-else :projectOffer="projectOffer"></HistoryProjectTable>
    </div>
    <!--物流报价-->
    <div class="project-base mt-12">
      <LogisticTable :detail="customerDetail.logisticsOffers"></LogisticTable>
      <div class="flex ui-cell-sb height36" v-if="!customerDetail.logisticsOffers?.createdBy">
        <div class="flex">
          <div class="mr-20 e-gray-color">物流报价</div>
          <div class="flex"><div class="no-price ui-nowrap">{{defaultReceiverIdString(3)}}</div>尚未完成报价</div>
        </div>
        <RightIcon text="催一下" @click="handleHurry(3)"></RightIcon>
      </div>
      <HistoryLogisticTable  :logisticsOffers="customerDetail.logisticsOffers" v-else></HistoryLogisticTable>
    </div>
    <!--关务报价-->
    <div class="project-base mt-12">
      <CustomTable :detail="customerDetail.customsOffers"></CustomTable>
      <div class="flex ui-cell-sb height36" v-if="!customerDetail.customsOffers?.createdBy">
        <div class="flex">
          <div class="mr-20 e-gray-color">关务报价</div>
          <div class="flex"><div class="no-price ui-nowrap">{{defaultReceiverIdString(2)}}</div>尚未完成报价</div>
        </div>
        <RightIcon text="催一下" @click="handleHurry(2)"></RightIcon>
      </div>
      <HistoryCustomTable :customsOffers="customerDetail.customsOffers" v-else></HistoryCustomTable>
    </div>
    <!-- 物料报价-->
    <div class="project-base mt-12">
      <MaterialTable :tableDetail="customerDetail?.materialOffers?.materialOfferList || []"></MaterialTable>
      <BusinessFileList style="width: 240px;" class="mt-10" :showDelete="false" :fileList="materialOfferOriginalFile"></BusinessFileList>
      <div class="flex ui-cell-sb" >
        <div class="flex ui-cell height36" v-if="materialNameList.length">
          <van-icon name="warning" class="mr-8" color="#FA8603" size="16"/>
          <div v-if="materialNameList.length===1" color="#FA8603">物料{{materialNameList?.[0]}}没有报价</div>
          <div v-else>存在<span color="#FA8603">{{materialNameList.length}}</span>笔物料没有报价</div>
        </div>
        <div v-else></div>
        <RightIcon  text="催一下" @click="handleHurry(4)" v-show="!isGuest" v-if="customerDetail?.materialOfferFlag===1 || materialNameList.length"></RightIcon>
      </div>
    </div>
    <!--加工费报价-->
    <!--人手调整才有历史记录-->
    <div>
      <ProcessTable :detail="customerDetail?.processFeeOffer"></ProcessTable>
      <template v-if="customerDetail?.processFeeOffer?.processFeeList">
        <HandlePeople :customerDetail="customerDetail" class="project-base pt-0!" :time="customerDetail.processFeeOffer?.createdTime" :name="customerDetail.processFeeOffer?.createdBy"></HandlePeople>
        <HistoryProcessTable class="project-base pt-0!"></HistoryProcessTable>
      </template>
    </div>
    <!--董事长审批-->
     <SuperAudit class="project-base mt-12" :detail="customerDetail.offerApprovalInfo" v-if="customerDetail?.offerApprovalInfo?.length"></SuperAudit>
    <!-- 外发客户报价-->
    <OutInfo class="project-base mt-12" v-for="(item,index) in customerDetail?.mailRecord" :key="index" :detail="item"></OutInfo>
    <!-- 客户确认-->
    <CustomerConfirm class="project-base mt-12" :detail="customerDetail?.customerOfferResult" v-if="customerDetail?.customerOfferResult?.length"></CustomerConfirm>
    <!-- 报价单状态=已确认 & 未建档客户 & 当前登录者的身份是 业务，显示此红框中的签名+按钮；-->
    <LoginInfo height="36px" class="mt-10" v-if="showFil"></LoginInfo>
    <!-- v-if="showFil"-->
    <NextButton text="去建档" min-text=" 补业务需求表" class="mt-10 pt-10" v-if="showFil" @click="putOnRecord" ></NextButton>
    <!-- 催一下-->
    <Reminder v-model:showPrompt="reminderShow" :defaultReceiverIdList="defaultReceiverIdList" :offerType="offerType" :remarks="'请尽快完成以下任务:'+bomDetailRef.bomDetail?.createdBy+'发起的报价申请-'"></Reminder>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "../module/customerQuoteForm.vue"
import LoginInfo from "@components/loginInfo.vue"
import NextButton from "@components/button/nextButton.vue"
import BomDetail from "../module/bomDetail.vue"
import ProjectTable from '../adjustPrice/module/projectTable.vue'
import LogisticTable from '../adjustPrice/module/logisticTable.vue'
import CustomTable from '../adjustPrice/module/customTable.vue'
import MaterialTable from '../adjustPrice/module/materialTable.vue'
import ProcessTable from '../adjustPrice/module/processTable.vue'
import BusinessFileList from '@/components/businessFileList/index.vue'
import RightIcon from '@components/rightIcon.vue'
import HandlePeople from '@components/handlePeople.vue'
import SuperAudit from '../module/superAudit.vue'
import OutInfo from './module/outInfo.vue'
import CustomerConfirm from './module/customerConfirm.vue'
import HistoryProjectTable from './module/historyProjectTable.vue'
import HistoryLogisticTable from './module/historyLogisticTable.vue'
import HistoryCustomTable from './module/historyCustomTable.vue'
import HistoryProcessTable from './module/historyProcessTable.vue'
import Reminder from './module/reminder.vue'
import useDict from "@/hooks/useDict";
import {useDictStore, useUserStore} from "@/store";
import useCustomerDetail from "@/views/quotation/module/useCustomerDetail";
import {getHttpProjectOffer, getHttpUrgeReceiverList} from "@/api/business";
import {setItem} from "@/utils/utils";
let {isBusiness}=storeToRefs(useUserStore())
let router=useRouter()
let {offerId, customerDetail,isGuest} = useCustomerDetail()
useDict({fixture:true})
const {unit, getDictValue} = useDictStore()

let data=reactive({
  reminderShow:false,
  offerType:0,
  projectOffer:{},
  bomDetailRef:'',
  defaultReceiverIdList:[]
})
let {reminderShow,projectOffer,offerType,bomDetailRef,defaultReceiverIdList}=toRefs(data)

//币种
let offerCurrency = computed(() => {
  return getDictValue('currency',customerDetail.value?.offerDetail?.offerCurrency || 1 )
})
//显示去建档 报价单状态=已确认 & 未建档客户 & 当前登录者的身份是 业务，
let showFil = computed(() => {
  return customerDetail.value?.status===7 && customerDetail.value?.customerType===2 && isBusiness.value
})
let materialNameList = computed(() => {
  return customerDetail.value?.materialOffers?.materialNameList || []
})
//币种provide
provide('currency',offerCurrency )
//用了一些公用的组件，控制他们显示详情状态
provide('isDetail', true)
onMounted(()=>{
  //获取工程报价
  getProjectOffer()
  getUrgeReceiverList()
})

const getProjectOffer = () => {
  getHttpProjectOffer(offerId).then((res) => {
    projectOffer.value = res.data
  })
}
const handleHurry = (type) => {
  data.reminderShow=true
  data.offerType=type
}

let materialOfferOriginalFile = computed(() => {
  let materialOfferOriginalFile = customerDetail.value?.materialOffers?.materialOfferOriginalFile
  return materialOfferOriginalFile?.name ? [materialOfferOriginalFile] : []
})
const putOnRecord = () => {
  setItem('outData',customerDetail.value)
  router.push({name: "addDemand", query: {'outData': true}})
}
const getUrgeReceiverList = () => {
  getHttpUrgeReceiverList({offerId}).then(((res)=>{
    defaultReceiverIdList.value=res.data
    console.log(defaultReceiverIdList.value)
  }))
}
const defaultReceiverIdString= (type) => {
  let list=defaultReceiverIdList.value.filter((item)=>{
    return item.type==type
  })?.[0]?.receiverIds?.map((item)=>{
    return item.userName
  })
  return list?.join(',')
}

</script>

<style scoped lang="scss">
.project {
  &-base {
    background: #FFFFFF;
    padding: 10px 20px;
  }
  .no-price{
    max-width: 70px;
  }

  .bom {
    padding: 10px 20px 0 20px;
    background: #FFFFFF;
    color: #4a4a4a;
    font-size: 14px;

    .label {
      font-size: 14px;
      color: $e-gray;
      height: 36px;
      line-height: 36px;
    }

    .file {
      margin-left: 60px;
      width: 245px;
    }
  }
}

</style>
