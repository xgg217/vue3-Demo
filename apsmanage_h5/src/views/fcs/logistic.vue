<template>
  <div class="custom">
    <div class="base pt-10! pb-10!">
      <CustomerQuoteForm :customer-detail="previewDetail"></CustomerQuoteForm>
    </div>
    <!--订单图表-->
    <div class="mt-12">
      <CollectEcharts :fcs-base-id="fcsBaseId"></CollectEcharts>
    </div>
    <layoutModule title="物流方案选择">
      <template #main>
        <el-form ref="ruleForm" class="busElInput custom-input" :model="form" label-width="24vw" label-position="left" :disabled="isLogisticsDetail">
          <div v-for="(item,index) in form" :key="index">
            <!--国内运输-->
            <el-form-item label="国内运输" v-if="item.transportType==1">
              <el-select v-model="item.logisticsCompanyId" value-key="paramValue" placeholder="请选择物流公司">
                <el-option :label="item.paramName" :value="item.paramValue" v-for="item in z_logistics_company" :key="item.paramValue"/>
              </el-select>
            </el-form-item>
            <el-form-item label="中港运输" prop="logisticsCompanyId" v-if="item.transportType==2">
              <el-select v-model="item.logisticsCompanyId" value-key="paramValue" placeholder="请选择物流公司">
                <el-option :label="item.paramName" :value="item.paramValue" v-for="item in g_logistics_company" :key="item.paramValue"/>
              </el-select>
            </el-form-item>
            <el-form-item label="出发地" :prop="index + '.startAddress'" :rules="[{required: true, message:'请输入出发地', trigger: 'blur'}]">
              <el-input v-model.trim="item.startAddress" placeholder="物流报价出发地" maxlength="30"/>
            </el-form-item>
            <el-form-item label="目的地" :prop="index + '.targetAddress'" :rules="[{required: true, message: '请输入目的地', trigger: 'blur'}]">
              <el-input v-model.trim="item.targetAddress" placeholder="物流报价目的地" maxlength="30"/>
            </el-form-item>
            <el-form-item label="件数">
              <el-input v-model.number="item.pieceNumber" placeholder="文本信息，不用于计算" maxlength="10"/>
            </el-form-item>
            <el-form-item label="栈板数">
              <el-input v-model.number="item.prototypeNumber" placeholder="手动录入" maxlength="10"/>
            </el-form-item>
            <el-form-item label="重量">
              <el-input v-model.trim="item.weight" placeholder="文本信息，不用于计算" maxlength="30"/>
            </el-form-item>
            <el-form-item label="材积">
              <el-input v-model.trim="item.volume" placeholder="手动录入" maxlength="30"/>
            </el-form-item>
            <el-form-item label="装车时间" @click="openSpecifiedTimeShow('entruckTime',index)">
              <el-input readonly v-model="item.entruckTime" placeholder="手动录入" />
            </el-form-item>
            <el-form-item label="车型">
              <el-input v-model="item.vehicleType" placeholder="手动录入" />
            </el-form-item>
            <el-form-item label="收货时间">
              <el-input readonly v-model="item.receiveTime" placeholder="手动录入" @click="openSpecifiedTimeShow('receiveTime',index)"/>
            </el-form-item>
            <!--中港才有-->
            <el-form-item label="交仓时间" v-if="item.transportType==2">
              <el-input readonly v-model="item.warehouseTime" placeholder="手动录入" @click="openSpecifiedTimeShow('warehouseTime',index)"/>
            </el-form-item>
            <el-form-item label="备注">
              <el-input v-model.trim="item.remarks" placeholder="物流报价备注" maxlength="250"/>
            </el-form-item>
            <el-form-item label="价格" :prop="index + '.logisticsOffer'" :rules="[requiredValidate('请输入价格'), {validator: fourNumberValidate, trigger: 'blur'}]">
              <div class="ui-cell">
                <div class="width-88 shrink-0 mr-10">
                  <el-select v-model="item.currency" value-key="paramValue" placeholder="">
                    <el-option :label="item.paramName" :value="item.paramValue" v-for="item in currency" :key="item.value"/>
                  </el-select>
                </div>
                <el-input v-model="item.logisticsOffer" placeholder="物流报价" :formatter="(value)=>formatMoney(value)" :parser="(value)=>formatMoneyParser(value)" inputmode="numeric"/>
              </div>
            </el-form-item>
            <div class="line" v-if="form?.length==2 && index===0"></div>
          </div>
        </el-form>
      </template>
    </layoutModule>
    <LoginInfo></LoginInfo>
    <div class="next">
      <NextButton text="确定" min-text="通知商务经理" @click="saveFcsLogistics" v-if="!isLogisticsDetail"></NextButton>
    </div>
    <van-calendar :min-date="new Date()" color="#1572F9" v-model:show="specifiedTimeShow" @confirm="handelTimeConfirm"/>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "./components/customerQuoteForm.vue"
import CollectEcharts from "./components/collectEcharts2.vue"
import LoginInfo from '@components/loginInfo.vue';
import NextButton from '@components/button/nextButton.vue';
import {Toast} from 'vant';
import { getHttpFcsLogistics, saveHttpFcsLogistics} from "@/api/business"
import {openLoading, closeLoading} from "@/utils/toastTips"
import {useDictStore} from "@/store";
import useReviewDetail from "@/views/fcs/useReviewDetail";
import {deepClone, formatMoney, formatMoneyParser, year} from '@/utils/utils'
import {fourNumberValidate, requiredValidate} from "@/utils/validate";
import {close} from "@/utils/ddApi";

let {fcsTaskId, fcsBaseId, previewDetail, isLogisticsDetail} = useReviewDetail({isGetWeek: false,isCompany:true})
const {currency, g_logistics_company,z_logistics_company} = storeToRefs(useDictStore())
const defaultKey={logisticsCompanyId: '', transportType: '1', startAddress: "", targetAddress: "", pieceNumber: '', prototypeNumber: '', weight: "", volume: "", entruckTime: "", receiveTime: "", logisticsOffer: '', currency: '1', warehouseTime: "", vehicleType:'', remarks: "",}
let form = ref([{...defaultKey}])
let specifiedTimeShow = ref(false)
let specifiedTimeIndex = ref(0)
let specifiedTimeKey = ref('')
let ruleForm = ref(null)

const saveFcsLogistics = () => {
  ruleForm.value.validate((valid, fields) => {
    if (!valid) return
    let data = deepClone(form.value)
    for (let i = 0; i < data.length; i++) {
      data[i].logisticsOffer = formatMoneyParser(data[i].logisticsOffer)
    }
    let params = {
      fcsBaseId: fcsBaseId.value,
      fcsTaskId,
      logisticsInfoList: data
    }
    openLoading()
    saveHttpFcsLogistics(params)
        .then((res) => {
          Toast("提交成功");
          setTimeout(close, 2000)
        }).finally(closeLoading)
  })


}
const openSpecifiedTimeShow = (key, index) => {
  if(isLogisticsDetail.value) return
  specifiedTimeIndex.value = index
  specifiedTimeKey.value = key
  specifiedTimeShow.value = true
}
const handelTimeConfirm = (val) => {
  form.value[specifiedTimeIndex.value][specifiedTimeKey.value] = year(val)
  specifiedTimeShow.value = false
}

watch(() => previewDetail, (val) => {
  //编辑状态并且包含香港，push中港运输
  if(val &&  Object.keys(val).length && !isLogisticsDetail.value && (previewDetail.deliverAddrs.includes('香港') || previewDetail.receiptAddrs.includes('香港'))){
    form.value.push({...defaultKey, transportType: '2'})
  }
},{deep:true})

const getFcsLogistics = () => {
  getHttpFcsLogistics({fcsTaskId}).then((res) => {
    if (res.data.length){
      form.value =res.data
    }
  })
}

onMounted(() => {
  getFcsLogistics()
})
</script>

<style scoped lang="scss">
.custom {
  margin-bottom: 60px;

  .base {
    background-color: white;
    padding: 0 20px 1px 20px;
  }

  .next {
    position: absolute;
    width: 100%;
    bottom: 0;

    .save {
      padding-top: 10px;
    }
  }

  :deep(.el-form-item__label) {
    justify-content: flex-start;
    width: 30vw;
  }

  :deep(.el-input__wrapper) {
    height: 36px !important;
  }

  .line {
    width: 375px;
    height: 12px;
    background: #F6F6FB;
    position: relative;
    left: -20px;
    right: 0;
    margin-bottom: 20px;
  }
}

</style>

