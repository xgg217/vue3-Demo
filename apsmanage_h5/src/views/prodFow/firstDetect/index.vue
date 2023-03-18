<template>
  <div class="flex-cul spotCheckWrap">
    <!-- 筛选条件 -->
    <taskStatusFilter :conditionList="conditionList" @getFilterCondition="getFilterCondition" :taskStatusList="taskStatusList" :initTaskStatus="[1,2]"></taskStatusFilter>
    <!-- 任务列表 -->
    <template v-if="taskList.length">
      <van-list
          class="listWrap"
          v-model:loading="loading"
          :finished="finished"
          :finished-text="!taskList.length ? '' : '没有更多了'"
          :immediate-check="false"
          @load="onLoadList"
      >
        <!-- 不含处理人 -->
        <div class="listItem relative" :class="{'whiteBg': route.params.type == 2, 'mb-14': route.params.type != 3, 'mb-30': route.params.type == 3}" v-for="(item, index) in taskList" :key="item.id" @click="toRouter(item.id)">
          <!-- 执行人 -->
          <div v-if="route.params.type == 3 && item.taskStatus < 3" class="examinerWrap flex flex-between">
            <span class="flex1 flex" style="overflow: hidden">任务接收人：<span class="flex1 executorWrap">
              <moreText :text="item.receiveName || '--'" :style="{flex: 1}"></moreText>
            </span></span>
            <span style="width: 20vw" class="fz-14 a-blue-color" @click.stop="sendNotice(item.id, item.receiveId)">发送通知 ></span>
          </div>
          <taskInfoItem :deployData="itemDeploy" :itemInfo="item"></taskInfoItem>
          <!-- 占位 -->
          <div class="ocWrap" v-if="index != taskList.length - 1 && route.params.type == 3"></div>
        </div>
      </van-list>
    </template>

    <div class="wh100 emptyWrap flex-center flex-cul" v-if="!taskList.length">
      <img src="../../../assets/images/empty.png" alt="">
      <span>任务为空！</span>
    </div>

  </div>
</template>

<script setup>
import taskStatusFilter from "../components/taskStatusFilter.vue"
import taskInfoItem from "../components/taskInfoItem.vue"
import { querySpotCheckCondition, querySpotCheckList, querySpotCheckOverTimeList, sendSpotCheck } from "@/api/prodFow"
import { openLoading, closeLoading, successTip } from "@/utils/toastTips"
import { useUserStore } from "@/store/user"
const userStore = useUserStore()

const router = useRouter()
const route = useRoute()

/* 任务状态 */
const taskStatusList = [
  {label: "全部", value: null},
  {label: "已完成", value: [3, 4]},
  {label: "未完成", value: [1, 2]}
]
/* 筛选条件 */
const conditionList = ref(
    [
      {
        name: "客户", // 条件名称
        // uniKey: "value", // 选项渲染key的唯一标识,
        // labelKey: "label", // 展示选项名称key,不填就自身
        // list: [{label: "PQC抽检", value: 1}, {label: "TEST客验", value: 2}, {label: "QA抽检", value: 3}, {label: "PACK客验", value: 4}, {label: "PQC客检", value: 5}]
        uniKey: "",
        labelKey: "",
        list: [], // 选项
        showMore: false, // 是否展示更多按钮
        initShowNum: null, // 展示更多时对策按钮数
        selectIndex: null, // 当前选中的下标
        selectItem: null, // 当前选中的项
        submitKey: "scType" // 后端需要的字段
      } ,
      {
        name: "任务名称", // 条件名称
        type:'select',
        uniKey: "",
        labelKey: "",
        list: [], // 选项
        showMore: false, // 是否展示更多按钮
        initShowNum: null, // 展示更多时对策按钮数
        selectIndex: null, // 当前选中的下标
        selectItem: null, // 当前选中的项
        submitKey: "scType" // 后端需要的字段
      } ,
      {
        name: "任务接受人", // 条件名称
        // uniKey: "value", // 选项渲染key的唯一标识,
        // labelKey: "label", // 展示选项名称key,不填就自身
        // list: [{label: "PQC抽检", value: 1}, {label: "TEST客验", value: 2}, {label: "QA抽检", value: 3}, {label: "PACK客验", value: 4}, {label: "PQC客检", value: 5}]
        uniKey: "",
        labelKey: "",
        list: [], // 选项
        showMore: false, // 是否展示更多按钮
        initShowNum: null, // 展示更多时对策按钮数
        selectIndex: null, // 当前选中的下标
        selectItem: null, // 当前选中的项
        submitKey: "scType" // 后端需要的字段
      } ,
      {
        name: "生产产线", // 条件名称
        uniKey: "", // 选项渲染key的唯一标识，不填就项自身
        labelKey: "", // 展示选项名称key,不填就自身
        list: ["SMT-1", "SMT-2", "SMT-3", "SMT-4", "SMT-5", "SMT-6"], // 选项
        showMore: true, // 是否展示更多按钮
        initShowNum: 4, // 展示更多时对策按钮数, showMore未false时，置为null
        selectIndex: null, // 当前选中的下标
        selectItem: null, // 当前选中的项,
        submitKey: "pdlineName" // 后端需要的字段
      }
    ]
)
/* 项渲染配置 */
const itemDeploy = {
  /* 头部名称和超时key */
  header: {
    nameKey: "projectName",
    timeStatusKey: "cutOffTime"
  },
  /* 内容label\key */
  content: [
    {label: "技嘉项目", key: "scType", unitKey: "scResult"},
    {label: "物料编号", key: "workOrderNo"},
    {label: "任务编号", key: "fnumber"},

    // NG报告处理任务
    // {label: "报告编号", key: "scBatchNo"},
    // {label: "项目名称", key: "batchQty"},
    // {label: "工单编号", key: "scTime"},
    // {label: "料号", key: "scTime"},
  ],
  /* 根据状态值，对应下标 */
  status:  [
    {name: "待执行", color: "#0096FF"},
    {name: "任务超时", color: "#FF3A35"},
    {name: "完成", color: "#34C606"},
    {name: "超时完成", color: "#FF8B00"}
  ],
  /* 任务状态key */
  statusKey: "taskStatus",
  /* 单位颜色 */
  unitColor: {
    "不合格": "#FF3A35"
  }
}
/* 筛选条件 */
const pageSize = 20
let pageNum = 1
const filterCondition = ref({taskStatus: [1, 2], pageSize })
/**
 * @desc 获取筛选条件，接收到自带条件需要配合传入项条件
 * @params 筛选组件的自带条件
 *  */
const getFilterCondition = (params) => {
  /* 清空列表 */
  pageNum = 1
  /* 条件 */
  filterCondition.value = Object.assign(filterCondition.value, params)
  conditionList.value.forEach(item => {
    if (item.selectItem) {
      filterCondition.value[item.submitKey] = item.selectItem
    } else {
      filterCondition.value[item.submitKey] = ''
    }
  })
  getTaskList(true)
}
/* 路由详情跳转 */
const toRouter = (id) => {
  router.push({name: "spotCheckDetail", params: { type: route.params.type, id: id }})
}
/* 返回缓存路由触发 */
onActivated(() => {
  // console.log("重新请求")
})
/* 分页加载 */
const loading = ref(false)
const finished = ref(true)
const taskList = ref([])
/* 触发加载 */
const onLoadList = () => {
  getTaskList()
}
/* 获取筛选条件 */
const getRemoteFilterCondition = () => {
  openLoading()
  querySpotCheckCondition(route.params.type)
      .then(res => {
        conditionList.value[0].list = res.data.pdlineName
        conditionList.value[1].list = res.data.scType
        /* 超时处理通知 */
        if (route.params.type == 3) {
          const temp = {
            name: "任务接收人", // 条件名称
            uniKey: "userId",
            labelKey: "userName",
            list: [], // 选项
            showMore: false, // 是否展示更多按钮
            initShowNum: null, // 展示更多时对策按钮数
            selectIndex: null, // 当前选中的下标
            selectItem: null, // 当前选中的项
            submitKey: "executor" // 后端需要的字段
          }
          temp.list = res.data.executor
          conditionList.value.push(temp)
        }
      })
      .finally(() => {
        closeLoading()
      })
}

/* 获取远端任务 */
const getTaskList = (clear) => {
  openLoading()
  const apiMethods = {
    querySpotCheckOverTimeList,
    querySpotCheckList
  }
  let api = "querySpotCheckList"
  // if (route.params.type == 3) {
  //   api = "querySpotCheckOverTimeList"
  // }
  apiMethods[api]({...filterCondition.value, pageNum, taskType: +route.params.type})
      .then(res => {
        if (clear) {
          taskList.value = res.data.list
        } else {
          taskList.value = taskList.value.concat(res.data.list)
        }

        if (taskList.value.length >= res.data.total) {
          finished.value = true
        } else {
          finished.value = false
        }
        pageNum++
      })
      .finally(() => {
        closeLoading()
        loading.value = false
      })
}
/* 发送通知 */
const sendNotice = (id, executor) => {
  openLoading()
  sendSpotCheck({taskIds: [id + ''], executor})
      .then(() => {
        successTip("通知成功！")
      })
      .finally(() => {
        closeLoading()
      })
}

onMounted(() => {
  getRemoteFilterCondition()
  getTaskList()
})
</script>

<style lang="scss" scoped>
.spotCheckWrap{
  height: 100%;
}
.whiteBg{
  background-color: white;
}
.listWrap{
  margin-top: 10px;
  padding: 16px 16px;
  box-sizing: border-box;
  background-color: white;
  flex: 1;
  overflow: auto;
  overflow-x: hidden;
  .listItem{
    // background-color: bisque;
    // height: 800px;
    // margin-bottom: 14px;
  }
}
.emptyWrap{
  img{
    height: 183.12px;
    width: 227.08px;
  }
  &>span{
    color: $d-gray;
    margin-top: 24px;
  }
}
.ocWrap{
  height: 12px;
  width: 100vw;
  background-color: $g-gray;
  position: relative;
  left: -20px;
  bottom: -20px;
}
.examinerWrap{
  height: 50px;
  color: $e-gray;
  line-height: 44px;
  font-size: 16px;
  .executorWrap{
    white-space: nowrap;
    overflow: hidden;
    margin-right: 10px;
    height: 40px;
    position: relative;
  }
}
</style>
