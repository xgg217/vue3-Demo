<!--工治具异常处理-->
<template>
  <div class="prod_main schedule">
    <TaskStatusFilter :initTaskStatus="0" @getFilterCondition="getFilterCondition" :conditionList="conditionList"></TaskStatusFilter>
<!--    <van-list-->
<!--        class="listWrap"-->
<!--        v-if="!showExecutor"-->
<!--        v-model:loading="loading"-->
<!--        :finished="finished"-->
<!--        :finished-text="!taskList.length ? '' : '没有更多了'"-->
<!--        :immediate-check="false"-->
<!--        @load="onLoadList"-->
<!--    >-->
<!--      <div class="listItem" v-for="item in [{},{}]" :key="item.taskId" @click="toRouter(item.taskId)">-->
<!--        <taskInfoItem :itemInfo="itemInfo" :deployData="deployData"></taskInfoItem>-->
<!--      </div>-->
<!--    </van-list>-->
    <NoticeList :taskList="taskList"></NoticeList>
  </div>
</template>

<script setup>
import TaskStatusFilter from '../components/taskStatusFilter.vue'
import TaskInfoItem from '../components/taskInfoItem.vue'
import NoticeList from './module/noticeList.vue'
import {closeLoading, openLoading} from "@/utils/toastTips";
import {queryOvertimeTaskList, queryTaskList} from "@/api/prodFow";
import sesstionStorage from "@/utils/sessionStorage";

const route = useRoute()
const router = useRouter()

let itemInfo = reactive({
  params1: "123456",
  params1Unit: "不合格",
  params2: "123456",
  params3: "123456",
  params4: "123456",
  params5: "123456",
  params6: "123456",
  status: 1,
  name: "YC202205126321",
  timeStatus: "超时2：58：02"
})
let deployData = reactive({
  header: {
    nameKey: "name",
    timeStatusKey: "timeStatus"
  },
  content: [
    {label: "技嘉项目", key: "params1"},
    {label: "发起人", key: "params2"},
    {label: "发起时间", key: "params3"},
    {label: "处理时间", key: "params3"},
  ],
  /* 根据状态下标选择 */
  status: [
    {name: "待执行", color: "#0096FF"},
    {name: "任务超时", color: "#FF3A35"},
    {name: "完成", color: "#34C606"},
    {name: "超时完成", color: "#FF8B00"}
  ],
  statusKey: "status",
  unitColor: {
    "不合格": "#FF3A35"
  }
})

/* 任务列表 */
const taskList = ref([])
let showExecutor=computed(()=>{
  return  route.params.type == 2
})
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

  // methods[methodsType](params)
  //     .then(res => {
  //       if (methodsType === 'queryTaskList') {
  //         /* 整合列表 */
  //         taskList.value = taskList.value.concat(res.data.list)
  //         if (taskList.value.length >= res.data.total) {
  //           finished.value = true
  //         } else {
  //           finished.value = false
  //         }
  //       } else {
  //         const temp = []
  //         Object.keys(res.data).forEach(item => {
  //           const tempObj = {}
  //           tempObj['executor'] = item
  //           tempObj['executorId'] = res.data[item][0].executor
  //           tempObj['taskList'] = res.data[item]
  //           temp.push(tempObj)
  //         })
  //         taskList.value = temp
  //       }
  //       /* 设置请求缓存参数 */
  //       sesstionStorage.set("searchValue", params)
  //     })
  //     .finally(() => {
  //       closeLoading()
  //       loading.value = false
  //     })
}
/* 列表加载状态 */
const loading = ref(false)
const finished = ref(false)
/* 分页 */
const pageSize = 20
let pageNum = 1

/* 分页获取列表 */
const onLoadList = () => {
  getTaskList({taskType: taskType, ...queryCondition.value, pageSize: pageSize, pageNum: pageNum++})
}
/* 查询条件 */
const queryCondition = ref({})
/* 任务类型 */
let taskType = 1
/* 获取筛选条件 */
const getFilterCondition = (value) => {
  console.log(value)
}
/* 筛选条件 */
const conditionList = reactive([
  {
    name: "发起人",
    selectIndex: null,
    labelKey: 'label',
    uniKey: 'value',
    initShowNum: 4,
    list: [
      {label: "tsq", value: 1},
      {label: "123", value: 2},
      {label: "tsq", value: 1},
      {label: "123", value: 2},
      {label: "tsq", value: 3},
      {label: "123", value: 4},
      {label: "tsq", value: 5},
      {label: "123", value: 6}],


    showMore: true, // 是否展示更多按钮
    selectItem: null, // 当前选中的项
    submitKey: "scType" // 后端需要的字段


  },
  {name: "处理人", selectIndex: '', labelKey: 'label', uniKey: 'value', list: [{label: "tsq", value: 1}, {label: "123", value: 2}]},
])
</script>

<style lang="scss" scoped>
.schedule {
  display: flex;
  flex-direction: column;

  &_list {
    overflow: auto;
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
</style>
