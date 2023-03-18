<template>
  <div class="allot">
    <div class="form custom-input">
      <el-form label-width="30vw" label-position="left" :model="data" :rules="fromRules"  ref="formRef">
        <el-form-item label="名称" prop="kpiName">
          <el-input  v-model.trim="data.kpiName" placeholder="请输入指标名称" />
        </el-form-item>
        <el-form-item label="指标类型" prop="kpiType">
          <el-radio-group v-model="data.kpiType">
            <el-radio :key="item.value" :label="item.value" v-for="item in indexTypeDict">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--指标类型-其他指标-->
        <el-form-item label="" v-if="data.kpiType===0" prop="kpiTypeName">
          <el-input  v-model.trim="data.kpiTypeName" placeholder="其他指标" />
        </el-form-item>
        <el-form-item label="指标接收人类型" prop="receiverType">
          <el-radio-group v-model="data.receiverType">
            <el-radio :key="item.value" :label="item.value" v-for="item in indexRecipientTypeDict">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!--指标接收人类型-指派到组织-->
        <el-form-item label="" v-if="data.receiverType===1" prop="receiverUser">
          <el-select   v-if="receiverDeptNameShow" v-model="data.receiverUser" @change="setItem" filterable v-r-readonly="[0, 0, 0, 0]" placeholder="输入关键字搜索">
            <el-option v-for="item in receiverDeptNameDict" :key="item.id" :label="item.orgName" :value="item.id" />
          </el-select>
        </el-form-item>
        <!--指标接收人类型-指派到人-->
        <el-form-item label="" v-if="data.receiverType===2" prop="assignUserList">
          <SelectPerson v-model:selectPerson="data.assignUserList" class="person" filter></SelectPerson>
        </el-form-item>
        <template v-if="data.receiverType==1">
          <el-form-item label="分配到人" prop="assignWays">
            <el-radio-group v-model="data.assignWays">
              <el-radio :key="item.value" :label="item.value" v-for="item in distributeDict2">{{ item.name }}</el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="" v-if="data.assignWays===2" prop="assignUserList">
<!--            <el-input  v-model.number="data.assignUser" placeholder="默认组织负责人" />-->
            <SelectPerson v-model:selectPerson="data.assignUserList" class="person" filter></SelectPerson>
          </el-form-item>
        </template>
        <el-form-item label="指标说明" prop="description">
          <el-input  v-model.trim="data.description" placeholder="指标说明" maxlength="100"/>
        </el-form-item>
        <el-form-item label="指标维度" prop="dimension">
          <el-radio-group v-model="data.dimension">
            <el-radio :key="item.value" :label="item.value" v-for="item in dimensionDict">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="指标数值" prop="kpiRangeValue">
          <div class="flex">
            <div class="w-15 mr-10 shrink-0">
              <el-select v-model="data.kpiRange" placeholder="">
                <el-option :label="item.name" :value="item.value" v-for="item in calculateDict" :key="item.value"/>
              </el-select>
            </div>
            <div>
              <el-input v-model.number="data.kpiRangeValue" placeholder="指标数值" />
            </div>
            <div class="pl-5" v-if="data.dimension===1">
              <el-select v-model="data.kpiValueUnit" placeholder="">
                <el-option :label="item.name" :value="item.value" v-for="item in targetUnitDict" :key="item.value"/>
              </el-select>
            </div>
            <div class="pl-5" v-if="data.dimension===2">%</div>
          </div>
        </el-form-item>
        <el-form-item label="关联指标" prop="relationId">
          <el-select  v-if="associatedIndicatorShow" v-model="data.relationId" filterable v-r-readonly="[0, 0, 0, 0]"  placeholder="输入关键字搜索" >
            <el-option v-for="item in associatedIndicator" :key="item.id" :label="item.kpiName" :value="item.id"/>
          </el-select>
        </el-form-item>
        <el-form-item label="完成日期" prop="finishDateType">
          <el-radio-group v-model="data.finishDateType" >
            <el-radio :key="item.value" :label="item.value" v-for="item in timeDict">{{ item.name }}</el-radio>
          </el-radio-group>
        </el-form-item>
        <!-- 完成日期-固定日期-->
        <el-form-item label="" v-if="data.finishDateType===1" prop="fixedCycle">
          <el-select v-model="data.fixedCycle" placeholder="">
            <el-option :label="item.name" :value="item.value" v-for="item in fixedTimeDict" :key="item.value"/>
          </el-select>
        </el-form-item>
        <!-- 完成日期-指定日期-->
        <el-form-item label="" v-if="data.finishDateType===2" @click="handleSpecifiedTime" prop="finishDate">
          <el-input v-model="data.finishDate" placeholder="指定日期" />
          <img src="@/assets/workbench/1.png" alt="" class="time" >
        </el-form-item>
      </el-form>
    </div>
    <div class="ui-cell save-btn mt-12">
      <NextButton text="取消" min-text="" class="pt-10 save-preview" @click="$router.back()"></NextButton>
      <NextButton text="确认" min-text="" class="pt-10 save-confirm" @click="confirm"></NextButton>
    </div>
    <van-calendar color="#1572F9" v-model:show="specifiedTimeShow" @confirm="handelTimeConfirm" />
  </div>
</template>

<script setup>
import {useDictStore} from "@/store";
import NextButton from '@components/button/nextButton.vue'
import SelectPerson from "@components/selectPerson.vue";
import useSelectBlur from "@/hooks/useSelectBlur";
import {getYMD} from "@/utils/timeFormat";
import {getCurrUserOrg, getKpiRelation, kpiDetail, kpiSave, kpiUpdate} from "@/api/workbench";
import {requiredValidate} from "@/utils/validate";
import {Toast} from "vant";
import router from "@/router";
let {params}=useRoute()
const {indexTypeDict,indexRecipientTypeDict,distributeDict2,dimensionDict,calculateDict,timeDict,fixedTimeDict,targetUnitDict} = useDictStore()
let data=reactive({
  kpiName:'',//指标名称
  kpiType:1,//指标类型
  kpiTypeName:'',//其他类型-指标类型名称
  receiverType:1,//指标接收人类型，1指派到组织；2指派到人
  receiverUser:"",//接收部门id
  receiverDeptName:"",//接收部门名称
  assignUserList:[], //指派到人
  assignWays:1,//分配到人，1平均分配（系统自动计算）；2指定人员分配
  // assignUser:[],//指定分配人（默认组织负责人）
  description:"",//指标说明
  dimension:1,//指标维度，1数值；2百分比
  kpiValueUnit:"RMB",//指标数值单位
  kpiRange:">",//指标数值-条件
  kpiRangeValue:'',//指标数值
  relationId:'',//关联指标
  finishDateType:1,//完成日期类型，1固定周期；2指定日期
  fixedCycle:'',//固定周期，D天；W周；M月；Q季度；Y年
  finishDate:'',//完成日期
})
let formRef=ref()
let specifiedTimeShow=ref(false)
let fromRules=reactive({
  kpiName: [requiredValidate('请输入')],
  kpiTypeName: [requiredValidate('请输入')],
  receiverUser: [requiredValidate('请选择')],
  assignWays: [requiredValidate('请选择')],
  assignUserList: [requiredValidate('请选择')],
  description: [requiredValidate('请输入')],
  kpiRangeValue: [requiredValidate('请输入')],
  // relationId: [requiredValidate('请选择')],
  finishDate: [requiredValidate('请选择')],
  fixedCycle: [requiredValidate('请选择')],
  finishDateType: [requiredValidate('请选择')],
  dimension: [requiredValidate('请选择')],
  kpiType: [requiredValidate('请选择')],
  receiverType: [requiredValidate('请选择')],
})
//关联指标
const associatedIndicator = ref([])
let {isShow:receiverDeptNameShow} = useSelectBlur(data.relationId)
// 下级组织
const receiverDeptNameDict = ref([])
let {isShow:associatedIndicatorShow} = useSelectBlur(data.receiverUser)

const handleSpecifiedTime = () => {
  specifiedTimeShow.value=true
}

const setItem = (value) => {
  let arr=receiverDeptNameDict.value.filter(({id})=>{
    return value==id
  })
  data.receiverDeptName=arr[0]?.orgName ?? ''
}
//提交
const confirm = () => {
  formRef.value.validate((valid, fields) => {
    if(valid){
      let http=params.id?kpiUpdate:kpiSave
      http({...data}).then((res)=>{
        Toast("提交成功");
        setTimeout(()=>{
          router.back()
        }, 1000)
      })
    }
  })
}
const handelTimeConfirm = (value) => {
  data.finishDate = getYMD(value);
  specifiedTimeShow.value=false
}
onMounted(()=>{
  if(params.id){
    kpiDetail({id:params.id}).then((res)=>{
      // console.log(res.data)
      Object.assign(data,res.data)
    })
  }
  //关联指标
  getKpiRelation().then((res)=>{
    associatedIndicator.value=res.data
  })
  getCurrUserOrg().then((res)=>{
    receiverDeptNameDict.value=res.data
  })
})

</script>

<style lang="scss" scoped>
.allot {
  padding-top: 8px;
  .form{
    padding: 20px;
    background: #FFFFFF;
    :deep(.el-radio){
      margin-right: 20px;
    }
    :deep(.el-select){
      width: 100%;
    }
    .person{
      width: 220px;
      //min-width: 200px;
    }
    .time{
      height: 30px;
      width: 30px;
      position: absolute;
      right: 5px;
    }
    .contacts {
      width: 100%;
      flex-wrap: wrap;
      max-height: 130px;
      overflow-y: auto;

      li {
        width: 96px;
        box-sizing: border-box;
        height: 28px;
        margin-right: 5px;
        border-radius: 14px;
        font-size: 12px;
        margin-bottom: 10px;
        padding: 0 5px;
        background: #E4EBF9;
        .surname {
          width: 22px;
          height: 22px;
          line-height: 22px;
          text-align: center;
          color: white;
          border-radius: 17px;
        }
      }

      li:nth-of-type(2n) {
        margin-right: 0;
      }
    }
  }
  .save-btn {
    position: sticky;
    bottom: 0;
    :deep(.save:first-of-type) > div {
      margin-right: 5px;
      background: #E8F3FF;
      color: #1572F9;
    }

    :deep(.save:last-of-type) > div {
      margin-left: 5px;
    }
  }
}
</style>
