<!--备料任务/领料任务 信息-->
<template>
  <div class="prod_main schedule">
    <!-- 头部筛选栏 -->
    <taskStatusFilter :showExecutor="showExecutor" @getFilterCondition="getFilterCondition"></taskStatusFilter>
    <!-- 任务列表 -->
    <template v-if="taskList.length">
      <van-list
        class="listWrap"
        v-if="!showExecutor"
        v-model:loading="loading"
        :finished="finished"
        :finished-text="!taskList.length ? '' : '没有更多了'"
        :immediate-check="false"
        @load="onLoadList"
      >
        <div class="listItem" v-for="item in taskList" :key="item.taskId" @click="toRouter(item.taskId)">
          <taskInfoItem :itemInfo="item"></taskInfoItem>
        </div>
      </van-list>
      <!-- 任务列表2，含执行人 -->
      <noticeList v-else :taskList="taskList"></noticeList>
    </template>

    <!-- <van-empty class="wh100" style="background: #F4F5FC" v-if="!taskList.length" image="http://192.168.8.136:7778/static/empty.png" image-size="160" description="任务为空！" /> -->
    <div class="wh100 emptyWrap flex-center flex-cul" v-if="!taskList.length">
      <img src="../../../assets/images/empty.png" alt="">
      <span>任务为空！</span>
    </div>

    <!-- 底部提示 -->
    <taskBottomTips v-if="route.params.type != 2" :tips="bottomTipsList[route.params.type - 1]"></taskBottomTips>
  </div>
</template>

<script setup>
import taskStatusFilter from "./module/taskStatusFilter.vue"
import taskInfoItem from "./module/taskInfoItem.vue"
import taskBottomTips from "@/views/prodFow/components/taskBottomTips.vue"
import noticeList from "./module/noticeList.vue"
import { queryTaskList, queryOvertimeTaskList } from "@/api/prodFow"
import { openLoading, closeLoading } from "@/utils/toastTips"
import sesstionStorage from "@/utils/sessionStorage"

import { useUserStore } from "@/store/user"

const userStore = useUserStore()

const searchValue = sesstionStorage.get("searchValue")

/* 任务类型 */
let taskType = 1
/* 列表元素 */
const stocklistWrap = ref()

/* 路由 */
const route = useRoute()
const router = useRouter()

/* 筛选是否展示执行人 */
const showExecutor = ref(false)
/* 任务2需展示执行人 */
if (route.params.type == 2) {
  showExecutor.value = true
}

/* 查询条件 */
const queryCondition = ref({})

/* 列表加载状态 */
const loading = ref(false)
const finished = ref(false)
/* 分页 */
const pageSize = 20
let pageNum = 1
/* 任务列表 */
const taskList = ref([])
/* 获取任务列表 */
const getTaskList = (params) => {
  openLoading()
  const methods = {
    queryTaskList: queryTaskList,
    queryOvertimeTaskList: queryOvertimeTaskList
  }
  let methodsType = ''
  if (route.params.type != 2) {
    methodsType = 'queryTaskList'
  } else {
    methodsType = 'queryOvertimeTaskList'
  }

  methods[methodsType](params)
    .then(res => {
      if (methodsType === 'queryTaskList') {
        /* 整合列表 */
        taskList.value = taskList.value.concat(res.data.list)
        if (taskList.value.length >= res.data.total) {
          finished.value = true
        } else {
          finished.value = false
        }
      } else {
        const temp = []
        Object.keys(res.data).forEach(item => {
          const tempObj = {}
          tempObj['executor'] = item
          tempObj['executorId'] = res.data[item][0].executor
          tempObj['taskList'] = res.data[item]
          temp.push(tempObj)
        })
        taskList.value = temp
      }
      /* 设置请求缓存参数 */
      sesstionStorage.set("searchValue", params)
    })
    .finally(() => {
      closeLoading()
      loading.value = false
    })
}
/* 分页获取列表 */
const onLoadList = () => {
  getTaskList({taskType: taskType, ...queryCondition.value, pageSize: pageSize, pageNum: pageNum++})
}

/* 底部提示信息 */
const bottomTipsList = ["点检任务请通过MES的PDA进行设备点检执行", '', "领料任务请通过ERP进行工单领料执行。"]

/**
 * 路由跳转
 * @params taskId: string 任务的id
 */
const toRouter = (taskId) => {
  if (route.params.type == 2) return
  router.push({name: "stockDetail", params: { type: route.params.type, id: taskId }})
}

/* 获取筛选条件 */
const getFilterCondition = (value) => {
  taskList.value = []
  if (value) {
    queryCondition.value = value
    pageNum = 1
  }
  if (route.params.type != 2) {
    taskType = route.params.type > 1 ? 2 : 1
  } else {
    taskType = 1
  }
  /* 从详情页返回 */
  if (window.useSessionParams && searchValue) {
    pageNum = searchValue.pageNum
  }
  getTaskList({taskType: taskType, ...queryCondition.value, pageSize: pageSize, pageNum: pageNum++})
}
</script>

<style lang="scss" scoped>
.schedule {
  display: flex;
  flex-direction: column;
  .examinerWrap{
    height: 44px;
    color: $e-gray;
    line-height: 44px;
    font-size: 16px;
    padding: 0 16px;
    box-sizing: border-box;
    background-color: white;
    border-top: 1px solid $g-gray;
  }
  ul{
    margin-top: 10px;
    padding: 20px 16px;
    background-color: white;
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
    li{
      margin-bottom: 14px;
    }
  }
  .listWrap{
    margin-top: 10px;
    padding: 20px 16px;
    background-color: white;
    box-sizing: border-box;
    flex: 1;
    overflow: auto;
    .listItem{
      // background-color: bisque;
      // height: 800px;
      margin-bottom: 14px;
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
}
</style>
