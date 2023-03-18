<template>
  <div class="form">
    <el-form label-width="140px" label-position="left">
      <el-form-item label="名称" :required="true">{{data?.kpiName}}</el-form-item>
      <el-form-item label="指标类型" :required="true">{{data?.kpiTypeName}}</el-form-item>
      <el-form-item label="指标接收人类型" :required="true">
        {{getDictValue2('indexRecipientTypeDict',data?.receiverType)}}：
        <span>
          {{data?.receiverType===1?data?.receiverDeptName:assignUserList}}
        </span>
      </el-form-item>
      <el-form-item label="分配到人" :required="true" v-if="data?.receiverType==1">
        {{getDictValue2('distributeDict2',data?.assignWays)}}
        {{data?.assignWays==1?'':'：'+assignUserList}}
      </el-form-item>
      <el-form-item label="指标说明" :required="true">{{data?.description}}</el-form-item>
      <el-form-item label="指标维度" :required="true">{{getDictValue2('dimensionDict',data?.dimension)}}</el-form-item>
      <el-form-item label="指标数值" :required="true">{{data?.kpiRange}} {{data?.kpiRangeValue}}  <span v-if="data?.dimension==2"> %</span><span v-else>{{data?.kpiValueUnit}}</span></el-form-item>
      <el-form-item label="关联指标" :required="false">{{data?.relationKpi}}</el-form-item>
      <el-form-item label="完成日期" :required="true">{{data?.finishDateType===1?data?.finishDateStr:data?.finishDate}}</el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import {useDictStore} from "@/store";
import {getKpiRelation, updateReadFlag} from "@/api/workbench";

const {indexRecipientTypeDict,getDictValue2} = useDictStore()
// let associatedIndicator=ref([])
const props = defineProps({
  data: {
    type: Object,
    default:()=>{
      return {
        kpiName:'',//指标名称
        kpiType:1,//指标类型
        kpiTypeName:'',//其他类型-指标类型名称
        receiverType:1,//指标接收人类型，1指派到组织；2指派到人
        receiverUser:[],//指标接收人，部门id或用户id
        receiverDeptName:"",//接收部门名称
        assignWays:1,//分配到人，1平均分配（系统自动计算）；2指定人员分配
        assignUser:[],//指定分配人（默认组织负责人）
        description:"",//指标说明
        assignUserList:[],
        dimension:1,//指标维度，1数值；2百分比
        kpiValueUnit:"RMB",//指标数值单位
        kpiRange:1,//指标数值-条件
        kpiRangeValue:'',//指标数值
        relationId:'',//关联指标
        finishDateType:1,//完成日期类型，1固定周期；2指定日期
        fixedCycle:'D',//固定周期，D天；W周；M月；Q季度；Y年
        finishDate:'',//完成日期
      }
    }
  }
})
let assignUserList=computed(()=>{
  if(props.data.assignUserList)
  return props.data.assignUserList.map((item)=>{
    return item.name
  }).join(',')
})
// //关联指标
// getKpiRelation().then((res)=>{
//   associatedIndicator.value=res.data
// })
</script>

<style lang="scss" scoped>
.form{
  :deep(.el-form-item__label){
    font-size: 14px;
    font-weight: 500;
    color: #8D9092;
    height: 71px;
    line-height: 71px;
  }
  :deep(.el-form-item__content){
    font-size: 14px;
    font-weight: 500;
    color: #1B2124;
    width: 200px;
  }
  :deep(.el-form-item){
    margin-bottom: 0;
    min-height: 71px;
    border-bottom: 1px solid #F5F5F5;
  }
  .el-form{
    margin-bottom: 50px;
  }
}
</style>
