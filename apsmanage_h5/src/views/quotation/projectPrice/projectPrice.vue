<template>
  <div class="project">
    <CustomerQuoteForm :customerDetail="customerDetail"></CustomerQuoteForm>
    <!--BOM详情-->
    <BomDetail class="mt-12"></BomDetail>
    <div class="project-from mt-12">
      <el-form :model="from" :rules="fromRules" label-position="left" ref="customerFormRef" class="custom-input" label-width="24vw" :disabled="isDetail">
        <el-form-item label="开机费" prop="startupStatus">
          <el-radio-group v-model="from.startupStatus">
            <el-radio :key="item.value" :label="item.value" v-for="item in startupStatus">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="" v-if="from.startupStatus===1" prop="startupFee">
          <div v-if="isDetail" v-format-money="from.startupFee"></div>
          <el-input v-else v-model="from.startupFee" maxlength="11" :formatter="(value)=>formatMoney(value)" :parser="(value)=>formatMoneyParser(value)" placeholder="整数，有开机费时必须填写"/>
        </el-form-item>
      </el-form>
      <ProjectTable :table-detail="from.offerFixtureFees" @del="delTableData" @handelTable="handelTableData" :isDetail="isDetail"></ProjectTable>
      <div class="time mt-10">
        <div class="height36 fz-14 e-gray-color" v-if="showWorkHours()">工时</div>
        <el-form :model="from" :rules="fromRules" label-position="left" ref="workHoursRef" class="custom-input" label-width="8vw" :disabled="isDetail">
          <el-form-item label="" prop="testWorkHours" v-if="showWorkHours('TEST')">
            <div class="flex">
              <div class="w-15">TEST</div>
              <el-input class="custom-input  mr-10" v-model.number="from.testWorkHours" placeholder="4位小数" type="number" inputmode="decimal"/>
              <div class="ml-10">秒</div>
            </div>
          </el-form-item>
          <el-form-item label="" prop="asmWorkHours" v-if="showWorkHours('ASM')">
            <div class="flex">
              <div class="w-15">ASM</div>
              <el-input class="custom-input  mr-10" v-model.number="from.asmWorkHours" placeholder="4位小数" type="number" inputmode="decimal"/>
              <div class="ml-10">秒</div>
            </div>
          </el-form-item>
          <el-form-item label="" prop="packWorkHours" v-if="showWorkHours('PACK')">
            <div class="flex">
              <div class="w-15">PACK</div>
              <el-input class="custom-input  mr-10" v-model.number="from.packWorkHours" placeholder="4位小数" type="number" inputmode="decimal"/>
              <div class="ml-10">秒</div>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <LoginInfo class="white-bg" height="36px"></LoginInfo>
    <NextButton text="确认" min-text="待其它岗位报价" class="mt-10" @click="confirmButton" v-if="!isDetail"></NextButton>
  </div>
</template>

<script setup>
import CustomerQuoteForm from "../module/customerQuoteForm.vue"
import LoginInfo from "@components/loginInfo.vue"
import NextButton from "@components/button/nextButton.vue"
import BomDetail from "../module/bomDetail.vue"
import ProjectTable from "./table.vue"
import {fourNumberValidate, nineNumberValidate, requiredValidate} from "@/utils/validate";
import useDict from "@/hooks/useDict";
import {saveHttpProjectOffer, getHttpProjectOffer, getHttpFixtureOffer} from "@/api/business";
import {close} from "@/utils/ddApi";
import {useBusinessStore, useDictStore, useUserStore} from "@/store";
import to from "await-to-js";
import useCustomerDetail from "@/views/quotation/module/useCustomerDetail";
import {closeLoading, openLoading} from "@/utils/toastTips";
import {Notify,Toast} from "vant";
import {formatMoney,formatMoneyParser} from '@/utils/utils'
const {getFixtureValue} = useDictStore()
let {customerDetail, offerId, type} = useCustomerDetail()

useDict({fixture: true})
let route = useRoute()
const {businessData} = storeToRefs(useBusinessStore())
const {startupStatus} = useDictStore()
let data = reactive({
  workHoursRef: '',
  customerFormRef: '',
  from: {
    customerOfferId: offerId, //报价单id
    startupStatus: 1,
    startupFee: undefined,
    testWorkHours: undefined,
    asmWorkHours: undefined,
    packWorkHours: undefined,
    createdBy: '',
    createdTime: "",
    offerFixtureFees: []
  },
  fromRules: {
    testWorkHours: [requiredValidate('请输入TEST工时')],
    asmWorkHours: [requiredValidate('请输入ASM工时')],
    packWorkHours: [requiredValidate('请输入PACK工时')],
    startupFee: [requiredValidate('请输入开机费'), {validator: fourNumberValidate, trigger: 'blur'}],
  }
})
let {from, workHoursRef, customerFormRef, fromRules} = toRefs(data)

onMounted(async () => {
  //详情接口为空时，表示第一次编辑，需要push基础数据
  let [err, data] = await to(getHttpProjectOffer(offerId))
  if (!Object.keys(data?.data).length || !data?.data.offerFixtureFees.length) {
    let [, offerFixtureFees] = await to(getHttpFixtureOffer())
    offerFixtureFees.data.length && from.value.offerFixtureFees.push(...offerFixtureFees.data)
  } else {
    delete data.data.id
    Object.assign(from.value,data.data)
  }
})

// 客户的工序，需要生成默认数据
const ideaProcess = computed(() => {
  return businessData.value?.ideaProcessList || []
})

//详情状态
let isDetail = computed(() => {
  // 等于0时，为已报价状态，不允许修改，只允许查看
  // 等于1时，表示没有报价或已经打回报价，为编辑状态
  return customerDetail.value?.projectOfferFlag === 0
})

function showWorkHours(type) {
  if (!type) {
    return showWorkHours('TEST') && showWorkHours('ASM') && showWorkHours('PACK')
  }
  return ideaProcess.value.includes(type)
}

//确认按钮
const confirmButton = () => {
  workHoursRef.value.validate((valid, fields) => {
    valid && customerFormRef.value.validate((valid, fields) => {
      if (valid) {
        let params=JSON.parse(JSON.stringify(from.value))
        if(params.startupStatus===1){
          params.startupFee= Number(formatMoneyParser(from.value.startupFee))
        }
        let parentNameSet=new Set()
        //删除主键id
        params.offerFixtureFees.forEach((item) =>{
          delete item.id
          delete item.total
          parentNameSet.add(getFixtureValue('fixtureDict', [item.parentId, item.childId]))
        })
        if(params.offerFixtureFees.length!==parentNameSet.size){
          return Notify('存在相同的治具名称')
        }
        delete params.adoptFlag
        delete params.adoptReason
        delete params.remarks
        delete params.createdBy
        delete params.createdTime
        openLoading()
        saveHttpProjectOffer({
          ...params
        }).then(() => {
          Toast("提交成功");
          setTimeout(close, 2000)
        }).finally(closeLoading)
      }
    })
  })
}

const delTableData = (index) => {
  from.value.offerFixtureFees.splice(index, 1)
}
const handelTableData = (data, index) => {
  let obj = {
    unitId: data.unitId,
    quantity: data.quantity,
    price: data.price,
    parentId: data.parentId[0],
    childId: data.parentId[1]
  }
  if (index >= 0) {
    from.value.offerFixtureFees[index] = {...obj}
  } else {
    from.value.offerFixtureFees.push({...obj})
  }

}
</script>

<style scoped lang="scss">
.project {
  &-from {
    background: #FFFFFF;
    padding: 10px 20px;
  }
}
</style>
