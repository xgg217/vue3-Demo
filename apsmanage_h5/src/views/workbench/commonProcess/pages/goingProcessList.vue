<template>
  <div class="goingProcessList flex-cul">
    <!-- 搜索栏 -->
    <header>
      <search prompt="搜索" v-model:searchValue="filterCondition.searchValue" @search="searchProcess"></search>
    </header>
    <!-- 类型导航 -->
    <aside>
      <slideButton v-model:currentIndex="filterCondition.operationType" :typeList="typeList"></slideButton>
    </aside>
    <!-- 流程列表 -->
    <main>
      <van-list
        class="listUlWrap"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="getProcesList"
      >
        <div class="listLiWrap" v-for="item in processList" :key="item.id" @click="toDetailPage(item)">
            <listItem :imgName="'processIcon'" :unread="(item.readStatus === 1) ? true : false" :title="workTaskBusinessTypeDict[item.businessType]">
              <template v-slot:status>
                <listStatus :info="getTaskStatus(item)"></listStatus>
              </template>
              <template v-slot:content>
                <!-- 内容 -->
                <div class="contentWrap mb-6 mt-8">
                  {{ item.title }}
                </div>
                <!-- 发起人时间 -->
                <div class="createInfoWrap">
                  <span>{{ item.createdBy }}</span>
                  <span class="ml-10">{{ item.createdTime }}</span>
                </div>
                <!-- 处理 -->
                <div class="handleWrap">{{ judgeViewOrHandle(item) == 1 ? "去处理" : "查看" }}></div>
              </template>
            </listItem>
          </div>
      </van-list>
    </main>
    <!-- 筛选 -->
    <footer>
      <condition v-model:showPop="showPop" @getCondition="getCondition" :showSearch="true"></condition>
    </footer>
  </div>
</template>

<script setup>
import bus from "@/utils/bus";
import search from "../../components/search.vue"
import slideButton from "../../components/slideButton.vue"
import listItem from "../../slots/listItem.vue"
import condition from "../../components/condition.vue"
import listStatus from "../../components/listStatus.vue"
import { businessStatusList } from "@/constant/statusLits"
import { useNavBarStore } from "@/store";
import { useUserStore } from "@/store";
/* 接口 */
import { queryProcessList, queryProcessUnreadNum, updateProcessUnresdStatus } from "@/api/workbench"
import { openLoading, closeLoading, successTip } from "@/utils/toastTips"
import { workTaskBusinessTypeDict, workTaskBusinessStatusDict, workTaskQuoteStatusDict, commonProcessRoute } from "@/constant/dict"
import throttle from "@/utils/throttle"

import tempList from "./temp"

const userInfo = useUserStore()
const { saasId, leader } = storeToRefs(userInfo)

/* 状态字典映射 */
const statusDict = {
  1: workTaskBusinessStatusDict,
  2: workTaskQuoteStatusDict
}
/* 获取任务状态信息 */
const getTaskStatus = (item) => {
  return statusDict[item.businessType][+item.businessStatus]
}

let init = true

const route = useRoute()

let navBarStore = useNavBarStore()
onMounted(() => {
  // filterCondition.operationType = +route.params.type
  getUnreadNum()
  /* 设置导航左侧筛选 */
  navBarStore.updateNavBar({rightText: "筛选"})
  bus.on("onNavBarClickRight", () => {
    showPop.value = true
  })
})
onActivated(() => {
  if (init) {
    init = false
    return
  }
  getUnreadNum()
  navBarStore.updateNavBar({rightText: "筛选"})
})
onUnmounted(() => {
  bus.off("onNavBarClickRight")
})

/* 搜索字符 */
// const searchValue = ref('')
/* 发起搜索 */
const searchProcess = () => {
  pageNum = 1
  getProcesList()
}

/* 显隐筛选 */
const showPop = ref(false)
/* 获取条件 */
const getCondition = (value) => {
  Object.keys(value).forEach(item => {
    if (item === "startTime") {
      if (value.startTime) {
        filterCondition["startTime"] = value.startTime.startTime
        filterCondition["endTime"] = value.startTime.endTime
      }
      return
    }
    if (item === "FinishTime") {
      if (value.FinishTime) {
        filterCondition["completeStartTime"] = value.FinishTime.startTime
        filterCondition["completeEndTime"] = value.FinishTime.endTime
      }
      return
    }
    if ((item === "playersIds" && value["playersIds"]) || (item === "promoterIds" && value["promoterIds"])) {
      const temp = []
      value[item].forEach(it => {
        temp.push(it.userId)
      })
      filterCondition[item] = temp
      return
    }
    filterCondition[item] = value[item]
  })
  pageNum = 1
  getProcesList()
  showPop.value = false
}

/* 流程列表 */
const processList = ref([])

/* 分页 */
const pageSize = 10
let pageNum = 1
const filterCondition = reactive({
  operationType: null,
  businessType: [],
  startTime: "",
  endTime: "",
  completeStartTime: "",
  completeEndTime: "",
  promoterIds: null,
  playersIds: null,
  searchValue: "",
})
const loading = ref(false);
const finished = ref(false);

watch(() => filterCondition.operationType, () => {
  pageNum = 1
  getProcesList()
})

/* 类型切换 */
// const operationTypeChange = () => {
//   pageNum = 1
//   getProcesList()
// }

/* 获取列表 */
const getProcesList = throttle(() => {
  openLoading()
  queryProcessList({...filterCondition, pageSize, pageNum})
    .then(res => {
      if (pageNum === 1) {
        // if (filterCondition.operationType == 1) {
        //   processList.value = tempList
        // } else {
          processList.value = res.data.records
        // }
      } else {
        processList.value = processList.value.concat(res.data.records)
      }

      if (processList.value.length >= res.data.total) {
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
})


/* 类型列表 */
const typeList = ref([
  {label: "我发起", promptNum: 0, value: 1},
  {label: "我参与", promptNum: 0, value: 2},
  {label: "全部", promptNum: 0, value: -1}
])

if (leader) {
  typeList.value.splice(2, 0, {label: "组织成员发起+参与", promptNum: 0, value: 3})
}

const router = useRouter()
/* 前往流程详情 */
const toDetailPage = (item) => {
  if (item.readStatus === 1) {
    readThisProcess(item)
  }
  const query = {type: commonProcessRoute[item.businessType], status: item.businessStatus, title: workTaskBusinessTypeDict[item.businessType], handle: judgeViewOrHandle(item)}
  /* 如果是处理，报价，状态时收集报价 */
  if (query.handle == 1 && item.businessType === 2 && item.businessStatus == 3) {
    query['handleId'] = item.handledBy
  }
  /* 如果是处理，业务，评估风险*/
  if (query.handle == 1 && item.businessType === 1 && item.businessStatus == 9) {
    /* 获取当前处理人角色对应链接name */
    const urlMap = statusDict[1][item.businessStatus].pageName
    let urlName = ''
    // item.handledRoleId.split(",").forEach(ele => {
    //   if (urlMap[ele]) {
    //     urlName = urlMap[ele]
    //   }
    // })
    if (urlMap[item.handledBy]) {
      urlName = urlMap[item.handledBy]
    }
    if (item.handledBy === item.createdId) {
      urlName = "answerQuestions"
    }
    if (urlName) {
      query["name"] = urlName
    }
  }
  /* 待修改加工协议 */
  if (query.handle == 1 && item.businessStatus == 11) {
    query["name"] = "legalAppraise"
  }
  router.push({name: "processDetail", query, params: {id: item.businessId, offerId: item.businessId }})
}

/* 流程结束，中止，处理人是当前登录用户也显示查看，跳转查看 */
const judgeViewOrHandle = (item) => {
  /* 业务需求 */
  if (item.businessType === 1) {
    if (item.businessStatus == 7 || item.businessStatus == 14 || item.businessStatus == 15) {
      return 2
    }
  }
  return item.handledBy == saasId.value ? 1 : 2
}

/* 修改状态 */
const readThisProcess = (item) => {
  updateProcessUnresdStatus(item.id)
    .then(() => {
      item.readStatus = 0
      typeList.value[filterCondition.operationType - 1].promptNum--
    })
}

/* 获取未读总数 */
const getUnreadNum = () => {
  queryProcessUnreadNum()
    .then(res => {
      res.data.forEach(item => {
        const index = typeList.value.findIndex(it => it.value == item.operationType)
        if (index > -1) {
          typeList.value[index].promptNum = item.unRedCount
        }
        
      })
    })
}
</script>

<style lang="scss" scoped>
.goingProcessList{
  height: 100%;
  background-color: white;
  box-sizing: border-box;
  &>header{
    height: 50px;
    overflow: hidden;
    box-sizing: border-box;
    padding: 0 20px;
    padding-top: 10px;
  }
  &>aside{
    height: 56px;
    padding: 0 20px;
    box-sizing: border-box;
    margin-bottom: 20px;
  }
  &>main{
    flex: 1;
    box-sizing: border-box;
    overflow: hidden;
    &>.listUlWrap{
      padding: 0 20px;
      height: 100%;
      overflow: auto;
      .contentWrap{
        font-size: 14px;
        color: #8D9092;
      }
      .createInfoWrap{
        font-size: 10px;
        color: #A7A9B7;
      }
      .handleWrap{
        height: 20px;
        line-height: 20px;
        font-size: 14px;
        color: #2972FE;
        margin-top: 10px;
      }
    }
  }
}
</style>
