<template>
  <div class="project">
     <div class="pb-10" v-for="(item,index) in detail" :key="index">
       <div class="flex ui-cell">
         <div class="label">董事长审批</div>
         <div class="value" :style="{color:item.approvalResult==0?'#34C606':'#FF3A35'}">{{ item.approvalResult==0?'通过':'退回' }}</div>
       </div>
       <div class="flex ui-cell" v-if="item.jobIdList?.length">
         <div  class="label">退回</div>
         <div class="value">{{getOfferType(item.jobIdList)}}</div>
       </div>
       <div v-else>
         <div class="label">审批备注</div>
         <div class="value ml-30">{{item.remark}}</div>
       </div>
       <HandlePeople class="white-bg" height="36px" :time="item.createdTime" :name="item.createdBy"></HandlePeople>
     </div>
  </div>
</template>

<script setup>
import HandlePeople from '@components/handlePeople.vue'
import {useDictStore} from "@/store";
let {offerType}=storeToRefs(useDictStore())

const props = defineProps({
  detail: {
    type: Array,
    default: () => []
  }
})
const getOfferType = (jobIdList=[]) => {
  let ret=[]
  jobIdList.forEach((item)=>{
    let info=offerType.value.filter((items)=>items.value==item)
    if(info.length){
      ret.push(info[0].name)
    }
  })
  return ret.length===5 ? '全部退回' :ret.join(',')
}
</script>

<style scoped lang="scss">
.project {
  &-base {
    background: #FFFFFF;
    padding: 10px 20px;
  }
  .label{
    width: 24vw;
    font-size: 14px;
    font-weight: 400;
    color:$e-gray;
    height: 36px;
    line-height: 36px;
  }
  .value{
    font-size: 14px;
    color: $b-gray;
  }
}
</style>
