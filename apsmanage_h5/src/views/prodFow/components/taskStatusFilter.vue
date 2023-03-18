<template>
  <div class="taskStatusFilterWrap flex">
    <!-- 选项 -->
    <ul class="tabWrap flex-align-center">
      <li v-for="(item, index) in Props.taskStatusList" :key="item" class="flex-center" :class="{'activeLi': activeButtonIndex === index}" @click="chooseStatus(index, item)">
        {{ item.label }}
      </li>
    </ul>
    <!-- 筛选icon -->
    <div class="filterWrap flex-center">
      <img src="../../../assets/images/filter.png" @click="showPop = true" />
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
          <div class="chooseListWrap mt-10" v-for="(ele) in Props.conditionList" :key="ele.name">
            <div class="titleWrap">{{ ele.name }}</div>
            <ul v-if="ele.type==='select'" class="custom-input" >
              <el-select v-model="newVal"   placeholder="请选择" popper-class="select_group--list" :teleported="false">
                <el-option v-for="item in selectList" :key="item.value" :label="item.label" :value="item.value"/>
              </el-select>
            </ul>
            <ul v-else class="flex">
              <!-- 全展示 -->
              <template v-if="!ele.showMore">
                <li v-for="(item, index) in ele.list" :key="ele.uniKey ? item[ele.uniKey] : item" :class="{'activeLi': ele.selectIndex === index}" @click="selectItem(ele, index, item)">
                  {{ ele.labelKey ? item[ele.labelKey] : item }}
                </li>
                <li @click="showMore(ele)" v-if="ele.initShowNum">收起</li>
                <li class="blockLi" v-for="item in computerBlockLength(ele.list.length - (ele.initShowNum ? 1 : 0) )" :key="item"></li>
              </template>
              <!-- 显示更多按钮 -->
              <template v-else>
                <li v-for="idx in (ele.list.length>ele.initShowNum ?ele.initShowNum - 1:ele.list.length)" :key="ele.uniKey ? ele.list[idx - 1][ele.uniKey] : ele.list[idx - 1]" :class="{'activeLi': ele.selectIndex === idx - 1}" @click="selectItem(ele, idx - 1, ele.list[idx - 1])">
                  {{ ele.labelKey ? ele.list[idx - 1][ele.labelKey] : ele.list[idx - 1] }}
                </li>
                <li @click="showMore(ele)" v-if="ele.list.length>ele.initShowNum">更多</li>
                <li class="blockLi" v-for="item in computerBlockLength(ele.list.length)" :key="item"></li>
              </template>
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
import { getWeek, getYMD } from "@/utils/timeFormat"

const Props = defineProps({
  /* 条件选项 */
  conditionList: {
    type: Array,
    default: () => []
  },
  /* 任务状态选项 */
  taskStatusList: {
    type: Array,
    default: () => [
      {label: "全部", value: 0},
      {label: "已完成", value: 1},
      {label: "未完成", value: 2}
    ]
  },
  /* 默认状态 */
  initTaskStatus: {
    type: Array || Number,
    require: true
  }
})

const Emit = defineEmits(["getFilterCondition"])

/* 重置条件 */
const resetCondition = () => {
  taskTimeIndex.value = null
  taskTime.start = ''
  taskTime.end = ''
  Props.conditionList.forEach(item => {
    item.selectIndex = null
    item.selectItem = null
    if (item.initShowNum) {
      item.showMore = true
    }
  })
}
/* 确认选择筛选条件 */
const confirmChoose = () => {
  const params = {
    taskStatus: activeItemId.value,
    startDate: taskTime.start ? taskTime.start + " 00:00:00" : '',
    endDate:  taskTime.end ? taskTime.end + " 23:59:59" : '',
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

/* 任务状态 */
const activeButtonIndex = ref(2)
const activeItemId = ref([ 1, 2 ])

/* 筛选 */
const showPop = ref(false)
/* 任务时间 */
const date = getYMD(new Date())
const taskTimeList = ref([
  "今天", "昨天", "本周", "自定义"
])
const taskTimeIndex = ref()
const taskTime = reactive({start: '', end: ''})

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

/* 展示更多 */
const showMore = (ele) => {
  ele.showMore = !ele.showMore
}

/* 选中 */
const selectItem = (ele, index, item) => {
  if (ele.selectIndex == index) {
    ele.selectIndex = null
    ele.selectItem = null
    return
  }
  ele.selectIndex = index
  if (ele.uniKey) {
    ele.selectItem = item[ele.uniKey]
  } else {
    ele.selectItem = item
  }

}

/* 占位计算 */
const computerBlockLength = (length) => {
  return 4 - (length- Math.floor(length / 4) * 4)
}

/* 初始化状态选择 */
const initStatus = () => {
  activeItemId.value = Props.initTaskStatus
  activeButtonIndex.value = Props.taskStatusList.findIndex(item => Props.initTaskStatus+'' == item.value+'')
}

onMounted(() => {
  initStatus()
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
      max-height: calc(100vh - 200px);
      overflow: auto;
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
      .chooseListWrap{
        &>ul{
          flex-wrap: wrap;
        }
        .el-select{
          width: 100%;
        }
        :deep(.custom-input .el-input__wrapper){
          height: 36px;
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
