<template>
  <div class="prod_main flex-cul spoCheckDetailWrap">
<!--    <div class="px-nav-bar">-->
<!--      <van-nav-bar title="抽检不合格处理任务" left-text="" :left-arrow="true" @click-left="onClickLeft" fixed safe-area-inset-top/>-->
<!--    </div>-->
    <van-collapse class="mt-10 collapseWrap" v-model="activeNames">
      <!-- 任务信息 -->
      <div class="height36 title" >贴片QC首件检测</div>
      <van-collapse-item title="任务信息" name="1" :border="false" title-class="titleWrap">
        <ul v-if="taskData.taskNo">
          <li v-for="(item) in taskInfoKeyList" :key="item.key" class="flex">
            <span class="mr-20 e-gray-color" style="width: 23vw;">{{ item.name }}</span>
            <span v-if="item.key == 'taskStatus'" :style="{color: statusList[taskData.taskStatus - 1].color}">{{ statusList[taskData.taskStatus - 1].name }}  </span>
            <!-- <span v-else-if="item.key == 'taskType'">{{ typeList[taskData[item.key] -1] || '--' }}</span> -->
            <moreText v-else-if="item.key == 'receiveUser'" :text="taskData[item.key] || '--'" :style="{flex: 1}"></moreText>
            <span v-else class="flex1 flex" style="overflow: hidden"><span class="flex1 valueWrap">{{  taskData[item.key] || '--' }}</span></span>
          </li>
        </ul>
        <van-skeleton v-else title :row="5" />
      </van-collapse-item>
      <!-- 抽检结果信息 -->
      <van-collapse-item title="工单信息" name="2" :border="false" title-class="titleWrap">
        <ul v-if="taskData.workOrderNo">
          <li v-for="item in spotCheckKeyList" :key="item.key" class="flex">
            <span class="mr-20 e-gray-color" style="width: 23vw;">{{ item.name }}</span>
            <span class="flex1 flex" style="overflow: hidden"><span class="flex1 valueWrap">{{  taskData[item.key] ?? '--' }}</span></span>
          </li>
        </ul>
        <van-skeleton v-else title :row="5" />
      </van-collapse-item>
      <!-- 抽检处理详情 -->
      <van-collapse-item title="报告信息" name="3" :border="false" title-class="titleWrap">
        <ul v-if="taskData.workOrderNo">
          <li v-for="item in reportKeyList" :key="item.key" class="flex">
            <span class="mr-20 e-gray-color" style="width: 23vw;">{{ item.name }}</span>
            <BusinessFileList :show-delete="false" style="width: 100%" class="pt-20" v-if="item.type==='file'" :fileList="[{name:'1.xls',url:'1'},{name:'1.xls',url:'1'}]" ></BusinessFileList>
            <span class="flex1 flex" style="overflow: hidden" v-else><span class="flex1 valueWrap">{{  taskData[item.key] ?? '--' }}</span></span>
          </li>
        </ul>
        <van-skeleton v-else title :row="5" />
      </van-collapse-item>
      <!-- NG问题及改善-详情 -->
<!--      <van-collapse-item title="NG问题及改善" name="4" :border="false" title-class="titleWrap" >-->
<!--        <ul v-if="taskData.workOrderNo">-->
<!--          <li v-for="item in ngKeyList" :key="item.key" class="flex">-->
<!--            <span class="mr-20 e-gray-color" style="width: 23vw;">{{ item.name }}</span>-->
<!--            <span class="flex1 flex" style="overflow: hidden"><span class="flex1 valueWrap">{{  taskData[item.key] ?? '&#45;&#45;' }}</span></span>-->
<!--          </li>-->
<!--        </ul>-->
<!--        <van-skeleton v-else title :row="5" />-->
<!--      </van-collapse-item>-->
      <!-- NG问题及改善-详情 -->
      <van-collapse-item title="NG问题及改善" name="4" :border="false" title-class="titleWrap" >
        <div>
          <div class="custom-input flex pt-20">
            <div style="width: 120px;">问题点</div>
            <el-input v-model.trim="remarks" type="textarea" rows="4" placeholder="问题点" maxlength="100"/>
          </div>
          <div class="custom-input flex pt-10">
            <div style="width: 120px;">改善方案</div>
            <el-input v-model.trim="remarks" type="textarea" rows="4" placeholder="改善方案" maxlength="100"/>
          </div>
        </div>
      </van-collapse-item>
    </van-collapse>
    <div class="relative tipsWrap" v-if="taskData.taskStatus < 3 && route.params.type == 1">
      <taskBottomTips class="absolute" tips="首件检测任务请通过MES进行执行。"></taskBottomTips>
    </div>
    <!-- 底部按钮 -->
    <div class="bottomBtnWrap" v-if="route.params.type != 3">
      <PxtButton type="active" width="100%" @click="submitHandle">
        立即处理
      </PxtButton>
    </div>
  </div>
</template>

<script setup>
/*
  0: 只能留言
  1: 小组
  2：领导
*/
import BusinessFileList from '@/components/businessFileList/index.vue'
import taskBottomTips from "@/views/prodFow/components/taskBottomTips.vue"
import PxtButton from "@/components/button/button.vue"
import { querySpotCheckDetial, submitSpotCheclHandle } from "@/api/prodFow"
import { openLoading, closeLoading, successTip, failTip } from "@/utils/toastTips"
import { useUserStore } from "@/store/user"
const userStore = useUserStore()

const route = useRoute()
const router = useRouter()

/* 任务信息 */
const taskInfoKeyList = [
  {name: "任务编号", key: "taskNo"},
  {name: "接收人", key: "receiveUser"},
  {name: "截止时间", key: "cutOffTime"},
  {name: "执行人", key: "cutOffTime"},
  {name: "完成时间", key: "cutOffTime"},
  {name: "任务状态", key: "taskStatus"}
]
/* 工单信息 */
const spotCheckKeyList = [
  {name: "项目名称", key: "scType"},
  {name: "工单编号", key: "workOrderNo"},
  {name: "机型", key: "modelType"},
  {name: "料号", key: "fnumber"},
  {name: "制程工段", key: "scBatchNo"},
  {name: "生产产线", key: "processName"},
  {name: "工单数量", key: "batchQty"},
  {name: "产出数量", key: "scQty"},
  {name: "已检次数", key: "passQty"},
]
/* 报告信息 */
const reportKeyList = [
  {name: "报告编号", key: "taskNo"},
  {name: "报告结果", key: "receiveUser"},
  {name: "检测人", key: "cutOffTime"},
  {name: "检测时间", key: "taskStatus"},
  {name: "", key: "taskStatus",type:'file'}
]
/* NG问题及改善 */
const ngKeyList = [
  {name: "处理状态", key: "taskNo"},
  {name: "NG处理人", key: "receiveUser"},
  {name: "处理时间", key: "cutOffTime"},
  {name: "问题点", key: "taskStatus"},
  {name: "改善方案", key: "taskStatus"}
]
/* 状态 */
const statusList = [
  {name: "待执行", color: "#0096FF"},
  {name: "任务超时", color: "#FF3A35"},
  {name: "完成", color: "#34C606"},
  {name: "超时完成", color: "#FFBF00"}
]
/* 表单处理选项 */
const renderList = ref([
  {
    name: "不合格原因", key: "unQualifiedReason", option: []
  },
  {
    name: "处理范围", key: "executeScope", option: []
  },
  {
    name: "处理方式", key: "executeType", option: []
  },
])
//处理返回按钮
const onClickLeft = () => {
  router.replace({name: "spotCheck", params: { type: route.params.type }})
}
/* 折叠面板 */
const activeNames = ref(['1','2','3','4'])
/* 任务列表 */
const taskData = ref([])
/* 处理状态 */
const handleStatus = ref(10)
/* 上级处理列表 */
const leaderResList = ref([])
/* 小组决议 */
const groupResList = ref([])
/* 处理状态list */
const handleStatusList =  [
  {valeu: 10, label: "处理中"},
  {valeu: 20, label: "高层处理中"},
  {valeu: 30, label: "完成"},
  {valeu: 40, label: "已取消"}
]
/* 获取任务列表 */
const getTaskList = () => {
  leaderResList.value = []
  groupResList.value = []
  openLoading()
  querySpotCheckDetial(route.params.id, route.params.type)
      .then(res => {
        let temp = {}
        const { scResult, taskInfo, unQualified, doTypeList, doScopeList, scSuggest } = res.data
        taskInfoKeyList.forEach(item => {
          temp[item.key] = taskInfo[item.key]
        })
        spotCheckKeyList.forEach(item => {
          temp[item.key] = scResult[item.key]
        })
        handleStatus.value = taskInfo.flowStatus
        /* 任务信息、抽检结果赋值 */
        taskData.value = temp
        /* 处理选项赋值 */
        renderList.value[0].option = unQualified || []
        renderList.value[1].option = doScopeList || []
        renderList.value[2].option = doTypeList || []
        /* 处理结果分发 */
        scSuggest.forEach(item => {
          /* 是上级 */
          if (item.roleType === 2) {
            /* 是上级处理 */
            if (item.unQualifiedReason || item.unQualifiedReason === 0) {
              leaderResList.value.unshift(item)
            } else {
              leaderResList.value.push(item)
            }
          }
          /* 小组 */
          if (item.roleType === 1) {
            /* 是小组处理 */
            if (item.unQualifiedReason || item.unQualifiedReason === 0) {
              groupResList.value.unshift(item)
            } else {
              groupResList.value.push(item)
            }
          }
        })
        console.log(leaderResList.value, groupResList.value)
      })
      .finally(() => {
        closeLoading()
      })
}
/* 表单信息 */
const formData = reactive({
  unQualifiedReason: "",
  executeScope: "",
  executeType: "",
  remark: ""
})
/* 提交表单 */
const submitHandle = () => {
  let params = {
    taskId: route.params.id,
    roleType: route.params.type,
  }
  for(let item of renderList.value) {
    if (!item.option.length || handleStatus.value == 30) continue
    if (!formData[item.key]) {
      failTip("表单未填写完整！")
      return
    }
  }
  if (!formData.remark) {
    failTip("表单未填写完整！")
    return
  }
  Object.keys(formData).forEach(item => {
    if (formData[item]) {
      params[item] = formData[item]
    }
  })
  openLoading()
  submitSpotCheclHandle(params)
      .then(() => {
        successTip("提交成功")
        getTaskList()
        formData.unQualifiedReason = ''
        formData.executeScope = ''
        formData.executeType = ''
        formData.remark = ''

      })
      .finally(() => {
        closeLoading()
      })

  console.log(params)
}
onMounted(() => {
  getTaskList()
})
</script>

<style lang="scss" scoped>
@import "@/styles/vanMixin.scss";
@import "@/styles/mixins.scss";
.spoCheckDetailWrap{
  color: $b-gray;
  @include taskDetail;
  .handleInfoWrap{
    flex: 1;
    .labelWrap{
      line-height: 36px;
      flex-shrink: 0;
    }
    ul{
      flex: 1;
      height: auto;
      li{
        //height: auto;
        .superiorResWrap{
          word-break: break-all;
          header{
            img{
              width: 32px;
              height: 32px;
            }
          }
          header, footer{
            height: 36px;
          }
        }
        .employeeWrap{
          header{
            margin-top: 0;
          }
        }
      }
    }
  }
}
.colLabelWrap{
  .textAreaLiWrap{
    height: auto !important;
    .van-cell{
      padding: 0;
    }
  }
  :deep(.el-select){
    width: 100%;
    background-color: #F6F6FB;
    .el-input__wrapper{
      box-shadow: unset;
      background-color: unset;
      border-radius: 2px;
    }
    input{
      height: 36px;
    }
    @include placeholderColor('#B2BAD1')
  }
}
.bottomBtnWrap{
  height: 60px;
  padding: 8px 20px;
  box-sizing: border-box;
  background-color: white;
}
.tipsWrap{
  height: 42px;
  .bottomTips{
    width: 100vw;
    // left: -20px;
    // bottom: -12px;
  }
}
.title{
  font-size: 18px;
  color: $b-gray;
  text-align: center;
  background: #FFFFFF;
  padding-top: 10px;
}
</style>
