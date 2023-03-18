<template>
  <PxtPrompt @confirm="confirmButton" v-model:show-prompt="show" title="建档" @cancel="cancelButton" :lock-scroll="false">
    <div class="title">当前客户尚未建档，请发起业务需求流程</div>
    <el-radio-group v-model="type">
      <el-radio  :label="1">自己去建档</el-radio>
      <el-radio  :label="2" v-if="isSend===1">推送其他人建档</el-radio>
    </el-radio-group>
    <SelectPerson v-if="type===2" v-model:selectPerson="receiverIdList"></SelectPerson>
  </PxtPrompt>
</template>

<script setup>
import PxtPrompt from '@/components/dialog/prompt.vue'
import {getHttpOfferOrderPreview  , httpProjectInitiationSend} from "@/api/business";
import SelectPerson from "@components/selectPerson.vue";
import {Notify} from "vant";
import {setItem} from "@/utils/utils";
import to from "await-to-js";
import addComma from "@/utils/addComma";
let router=useRouter()
const emit = defineEmits(["update:showPrompt","refresh"])
const props = defineProps({
  showPrompt: {
    type: Boolean,
    default: false
  },
  offerId: {
    type: Number
  },
  projectId: {
    type: Number
  },
  //推送其他人建档只能推送一次  0是 1否
  isSend: {
    type: Number
  },
})
let show = computed(() => {
  return props.showPrompt
})
let type=ref(1)
let receiverIdList=ref([])
watch(()=>props.isSend,()=>{
  type.value=1
})
const confirmButton = async () => {
  let err,data
  if(type.value===1){
    //获取报价单预览数据
    [err,data]=await to( getHttpOfferOrderPreview(props.offerId))
    try {
      //先处理下数据
      setViewDetail(data.data.offerDetail)
      setItem('outData',data.data)
      router.push({name: "addDemand", query: {'outData': true}})
    }catch (e) {
      Notify('处理数据错误')
    }
  }else{
    if(!receiverIdList.value.length) return Notify(`请选择接收人`)
    if(receiverIdList.value.length>1) return Notify(`只能选择一位接收人`)
    await to( httpProjectInitiationSend({id:props.projectId,userId:receiverIdList.value[0].userId}))
  }
  emit('refresh')
}
const setViewDetail=(info)=>{
  Object.keys(info).forEach(item => {
    if (Array.isArray(info[item])) {
      if (info[item].length == 1 && (info[item][0] == '' || info[item][0] == 'null')) {
        info[item] = []
      }
    }
  })

  const loss = {
    lossA: true,
    lossARate: '',
    lossB: false,
    lossBRate: '',
    lossC: false,
    lossCRate: '',
    invoiceAskListRadio: '',
    buybackProvision: ''
  }
  info = Object.assign(info, loss)
  /* 修改关联属性 */
  info.smeltToolFee && (info['smeltTool'] = true)
  if (info.cooperateType === 3) {
    info.invoiceAskListRadio = info.invoiceAskList[0]
  }

  if (info.buybackDays || info.buybackAsk) {
    info.buybackProvision = 1
  } else {
    info.buybackProvision = 2
  }

  if (info.importMaterialBear || info.exportProductBear || info.customsCostBear || info.materialCost) {
    info['materialCost'] = true
  }
  info.other && (info['otherCheck'] = true)

  if (info.lossRateList.length) {
    info.lossRateList.forEach(item => {
      const strList = item.split(':')
      info['loss' + strList[0]] = true
      info['loss' + strList[0] + "Rate"] = strList[1].replace('%', '')
    })
  }

  if (info.materialAccountCycleType || info.materialAccountCycle || info.materialInitiationPoint) { info['materialCheck'] = true }

  if (info.otherAccountCycleType || info.otherAccountCycle || info.otherInitiationPoint) { info['otherAccountCheck'] = true }

  if (info.processCycleType || info.processCycle || info.processInitiationPoint) { info['processCycleTypeCheck'] = true }

  info.defaultClauseText && (info['defaultClause'] = true)
  info.defaultClause = info.defaultClause == 1 ? true : false

  info.remarks && (info['remarksCheck'] = true)

  const numList = ['advanceQuota', 'advanceQuotaMax', 'advanceQuotaMin', 'registeredCapital']
  numList.forEach(item => {
    info[item] = addComma(info[item])
  })

  info.material = info.material ? info.material.split(",").map(item => item * 1) : []
  info.packageMaterial = info.packageMaterial ? info.packageMaterial.split(",").map(item => item * 1) : []

}
//取消按钮
const cancelButton = () => {
  emit('update:showPrompt', false)
}

</script>

<style scoped lang="scss">
.title{
  height: 20px;
  font-size: 14px;
  color: $e-gray;
  text-align: center;
  margin: 20px 0 15px 0;
}
.el-radio-group,.el-radio{
  display: block;
}
</style>
