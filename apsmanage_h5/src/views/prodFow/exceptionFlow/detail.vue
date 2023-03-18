<template>
  <span class="cover-nav__close"  @click.stop="handelNavBack('exceptionFlow',{params:{type}})">
      <van-icon name="arrow-left" />
  </span>
  <div class="prod_main flex-cul spoCheckDetailWrap">
    <van-collapse class="mt-10 collapseWrap" v-model="activeNames">
      <!-- 任务信息 -->
      <van-collapse-item title="任务信息" name="1" :border="false" title-class="titleWrap">
        <ul v-if="Object.keys(taskInfo).length">
          <li v-for="(item) in taskInfoKeyList" :key="item.key" class="flex">
            <span class="mr-20 e-gray-color" style="width: 23vw;">{{ item.name }}</span>
            <span v-if="item.key == 'taskStatus'" :style="{color: statusList[taskInfo.taskStatus - 1].color}">{{ statusList[taskInfo.taskStatus - 1].name }}  </span>
            <span v-else class="flex1 flex ui-nowrap">{{ taskInfo[item.key] || '--' }}</span>
          </li>
        </ul>
        <van-skeleton v-else title :row="5"/>
      </van-collapse-item>
      <!-- 异常信息 -->
      <van-collapse-item title="异常信息" name="2" :border="false" title-class="titleWrap">
        <ul v-if="Object.keys(expInfo).length">
          <li v-for="item in errorInfoKeyList" :key="item.key" class="flex">
            <span class="mr-20 e-gray-color" style="width: 23vw;">{{ item.name }}</span>
            <span v-if="item.key == 'status'"> {{expInfo[item.key]==1?'异常':'运行中'}} </span>
            <span v-else class="flex1 flex ui-nowrap">{{ expInfo[item.key] || '--' }}</span>
          </li>
        </ul>
        <van-skeleton v-else title :row="5"/>
      </van-collapse-item>
      <!--异常处理-编辑状态-->
      <van-collapse-item title="异常处理" name="3" :border="false" title-class="titleWrap" v-if="!Object.keys(expSuggest).length && type==1">
        <!--异常处理--->
        <div class="ui-cell ui-cell-sb custom-input">
          <div style="width: 120px;">故障代码</div>
          <el-select v-model="formData.oldFaultCode" value-key="faultCode" placeholder="请选择" @change="getEquipmentExpFaultReason">
            <el-option :label="item.faultName" :value="item.faultCode" v-for="item in faultCodes" :key="item.faultName"/>
          </el-select>
        </div>
        <!--故障原因-->
        <div class="pl-10">
          <!--新故障代码选项-->
          <div v-if="formData.oldFaultCode===newCause">
            <div class="custom-input flex pt-10 b-gray-color">
              <div style="width: 100px;">故障代码</div>
              <el-input v-model.trim="formData.faultCode"  placeholder="故障代码" maxlength="100"/>
            </div>
            <div class="custom-input flex pt-10 b-gray-color">
              <div style="width: 100px;">故障名称</div>
              <el-input v-model.trim="formData.faultName" placeholder="故障名称" maxlength="100"/>
            </div>
          </div>
          <!--旧故障代码-->
          <div v-for="item in faultReason" :key="item.id" class="cause" @click="changIndex(item.id)">
            <div :class="{'active':currentIndex===item.id}" class="cause_one ui-nowrap">
              <van-icon name="arrow-up" v-if="currentIndex===item.id"/>
              <van-icon name="arrow" v-else/>
              {{ item.faultReason }}
            </div>
            <div v-if="currentIndex===item.id" class="cause_two">
              {{ item.suggest }}
            </div>
          </div>
          <!--新原因-->
          <div class="cause" v-if="currentIndex==='new'">
            <div class="custom-input flex pt-20">
              <div style="width: 100px;">故障原因</div>
              <el-input v-model.trim="formData.faultReason" placeholder="故障原因" maxlength="100"/>
            </div>
            <div class="custom-input flex pt-10">
              <div style="width: 100px;">处理建议</div>
              <el-input v-model.trim="formData.suggest" type="textarea" rows="4" placeholder="处理建议" maxlength="100"/>
            </div>
          </div>
        </div>
        <div class="custom-input flex pt-10 pl-10">
          <div style="width: 100px;">处理备注</div>
          <el-input v-model.trim="formData.remark" type="textarea" rows="4" placeholder="添加处理意见和建议" maxlength="100"/>
        </div>
      </van-collapse-item>
      <!--异常处理-详情状态-->
      <van-collapse-item title="异常处理" name="4" :border="false" title-class="titleWrap" v-if="Object.keys(expSuggest).length">
        <!--异常处理-详情状态-->
        <ul>
          <li v-for="item in errorKeyList" :key="item.key" class="flex">
            <span class="mr-20 e-gray-color" style="width: 23vw;">{{ item.name }}</span>
            <span class="flex1 flex ui-nowrap">{{ expSuggest[item.key] ?? '--' }}</span>
          </li>
        </ul>
      </van-collapse-item>
    </van-collapse>
    <!-- 底部按钮 -->
    <div class="bottomBtnWrap" v-if="type ==='1' && !Object.keys(expSuggest).length && hasPermission">
      <PxtButton type="active" width="100%" @click="submitHandle">
        确定处理
      </PxtButton>
    </div>
  </div>
</template>

<script setup>
import PxtButton from "@/components/button/button.vue"
import {queryEquipmentExpDetail, queryEquipmentExpFaultReason, submitEquipmentExpHandle} from "@/api/prodFow"
import {openLoading, closeLoading, successTip, failTip} from "@/utils/toastTips"
import {useUserStore} from "@/store/user"
import useRouterBack from "@/hooks/useRouterBack";
const {handelNavBack}=useRouterBack()
const userStore = useUserStore()
const route = useRoute()

let {id: taskId, type} = route.params
const newCause = 'dd15d17733c447d4851c0847839bc034' //新原因的id
const newCauseObj = {faultCode: null, faultName: null, faultReason: "新原因（new）", suggest: "", id: 'new'} //新原因需要的字段对象
/* 任务信息 */
const taskInfoKeyList = computed(()=>{
  let data=[
    {name: "任务编号", key: "taskNo"},
    {name: "接收人", key: "receiver"},
    {name: "截止时间", key: "cutOffTime"},
    {name: "执行人", key: "createBy"},
    {name: "任务状态", key: "taskStatus"}
  ]
  // 未完成状态不显示完成时间
  if(taskInfo.value.taskStatus==3 || taskInfo.value.taskStatus==4){
    data.splice(4,0,{name: "完成时间", key: "finishedTime"})
  }
  return data
})
/* 异常信息 */
const errorInfoKeyList = [
  {name: "异常编号", key: "expNo"},
  {name: "所在产线", key: "pdlineName"},
  {name: "设备类型", key: "equipmentType"},
  {name: "设备编号", key: "equipmentNo"},
  {name: "设备型号", key: "equipmentModel"},
  {name: "设备名称", key: "equipmentName"},
  {name: "故障代码", key: "faultCode"},
  {name: "故障名称", key: "faultName"},
  {name: "异常时间", key: "expTime"},
  {name: "上次保养时间", key: "lastKeepTime"},
  {name: "当前状态", key: "status"},
  {name: "异常发起人", key: "expSponsor"},
  {name: "异常描述", key: "remark"}
]
//异常处理
const errorKeyList = [
  {name: "故障代码", key: "faultCode"},
  {name: "故障名称", key: "faultName"},
  {name: "故障原因", key: "faultReason"},
  {name: "处理建议", key: "suggest"},
  {name: "处理备注", key: "remark"},
  {name: "处理人", key: "optUser"},
  {name: "处理时间", key: "createTime"}
]
/* 状态 */
const statusList = [

  {name: "待执行", color: "#0096FF"},
  {name: "任务超时", color: "#FF3A35"},
  {name: "完成", color: "#34C606"},
  {name: "超时完成", color: "#FFBF00"}
]
let data = reactive({
  currentIndex: null,
  taskInfo: {}, //任务信息
  expInfo: {}, //异常信息
  expSuggest: {}, //异常建议
  faultCodes: [], //故障代码
  hasPermission: false, //是否有处理权限，true有；false无
  activeNames: ['1', '2', '3', '4'], //折叠面板
  formData: {
    isNewReason: 0, //是否新原因，0否；1是
    oldFaultCode: "", //原有故障代码（下拉选项）
    faultCode: "", //故障代码
    faultName: "",//故障名称
    faultReason: '', //故障原因
    suggest: '', //处理建议
    remark: '', //处理备注
  },
  faultReason: [] //故障原因
})
let {currentIndex, taskInfo, expInfo, expSuggest, faultCodes, activeNames, formData, faultReason, hasPermission} = toRefs(data)

// 切换旧故障代码
const changIndex = (val) => {
  reset()
  if (val === currentIndex.value || val === '') {
    currentIndex.value = ''
  } else {
    currentIndex.value = val
  }
}
//获取异常详情
const getEquipmentExpDetail = () => {
  openLoading()
  queryEquipmentExpDetail(route.params.id)
      .then(res => {
        taskInfo.value = res.data.taskInfo || {}
        expInfo.value = res.data.expInfo || {}
        expSuggest.value = res.data.expSuggest || {}
        faultCodes.value = res.data.faultCodes || []
        hasPermission.value = res.data.hasPermission

        if(res.data.isMatch){
          // 有匹配的故障代码
          let faultCode=expInfo.value.faultCode+''
          formData.value.oldFaultCode=faultCode
          getEquipmentExpFaultReason(faultCode)
        }else{
          // 没有的话，push一个新原因
          formData.value.oldFaultCode=newCause
          faultReason.value = [{...newCauseObj}]
          currentIndex.value = 'new'
        }
      }).finally(closeLoading)
}

/* 提交表单 */
const submitHandle = () => {
  let params = {
    ...formData.value,
    taskId,
  }
  let {oldFaultCode, faultCode, faultName, faultReason, suggest} = params
  //新故障代码
  if (oldFaultCode === newCause && (!faultCode || !faultName || !faultReason || !suggest)) {
    return failTip("请填写新故障代码信息")
  } else {
    // 已有故障代码
    if (!currentIndex.value) return failTip("请选择故障原因")
    // 已有故障代码-新原因
    if (currentIndex.value === 'new' && (!faultReason || !suggest)) {
      return failTip("请填写新故障原因信息")
    }
    if (currentIndex.value !== 'new') {
      let reason = data.faultReason.filter((item) => {
        return item.id == currentIndex.value
      })
      params.faultReason = reason[0].faultReason
      params.suggest = reason[0].suggest
    }
  }
  params.isNewReason = currentIndex.value === 'new' ? 1 : 0
  console.log(params)
  openLoading()
  submitEquipmentExpHandle(params)
      .then(() => {
        successTip("提交成功")
        getEquipmentExpDetail()
      })
      .finally(closeLoading)
}
//重置故障原因字段
const reset = () => {
  formData.value.suggest = ''
  formData.value.faultReason = ''
  formData.value.faultCode = ''
  formData.value.faultName = ''
}
// 获取故障原因
const getEquipmentExpFaultReason = (val) => {
  reset() //获取新故障原因时，重置下字段
  if (!val) return
  if (val === newCause) {
    faultReason.value = [{...newCauseObj}]
    currentIndex.value = 'new'
    return;
  }
  queryEquipmentExpFaultReason({faultCode: val, equipmentType: expInfo.value?.equipmentType}).then((res) => {
    faultReason.value = res.data
    faultReason.value.push({...newCauseObj})
  })
  // 重置下故障代码
  changIndex('')
}

onMounted(() => {
  getEquipmentExpDetail()
  getEquipmentExpFaultReason()
})
</script>

<style lang="scss" scoped>
@import "@/styles/vanMixin.scss";

.spoCheckDetailWrap {
  color: $b-gray;
  @include taskDetail;

  .handleInfoWrap {
    flex: 1;

    .labelWrap {
      line-height: 36px;
      flex-shrink: 0;
    }

    ul {
      flex: 1;
      height: auto;

      li {
        height: auto;

        .superiorResWrap {
          word-break: break-all;

          header {
            img {
              width: 32px;
              height: 32px;
            }
          }

          header, footer {
            height: 36px;
          }
        }

        .employeeWrap {
          header {
            margin-top: 0;
          }
        }
      }
    }
  }
}

.cause {
  .cause_one {
    width: 100%;
    height: 36px;
    background: #F1F7FF;
    line-height: 36px;
    font-size: 14px;
    font-weight: 400;
    color: $b-gray;
    margin-top: 10px;

    .van-icon {
      margin: 0 10px;
    }
  }

  .cause_two {
    padding: 10px 10px 0 90px;
    font-size: 14px;
    font-weight: 400;
    color: $b-gray;
    line-height: 24px;
    background: #FBFDFF;
    word-break: break-all;
  }

  .active {
    color: #FFFFFF !important;
    background: #7FCAFF !important;
  }
}

.bottomBtnWrap {
  height: 60px;
  padding: 8px 20px;
  box-sizing: border-box;
  background-color: white;
}

</style>
