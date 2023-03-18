<template>
  <div class="project">
     <div class="pb-10" >
       <div class="flex ui-cell">
         <div class="label">客户确认</div>
         <div class="value" :style="{color:newDetail?.offerResult==0?'#34C606':'#FF3A35'}">{{newDetail.offerResult===0?'通过':'退回'}}</div>
       </div>
       <div>
         <div class="label">备注</div>
         <div class="value ml-30">{{newDetail?.remarks}}</div>
       </div>
       <HandlePeople class="white-bg" height="36px" :time="newDetail?.createdTime" :name="newDetail?.createdBy"></HandlePeople>
     </div>
  </div>
</template>

<script setup>
import HandlePeople from '@components/handlePeople.vue'
import {deepClone} from "@/utils/utils";
const props = defineProps({
  detail: {
    type: Array,
    default: ()=>[]
  },
})
const newDetail = computed(()=>{
    //只取最新的一条数据
    let detail=props.detail
    return (detail && detail.length) ? {...detail[detail.length-1]} : {}
})
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
    color: $e-gray;
    height: 36px;
    line-height: 36px;
  }
  .value{
    font-size: 14px;
    color: $b-gray;
  }
}
</style>
