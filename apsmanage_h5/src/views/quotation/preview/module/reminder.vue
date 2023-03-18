<template>
  <PxtPrompt @confirm="confirmButton" v-model:show-prompt="show" title="催一下" @cancel="cancelButton" :lock-scroll="false">
    <el-form :model="signProInfo" class="custom-input mt-30 form" label-position="left" ref="signProFormRef">
      <el-form-item label="接收人">
        <SelectPerson v-model:selectPerson="signProInfo.receiverIdList"></SelectPerson>
      </el-form-item>
      <el-form-item label="内容"  class="flex-cul">
        <el-input class="ml-50" v-model="signProInfo.remarks" type="textarea" rows="3" placeholder=""/>
      </el-form-item>
    </el-form>

  </PxtPrompt>
</template>

<script setup>
import PxtPrompt from '@/components/dialog/prompt.vue'
import {getHttpUrgeAllOffer} from "@/api/business";
import useCommon from "@/views/quotation/preview/module/useCommon";
import SelectPerson from "@components/selectPerson.vue";
import {Notify} from "vant";
let {currency,offerId}=useCommon()
let route=useRoute()
const emit = defineEmits(["update:showPrompt"])
const props = defineProps({
  showPrompt: {
    type: Boolean,
    default: false
  },
  offerType: {
    type: Number,
    default: 1
  },
  remarks: {
    type: String,
    default: ''
  },
  //默认催一下的人员
  defaultReceiverIdList: {
    type: Array,
    default: ()=>[]
  },
})
let show = computed(() => {
  return props.showPrompt
})

const signProInfo = reactive({
  receiverIdList:[],
  customerOfferId:offerId,
  remarks:'',
})


watch(()=>props.offerType, (value)=> {
  let title = {1: '工程报价', 2: '关务报价', 3: '物流报价', 4: '物料报价'}
  //标题
  signProInfo.remarks=props.remarks+title[props.offerType]
  //带出默认人员
  let list=props.defaultReceiverIdList.filter((item)=>{
    return item.type==props.offerType
  })?.[0]?.receiverIds?.map((item)=>{
    return {userId:item.id,name:item.userName}
  }) || []
  signProInfo.receiverIdList=[...list]
})
const confirmButton = () => {
  if(!signProInfo.receiverIdList.length) return Notify(`请选择接收人`)
  getHttpUrgeAllOffer({
    receiverIdList:signProInfo.receiverIdList.map(item=>item.userId),
    customerOfferId:offerId,
    offerType:props.offerType,
    remarks:signProInfo.remarks
  }).then(()=>{
    emit('update:showPrompt', false)
  })
}

//取消按钮
const cancelButton = () => {
  emit('update:showPrompt', false)
}

</script>

<style scoped lang="scss">
.form {
  margin-top: 32PX;
  .selectPersonWrap{
    margin: 0;
    width: 196px;
  }
}

</style>
