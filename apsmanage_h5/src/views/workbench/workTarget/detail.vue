<template>
  <div class="work">
    <div class="head">
      <!--未开始-->
        <div class="fz-18" style="line-height: 130px" v-if="data?.flowStatus==0">当前进度：待分配到具体人员</div>
      <!--进行中-->
      <div class="flex ui-column" v-else>
        <div class="ui-cell">
          <div>指标负责人：</div>
          <div>{{data?.receiverType===1?data?.receiverDeptName:assignUserList}}</div>
        </div>
        <div class="ui-cell">
          <div>指标分配额度：</div>
          <div>{{data.description}} {{data.kpiRange}}{{data.kpiRangeValue}}{{data.dimension==1?data.kpiValueUnit:'%'}}</div>
        </div>
        <div class="ui-cell pt-6" v-html="data.remark"></div>
      </div>
    </div>
    <div class="border-t border-gray-100"></div>
    <AllotDetail :data="data"></AllotDetail>
    <NextButton text="去分配" min-text="" v-if="data?.assignAuth" class="work-submit" @click="$router.push({name:'workTargetAllot',params:{id:params.id}})"></NextButton>
  </div>
</template>

<script setup>
import AllotDetail from './module/allotDetail.vue'
import NextButton from '@components/button/nextButton.vue'
import {kpiDetail} from "@/api/workbench";
let {params}=useRoute()
let data=reactive({
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
})
onMounted(()=>{
  console.log(params)
  kpiDetail({id:params.id}).then((res)=>{
    console.log(res)
    Object.assign(data,res.data)
  })
})
let assignUserList=computed(()=>{
  if(data.assignUserList)
    return data.assignUserList.map((item)=>{
      return item.name
    }).join(',')
})
</script>

<style lang="scss" scoped>
.work {
  //height: 100%;
  background: #FFFFFF;
  margin-top: 0;
  padding: 10px 20px;
  box-sizing: border-box;
  font-size: 16px;
  font-weight: 500;
  color: #1B2124;

  .head {
    height: 154px;
    box-sizing: border-box;
    border-radius: 8px;
    background: url("../../../assets/images/myBg2.png") no-repeat;
    background-size: 336px 154px;
    font-size: 12px;
    font-weight: 400;
    color: #FFFFFF;
    padding: 19px;

    .ui-cell {
      font-size: 14px;
      color: #DCE9FF;

      div {
        line-height: 36px;
        height: 36px;
      }
    }
  }
}
</style>
<style lang="scss">
.work-submit {
  position: sticky;
  bottom: 5px;
  &>div{
    margin: 0 !important;
  }
}
</style>
