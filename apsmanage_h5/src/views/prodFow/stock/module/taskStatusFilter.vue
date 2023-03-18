<template>
  <div class="taskStatusFilterWrap flex">
    <!-- 选项 -->
    <ul class="tabWrap flex-align-center">
      <li v-for="(item, index) in buttonTypeList" :key="item" class="flex-center" :class="{'activeLi': activeButtonIndex === index}" @click="chooseStatus(index, item)">
        {{ item.name }}
      </li>
    </ul>
    <!-- 筛选icon -->
    <div class="filterWrap flex-center">
      <img src="../../../../assets/images/filter.png" @click="showPop = true" />
    </div>
    <!-- 筛选选项 -->
    <van-popup
      v-model:show="showPop"
      closeable
      round
      position="bottom"
      :overlay-style="{'backgroundColor': '#2283d48'}"
      :style="{ height: 'auto' }"
    >
      <div class="filterContentWrap">
        <header>全部筛选</header>
        <main>
          <!-- 任务时间 -->
          <div class="taskWrap">
            <div class="titleWrap">任务时间</div>
            <ul class="flex">
              <li v-for="(item, index) in taskTimeList" :key="item" :class="{'activeLi': taskTimeIndex === index}" @click="chooseTaskTime(index)">
                {{ item }}
              </li>
            </ul>
          </div>
          <!-- 自定义时间区段 -->
          <chooseDatePart v-if="taskTimeIndex == 3" @getPartTimes="getPartTimes"></chooseDatePart>
          <!-- 执行人 -->
          <div class="executorWrap mt-10" v-if="Props.showExecutor">
            <div class="titleWrap">执行人</div>
            <ul class="flex">
              <li v-for="(item, index) in executorList" :key="item.userId" :class="{'activeLi': executorIndex === index}" @click="chooseExecutor(index, item)">
                {{ item.userName }}
              </li>
              <!-- 占位 -->
              <li class="blockLi" v-for="item in computerBlockLength(executorList.length)" :key="item"></li>
            </ul>
          </div>
          <!-- 客户 -->
          <div class="customerWrap mt-10">
            <div class="titleWrap">客户</div>
            <ul class="flex">
              <li v-for="(item, index) in customerList" :key="item" :class="{'activeLi': customerIndex === index}" @click="chooseCustomer(index, item)">
                {{ item }}
              </li>
              <!-- 占位 -->
              <li class="blockLi" v-for="item in computerBlockLength(customerList.length)" :key="item"></li>
            </ul>
          </div>
        </main>
        <footer class="flex">
          <PxtButton @click="resetCondition" width="42.5vw" height="11.5vw">
            <span class="fz-16">重置条件</span>
          </PxtButton>
          <PxtButton type="active" @click="confirmChoose" width="42.5vw" height="11.5vw">
            <span class="fz-16">确定筛选</span>
          </PxtButton>
        </footer>
      </div>
    </van-popup>
  </div>
</template>

<script setup>
import PxtButton from "@/components/button/button.vue"
import { queryCondition } from "@/api/prodFow"
import { openLoading, closeLoading } from "@/utils/toastTips"
import { getWeek, getYMD } from "@/utils/timeFormat"
import { useUserStore } from "@/store/user"
import sesstionStorage from "@/utils/sessionStorage"

const searchValue = sesstionStorage.get("searchValue")

const userStore = useUserStore()

const Emit = defineEmits(["getFilterCondition"])

/* 重置条件 */
const resetCondition = () => {
  taskTimeIndex.value = null
  taskTime.start = ''
  taskTime.end = ''
  executorIndex.value = null
  executorItem.value = null
  customerIndex.value = null
  customerItem.value = null
}
/* 确认选择筛选条件 */
const confirmChoose = () => {
  const params = {
    taskStatus: activeItemId.value,
    startDate: taskTime.start ? taskTime.start + " 00:00:00" : '',
    endDate:  taskTime.end ? taskTime.end + " 23:59:59" : '',
    projectName: customerItem.value
  }
  if (Props.showExecutor) {
    params['executor'] = executorItem.value.userId
  }
  Emit("getFilterCondition", params)
  showPop.value = false
}

/**
 * 选着任务状态
 * @params index: string 选项下标
 */
const chooseStatus = (index, item) => {
  if (activeButtonIndex.value == index) return
  activeButtonIndex.value = index
  activeItemId.value = item.value
  confirmChoose()
}

const Props = defineProps({
  /* 是否筛选执行人 */
  showExecutor: {
    type: Boolean,
    default: false
  }
})

const route = useRoute()

/* 任务状态 */
const buttonTypeList = [
  {name: '全部', value: null},
  {name: '已完成', value: [ 3, 4 ]},
  {name: '未完成', value: [ 1, 2 ]}
]
const activeButtonIndex = ref(2)
const activeItemId = ref([ 1, 2 ])
/* 从详情页返回 */
if (window.useSessionParams && searchValue) {
  activeItemId.value = searchValue.taskStatus
  activeButtonIndex.value = buttonTypeList.findIndex(item => JSON.stringify(item.value) == JSON.stringify(searchValue.taskStatus))
}

/* 筛选 */
const showPop = ref(false)
/* 任务时间 */
const date = getYMD(new Date())
const taskTimeList = ref([])
const taskTimeIndex = ref()
const taskTime = reactive({start: '', end: ''})
/* 从详情页返回 */
if (window.useSessionParams && searchValue) {
  taskTime.start = searchValue.startDate.split(" ")[0]
  taskTime.end = searchValue.endDate.split(" ")[0]
}

/**
 * 选择任务时间
 * @params index: string 选项下标
 */
const chooseTaskTime = (index) => {
  if (taskTimeIndex.value == index) {
    taskTimeIndex.value = null
    getPartTimes({start: '', end: ''})
    return
  }
  taskTimeIndex.value = index
  /* 今天 */
  if (index === 0) {
    const date = getYMD(new Date())
    getPartTimes({start: date, end: date})
    return
  }
  /* 昨天 */
  if (index === 1) {
    const date = getYMD(new Date().getTime() - 24 * 60 * 60 * 1000)
    getPartTimes({start: date, end: date})
    return
  }
  /* 本周 */
  if (index === 2) {
    const date = getWeek(new Date())
    getPartTimes(date)
    return
  }
}
/* 选择自定义时间 */
const getPartTimes = (values) => {
  // showPop.value = true
  taskTime.start = values.start
  taskTime.end = values.end
}

/* 执行人 */
const getExecutorList = (list) => {
  executorList.value = list
  executorItem.value = {userId: ''}
  /* 从详情页返回 */
  if (window.useSessionParams && searchValue && searchValue.userId) {
    executorItem.value = {userId: searchValue.userId || ''}
  }
}
const executorList = ref([])
const executorIndex = ref(null)
const executorItem = ref()
/**
 * 选择执行人
 * @params index: string 选项下标
 */
const chooseExecutor = (index, item) => {
  if (executorIndex.value == index) {
    executorIndex.value = null
    executorItem.value = {userId: ''}
    return
  }
  executorIndex.value = index
  executorItem.value = item
}

/* 客户 */
const getCustomerList = (list) => {
  customerList.value = list
  customerItem.value = ''
  /* 从详情页返回 */
  if (window.useSessionParams && searchValue) {
    customerItem.value = searchValue.projectName || ''
  }
}
const customerList = ref([])
const customerIndex = ref(null)
const customerItem = ref()
/**
 * 选择客户
 * @params index: string 选项下标
 */
const chooseCustomer = (index, item) => {
  if (customerIndex.value == index) {
    customerIndex.value = null
    customerItem.value = ''
    return
  }
  customerIndex.value = index
  customerItem.value = item
}

/* 占位计算 */
const computerBlockLength = (length) => {
  return 4 - (length- Math.floor(length / 4) * 4)
}

/* 获取筛选条件 */
const getFilterCondition = () => {
  openLoading()
  queryCondition(route.params.type)
    .then(res => {
      const { dateType, projectName, executor } = res.data

      /* 时间选择 */
      taskTimeList.value = dateType
      /* 执行人 */
      if (Props.showExecutor) {
        getExecutorList(executor)
      }
      /* 客户 */
      getCustomerList(projectName)
      /* 返回初始条件 */
      nextTick(() => {
        window.useSessionParams = false
        confirmChoose()
      })
    })
    .finally(() => {
      closeLoading()
    })
}

onMounted(() => {
  getFilterCondition()
})
</script>

<style lang="scss" scoped>
.taskStatusFilterWrap{
  height: 44px;
  background-color: white;
  padding: 0 20px;
  color: $b-gray;
  .tabWrap{
    flex: 1;
    height: 100%;
    padding-right: 20px;
    box-sizing: border-box;
    &>li{
      flex: 1;
      color: $c-gray;
      font-size: 16px;
      height: 32px;
      border-radius: 16px;
    }
    &>.activeLi{
      background-color: $a-blue;
      color: white;
    }
  }
  .filterWrap{
    height: 100%;
    width: 44px;
    &>img{
      height: 32px;
      width: 32px;
    }
  }
  :deep(.van-popup__close-icon){
    color: #a2a2a2;
    font-weight: 600;
    font-size: 24px;
  }
  .filterContentWrap{
    padding: 16px 20px;
    box-sizing: border-box;
    header{
      height: 25px;
      text-align: center;
      line-height: 25px;
      font-size: 18px;
      font-weight: 550;
      margin-bottom: 12px;
    }
    main{
      font-size: 16px;
      &>div{
        // height: 80px;
        &>div{
          height: 36px;
          line-height: 36px;
        }
        &>ul{
          // height: 36px;
          line-height: 36px;
          justify-content: space-between;
          &>li{
            text-align: center;
            margin-bottom: 8px;
            width: 76px;
            font-size: 14px;
            border-radius: 2px;
            background-color: #F7F8FA;
          }
          .blockLi{
            background-color: unset;
          }
          .activeLi{
            background-color: #F1F7FF;
            color: $b-blue;
          }
        }
      }
      .executorWrap, .customerWrap{
        &>ul{
          flex-wrap: wrap;
        }
      }
    }
    footer{
      margin-top: 40px;
      justify-content: space-between;
    }
  }
}
</style>
