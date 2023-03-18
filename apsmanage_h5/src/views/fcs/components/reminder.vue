<template>
  <PxtPrompt @confirm="confirmButton" v-model:show-prompt="show" title="催一下" @cancel="cancelButton" :lock-scroll="false">
    <el-form :model="signProInfo" class="custom-input mt-30 form" label-position="left" ref="signProFormRef">
      <el-form-item label="接收人">
        <SelectPerson v-model:selectPerson="signProInfo.receiverIdList"></SelectPerson>
      </el-form-item>
      <el-form-item label="内容"  class="flex-cul">
        <el-input class="ml-50" v-model="signProInfo.remarks" type="textarea" rows="6" placeholder=""/>
      </el-form-item>
    </el-form>
  </PxtPrompt>
</template>

<script setup>
import PxtPrompt from '@/components/dialog/prompt.vue'
import SelectPerson from "@/components/selectPerson.vue";
import {Notify} from "vant";
import {saveAndNoticeRepeat} from "@/api/common";

const emit = defineEmits(["update:showPrompt"])
const props = defineProps({
  showPrompt: {
    type: Boolean,
    default: false
  },
  reminderType: {
    type: Number,
  },
  processInstanceDetail: {
    default: ()=>[]
  },
})
let show = computed(() => {
  return props.showPrompt
})

const signProInfo = reactive({
  receiverIdList:[],
  fromRunId:'',
  remarks:''
})

const confirmButton = () => {
  if(!signProInfo.receiverIdList.length) return Notify(`请选择接收人`)
  let {fromRunId,remarks,receiverIdList}=signProInfo
  saveAndNoticeRepeat({
    fromRunId,
    text:remarks,
    receiver:receiverIdList.map(item=>item.userId).join()
  }).then(()=>{
    cancelButton()
  })
}

//取消按钮
const cancelButton = () => {
  emit('update:showPrompt', false)
}

watch(()=>props.reminderType, (value)=> {
  //标题
  let {policyMessage,id,userId,userName}=props.processInstanceDetail[value]
  signProInfo.remarks=policyMessage
  signProInfo.fromRunId=id
  let tempReceiverIdList=[]
  let tempUserId=userId.split(',')
  let tempUserName=userName.split(',')
  tempUserId.forEach((item,index)=>{
    tempReceiverIdList.push({userId:tempUserId[index],name:tempUserName[index]})
  })
  signProInfo.receiverIdList=tempReceiverIdList
})

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
