<template>
  <div class="workTaskWrap flex-cul">
    <!-- 搜索栏 -->
    <header>
      <search prompt="搜索" v-model:searchValue="filterCondition.searchValue" @search="searchProcess"></search>
    </header>
    <!-- 类型导航 -->
    <aside>
      <slideButton v-model:currentIndex="filterCondition.taskStatus" :typeList="typeList"></slideButton>
    </aside>
    <!-- 流程列表 -->
    <main>
      <van-list
        class="listUlWrap"
        v-model:loading="loading"
        :finished="finished"
        finished-text="没有更多了"
        :immediate-check="false"
        @load="getWorkTaskList"
      >
        <div class="listLiWrap" v-for="item in workTaskList" :key="item.id" @click="toDetailPage(item)">
          <listItem :imgName="'workTask'" :unread="(item.readStatus === 1 && item.msgStatus === 1) ? true : false" :title="workTaskMsgTypeDict[item.msgType]">
            <template v-slot:status>
              <listStatus v-if="item.status != 0" :info="getTaskStatus(item)"></listStatus>
            </template>
            <template v-slot:content>
              <!-- 内容 -->
              <div class="contentWrap mb-6 mt-8">
                {{ item.title }}
                <ul class="operateWrap">
                  <li v-for="it in item.messageRecords" :key="it.id" class="flex">
                    <div>
                      <span class="mr-10">{{ it.msgTime }}</span>
                      <span>{{ it.msgText }}</span>
                    </div>
                  </li>
                </ul>
              </div>
              <!-- 限时信息 -->
              <div v-if="item.timeText" class="overTimeWrap">
                <span v-html="getOverTimeDom(item.timeText)"></span>
              </div>
              <!-- 处理 -->
              <div class="handleWrap">{{ item.singleTitle }}></div>
            </template>
          </listItem>
        </div>
      </van-list>
    </main>
    <!-- 筛选 -->
    <footer>
      <condition v-model:showPop="showPop" @getCondition="getCondition" :conditionList="conditionList" :showSearch="true"></condition>
    </footer>
  </div>
</template>

<script setup name="workBench">
import bus from "@/utils/bus";
import search from "../components/search.vue"
import slideButton from "../components/slideButton.vue"
import listItem from "../slots/listItem.vue"
import condition from "../components/condition.vue"
import listStatus from "../components/listStatus.vue"
// import { businessStatusList } from "@/constant/statusLits"
import { useNavBarStore } from "@/store";
import deepCopy from "@/utils/deepCopy.js"
/* 接口 */
import { queryWorkTaskList, queryUnreadNum, updateUnresdStatus } from "@/api/workbench"
import { openLoading, closeLoading, successTip } from "@/utils/toastTips"
import { workTaskMsgTypeDict, workTaskBusinessStatusDict, workTaskQuoteStatusDict } from "@/constant/dict"
import throttle from "@/utils/throttle"

/* 状态字典映射 */
const statusDict = {
  1: workTaskBusinessStatusDict,
  2: workTaskQuoteStatusDict
}

let init = true

/* 筛选 */
let navBarStore = useNavBarStore()
onMounted(() => {
  getWorkTaskList()
  getUnresdNum()
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
  getWorkTaskList()
  getUnresdNum()
  navBarStore.updateNavBar({rightText: "筛选"})
})
onUnmounted(() => {
  bus.off("onNavBarClickRight")
})
/* 显隐筛选 */
const showPop = ref(false)
/* 筛选条件 */
const conditionList = [
  /* label: "名称", type: "类型", receiveKey: "接收值的key" , list: "选项值" */
  {label: "任务类型", type: "checkbox", receiveKey: "businessType", list: [{label: "业务需求", value: 1}, {label: "报价", value: 2}]},
  {label: "发起时间", type: "selectTime", receiveKey: "startTime"},
  {label: "发起人", type: "selectPerson", receiveKey: "userId"},
]
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
    if (item === "userId" && value["userId"]) {
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
  getWorkTaskList()
  showPop.value = false
}

/* 搜索 */
/* 发起搜索 */
const searchProcess = () => {
  pageNum = 1
  getWorkTaskList()
}

/* 类型导航 */
/* 类型列表 */
const typeList = ref([
  {label: "待处理", promptNum: 0, value: 1},
  {label: "已处理", promptNum: 0, value: 2},
  {label: "全部", promptNum: 0, value: ''}
])

/* 工作任务 */
/* 工作任务列表 */
const workTaskList = ref([])
/* 前往任务详情 */
const toDetailPage = (item) => {
  /* 上报阅读 */
  if (item.readStatus === 1) {
    updateUnresdStatus(item.id)
      .then(() => {
        item.readStatus = 0
        typeList.value[0].promptNum--
      })
  }

  location.href = item.singleUrl.replace("http://192.168.28.51:30300", '').replace("http://192.168.28.51:31300", '')
}
/* 分页功能 */
/* 筛选条件 */
const pageSize = 10
let pageNum = 1
const filterCondition = reactive({
  businessType: [],
  taskStatus: 1,
  startTime: "",
  endTime: "",
  userId: [],
  searchValue: "",
  msgType: [1, 3]
})
const loading = ref(false);
const finished = ref(false);

watch(() => filterCondition.taskStatus, newVal => {
  pageNum = 1
  getWorkTaskList()
})

/* 查询任务列表 */
const getWorkTaskList = throttle(() => {
  openLoading()
  const params = deepCopy(filterCondition)
  if (!params.businessType || params.businessType.length === 0) {
    delete params.businessType
  }
  queryWorkTaskList({...params, pageSize, pageNum})
    .then(res => {
      if (pageNum === 1) {
        workTaskList.value = res.data.records
      } else {
        workTaskList.value = workTaskList.value.concat(res.data.records)
      }

      if (workTaskList.value.length >= res.data.total) {
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

/* 获取任务状态信息 */
const getTaskStatus = (item) => {
  return statusDict?.[item.businessType]?.[+item.businessStatus]
}
/* 超时爆红 */
const getOverTimeDom = (text) => {
  if (text.includes("超时")) {
    return text.replace("超时", `<span style="color: #E50000">超时</span>`)
  }
  return text
}

/* 待处理数 */
const getUnresdNum = () => {
  queryUnreadNum({msgType: [1, 3], taskStatus: 1, readStatus: 1})
    .then(res => {
      typeList.value[0].promptNum = res.data
    })
}

</script>

<style lang="scss" scoped>
.workTaskWrap{
  height: 100%;
  background-color: white;
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
      .operateWrap{
        font-size: 14px;
        margin-top: 8px;
        li{
          margin-bottom: 5px;
        }
        .listLiWrap{
          margin-bottom: 5px;
          .redPonint{
            height: 6px;
            width: 6px;
            border-radius: 3px;
            background-color: #E50000;
          }
        }
      }
      .overTimeWrap{
        margin-top: 8px;
        color: #A7A9B7;
        font-size: 10px;
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
