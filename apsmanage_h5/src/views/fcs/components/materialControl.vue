<template>
  <div class="material custom-input">
    <el-checkbox-group v-model="checkList" :disabled="isDetail">
      <el-checkbox label="producePlanFlag">产前规划</el-checkbox>
      <el-checkbox label="capacityPlanFlag">产能规划</el-checkbox>
      <el-checkbox label="materialFlag">是否齐料</el-checkbox>
      <el-checkbox label="onlineTimeFlag" >上线时间</el-checkbox>
      <el-checkbox label="deliverTimeFlag"  >交付时间</el-checkbox>
      <div class="group-time">
        <div  class="date ui-cell ui-cell-sb" :class="{'bg':isDetail}" @click="openSpecifiedTimeShow(1)">
          <div v-if="materialDetail.onlineTime"  class="b-gray-color">{{materialDetail.onlineTime}}</div>
          <div v-else>{{isDetail?'':'选择日期'}}</div>
          <van-icon name="notes-o" size="26" v-if="!isDetail"/>
        </div>
        <div  class="date ui-cell ui-cell-sb mt-6" :class="{'bg':isDetail}" @click="openSpecifiedTimeShow(2)">
          <div v-if="materialDetail.deliverTime" class="b-gray-color">{{materialDetail.deliverTime}}</div>
          <div v-else>{{isDetail?'':'选择日期'}}</div>
          <van-icon name="notes-o" size="26" v-if="!isDetail"/>
        </div>
      </div>
    </el-checkbox-group>
    <van-calendar :min-date="new Date()" color="#1572F9" v-model:show="specifiedTimeShow" @confirm="handelTimeConfirm"/>
  </div>
</template>

<script setup>
import { year} from "@/utils/utils";
const keys=["producePlanFlag", "capacityPlanFlag", "materialFlag", "onlineTimeFlag", "deliverTimeFlag"]
const props = defineProps({
  isDetail: {
    type: Boolean,
    default: false
  },
  detail: {
    type: Object,
    default: ()=>{}
  },
})

let materialDetail=reactive({
  onlineTime:'',
  deliverTime:''
})
let checkList = ref([...keys])
let specifiedTimeShow = ref(false)
let specifiedTimeType = ref(1)

watch(()=>props.detail,(val)=>{
  if(val){
    materialDetail.onlineTime=val?.onlineTime
    materialDetail.deliverTime=val?.deliverTime
    checkList.value=keys.filter(item=>val[item]==0)
  }
},{immediate:true,deep:true})

const openSpecifiedTimeShow = (val) => {
  if(!props.isDetail){
    specifiedTimeShow.value = true
    specifiedTimeType.value = val
  }
}
const handelTimeConfirm = (val) => {
  materialDetail[specifiedTimeType.value==1?'onlineTime':'deliverTime']=year(new Date(val))
  specifiedTimeShow.value = false
}

defineExpose({
  materialDetail,checkList
})
</script>

<style scoped lang="scss">
.material {
  :deep(.el-checkbox-group) {
    margin-left: 50px;
    position: relative;
  }

  :deep(.el-checkbox) {
    display: flex;
    height: 40px;
    width: 100px;
  }

  :deep(.el-checkbox__label) {
    color: $b-gray;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
  :deep(.el-checkbox__input){
    z-index: 0;
  }
  .group-time{
    position: absolute;
    top: 124px;
    right: 00px;
  }
  .date {
    width: 151px;
    height: 36px;
    border-radius: 2px;
    font-size: 14px;
    color: #B2BAD1;
    margin-left: 24px;
    padding: 0 6px 0 10px;
  }
  bg{
    background: #F6F6FB;
  }

}

</style>
